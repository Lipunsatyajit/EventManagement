import { test, expect, type Page } from "@playwright/test";

async function login(page: Page, email: string, destination: string) {
  await page.goto("/login?role=customer");
  await page.getByLabel("Email address").fill(email);
  await page.getByRole("button", { name: "Send OTP" }).click();
  await page.getByLabel("OTP code").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await expect(page).toHaveURL(new RegExp(`${destination}$`));
}

for (const account of [
  { email: "customer@utkalevents.in", route: "/planners", role: "customer" },
  { email: "dream@utkalevents.in", route: "/planner/dashboard", role: "planner" },
  { email: "admin@utkalevents.in", route: "/admin/dashboard", role: "admin" },
]) {
  test(`${account.role}: email-based login, menu and logout`, async ({ page }) => {
    await login(page, account.email, account.route);
    await page.getByRole("button", { name: /Open (customer|user) menu/ }).click();
    await expect(page.getByRole("button", { name: "Logout", exact: true }).first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: /Open (customer|user) menu/ })).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: /Open (customer|user) menu/ }).click();
    await page.getByRole("button", { name: "Logout", exact: true }).first().click();
    await expect(page).toHaveURL(/\/$/);
    expect(await page.evaluate(() => localStorage.getItem("utkal-auth-session"))).toBeNull();
  });
}

test("unknown email and incorrect OTP do not create a session", async ({ page }) => {
  await page.goto("/login/verify?email=unknown@example.com&role=customer");
  await page.getByLabel("OTP code").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await expect(page.locator('form [role="alert"]')).toContainText("No matching account");
  await page.goto("/login/verify?email=dream%40utkalevents.in&role=admin");
  await page.getByLabel("OTP code").fill("000000");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await expect(page.locator('form [role="alert"]')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("utkal-auth-session"))).toBeNull();
  await page.getByLabel("OTP code").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await expect(page).toHaveURL(/\/planner\/dashboard$/);
});

test("planner registration persists for subsequent email login", async ({ page }) => {
  await page.goto("/planner/create");
  await page.getByLabel("Full name", { exact: true }).fill("Test Planner");
  await page.getByLabel("Mobile number").fill("9876543210");
  await page.getByLabel("Email address").fill("newplanner@example.com");
  await page.getByRole("button", { name: "Create planner account" }).click();
  await page.getByLabel("OTP code").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await expect(page).toHaveURL(/\/planner\/dashboard$/);
  await page.evaluate(() => localStorage.removeItem("utkal-auth-session"));
  await login(page, "newplanner@example.com", "/planner/dashboard");
});

test("planner search filters and empty state", async ({ page }) => {
  await page.goto("/planners?district=Puri&event=Wedding");
  await expect(page.locator(".planner-search__results article")).toHaveCount(1);
  await expect(page.locator(".planner-search__results")).toContainText("Elegant Planners");
  await page.getByLabel("Planner name").fill("no-match");
  await expect(page.getByText("No matching planners", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".planner-search__results article")).toHaveCount(4);
});

test("consultation request is saved, persists and can be cancelled", async ({ page }) => {
  await login(page, "customer@utkalevents.in", "/planners");
  await page.goto("/#contact");
  const form = page.locator(".consultation-form");
  await form.getByLabel("Full name").fill("Test Customer");
  await form.getByLabel("Mobile number").fill("9876543210");
  await form.getByLabel("District / city").selectOption("Puri");
  await form.getByLabel("Event type").selectOption("Wedding");
  await form.getByLabel("Event date").fill("2028-12-01");
  await form.getByLabel("Expected budget").fill("200000");
  await form.getByRole("button", { name: "Save consultation request" }).click();
  await expect(form.getByRole("status")).toContainText("Request saved");
  await page.goto("/customer/bookings");
  await expect(page.locator(".my-bookings article")).toContainText("Pending");
  await page.reload();
  await page.getByRole("button", { name: "Cancel request" }).click();
  await expect(page.locator(".my-bookings article")).toContainText("Cancelled");
});

test("checklist and budget persist across reload", async ({ page }) => {
  await login(page, "customer@utkalevents.in", "/planners");
  await page.goto("/customer/planning");
  await page.getByLabel("New task").fill("Confirm guest transport");
  await page.getByRole("button", { name: "Add task", exact: true }).click();
  await page.getByRole("checkbox", { name: "Confirm guest transport", exact: true }).check();
  await page.getByLabel("Cost description").fill("Venue");
  await page.getByLabel("Estimated amount (INR)").fill("50000");
  await page.getByRole("button", { name: "Add cost" }).click();
  await page.reload();
  await expect(page.getByRole("checkbox", { name: "Confirm guest transport", exact: true })).toBeChecked();
  await expect(page.locator(".planning-tools__total")).toContainText("50,000");
});

for (const width of [375, 768, 1024, 1440]) {
  test(`responsive screens and menu at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/", "/planners", "/login", "/customer/account", "/customer/bookings", "/customer/planning", "/planner/dashboard", "/admin/dashboard"]) {
      await page.goto(route);
      await expect(page.locator("main").first()).toBeVisible();
      const overflow = await page.evaluate(() => Array.from(document.querySelectorAll("main input, main select, main article, main h1, main h2, header nav")).filter((node) => {
        if (node.closest('[inert], [aria-hidden="true"]')) return false;
        const box = node.getBoundingClientRect(); return box.width > 0 && (box.right > innerWidth + 2 || box.left < -2);
      }).map((node) => node.tagName + ": " + node.textContent?.slice(0, 80)));
      expect(overflow, `${route} overflow`).toEqual([]);
      if (route === "/" && width < 1200 || route.includes("/dashboard") && width < 1024) {
        await page.getByRole("button", { name: "Open menu", exact: true }).click();
        const drawer = page.locator(route === "/" ? "#mobile-navigation" : "#portal-mobile-drawer");
        await expect(drawer).toHaveAttribute("aria-hidden", "false");
        await page.keyboard.press("Escape");
        await expect(drawer).toHaveAttribute("aria-hidden", "true");
      }
      if (["/", "/planner/dashboard", "/admin/dashboard"].includes(route)) await page.screenshot({ path: `test-results/screens/${route.replaceAll("/", "-") || "home"}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}
