import { expect, test } from "@playwright/test";

test("theme toggle button exists with aria-label", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("#themeToggle");
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-label", "Toggle color theme");
});

test("clicking toggle adds/removes dark class on html", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.locator("#themeToggle");

  const initialDark = await html.evaluate((el) =>
    el.classList.contains("dark"),
  );
  await toggle.click();
  const afterClick = await html.evaluate((el) =>
    el.classList.contains("dark"),
  );
  expect(afterClick).not.toBe(initialDark);

  await toggle.click();
  const afterSecondClick = await html.evaluate((el) =>
    el.classList.contains("dark"),
  );
  expect(afterSecondClick).toBe(initialDark);
});

test("theme persists to localStorage", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("#themeToggle");

  await toggle.click();
  const theme = await page.evaluate(() => localStorage.getItem("theme"));
  expect(theme).toBeTruthy();
});

test("theme persists across page navigation", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("#themeToggle");

  // Set dark mode
  const isDark = await page
    .locator("html")
    .evaluate((el) => el.classList.contains("dark"));
  if (!isDark) {
    await toggle.click();
  }
  await expect(page.locator("html")).toHaveClass(/dark/);

  // Navigate to another page
  await page.goto("/faq/");
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("sun and moon SVG visibility toggles with theme", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("#themeToggle");

  // Check initial state and toggle
  const isDark = await page
    .locator("html")
    .evaluate((el) => el.classList.contains("dark"));

  if (isDark) {
    // In dark mode, moon should be visible
    await expect(page.locator("#themeToggle .moon")).toBeVisible();
    await toggle.click();
    await expect(page.locator("#themeToggle .sun")).toBeVisible();
  } else {
    // In light mode, sun should be visible
    await expect(page.locator("#themeToggle .sun")).toBeVisible();
    await toggle.click();
    await expect(page.locator("#themeToggle .moon")).toBeVisible();
  }
});
