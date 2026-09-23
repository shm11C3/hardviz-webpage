import { expect, test } from "@playwright/test";
import { releaseArticles } from "../src/data/releases";

const releaseMeta = releaseArticles["cooling-insight"];

for (const lang of ["en", "ja"] as const) {
  const prefix = lang === "ja" ? "/ja" : "";
  const route = `${prefix}/releases/cooling-insight/`;

  test(`${lang}: release metadata, localized navigation and download destination`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("main h1")).toHaveCount(1);
    const heading =
      lang === "ja"
        ? "Cooling InsightでCPU温度を負荷と履歴から読み解く"
        : "Cooling Insight: understand CPU temperature through load and history.";
    await expect(page.locator("main h1")).toHaveText(heading);
    await expect(page).toHaveTitle(
      lang === "ja"
        ? "Cooling InsightでCPU温度を負荷と履歴から比較 | HardwareVisualizer"
        : "Cooling Insight: CPU Temperature vs Load and History | HardwareVisualizer",
    );
    await expect(page.locator(".release-status")).toContainText(
      "HardwareVisualizer v1.11.0",
    );
    const publishedTime = page.locator(".release-status time");
    if (releaseMeta.publishedAt) {
      await expect(publishedTime).toHaveAttribute(
        "datetime",
        releaseMeta.publishedAt,
      );
      await expect(
        page.locator('meta[property="article:published_time"]'),
      ).toHaveAttribute("content", releaseMeta.publishedAt);
    } else {
      await expect(publishedTime).toHaveCount(0);
    }
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );
    const jsonLd = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      ).map((script) => JSON.parse(script.textContent || "{}")),
    );
    const article = jsonLd.find((node) => node["@type"] === "TechArticle");
    expect(article).toBeDefined();
    expect(article.headline).toBe(heading);
    expect(article.url).toBe(`https://hardviz.com${route}`);
    expect(article.inLanguage).toBe(lang);
    expect(article.about.softwareVersion).toBe("1.11.0");
    expect(article.author["@id"]).toBe("https://hardviz.com/#person");
    expect(article.datePublished).toBe(releaseMeta.publishedAt ?? undefined);
    const breadcrumb = jsonLd.find(
      (node) => node["@type"] === "BreadcrumbList",
    );
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[1].item).toBe(
      `https://hardviz.com${route}`,
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
    for (const section of [".release-hero", ".final-section"]) {
      await expect(page.locator(`${section} .text-link`)).toHaveAttribute(
        "href",
        `${prefix}/changelog/1.11.0/`,
      );
    }
    await expect(page.locator(".readings-list > .small-note")).toContainText(
      lang === "ja" ? "時系列イメージ図" : "Illustrative timeline",
    );
    await expect(page.locator("#storage-benchmark-note")).toContainText(
      "76–77%",
    );
    await expect(page.locator(".storage-benchmark tbody tr")).toHaveCount(3);
    await expect(
      page.locator(".storage-benchmark tbody tr").first(),
    ).toContainText("72.0MiB");
    const storageDetails = page.locator("#foundation details").first();
    await expect(storageDetails).toContainText(
      lang === "ja" ? "2026年9月23日" : "September 23, 2026",
    );
    await expect(storageDetails).toContainText("Apple M4");
    await expect(storageDetails).toContainText("24 GiB");
    await expect(storageDetails).toContainText("SQLite 3.46.0 / DuckDB 1.5.5");
    await expect(page.locator("#foundation")).not.toContainText(/\{\w+\}/);
    const related = page.locator(".final-section .related-links a");
    await expect(related).toHaveCount(3);
    await expect(related.first()).toHaveAttribute(
      "href",
      "https://github.com/shm11C3/HardwareVisualizer/releases/tag/v1.11.0",
    );
    await expect(related.nth(1)).toHaveAttribute("href", `${prefix}/#features`);
    await expect(related.nth(2)).toHaveAttribute("href", `${prefix}/specs/`);
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
    await expect(page.locator(`footer a[href="${route}"]`)).toHaveCount(1);
    await page.locator(".release-announcement a").click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
  });
}
