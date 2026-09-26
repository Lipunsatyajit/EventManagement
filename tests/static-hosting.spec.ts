import { test, expect } from "@playwright/test";

const siteUrl = (path: string) => `${process.env.TEST_BASE_PATH ?? ""}${path}`;

test("styles, logo and favicon load from the repository path", async ({ page, request }) => {
  const failures: string[] = [];
  page.on("response", (response) => { if (response.status() >= 400) failures.push(response.url()); });
  await page.goto(siteUrl("/"));
  const logo = page.getByAltText("Utkal Events", { exact: true }).first();
  await expect(logo).toBeVisible();
  await expect.poll(() => logo.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const css = await page.locator('link[rel="stylesheet"]').evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));
  expect(css.length).toBeGreaterThan(0);
  for (const href of css) {
    expect(new URL(href).pathname).toContain(`${process.env.TEST_BASE_PATH ?? ""}/_next/`);
    expect((await request.get(href)).status()).toBe(200);
  }
  const favicon = await page.locator('link[rel="shortcut icon"]').getAttribute("href");
  expect(favicon).toBe(siteUrl("/icon.svg"));
  expect((await request.get(favicon!)).status()).toBe(200);
  expect(failures).toEqual([]);
});

test("home search retains filters, legacy login preserves email, and links stay in the app", async ({ page }) => {
  await page.goto(siteUrl("/"));
  const form = page.locator('form[action]');
  await form.locator('select[name="district"]').selectOption("Puri");
  await form.locator('select[name="event"]').selectOption("Wedding");
  await form.getByRole("button", { name: "Search Planners" }).click();
  await expect(page).toHaveURL(new RegExp(`${siteUrl("/planners/")}\\?district=Puri&event=Wedding`));
  await expect(page.locator(".planner-search__results article")).toHaveCount(1);
  await page.locator(".planner-search__results").getByRole("link", { name: "View profile" }).click();
  await expect(page).toHaveURL(new RegExp(`${siteUrl("/planners/elegant-planners")}/?$`));
  await page.reload();
  await expect(page.getByRole("heading", { name: "Elegant Planners", exact: true })).toBeVisible();
  await page.goto(siteUrl("/planner/login/verify/?email=dream%40utkalevents.in"));
  await expect(page.getByLabel("OTP code")).toBeVisible();
  expect(new URL(page.url()).searchParams.get("email")).toBe("dream@utkalevents.in");
  await page.getByLabel("OTP code").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await expect(page).toHaveURL(new RegExp(`${siteUrl("/planner/dashboard")}/?$`));
});

for (const width of [375, 1440]) {
  test(`all portal sections and direct refresh at ${width}px`, async ({ page }) => {
    test.setTimeout(180000);
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [role, sections] of Object.entries({
      planner: ["bookings", "gallery", "completed-events", "reviews", "profile", "packages", "notifications", "settings"],
      admin: ["bookings", "categories", "customers", "districts", "planner-approvals", "planners", "reports", "reviews", "settings"],
      customer: ["profile", "reviews", "wishlist"],
    })) {
      for (const section of sections) {
        const response = await page.goto(siteUrl(`/${role}/${section}/`));
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1")).toBeVisible();
        const h1 = await page.locator("h1").boundingBox();
        expect(h1!.x + h1!.width).toBeLessThanOrEqual(width + 1);
      }
    }
    expect(errors).toEqual([]);
  });
}
