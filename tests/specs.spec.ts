import { expect, test } from "@playwright/test";

test("specs page loads with correct title", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page).toHaveTitle(/System Requirements/);
});

test("h1 contains System Requirements & Limitations", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "System Requirements & Limitations",
  );
});

test("OS table visible with Windows 10/11", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page.locator("table").first()).toBeVisible();
  await expect(page.locator("table").first()).toContainText("Windows 10/11");
});

test("hardware section with Supported CPU/GPU heading", async ({ page }) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", { name: /Supported CPU\/GPU/ }),
  ).toBeVisible();
});

test("languages table contains English and 日本語", async ({ page }) => {
  await page.goto("/specs/");
  const main = page.locator("main");
  await expect(main).toContainText("English");
  await expect(main).toContainText("日本語");
});

test("limitations section with 4 list items", async ({ page }) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", { name: /Known Limitations/ }),
  ).toBeVisible();
  const limitations = page.locator(
    "h2:has-text('Known Limitations') ~ ul > li, h2:has-text('Known Limitations') + * li",
  );
  expect(await limitations.count()).toBeGreaterThanOrEqual(4);
});

test("JA specs page has translated h1", async ({ page }) => {
  await page.goto("/ja/specs/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "システム要件と制限事項",
  );
});
