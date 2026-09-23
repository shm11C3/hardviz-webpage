import { expect, test } from "@playwright/test";

test("specs page loads with correct title", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page).toHaveTitle(/Compatibility Notes/);
});

test("h1 presents the compatibility reference", async ({ page }) => {
  await page.goto("/specs/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HardwareVisualizer compatibility notes",
  );
});

test("section navigation exposes the reference structure", async ({ page }) => {
  await page.goto("/specs/");
  const nav = page.getByRole("navigation", {
    name: "Compatibility page sections",
  });
  await expect(nav).toContainText("Operating systems");
  await expect(nav).toContainText("Appearance");
  await expect(nav).toContainText("Storage Health");
  await expect(nav).toContainText("Privacy and verification");
});

test("overview summarizes install-relevant product traits", async ({
  page,
}) => {
  await page.goto("/specs/");
  await expect(page.getByText("Official distribution")).toBeVisible();
  await expect(page.getByText("Historical insight")).toBeVisible();
  await expect(page.getByText("No outbound telemetry")).toBeVisible();
});

test("compatibility tables show OS and hardware coverage", async ({ page }) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", { name: "Operating systems and installers" }),
  ).toBeVisible();
  await expect(page.locator("table").first()).toContainText("Windows 10/11");
  const operatingSystemsTable = page.locator("table").first();
  await expect(operatingSystemsTable).toContainText("macOS (Apple Silicon)");
  await expect(operatingSystemsTable).toContainText("macOS (Intel)");
  await expect(operatingSystemsTable).toContainText("Experimental");
  const signalsTable = page.getByTestId("signals-table");
  await expect(signalsTable).toContainText("Signal / feature");
  await expect(signalsTable).toContainText("Windows");
  await expect(signalsTable).toContainText("macOS");
  await expect(signalsTable).toContainText("Linux");
  await expect(signalsTable).toContainText("Storage Health");
  await expect(signalsTable).toContainText("Fan");
  await expect(signalsTable).toContainText("English, Japanese, Russian");
});

test("appearance section lists visual customization options", async ({
  page,
}) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", { name: "Appearance and customization" }),
  ).toBeVisible();
  await expect(page.getByText("Dark+", { exact: false })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Transparent UI" }),
  ).toBeVisible();
  await expect(page.getByText("CPU, GPU, and GPU temperature")).toBeVisible();
});

test("optional component section explains Storage Health extensions", async ({
  page,
}) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", {
      name: "Storage Health and optional components",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "PawnIO for CPU package temperature" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "smartctl for richer storage signals" }),
  ).toBeVisible();
});

test("download and verification calls to action are available", async ({
  page,
}) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("link", { name: "Download from official sources" }),
  ).toHaveAttribute("href", "/download/");
  await expect(
    page.getByRole("link", { name: "Verify release files" }),
  ).toHaveAttribute("href", "/verification/");
});

test("privacy and verification section includes trust checks", async ({
  page,
}) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("heading", {
      name: "Privacy and download verification",
    }),
  ).toBeVisible();
  await expect(page.getByText("SHA-256 checksums")).toBeVisible();
  await expect(page.getByText("Authenticode signed")).toBeVisible();
});

test("references official source links", async ({ page }) => {
  await page.goto("/specs/");
  await expect(
    page.getByRole("link", { name: /GitHub README/ }),
  ).toHaveAttribute(
    "href",
    /github\.com\/shm11C3\/HardwareVisualizer\/blob\/develop\/README\.md/,
  );
  await expect(
    page.getByRole("link", { name: /Development story/ }),
  ).toHaveAttribute(
    "href",
    /zenn\.dev\/shm_7ec\/articles\/hardwarevisualizer-dev-story/,
  );
  await expect(
    page.getByRole("link", { name: /Optional components/ }),
  ).toHaveAttribute(
    "href",
    /github\.com\/shm11C3\/HardwareVisualizer\/blob\/develop\/docs\/user\/external-components\.md/,
  );
});

test("JA specs page has translated h1 and CTA", async ({ page }) => {
  await page.goto("/ja/specs/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "対応環境ノート",
  );
  await expect(
    page.getByRole("link", { name: "公式導線からダウンロード" }),
  ).toHaveAttribute("href", "/ja/download/");
  const operatingSystemsTable = page.locator("table").first();
  await expect(operatingSystemsTable).toContainText("macOS（Apple Silicon）");
  await expect(operatingSystemsTable).toContainText("macOS（Intel）");
  await expect(operatingSystemsTable).toContainText("実験的");
  await expect(
    page.getByRole("heading", { name: "見た目とカスタマイズ" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "カラーテーマ" }),
  ).toBeVisible();
  await expect(page.getByText("外部テレメトリはありません")).toBeVisible();
});

test("JA specs page uses readable mobile cards for compatibility data", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/ja/specs/");
  await expect(page.getByTestId("signals-table-mobile")).toBeVisible();
  await expect(page.getByTestId("signals-table-mobile")).toContainText(
    "ストレージの状態",
  );
  await expect(page.getByTestId("signals-table-mobile")).toContainText(
    "Windows",
  );
  await expect(page.getByTestId("signals-table-mobile")).toContainText("macOS");
  await expect(page.getByTestId("signals-table-mobile")).toContainText("Linux");
});

test("specs page supports dark mode surfaces", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
  });
  await page.goto("/specs/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  const main = page.locator("#main-content");
  const darkBackground = await main.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  const darkCardBackground = await page
    .locator(".specs-card")
    .first()
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  await page
    .locator("html")
    .evaluate((element) => element.classList.remove("dark"));
  const lightBackground = await main.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  const lightCardBackground = await page
    .locator(".specs-card")
    .first()
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(darkBackground).not.toBe(lightBackground);
  expect(darkCardBackground).not.toBe(lightCardBackground);
});
