import { expect, test } from "@playwright/test";

test("language toggle is visible with aria-label", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("#langToggle");
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-label", "Select Language");
});

test("dropdown has English and 日本語 menu items", async ({ page }) => {
  await page.goto("/");
  const dropdown = page.locator("#langDropdown");
  const items = dropdown.locator('[role="menuitem"]');
  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText("English");
  await expect(items.nth(1)).toContainText("日本語");
});

test("dropdown href mappings EN to JA", async ({ page }) => {
  await page.goto("/");
  const jaLink = page.locator('#langDropdown a[href="/ja/"]');
  await expect(jaLink).toHaveCount(1);

  await page.goto("/faq/");
  await expect(page.locator('#langDropdown a[href="/ja/faq/"]')).toHaveCount(1);

  await page.goto("/specs/");
  await expect(page.locator('#langDropdown a[href="/ja/specs/"]')).toHaveCount(
    1,
  );

  await page.goto("/changelog/");
  await expect(
    page.locator('#langDropdown a[href="/ja/changelog/"]'),
  ).toHaveCount(1);
});

test("dropdown href mappings JA to EN", async ({ page }) => {
  await page.goto("/ja/");
  await expect(page.locator('#langDropdown a[href="/"]')).toHaveCount(1);

  await page.goto("/ja/faq/");
  await expect(page.locator('#langDropdown a[href="/faq/"]')).toHaveCount(1);
});

test("html lang attribute is correct", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.goto("/ja/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
});
