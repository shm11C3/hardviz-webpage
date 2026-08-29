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
  const expectedTitle =
    "HardwareVisualizer – CPU & GPU Monitor with Long-Term History";
  const expectedDescription =
    "CPU & GPU monitoring for Windows with configurable long-term CPU, GPU, temperature, and process history stored locally. Review gaming or heavy workloads afterward.";
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    expectedDescription,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    expectedTitle,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    expectedDescription,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /og-image\.png/,
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    "content",
    "HardwareVisualizer logo over a dashboard showing CPU, GPU, RAM, and process metrics",
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
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
    "content",
    "HardwareVisualizer logo over a dashboard showing CPU, GPU, RAM, and process metrics",
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
  expect(jsonLd.description).toContain("sampled process history locally");
  expect(jsonLd.featureList).toContain(
    "Configurable long-term CPU, GPU, temperature, and sampled process history stored locally",
  );
  expect(jsonLd.featureList).toContain("No account and no outbound telemetry");
  expect(jsonLd.featureList).toContain(
    "Authenticode-signed Windows release installer",
  );
});

test("JA home metadata and JSON-LD use the same history positioning", async ({
  page,
}) => {
  await page.goto("/ja/");
  const expectedTitle = "HardwareVisualizer – 長期履歴対応CPU・GPUモニター";
  const expectedDescription =
    "Windows向けCPU・GPUモニター。CPU、GPU、温度、プロセスの長期履歴をPC内に保存し、ゲームや重い処理のあとに振り返れます。保存期間は変更可能で、macOS・Linuxにも対応。";

  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    expectedDescription,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    expectedTitle,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    expectedDescription,
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    "content",
    "CPU、GPU、RAM、プロセス情報のダッシュボードに重なるHardwareVisualizerのロゴ",
  );
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
    "content",
    "CPU、GPU、RAM、プロセス情報のダッシュボードに重なるHardwareVisualizerのロゴ",
  );

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
  expect(jsonLd.description).toContain(
    "CPU、GPU、温度、プロセスの長期履歴をPC内に保存",
  );
  expect(jsonLd.featureList).toContain("アカウント不要・外部テレメトリなし");
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
  const pages = [
    "/",
    "/download/",
    "/verification/",
    "/faq/",
    "/specs/",
    "/changelog/",
    "/ja/",
    "/ja/download/",
    "/ja/verification/",
    "/ja/faq/",
  ];
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
