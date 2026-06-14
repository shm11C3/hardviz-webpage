import { expect, test } from "@playwright/test";

test("survey page loads with heading and privacy note", async ({ page }) => {
  await page.goto("/survey/");
  await expect(page).toHaveTitle(/Survey/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Help shape HardwareVisualizer",
  );
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
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HardwareVisualizer",
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
