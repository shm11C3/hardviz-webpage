import { expect, test } from "@playwright/test";

const pages = ["guide", "security", "cooling-insight", "compare"] as const;

for (const slug of pages) {
  test(`${slug} page loads in English and Japanese`, async ({ page }) => {
    await page.goto(`/${slug}/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/\S/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S/,
    );
    await expect(page.locator("main")).toContainText(/Last updated .+ \(v\d/);
    await expect(
      page.locator(`#langDropdown a[href="/ja/${slug}/"]`),
    ).toHaveCount(1);

    await page.goto(`/ja/${slug}/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/\S/);
    await expect(page.locator("main")).toContainText(/最終更新：.+（v\d/);
    await expect(page.locator(`#langDropdown a[href="/${slug}/"]`)).toHaveCount(
      1,
    );
  });

  test(`${slug} page lists its sections`, async ({ page }) => {
    await page.goto(`/${slug}/`);
    const toc = page.locator('main nav[aria-label="On this page"] a');
    expect(await toc.count()).toBeGreaterThan(2);
    for (const link of await toc.all()) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^#.+/);
      await expect(
        page.locator(`[id="${decodeURIComponent((href ?? "").slice(1))}"]`),
      ).toHaveCount(1);
    }
  });
}

test("guide keeps the anchors the app links to", async ({ page }) => {
  for (const path of ["/guide/", "/ja/guide/"]) {
    await page.goto(path);
    await expect(page.locator("#pawnio")).toHaveCount(1);
    await expect(page.locator("#smartctl")).toHaveCount(1);
  }
});

test("security page lists official sources and network connections", async ({
  page,
}) => {
  for (const path of ["/security/", "/ja/security/"]) {
    await page.goto(path);
    await expect(page.locator("#official-sources")).toHaveCount(1);
    await expect(page.locator("#network")).toHaveCount(1);
    const main = page.locator("main");
    await expect(main).toContainText(
      "winget install shm11C3.HardwareVisualizer",
    );
    await expect(main).toContainText("fonts.googleapis.com");
    await expect(
      main.locator('a[href*="/security/advisories/new"]'),
    ).toHaveAttribute("href", /github\.com\/shm11C3\/HardwareVisualizer/);
  }
});

test("comparison table has a column per tool and cites its sources", async ({
  page,
}) => {
  await page.goto("/compare/");
  const table = page.locator("main table").first();
  await expect(table.locator("thead th")).toHaveCount(7);
  await expect(table.locator("thead th").nth(1)).toHaveText(
    "HardwareVisualizer",
  );
  expect(await table.locator("tbody tr").count()).toBeGreaterThanOrEqual(10);
  await expect(page.locator("#sources")).toHaveCount(1);
  for (const host of [
    "learn.microsoft.com",
    "hwinfo.com",
    "cpuid.com",
    "github.com/LibreHardwareMonitor",
    "msi.com",
  ]) {
    expect(
      await page.locator(`main a[href*="${host}"]`).count(),
    ).toBeGreaterThan(0);
  }

  await page.goto("/ja/compare/");
  await expect(
    page.locator("main table").first().locator("thead th"),
  ).toHaveCount(7);
});

test("cooling insight page shows the screenshot for the active theme", async ({
  page,
}) => {
  await page.goto("/cooling-insight/");
  const visible = page.locator("main figure img:visible");
  await expect(visible).toHaveCount(1);
  await expect(visible).toHaveAttribute("alt", /\S/);
});
