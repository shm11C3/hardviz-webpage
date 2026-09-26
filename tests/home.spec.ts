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
}: {
  download: Locator;
  changelogHref: string;
}) {
  const releaseNotes = download.locator("[data-release-notes]");
  await expect(releaseNotes).toBeVisible();
  await expect(releaseNotes).toHaveAttribute(
    "data-release-notes-version",
    expectedHomeReleaseNotesVersion,
  );

  const summary = releaseNotes.locator("[data-release-notes-summary]");
  const highlights = releaseNotes.locator("[data-release-notes-highlights] li");
  const tags = releaseNotes.locator("[data-release-notes-tag]");
  const summaryCount = await summary.count();
  const highlightCount = await highlights.count();
  const tagCount = await tags.count();

  expect(summaryCount + highlightCount + tagCount).toBeGreaterThan(0);
  if (summaryCount > 0) {
    await expect(summary).toHaveText(/\S/);
  }
  for (let i = 0; i < highlightCount; i++) {
    await expect(highlights.nth(i)).toHaveText(/\S/);
  }
  for (let i = 0; i < tagCount; i++) {
    await expect(tags.nth(i)).toHaveText(/\S/);
  }

  await expect(
    releaseNotes.locator(`a[href="${changelogHref}"]`),
  ).toBeVisible();
}

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(
    page.locator("#hero").getByRole("heading", { level: 1 }),
  ).toHaveText(/\S/);
});

test("download links point to download page on FAQ pages", async ({ page }) => {
  await page.goto("/faq/");
  await expect(page.locator('header a[href="/download/"]')).toHaveAttribute(
    "href",
    "/download/",
  );

  await page.goto("/ja/faq/");
  await expect(page.locator('footer a[href="/ja/download/"]')).toHaveAttribute(
    "href",
    "/ja/download/",
  );
});

test("JA home page loads", async ({ page }) => {
  await page.goto("/ja/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(
    page.locator("#hero").getByRole("heading", { level: 1 }),
  ).toHaveText(/\S/);
});

test("home page has all major sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#features")).toBeVisible();
  await expect(page.locator("#download")).toBeVisible();
  await expect(page.locator("#faq")).toBeVisible();
});

test("history value appears before live features and customization", async ({
  page,
}) => {
  await page.goto("/");
  const sectionOrder = await page
    .locator("#insights, #features, #customization, #download")
    .evaluateAll((sections) => sections.map((section) => section.id));

  expect(sectionOrder).toEqual([
    "insights",
    "features",
    "customization",
    "download",
  ]);
});

test("hero structure and download destination follow the page language", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator("#hero");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(/\S/);
  await expect(hero.locator('a[href="/download/"]')).toBeVisible();

  await page.goto("/ja/");
  const jaHero = page.locator("#hero");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(jaHero.getByRole("heading", { level: 1 })).toHaveText(/\S/);
  await expect(jaHero.locator('a[href="/ja/download/"]')).toBeVisible();
});

test("Insights section renders its card headings on both localized pages", async ({
  page,
}) => {
  await page.goto("/");
  const insightHeadings = page.locator("#insights h3");
  await expect(insightHeadings).toHaveCount(4);
  for (let i = 0; i < (await insightHeadings.count()); i++) {
    await expect(insightHeadings.nth(i)).toHaveText(/\S/);
  }

  await page.goto("/ja/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  const jaInsightHeadings = page.locator("#insights h3");
  await expect(jaInsightHeadings).toHaveCount(4);
  for (let i = 0; i < (await jaInsightHeadings.count()); i++) {
    await expect(jaInsightHeadings.nth(i)).toHaveText(/\S/);
  }
});

test("Insights screenshots expose alternative text on both localized pages", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".swiper-container").scrollIntoViewIfNeeded();
  await expect(
    page.locator('.screenshot-slot[data-screenshot="slide-2"] img'),
  ).toHaveAttribute("alt", /\S/);

  await page.goto("/ja/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await page.locator(".swiper-container").scrollIntoViewIfNeeded();
  await expect(
    page.locator('.screenshot-slot[data-screenshot="slide-2"] img'),
  ).toHaveAttribute("alt", /\S/);
});

test("landing download navigation is measured after analytics consent", async ({
  page,
}) => {
  await page.goto("/");
  const pendingEvent = await page.evaluate(() => {
    const analyticsWindow = window as typeof window & {
      __analyticsLoaded: boolean;
    };
    analyticsWindow.__analyticsLoaded = true;

    const heroDownload = document.querySelector<HTMLAnchorElement>(
      '#hero a[href="/download/"]',
    );
    if (!heroDownload) throw new Error("Hero download link not found");
    heroDownload.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
    heroDownload.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );

    return sessionStorage.getItem("landing-download-click");
  });
  expect(JSON.parse(pendingEvent ?? "null")).toEqual({
    cta_location: "hero",
    page_language: "en",
  });

  await page.goto("/download/");
  const events = await page.evaluate(() => {
    const analyticsWindow = window as typeof window & {
      __analyticsLoaded: boolean;
      __gtagEvents: unknown[][];
      gtag: (...args: unknown[]) => void;
    };
    analyticsWindow.__analyticsLoaded = true;
    analyticsWindow.__gtagEvents = [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.__gtagEvents.push(args);
    };
    window.dispatchEvent(new CustomEvent("analytics:loaded"));

    return analyticsWindow.__gtagEvents;
  });
  expect(events).toContainEqual([
    "event",
    "landing_download_click",
    { cta_location: "hero", page_language: "en" },
  ]);
  expect(
    await page.evaluate(() => sessionStorage.getItem("landing-download-click")),
  ).toBeNull();
});

test("hero loads only the screenshot for the active theme", async ({
  page,
}) => {
  await page.goto("/");
  const heroImages = page.locator("#hero figure img");
  await expect(heroImages).toHaveCount(1);

  const initialSrc = await heroImages.first().getAttribute("src");
  expect(initialSrc).toBeTruthy();

  await page.locator("#themeToggle").click();
  await expect(heroImages).toHaveCount(1);
  await expect(heroImages.first()).toHaveAttribute("src", /.+/);
  await expect(heroImages.first()).not.toHaveAttribute("src", initialSrc ?? "");
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
  });

  await page.goto("/ja/");
  const jaDownload = page.locator("#download");
  await expect(jaDownload).toContainText("2026年1月2日");
  await expectReleaseNotesCard({
    download: jaDownload,
    changelogHref: "/ja/changelog/",
  });
});

test("FAQ preview shows 3 items", async ({ page }) => {
  await page.goto("/");
  const faqItems = page.locator("#faq details");
  await expect(faqItems).toHaveCount(3);
});

test("FAQ preview links to the localized FAQ pages", async ({ page }) => {
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
