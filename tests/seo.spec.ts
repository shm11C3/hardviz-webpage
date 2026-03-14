import { expect, test } from "@playwright/test";

test("EN home canonical URL", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://hardviz.com/",
  );
});

test("EN home hreflang tags", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    "href",
    "https://hardviz.com/",
  );
  await expect(page.locator('link[hreflang="ja"]')).toHaveAttribute(
    "href",
    "https://hardviz.com/ja/",
  );
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
    "href",
    "https://hardviz.com/",
  );
});

test("JA home canonical URL", async ({ page }) => {
  await page.goto("/ja/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://hardviz.com/ja/",
  );
});

test("EN home OG meta tags", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  const ogTitle = await page
    .locator('meta[property="og:title"]')
    .getAttribute("content");
  expect(ogTitle).toBeTruthy();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /og-image\.png/,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "en_US",
  );
});

test("JA home OG locale", async ({ page }) => {
  await page.goto("/ja/");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "ja_JP",
  );
});

test("Twitter card meta tags", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    /og-image\.png/,
  );
});

test("home page JSON-LD has SoftwareApplication", async ({ page }) => {
  await page.goto("/");
  const jsonLd = await page.evaluate(() => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    for (const script of scripts) {
      const data = JSON.parse(script.textContent || "{}");
      if (data["@type"] === "SoftwareApplication") return data;
    }
    return null;
  });
  expect(jsonLd).not.toBeNull();
  expect(jsonLd.name).toBe("HardwareVisualizer");
});

test("FAQ page JSON-LD has FAQPage type", async ({ page }) => {
  await page.goto("/faq/");
  const jsonLd = await page.evaluate(() => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    for (const script of scripts) {
      const data = JSON.parse(script.textContent || "{}");
      if (data["@type"] === "FAQPage") return data;
    }
    return null;
  });
  expect(jsonLd).not.toBeNull();
  expect(jsonLd["@type"]).toBe("FAQPage");
});

test("all main pages have non-empty meta description", async ({ page }) => {
  const pages = ["/", "/faq/", "/specs/", "/changelog/", "/ja/", "/ja/faq/"];
  for (const path of pages) {
    await page.goto(path);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description, `meta description missing on ${path}`).toBeTruthy();
    expect(
      description?.length,
      `meta description empty on ${path}`,
    ).toBeGreaterThan(0);
  }
});
