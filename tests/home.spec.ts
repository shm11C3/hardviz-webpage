import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Monitor Your Hardware",
  );
});

test("download links point to home anchors on FAQ pages", async ({ page }) => {
  await page.goto("/faq/");
  await expect(
    page.locator("header a", { hasText: "Download" }),
  ).toHaveAttribute("href", "/#download");

  await page.goto("/ja/faq/");
  await expect(
    page.locator("footer a", { hasText: "ダウンロード" }),
  ).toHaveAttribute("href", "/ja/#download");
});

test("JA home page loads", async ({ page }) => {
  await page.goto("/ja/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Monitor",
  );
});

test("home page has all major sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#features")).toBeVisible();
  await expect(page.locator("#download")).toBeVisible();
  await expect(page.locator("#faq")).toBeVisible();
});

test("hero has download and GitHub buttons", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="#download"]').first()).toBeVisible();
  const githubLink = page.locator('a[href*="github.com/shm11C3/HardwareVisualizer"]').first();
  await expect(githubLink).toHaveAttribute("target", "_blank");
});

test("download section renders platform cards", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#download h3");
  const headings = page.locator("#download h3");
  await expect(headings).toHaveCount(3);
  await expect(headings.nth(0)).toContainText("Windows");
  await expect(headings.nth(1)).toContainText("macOS");
  await expect(headings.nth(2)).toContainText("Linux");
});

test("download section shows mock version", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#download");
  await expect(page.locator("#download")).toContainText("v1.0.0");
});

test("FAQ preview shows 3 items", async ({ page }) => {
  await page.goto("/");
  const faqItems = page.locator("#faq details");
  await expect(faqItems).toHaveCount(3);
});

test("FAQ preview has 'View all FAQs' link", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#faq a[href="/faq/"]')).toBeVisible();

  await page.goto("/ja/");
  await expect(page.locator('#faq a[href="/ja/faq/"]')).toBeVisible();
});

test("features section shows 6 cards", async ({ page }) => {
  await page.goto("/");
  const featureCards = page.locator("#features h3");
  await expect(featureCards).toHaveCount(6);
});
