import { expect, test } from "@playwright/test";

test("download page exposes parallel navigation and sections", async ({
  page,
}) => {
  await page.goto("/download/");

  const guideNav = page.locator("nav[data-download-guide-nav]");

  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('main a[href="/changelog/"]')).toBeVisible();
  await expect(page.locator("#download h2")).toBeVisible();
  await expect(page.locator("#download h3").nth(0)).toBeVisible();
  await expect(page.locator("#download h3").nth(1)).toBeVisible();
  await expect(page.locator("#installation")).toBeVisible();
  await expect(guideNav.locator('a[href="/download/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(guideNav.locator('a[href="/download/#download"]')).toBeVisible();
  await expect(
    guideNav.locator('a[href="/download/#installation"]'),
  ).toBeVisible();
  await expect(guideNav.locator('a[href="/verification/"]')).toBeVisible();
  await expect(
    page.locator('#installation a[href="/verification/"]'),
  ).toBeVisible();
});

test("download page exposes installer links", async ({ page }) => {
  await page.goto("/download/");

  await expect(
    page.locator('a[href="https://example.com/fake/windows-installer.msi"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://example.com/fake/linux.AppImage"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://example.com/fake/macos-aarch64.dmg"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://example.com/fake/macos-x64.dmg"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://example.com/fake/linux.rpm"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://example.com/fake/linux.deb"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      '#download a[href="https://github.com/shm11C3/HardwareVisualizer/releases/latest"]',
    ),
  ).toHaveCount(0);
});

test("download page exposes copyable per-asset SHA-256 values", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => undefined,
      },
    });
  });
  await page.goto("/download/");

  const checksumSections = page.locator("#download [data-download-checksum]");

  await expect(checksumSections).toHaveCount(6);

  const windows = page.locator('[data-download-checksum="windows"]');
  await expect(windows).not.toHaveAttribute("open", "");
  await expect(windows.locator("summary")).toContainText("Checksum (SHA-256)");
  await expect(windows.locator("summary")).not.toContainText(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  const copyButton = windows.getByRole("button", { name: "Copy SHA-256" });
  await expect(copyButton).toBeVisible();
  await copyButton.hover();
  await expect(windows.locator("[data-copy-tooltip]")).toBeVisible();
  await copyButton.click();
  await expect(windows).not.toHaveAttribute("open", "");
  await expect(windows.getByRole("button", { name: "Copied" })).toBeVisible();
  await windows.locator("summary").click({ position: { x: 10, y: 10 } });
  await expect(windows).toHaveAttribute("open", "");
  await expect(windows).toContainText(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  await expect(
    page.locator("#download [data-download-verification-link]"),
  ).toHaveCount(0);
  await expect(page.locator("#download")).not.toContainText(
    "Learn how verification works",
  );

  await expect(page.locator("#download")).not.toContainText("Get-FileHash");
  await expect(page.locator("#download")).not.toContainText(
    "gh attestation verify",
  );
});

test("download page warns when SHA-256 is unavailable", async ({ page }) => {
  await page.goto("/download/");

  const deb = page.locator('[data-download-checksum="linuxDeb"]');

  await deb.locator("summary").click();
  await expect(deb.locator("[data-checksum-warning]")).toContainText(
    "Checksum unavailable",
  );
});

test("JA download page keeps localized parallel navigation", async ({
  page,
}) => {
  await page.goto("/ja/download/");

  const guideNav = page.locator("nav[data-download-guide-nav]");

  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.locator('main a[href="/ja/changelog/"]')).toBeVisible();
  await expect(page.locator("#download")).toBeVisible();
  await expect(page.locator("#installation")).toBeVisible();
  await expect(guideNav.locator('a[href="/ja/download/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    guideNav.locator('a[href="/ja/download/#download"]'),
  ).toBeVisible();
  await expect(
    guideNav.locator('a[href="/ja/download/#installation"]'),
  ).toBeVisible();
  await expect(guideNav.locator('a[href="/ja/verification/"]')).toBeVisible();
  await expect(
    page.locator('#installation a[href="/ja/verification/"]'),
  ).toBeVisible();
});

test("JA download page localizes checksum labels without command details", async ({
  page,
}) => {
  await page.goto("/ja/download/");

  const windows = page.locator('[data-download-checksum="windows"]');

  await expect(windows.locator("summary")).toContainText(
    "チェックサム (SHA-256)",
  );
  await expect(windows.locator("summary")).not.toContainText(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  await expect(
    windows.getByRole("button", { name: "SHA-256をコピー" }),
  ).toBeVisible();
  await windows.locator("summary").click();
  await expect(
    page.locator("#download [data-download-verification-link]"),
  ).toHaveCount(0);
  await expect(page.locator("#download")).not.toContainText(
    "検証方法の詳細を見る",
  );
  await expect(page.locator("#download")).not.toContainText("Get-FileHash");
  await expect(page.locator("#download")).not.toContainText(
    "gh attestation verify",
  );
});

test("verification page exposes official resource links", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          window.localStorage.setItem("copied-code", text);
        },
      },
    });
  });
  await page.goto("/verification/");

  await expect(page.locator("main > section#verification")).toBeVisible();
  await expect(page.locator("[data-verification-info]")).toContainText("Info");
  await expect(page.locator("[data-verification-info]")).toContainText(
    "you do not need to force this step",
  );
  await expect(page.locator("#latest-commands")).toContainText(
    "Latest release verification commands (Advanced)",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "run the matching checksum command from the latest release verification commands",
  );
  await expect(
    page.locator('main > section#verification a[href="#latest-commands"]'),
  ).toBeVisible();
  await expect(page.locator("main > section#verification")).toContainText(
    "Get-FileHash",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "shasum -a 256",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "sha256sum",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "gh attestation verify",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "Authenticode signing pending",
  );
  await expect(page.locator("#latest-commands")).not.toContainText(
    "winget install",
  );
  await expect(page.locator("#latest-commands")).not.toContainText(
    "View GitHub Release",
  );
  const latestCommands = page.locator(
    'section[aria-labelledby="latest-commands"]',
  );
  const copyCodeButtons = latestCommands.locator("[data-copy-code-button]");
  await expect(copyCodeButtons.first()).toBeVisible();
  const verificationCommandCopyButton = copyCodeButtons.nth(1);
  await expect(verificationCommandCopyButton).toHaveAttribute(
    "aria-label",
    "Copy code",
  );
  await verificationCommandCopyButton.click();
  await expect(verificationCommandCopyButton).toHaveAttribute(
    "aria-label",
    "Copied",
  );
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("copied-code")))
    .toContain("Get-FileHash");
  await expect(
    page.locator(
      'a[href="https://github.com/shm11C3/HardwareVisualizer/releases"]',
    ),
  ).toBeVisible();
  await expect(page.locator('a[href*="CODE_SIGNING_POLICY.md"]')).toBeVisible();
  await expect(
    page.locator('a[href*="docs/download-verification.md"]').first(),
  ).toBeVisible();
  await expect(page.locator('a[href*="/security/policy"]')).toBeVisible();
  const guideNav = page.locator("nav[data-download-guide-nav]");
  await expect(guideNav.locator('a[href="/download/"]')).toBeVisible();
  await expect(guideNav.locator('a[href="/verification/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("JA verification page keeps localized route structure", async ({
  page,
}) => {
  await page.goto("/ja/verification/");

  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.locator("main > section#verification")).toBeVisible();
  await expect(page.locator("[data-verification-info]")).toContainText("Info");
  await expect(page.locator("[data-verification-info]")).toContainText(
    "この手順を無理に実行する必要はありません",
  );
  await expect(page.locator("#latest-commands")).toContainText(
    "最新リリースの検証コマンド（上級者向け）",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "最新リリースの検証コマンド",
  );
  await expect(
    page.locator('main > section#verification a[href="#latest-commands"]'),
  ).toBeVisible();
  await expect(page.locator("main > section#verification")).toContainText(
    "Get-FileHash",
  );
  await expect(page.locator("main > section#verification")).toContainText(
    "gh attestation verify",
  );
  await expect(page.locator("#latest-commands")).not.toContainText(
    "GitHub Releaseを見る",
  );
  await expect(
    page
      .locator('section[aria-labelledby="latest-commands"]')
      .locator("[data-copy-code-button]")
      .first(),
  ).toHaveAttribute("aria-label", "コードをコピー");
  await expect(
    page.locator('a[href*="docs/download-verification.ja.md"]').first(),
  ).toBeVisible();
  const guideNav = page.locator("nav[data-download-guide-nav]");
  await expect(guideNav.locator('a[href="/ja/download/"]')).toBeVisible();
  await expect(guideNav.locator('a[href="/ja/verification/"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
});
