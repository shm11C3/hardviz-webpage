import { expect, test } from "@playwright/test";
import { releaseArticles } from "../src/data/releases";

const article = releaseArticles["windows-sensor-service"];

for (const lang of ["en", "ja"] as const) {
  const prefix = lang === "ja" ? "/ja" : "";
  const route = `${prefix}/releases/windows-sensor-service/`;

  test(`${lang}: v1.12.0 article metadata and links`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator(".release-status")).toContainText(
      `HardwareVisualizer v${article.version}`,
    );
    await expect(page.locator(".release-status time")).toHaveCount(
      article.publishedAt ? 1 : 0,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://hardviz.com${route}`,
    );
    await expect(page.locator("main")).not.toContainText(
      /release\.v1_12_0|\{\w+\}/,
    );
    for (const link of await page.locator(".page-contents a").all()) {
      const id = (await link.getAttribute("href"))?.slice(1);
      await expect(page.locator(`section[id="${id}"]`)).toHaveCount(1);
    }
    await expect(page.locator(".release-hero .text-link")).toHaveAttribute(
      "href",
      `${prefix}/changelog/${article.version}/`,
    );
    await expect(
      page.locator(`main a[href="${prefix}/guide/#sensor-service"]`),
    ).toHaveCount(1);
    await expect(
      page.locator(`main a[href="${prefix}/guide/#downgrade"]`),
    ).toHaveCount(1);

    await page.goto(`${prefix}/changelog/${article.version}/`);
    await expect(
      page.locator(`main a[href="https://hardviz.com${route}"]`),
    ).toBeVisible();
  });

  test(`${lang}: v1.12.0 article is announced and fits small screens`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${prefix}/`);
    await expect(page.locator(`footer a[href="${route}"]`)).toHaveCount(0);
    await expect(page.locator(`footer a[href="${prefix}/blog/"]`)).toHaveCount(
      1,
    );
    await page.locator(".release-announcement a").click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}
