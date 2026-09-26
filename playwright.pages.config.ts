import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

process.env.TEST_BASE_PATH = "/EventManagement";
export default defineConfig({
  ...config,
  webServer: {
    command: "node scripts/preview-pages.mjs",
    url: "http://localhost:3100/EventManagement/",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
