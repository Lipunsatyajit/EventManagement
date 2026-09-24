import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  expect: { timeout: 15000 },
  workers: 1,
  use: { baseURL: "http://localhost:3100", channel: "chrome", screenshot: "only-on-failure", trace: "retain-on-failure" },
  webServer: { command: "npm run dev -- --port 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 120000 },
});
