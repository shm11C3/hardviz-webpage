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
  await expect(page.locator("header [data-nav-download]")).toHaveAttribute(
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

test("sections follow the page order", async ({ page }) => {
  await page.goto("/");
  const sectionOrder = await page
    .locator("#features, #platforms, #trust, #download, #feedback, #faq")
    .evaluateAll((sections) => sections.map((section) => section.id));

  expect(sectionOrder).toEqual([
    "features",
    "platforms",
    "trust",
    "download",
    "feedback",
    "faq",
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

test("the three screens are described on both localized pages", async ({
  page,
}) => {
  for (const [path, lang] of [
    ["/", "en"],
    ["/ja/", "ja"],
  ] as const) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    const section = page.locator("#features");
    await expect(section.locator("h2")).toHaveText(/\S/);
    for (const [id, rows] of [
      ["performance", 4],
      ["insights", 4],
      ["cooling-insight", 3],
    ] as const) {
      const screen = section.locator(`#${id}`);
      await expect(screen.locator("h3")).toHaveText(/\S/);
      await expect(screen.locator("dl > div")).toHaveCount(rows);
      await expect(screen.locator("img:visible")).toHaveCount(1);
    }
  }
});

test("Cooling Insight row links to its page", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator('#cooling-insight a[href="/cooling-insight/"]'),
  ).toBeVisible();

  await page.goto("/ja/");
  await expect(
    page.locator('#cooling-insight a[href="/ja/cooling-insight/"]'),
  ).toBeVisible();
});

test("platform matrix lists every feature for three operating systems", async ({
  page,
}) => {
  await page.goto("/");
  const matrix = page.locator("#platforms table");
  await expect(matrix.locator("thead th")).toHaveText([
    "Feature",
    "Windows",
    "macOS",
    "Linux",
  ]);
  await expect(matrix.locator("tbody tr")).toHaveCount(11);
  for (const cell of await matrix.locator("tbody td").all()) {
    await expect(cell).toHaveText(/\S/);
  }
  await expect(page.locator('#platforms a[href="/specs/"]')).toBeVisible();
  await expect(page.locator('#platforms a[href="/compare/"]')).toBeVisible();
});

test("trust section links each claim to its evidence", async ({ page }) => {
  await page.goto("/");
  const trust = page.locator("#trust");
  await expect(trust.locator("h3")).toHaveCount(4);
  await expect(
    trust.locator('a[href="/security/#official-sources"]'),
  ).toBeVisible();
  await expect(trust.locator('a[href="/verification/"]')).toBeVisible();
  await expect(trust.locator('a[href="/security/#network"]')).toBeVisible();
});

test("feedback section offers Discussions and the anonymous survey", async ({
  page,
}) => {
  await page.goto("/");
  const feedback = page.locator("#feedback");
  await expect(
    feedback.locator('a[href*="/discussions/"]').first(),
  ).toHaveAttribute("target", "_blank");
  await expect(feedback.locator('a[href="/survey/?source=web"]')).toBeVisible();

  await page.goto("/ja/");
  await expect(
    page.locator('#feedback a[href="/ja/survey/?source=web"]'),
  ).toBeVisible();
});

test("hero screenshots expose alternative text on both localized pages", async ({
  page,
}) => {
  for (const path of ["/", "/ja/"]) {
    await page.goto(path);
    await page.locator('[data-screenshot-tab="record"]').click();
    await expect(
      page.locator('#screen-panel[data-screenshot="record"] img'),
    ).toHaveAttribute("alt", /\S/);
  }
});

test("hero tabs switch the displayed application screenshot", async ({
  page,
}) => {
  await page.goto("/");
  const slot = page.locator("#hero #screen-panel");
  const images = page.locator("#hero figure img");
  await expect(slot).toHaveAttribute("data-screenshot", "live");
  await expect(images).toHaveCount(1);
  const initialSrc = await images.first().getAttribute("src");
  await expect(
    page.locator('#hero [data-screenshot-caption="live"]'),
  ).toBeVisible();

  const noticeTab = page.locator('[data-screenshot-tab="notice"]');
  await noticeTab.click();
  await expect(noticeTab).toHaveAttribute("aria-selected", "true");
  await expect(slot).toHaveAttribute("data-screenshot", "notice");
  await expect(images).toHaveCount(1);
  await expect(images.first()).toHaveAttribute("alt", /\S/);
  await expect(images.first()).not.toHaveAttribute("src", initialSrc ?? "");
  await expect(
    page.locator('#hero [data-screenshot-caption="notice"]'),
  ).toBeVisible();
  await expect(
    page.locator('#hero [data-screenshot-caption="live"]'),
  ).toBeHidden();

  await noticeTab.press("ArrowLeft");
  await expect(page.locator('[data-screenshot-tab="record"]')).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(slot).toHaveAttribute("data-screenshot", "record");
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
