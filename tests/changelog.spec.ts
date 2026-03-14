import { expect, test } from "@playwright/test";

test("changelog index loads with h1", async ({ page }) => {
  await page.goto("/changelog/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Changelog",
  );
});

test("index lists at least 3 entries", async ({ page }) => {
  await page.goto("/changelog/");
  const entries = page.locator("article");
  expect(await entries.count()).toBeGreaterThanOrEqual(3);
});

test("entries show version numbers", async ({ page }) => {
  await page.goto("/changelog/");
  const main = page.locator("main");
  await expect(main).toContainText("v1.6.0");
  await expect(main).toContainText("v1.5.1");
  await expect(main).toContainText("v1.5.0");
});

test("entries link to detail pages", async ({ page }) => {
  await page.goto("/changelog/");
  await expect(
    page.locator('a[href="/changelog/1.6.0/"]'),
  ).toHaveCount(1);
});

test("entries have GitHub release external links", async ({ page }) => {
  await page.goto("/changelog/");
  const githubLinks = page.locator(
    'main a[href*="github.com"][target="_blank"]',
  );
  expect(await githubLinks.count()).toBeGreaterThanOrEqual(1);
});

test("version page loads with h1", async ({ page }) => {
  await page.goto("/changelog/1.6.0/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "v1.6.0",
  );
});

test("version page has back link to changelog", async ({ page }) => {
  await page.goto("/changelog/1.6.0/");
  const backLink = page.locator('a[href="/changelog/"]', {
    hasText: "Back to Changelog",
  });
  await expect(backLink).toBeVisible();
});

test("version page shows time element and version text", async ({ page }) => {
  await page.goto("/changelog/1.6.0/");
  await expect(page.locator("time")).toBeVisible();
  await expect(page.locator("main")).toContainText("v1.6.0");
});

test("version page has GitHub release link", async ({ page }) => {
  await page.goto("/changelog/1.6.0/");
  await expect(
    page.locator('a[href*="releases/tag/v1.6.0"]'),
  ).toHaveCount(1);
});

test("version page shows tags", async ({ page }) => {
  await page.goto("/changelog/1.6.0/");
  await expect(page.locator("main")).toContainText("Release");
  await expect(page.locator("main")).toContainText("macOS");
});

test("JA changelog h1 contains 変更履歴", async ({ page }) => {
  await page.goto("/ja/changelog/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "変更履歴",
  );
});

test("JA version page has translated back link", async ({ page }) => {
  await page.goto("/ja/changelog/1.6.0/");
  const backLink = page.locator('a[href="/ja/changelog/"]', {
    hasText: "変更履歴へ戻る",
  });
  await expect(backLink).toBeVisible();
});
