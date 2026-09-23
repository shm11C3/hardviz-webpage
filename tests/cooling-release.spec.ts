import { expect, test } from "@playwright/test";

for (const lang of ["en", "ja"] as const) {
  const prefix = lang === "ja" ? "/ja" : "";
  const route = `${prefix}/releases/cooling-insight/`;

  test(`${lang}: release metadata, localized navigation and download destination`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toHaveText(
      lang === "ja" ? "v1.11.0 アップデート情報" : "v1.11.0 Update",
    );
    await expect(page.locator(".release-status")).toContainText(
      "HardwareVisualizer",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://hardviz.com${route}`,
    );
    await expect(page.locator('link[hreflang="ja"]')).toHaveAttribute(
      "href",
      "https://hardviz.com/ja/releases/cooling-insight/",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /DuckDB/,
    );
    await expect(page.locator(".comparison-figure figcaption")).toContainText(
      lang === "ja"
        ? "実測データではありません"
        : "Not an application screenshot or measured data",
    );
    await expect(page.locator("main")).not.toContainText(
      /In development|Coming next|currently published|開発中|次回リリース|現在の公開版/,
    );
    await expect(page.locator(".release-hero .primary-link")).toHaveAttribute(
      "href",
      `${prefix}/download/`,
    );
    await page.locator(".final-section .primary-link").click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/download/$`));
  });

  test(`${lang}: technical details work with keyboard and layout fits small screens`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const details = page.locator("#foundation details").first();
    await expect(details).not.toHaveAttribute("open", "");
    const summary = details.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator("p").first()).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.keyboard.press("Enter");
    await expect(details).not.toHaveAttribute("open", "");
    await page.goto(`${prefix}/`);
    await page.locator(".release-announcement a").click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
  });
}
