import { expect, type Locator, test } from "@playwright/test";
import { mockReleaseData } from "../mocks/fetchLatestRelease.mock";
import { homeReleaseNotesVersion } from "../src/config/releaseNotes";

function normalizeVersion(version: string | null): string | null {
  const normalized = version?.trim().replace(/^v/i, "");
  return normalized || null;
}

const expectedHomeReleaseNotesVersion =
  normalizeVersion(homeReleaseNotesVersion) ?? mockReleaseData.version;

async function expectReleaseNotesCard({
  download,
  changelogHref,
  linkName,
}: {
  download: Locator;
  changelogHref: string;
  linkName: string;
}) {
  const releaseNotes = download.locator("[data-release-notes]");
  await expect(releaseNotes).toBeVisible();
  await expect(releaseNotes).toHaveAttribute(
    "data-release-notes-version",
    expectedHomeReleaseNotesVersion,
  );

  const summary = releaseNotes.locator("[data-release-notes-summary]");
  const tags = releaseNotes.locator("[data-release-notes-tag]");
  const summaryCount = await summary.count();
  const tagCount = await tags.count();

  expect(summaryCount + tagCount).toBeGreaterThan(0);
  if (summaryCount > 0) {
    await expect(summary).toHaveText(/\S/);
  }
  if (tagCount > 0) {
    await expect(tags.first()).toHaveText(/\S/);
  }

  await expect(
    releaseNotes.getByRole("link", { name: linkName }),
  ).toHaveAttribute("href", changelogHref);
}

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Monitor Your Hardware",
  );
});

test("download links point to download page on FAQ pages", async ({ page }) => {
  await page.goto("/faq/");
  await expect(
    page.locator("header a", { hasText: "Download" }),
  ).toHaveAttribute("href", "/download/");

  await page.goto("/ja/faq/");
  await expect(
    page.locator("footer a", { hasText: "ダウンロード" }),
  ).toHaveAttribute("href", "/ja/download/");
});

test("JA home page loads", async ({ page }) => {
  await page.goto("/ja/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Monitor",
  );
});

test("home page has all major sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#features")).toBeVisible();
  await expect(page.locator("#download")).toBeVisible();
  await expect(page.locator("#faq")).toBeVisible();
});

test("hero has download and GitHub buttons", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="/download/"]').first()).toBeVisible();
  const githubLink = page
    .locator('a[href*="github.com/shm11C3/HardwareVisualizer"]')
    .first();
  await expect(githubLink).toHaveAttribute("target", "_blank");
});

test("download section renders platform cards", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#download h3");
  const headings = page.locator("#download h3");
  await expect(headings).toHaveCount(3);
  await expect(headings.nth(0)).toContainText("Windows");
  await expect(headings.nth(1)).toContainText("macOS");
  await expect(headings.nth(2)).toContainText("Linux");
});

test("home download section links to dedicated download page", async ({
  page,
}) => {
  await page.goto("/");
  const download = page.locator("#download");

  await expect(
    download.locator('[aria-labelledby="download-authenticity-title"]'),
  ).toHaveCount(0);
  expect(
    await download.locator('a[href="/download/"]').count(),
  ).toBeGreaterThan(0);
  await expect(
    download.locator('a[href="/download/#installation"]'),
  ).toBeVisible();

  await page.goto("/ja/");
  const jaDownload = page.locator("#download");
  await expect(
    jaDownload.locator('[aria-labelledby="download-authenticity-title"]'),
  ).toHaveCount(0);
  expect(
    await jaDownload.locator('a[href="/ja/download/"]').count(),
  ).toBeGreaterThan(0);
  await expect(
    jaDownload.locator('a[href="/ja/download/#installation"]'),
  ).toBeVisible();
});

test("download section shows mock version", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#download");
  await expect(page.locator("#download")).toContainText("v1.7.2");
});

test("download section shows release date and selected release notes", async ({
  page,
}) => {
  await page.goto("/");
  const download = page.locator("#download");
  await expect(download).toContainText("Released:");
  await expect(download).toContainText("Jan 2, 2026");
  await expect(download).toContainText("Release highlights");
  await expectReleaseNotesCard({
    download,
    changelogHref: "/changelog/",
    linkName: "Read full changelog →",
  });

  await page.goto("/ja/");
  const jaDownload = page.locator("#download");
  await expect(jaDownload).toContainText("リリース日時:");
  await expect(jaDownload).toContainText("2026年1月2日");
  await expect(jaDownload).toContainText("リリースハイライト");
  await expectReleaseNotesCard({
    download: jaDownload,
    changelogHref: "/ja/changelog/",
    linkName: "変更履歴を詳しく見る →",
  });
});

test("FAQ preview shows 3 items", async ({ page }) => {
  await page.goto("/");
  const faqItems = page.locator("#faq details");
  await expect(faqItems).toHaveCount(3);
});

test("FAQ preview has 'View all FAQs' link", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#faq a[href="/faq/"]')).toBeVisible();

  await page.goto("/ja/");
  await expect(page.locator('#faq a[href="/ja/faq/"]')).toBeVisible();
});

test("features section shows 6 cards", async ({ page }) => {
  await page.goto("/");
  const featureCards = page.locator("#features h3");
  await expect(featureCards).toHaveCount(6);
});
