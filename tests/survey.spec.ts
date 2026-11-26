import { expect, test } from "@playwright/test";

test("survey page loads with heading and privacy note", async ({ page }) => {
  await page.goto("/survey/");
  await expect(page).toHaveTitle(/Survey/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Survey");
  // Inline privacy note links to the privacy policy.
  await expect(page.locator('main a[href="/privacy/"]')).toBeVisible();
  // Either the embedded form (once a Tally form ID is configured) or the
  // "preparing" placeholder is rendered.
  // Either the configured iframe or the "preparing" fallback is shown; `.or()`
  // resolves at assertion time so there's no stale-count race.
  const frame = page.locator("iframe#survey-frame");
  const preparing = page.getByText("being prepared");
  await expect(frame.or(preparing)).toBeVisible();
});

test("JA survey page loads and links to JA privacy policy", async ({
  page,
}) => {
  await page.goto("/ja/survey/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "アンケート",
  );
  await expect(page.locator('main a[href="/ja/privacy/"]')).toBeVisible();
});

test("footer links to the survey with source=web", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator('footer a[href="/survey/?source=web"]'),
  ).toBeVisible();

  await page.goto("/ja/");
  await expect(
    page.locator('footer a[href="/ja/survey/?source=web"]'),
  ).toBeVisible();
});

test("about page invites feedback and links to the survey", async ({
  page,
}) => {
  await page.goto("/about/");
  const cta = page.getByRole("link", { name: "Answer the survey" });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/survey/?source=web");
});

test("changelog entries link to the survey with the release they describe", async ({
  page,
}) => {
  await page.goto("/changelog/1.12.0/");
  await expect(
    page.getByRole("link", { name: "Answer the survey" }),
  ).toHaveAttribute(
    "href",
    "/survey/?source=web&utm_source=changelog&utm_content=1.12.0",
  );

  await page.goto("/ja/changelog/1.12.0/");
  await expect(
    page.getByRole("link", { name: "アンケートに回答する" }),
  ).toHaveAttribute(
    "href",
    "/ja/survey/?source=web&utm_source=changelog&utm_content=1.12.0",
  );
});

test("release articles link to the survey with their release", async ({
  page,
}) => {
  await page.goto("/releases/cooling-insight/");
  await expect(
    page.getByRole("link", { name: "Answer the survey" }),
  ).toHaveAttribute(
    "href",
    "/survey/?source=web&utm_source=release&utm_content=1.11.0",
  );
});

test("the link under the form opens it on Tally with the same context", async ({
  page,
}) => {
  await page.goto("/survey/?source=app&app_version=1.12.1&os=windows");
  const link = page.getByRole("link", { name: "Open it on Tally" });
  await expect(link).toHaveAttribute(
    "href",
    /^https:\/\/tally\.so\/r\/\w+\?.*source=app/,
  );
  const href = new URL((await link.getAttribute("href")) ?? "");
  expect(href.searchParams.get("app_version")).toBe("1.12.1");
  expect(href.searchParams.get("os")).toBe("windows");
  expect(href.searchParams.get("locale")).toBe("en");
});
