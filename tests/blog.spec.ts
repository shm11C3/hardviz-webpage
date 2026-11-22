import { expect, test } from "@playwright/test";
import { releaseArticles } from "../src/data/releases";

const articles = Object.entries(releaseArticles).sort(([, a], [, b]) =>
  b.version.localeCompare(a.version, undefined, { numeric: true }),
);

for (const lang of ["en", "ja"] as const) {
  const prefix = lang === "ja" ? "/ja" : "";
  const route = `${prefix}/blog/`;

  test(`${lang}: blog lists every release article, newest first`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveText(
      lang === "ja" ? "ブログ" : "Blog",
    );
    const items = page.getByTestId("blog-posts").locator("li");
    await expect(items).toHaveCount(articles.length);
    for (const [index, [slug, article]] of articles.entries()) {
      const item = items.nth(index);
      await expect(item).toContainText(`v${article.version}`);
      await expect(item.locator("h2 a")).toHaveAttribute(
        "href",
        `${prefix}/releases/${slug}/`,
      );
      await expect(item.locator("h2 a")).toHaveText(/\S/);
      await expect(item.locator("p")).toHaveText(/\S/);
      if (article.publishedAt) {
        await expect(item.locator("time")).toHaveAttribute(
          "datetime",
          article.publishedAt,
        );
      } else {
        await expect(item.locator("time")).toHaveCount(0);
      }
    }
  });

  test(`${lang}: blog metadata and structured data`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://hardviz.com${route}`,
    );
    await expect(page.locator('link[hreflang="ja"]')).toHaveAttribute(
      "href",
      "https://hardviz.com/ja/blog/",
    );
    const nodes = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      ).map((script) => JSON.parse(script.textContent || "{}")),
    );
    const collection = nodes.find((node) => node["@type"] === "CollectionPage");
    expect(collection.url).toBe(`https://hardviz.com${route}`);
    expect(
      collection.mainEntity.itemListElement.map(
        (entry: { item: { url: string } }) => entry.item.url,
      ),
    ).toEqual(
      articles.map(
        ([slug]) => `https://hardviz.com${prefix}/releases/${slug}/`,
      ),
    );
  });

  test(`${lang}: every article is reachable from the footer and links back`, async ({
    page,
  }) => {
    for (const [slug] of articles) {
      await page.goto(`${prefix}/`);
      await page.locator(`footer a[href="${route}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${route}$`));
      await page
        .getByTestId("blog-posts")
        .locator(`a[href="${prefix}/releases/${slug}/"]`)
        .click();
      await expect(page).toHaveURL(new RegExp(`/releases/${slug}/$`));
      await expect(
        page.locator(`.breadcrumb a[href="${route}"]`),
      ).toBeVisible();
    }
  });

  test(`${lang}: footer links to the blog, not to an article`, async ({
    page,
  }) => {
    for (const path of [`${prefix}/`, route]) {
      await page.goto(path);
      await expect(page.locator(`footer a[href="${route}"]`)).toHaveCount(1);
      await expect(
        page.locator(`footer a[href^="${prefix}/releases/"]`),
      ).toHaveCount(0);
    }
  });

  test(`${lang}: blog and breadcrumb fit a 320px screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    for (const path of [route, `${prefix}/releases/${articles[0][0]}/`]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  });
}
