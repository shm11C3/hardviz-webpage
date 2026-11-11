import { expect, test } from "@playwright/test";

test.describe("Header", () => {
  test("logo links to home", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header a").first()).toHaveAttribute("href", "/");

    await page.goto("/ja/");
    await expect(page.locator("header a").first()).toHaveAttribute(
      "href",
      "/ja/",
    );
  });

  test("header contains brand text", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toContainText("HardwareVisualizer");
  });

  test("download button href from home and faq", async ({ page }) => {
    const download = page.locator("header [data-nav-download]");

    await page.goto("/");
    await expect(download).toHaveAttribute("href", "/download/");
    await expect(download).toContainText("Download");

    await page.goto("/faq/");
    await expect(download).toHaveAttribute("href", "/download/");

    await page.goto("/download/");
    await expect(download).toHaveAttribute("aria-current", "page");
  });

  test("primary navigation links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header [data-site-nav]");
    for (const href of [
      "/cooling-insight/",
      "/guide/",
      "/specs/",
      "/changelog/",
      "/faq/",
    ]) {
      await expect(nav.locator(`a[href="${href}"]`)).toBeVisible();
    }

    await page.goto("/ja/");
    await expect(nav.locator('a[href="/ja/faq/"]')).toBeVisible();
    await expect(nav.locator('a[href="/ja/guide/"]')).toBeVisible();
  });

  test("current page is marked in the primary navigation", async ({ page }) => {
    await page.goto("/faq/");
    await expect(
      page.locator('header [data-site-nav] a[href="/faq/"]'),
    ).toHaveAttribute("aria-current", "page");

    await page.goto("/changelog/1.6.0/");
    await expect(
      page.locator('header [data-site-nav] a[href="/changelog/"]'),
    ).toHaveAttribute("aria-current", "page");
  });

  test("GitHub link opens in new tab", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const githubLink = page.getByRole("link", { name: "GitHub stars" });
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute(
      "href",
      /github\.com\/shm11C3\/HardwareVisualizer/,
    );
  });

  test("navigation collapses into a menu on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    const nav = page.locator("header [data-site-nav]");
    const menu = page.locator("header details.site-menu");
    await expect(nav).toBeHidden();
    await expect(menu.locator("summary")).toBeVisible();
    await expect(menu.locator('a[href="/faq/"]')).toBeHidden();

    await menu.locator("summary").click();
    await expect(menu.locator('a[href="/download/"]')).toBeVisible();
    await expect(menu.locator('a[href="/guide/"]')).toBeVisible();
    await expect(menu.locator('a[href="/faq/"]')).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(nav).toBeVisible();
    await expect(menu.locator("summary")).toBeHidden();
  });
});

test.describe("Footer", () => {
  test("product section has expected links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="/#features"]')).toBeVisible();
    await expect(footer.locator('a[href="/download/"]')).toBeVisible();
    await expect(footer.locator('a[href="/specs/"]')).toBeVisible();
    await expect(footer.locator('a[href="/faq/"]')).toBeVisible();
    await expect(footer.locator('a[href="/changelog/"]')).toBeVisible();
  });

  test("resources section has external GitHub links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    const githubLinks = footer.locator('a[target="_blank"]');
    expect(await githubLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test("community section visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toContainText("Community");
  });

  test("JA footer has translated headings", async ({ page }) => {
    await page.goto("/ja/");
    const footer = page.locator("footer");
    await expect(footer).toContainText("製品");
    await expect(footer).toContainText("リソース");
    await expect(footer).toContainText("コミュニティ");
  });

  test("JA footer links use /ja/ prefix", async ({ page }) => {
    await page.goto("/ja/");
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="/ja/faq/"]')).toBeVisible();
    await expect(footer.locator('a[href="/ja/specs/"]')).toBeVisible();
    await expect(footer.locator('a[href="/ja/changelog/"]')).toBeVisible();
  });
});
