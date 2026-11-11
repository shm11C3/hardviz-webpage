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

  await page.goto("/download/");
  await expect(
    page.locator('#langDropdown a[href="/ja/download/"]'),
  ).toHaveCount(1);

  await page.goto("/verification/");
  await expect(
    page.locator('#langDropdown a[href="/ja/verification/"]'),
  ).toHaveCount(1);

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

  await page.goto("/ja/download/");
  await expect(page.locator('#langDropdown a[href="/download/"]')).toHaveCount(
    1,
  );

  await page.goto("/ja/verification/");
  await expect(
    page.locator('#langDropdown a[href="/verification/"]'),
  ).toHaveCount(1);
});

test("html lang attribute is correct", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.goto("/ja/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
});

test("menu stays open while the pointer travels from the button to an item", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.locator("#langToggle");
  const jaLink = page.locator('#langDropdown a[href="/ja/"]');
  const from = await toggle.boundingBox();
  if (!from) throw new Error("Language toggle has no box");
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
  await expect(jaLink).toBeVisible();

  const to = await jaLink.boundingBox();
  if (!to) throw new Error("Language link has no box");
  // Straight down from the button, one pixel at a time, then across.
  const steps = Math.ceil(to.y + to.height / 2 - (from.y + from.height / 2));
  await page.mouse.move(from.x + from.width / 2, to.y + to.height / 2, {
    steps,
  });
  await expect(jaLink).toBeVisible();
  await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, {
    steps: 10,
  });
  await jaLink.click();
  await expect(page).toHaveURL(/\/ja\/$/);
});

test("toggle reports whether the menu is shown", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("#langToggle");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.focus();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('#langDropdown a[href="/ja/"]')).toBeVisible();

  await toggle.blur();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.hover();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.mouse.move(0, 400);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("header keeps a GitHub link at every desktop width", async ({ page }) => {
  for (const width of [1024, 1100, 1279, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/ja/");
    const github = page
      .locator("header")
      .getByRole("link", { name: "GitHub", exact: true });
    await expect(github).toBeVisible();
    const fits = await page
      .locator(".site-bar")
      .evaluate((bar) => bar.scrollWidth <= bar.clientWidth);
    expect(fits).toBe(true);
  }
});
