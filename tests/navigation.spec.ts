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

  test("download link href from home and faq", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("header a", { hasText: "Download" }),
    ).toHaveAttribute("href", "/#download");

    await page.goto("/faq/");
    await expect(
      page.locator("header a", { hasText: "Download" }),
    ).toHaveAttribute("href", "/#download");
  });

  test("FAQ link href", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("header a", { hasText: "FAQ" }),
    ).toHaveAttribute("href", "/faq/");

    await page.goto("/ja/");
    await expect(
      page.locator("header a", { hasText: "FAQ" }),
    ).toHaveAttribute("href", "/ja/faq/");
  });

  test("GitHub link opens in new tab", async ({ page }) => {
    await page.goto("/");
    const githubLink = page.locator("header a", { hasText: "GitHub" });
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute(
      "href",
      /github\.com\/shm11C3\/HardwareVisualizer/,
    );
  });

  test("nav links hidden on mobile, visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(
      page.locator("header a", { hasText: "Download" }),
    ).toBeHidden();
    await expect(page.locator("header a", { hasText: "FAQ" })).toBeHidden();

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(
      page.locator("header a", { hasText: "Download" }),
    ).toBeVisible();
    await expect(page.locator("header a", { hasText: "FAQ" })).toBeVisible();
  });
});

test.describe("Footer", () => {
  test("product section has expected links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="/#features"]')).toBeVisible();
    await expect(footer.locator('a[href="/#download"]')).toBeVisible();
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
