import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  webServer: {
    command: "pnpm run preview",
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:4321",
    // Seed a stored analytics-consent choice so the cookie-consent banner stays
    // hidden during tests and never overlaps the elements under test.
    storageState: {
      cookies: [],
      origins: [
        {
          origin: "http://localhost:4321",
          localStorage: [{ name: "analytics-consent", value: "denied" }],
        },
      ],
    },
  },
});
