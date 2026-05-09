import { expect, test } from "@playwright/test";

test("download page exposes parallel navigation and sections", async ({
  page,
}) => {
  await page.goto("/download/");

  const guideNav = page.locator("nav[data-download-guide-nav]");

  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('main a[href="/changelog/"]')).toBeVisible();
  await expect(page.locator("#download h2")).toBeVisible();
  await expect(page.locator("#download h3").nth(0)).toBeVisible();
  await expect(page.locator("#download h3").nth(1)).toBeVisible();
  await expect(page.locator("#installation")).toBeVisible();
  await expect(guideNav.locator('a[href="/download/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(guideNav.locator('a[href="/download/#download"]')).toBeVisible();
  await expect(
    guideNav.locator('a[href="/download/#installation"]'),
  ).toBeVisible();
  await expect(guideNav.locator('a[href="/verification/"]')).toBeVisible();
  await expect(
    page.locator('#installation a[href="/verification/"]'),
  ).toBeVisible();
});

test("download page exposes installer links", async ({ page }) => {
  await page.goto("/download/");

  await expect(
    page.locator('a[href="https://example.com/fake/windows-installer.msi"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://example.com/fake/linux.AppImage"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      '#download a[href="https://github.com/shm11C3/HardwareVisualizer/releases/latest"]',
    ),
  ).toHaveCount(0);
});

test("JA download page keeps localized parallel navigation", async ({
  page,
}) => {
  await page.goto("/ja/download/");

  const guideNav = page.locator("nav[data-download-guide-nav]");

  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.locator('main a[href="/ja/changelog/"]')).toBeVisible();
  await expect(page.locator("#download")).toBeVisible();
  await expect(page.locator("#installation")).toBeVisible();
  await expect(guideNav.locator('a[href="/ja/download/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    guideNav.locator('a[href="/ja/download/#download"]'),
  ).toBeVisible();
  await expect(
    guideNav.locator('a[href="/ja/download/#installation"]'),
  ).toBeVisible();
  await expect(guideNav.locator('a[href="/ja/verification/"]')).toBeVisible();
  await expect(
    page.locator('#installation a[href="/ja/verification/"]'),
  ).toBeVisible();
});

test("verification page exposes official resource links", async ({ page }) => {
  await page.goto("/verification/");

  await expect(page.locator("main > section#verification")).toBeVisible();
  await expect(
    page.locator(
      'a[href="https://github.com/shm11C3/HardwareVisualizer/releases"]',
    ),
  ).toBeVisible();
  await expect(page.locator('a[href*="CODE_SIGNING_POLICY.md"]')).toBeVisible();
  await expect(
    page.locator('a[href*="docs/download-verification.md"]').first(),
  ).toBeVisible();
  await expect(page.locator('a[href*="/security/policy"]')).toBeVisible();
  const guideNav = page.locator("nav[data-download-guide-nav]");
  await expect(guideNav.locator('a[href="/download/"]')).toBeVisible();
  await expect(guideNav.locator('a[href="/verification/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("JA verification page keeps localized route structure", async ({
  page,
}) => {
  await page.goto("/ja/verification/");

  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.locator("main > section#verification")).toBeVisible();
  await expect(
    page.locator('a[href*="docs/download-verification.ja.md"]').first(),
  ).toBeVisible();
  const guideNav = page.locator("nav[data-download-guide-nav]");
  await expect(guideNav.locator('a[href="/ja/download/"]')).toBeVisible();
  await expect(guideNav.locator('a[href="/ja/verification/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
});
