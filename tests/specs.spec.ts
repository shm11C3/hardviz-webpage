import { expect, test } from "@playwright/test";

test("specs page loads with correct title", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page).toHaveTitle(/System Requirements/);
});

test("h1 contains System Requirements & Limitations", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "System Requirements & Limitations",
  );
});

test("OS table visible with Windows 10/11", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page.locator("table").first()).toBeVisible();
  await expect(page.locator("table").first()).toContainText("Windows 10/11");
});

test("hardware section with Supported CPU/GPU heading", async ({ page }) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", { name: /Supported CPU\/GPU/ }),
  ).toBeVisible();
});

test("languages table contains English, 日本語, and Русский", async ({
  page,
}) => {
  await page.goto("/specs/");
  const languagesTable = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", { name: "Supported Languages" }),
    })
    .locator("table");
  await expect(languagesTable).toContainText("English");
  await expect(languagesTable).toContainText("日本語");
  await expect(languagesTable).toContainText("Русский (Russian)");

  await page.goto("/ja/specs/");
  const jaLanguagesTable = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "対応言語" }) })
    .locator("table");
  await expect(jaLanguagesTable).toContainText("Русский (ロシア語)");
});

test("limitations section with 4 list items", async ({ page }) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", { name: /Known Limitations/ }),
  ).toBeVisible();
  const limitations = page.locator(
    "h2:has-text('Known Limitations') ~ ul > li, h2:has-text('Known Limitations') + * li",
  );
  expect(await limitations.count()).toBeGreaterThanOrEqual(4);
});

test("JA specs page has translated h1", async ({ page }) => {
  await page.goto("/ja/specs/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "システム要件と制限事項",
  );
});
