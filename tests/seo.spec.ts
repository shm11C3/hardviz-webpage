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
  const expectedTitle = "HardwareVisualizer – CPU & GPU Monitor with History";
  const expectedDescription =
    "Free, open-source hardware monitor for Windows, macOS, and Linux. See CPU, GPU, and temperatures live, keep a year of history on your PC, and compare how cooling changes over months.";
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
  expect(jsonLd.description).toContain("Cross-platform hardware monitor");
  expect(jsonLd.description).toContain("understand what happened");
  expect(jsonLd.featureList).toContain(
    "CPU, GPU, temperature, and sampled process history stored locally",
  );
  expect(jsonLd.featureList).toContain(
    "Review what happened after gaming and heavy workloads",
  );
  expect(jsonLd.featureList).toContain("No account and no telemetry");
  expect(jsonLd.featureList).toContain(
    "Authenticode-signed Windows release installer",
  );
});

test("JA home metadata and JSON-LD use the same monitor positioning", async ({
  page,
}) => {
  await page.goto("/ja/");
  const expectedTitle =
    "HardwareVisualizer – あとから振り返れるCPU・GPUモニター";
  const expectedDescription =
    "Windows・macOS・Linux対応の無料・オープンソースのハードウェアモニター。CPU・GPU・温度をリアルタイムに表示し、標準で1年ぶんの履歴をPCに残して、冷却の変化を月単位で比べられます。";

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
  expect(jsonLd.description).toContain("ハードウェアモニター");
  expect(jsonLd.description).toContain("何が起きていたか振り返れる");
  expect(jsonLd.featureList).toContain(
    "CPU、GPU、温度、サンプリングされたプロセスの履歴をPC内に保存",
  );
  expect(jsonLd.featureList).toContain(
    "ゲームや重い処理のあとに何が起きていたか確認",
  );
  expect(jsonLd.featureList).toContain("アカウント不要・テレメトリーなし");
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
