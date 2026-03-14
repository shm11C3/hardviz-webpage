import { expect, test } from "@playwright/test";

test("FAQ page loads with correct title", async ({ page }) => {
  await page.goto("/faq/");
  await expect(page).toHaveTitle(/FAQ/);
});

test("page heading contains Frequently Asked Questions", async ({ page }) => {
  await page.goto("/faq/");
  await expect(page.locator("h2").first()).toContainText(
    "Frequently Asked Questions",
  );
});

test("FAQ page has 7 items", async ({ page }) => {
  await page.goto("/faq/");
  const items = page.locator("#faq details");
  await expect(items).toHaveCount(7);
});

test("first FAQ item is open by default, second is not", async ({ page }) => {
  await page.goto("/faq/");
  await expect(page.locator("#faq-1")).toHaveAttribute("open", "");
  await expect(page.locator("#faq-2")).not.toHaveAttribute("open", "");
});

test("clicking FAQ item toggles open/close", async ({ page }) => {
  await page.goto("/faq/");
  const item = page.locator("#faq-2");
  const summary = item.locator("summary");

  // Open it
  await summary.click();
  await expect(item).toHaveAttribute("open", "");

  // Close it
  await summary.click();
  await expect(item).not.toHaveAttribute("open", "");
});

test("FAQ item 3 has link to specs", async ({ page }) => {
  await page.goto("/faq/");
  await expect(page.locator('#faq-3 a[href="/specs/"]')).toHaveCount(1);
});

test("FAQ item 7 has link to GitHub issues", async ({ page }) => {
  await page.goto("/faq/");
  await expect(
    page.locator(
      '#faq-7 a[href*="github.com/shm11C3/HardwareVisualizer/issues"]',
    ),
  ).toHaveCount(1);
});

test("JA FAQ page loads with 7 items, first is open", async ({ page }) => {
  await page.goto("/ja/faq/");
  const items = page.locator("#faq details");
  await expect(items).toHaveCount(7);
  await expect(page.locator("#faq-1")).toHaveAttribute("open", "");
});

test("FAQ page has FAQPage JSON-LD with 7 items", async ({ page }) => {
  await page.goto("/faq/");
  const jsonLd = await page.evaluate(() => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    for (const script of scripts) {
      const data = JSON.parse(script.textContent || "{}");
      if (data["@type"] === "FAQPage") return data;
    }
    return null;
  });
  expect(jsonLd).not.toBeNull();
  expect(jsonLd["@type"]).toBe("FAQPage");
  expect(jsonLd.mainEntity).toHaveLength(7);
});
