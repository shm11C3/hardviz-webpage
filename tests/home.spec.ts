import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/HardwareVisualizer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Monitor Your Hardware",
  );
});

test("download links point to home anchors on FAQ pages", async ({ page }) => {
  await page.goto("/faq/");
  await expect(
    page.locator("header a", { hasText: "Download" }),
  ).toHaveAttribute("href", "/#download");

  await page.goto("/ja/faq/");
  await expect(
    page.locator("footer a", { hasText: "ダウンロード" }),
  ).toHaveAttribute("href", "/ja/#download");
});
