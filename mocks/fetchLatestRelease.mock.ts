import type { ReleaseData } from "../src/funcs/fetchReleaseData";

const publishedAt = "2026-01-02T03:04:00Z";
const releaseUrl =
  "https://github.com/shm11C3/HardwareVisualizer/releases/tag/v1.7.2";

export const mockReleaseData: ReleaseData = {
  version: "1.7.2",
  published_at: publishedAt,
  platforms: {
    windows: {
      url: "https://example.com/fake/windows-installer.msi",
      size: "55.1 MB",
      name: "HardwareVisualizer_1.7.2_x64_en-US.msi",
      browser_download_url: "https://example.com/fake/windows-installer.msi",
      updated_at: publishedAt,
      digest:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      sha256:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      release_url: releaseUrl,
      signature_name: "HardwareVisualizer_1.7.2_x64_en-US.msi.sig",
      signature_url: "https://example.com/fake/windows-installer.msi.sig",
    },
    macOSAppleSilicon: {
      url: "https://example.com/fake/macos-aarch64.dmg",
      size: "63.5 MB",
      name: "HardwareVisualizer_1.7.2_aarch64.dmg",
      browser_download_url: "https://example.com/fake/macos-aarch64.dmg",
      updated_at: publishedAt,
      digest:
        "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      sha256:
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      release_url: releaseUrl,
    },
    macOSIntel: {
      url: "https://example.com/fake/macos-x64.dmg",
      size: "64.1 MB",
      name: "HardwareVisualizer_1.7.2_x64.dmg",
      browser_download_url: "https://example.com/fake/macos-x64.dmg",
      updated_at: publishedAt,
      digest:
        "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      sha256:
        "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      release_url: releaseUrl,
    },
    linuxAppImage: {
      url: "https://example.com/fake/linux.AppImage",
      size: "60.2 MB",
      name: "HardwareVisualizer_1.7.2_amd64.AppImage",
      browser_download_url: "https://example.com/fake/linux.AppImage",
      updated_at: publishedAt,
      digest:
        "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      sha256:
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      release_url: releaseUrl,
    },
    linuxRPM: {
      url: "https://example.com/fake/linux.rpm",
      size: "50.3 MB",
      name: "HardwareVisualizer-1.7.2-1.x86_64.rpm",
      browser_download_url: "https://example.com/fake/linux.rpm",
      updated_at: publishedAt,
      digest:
        "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      sha256:
        "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      release_url: releaseUrl,
    },
    linuxDeb: {
      url: "https://example.com/fake/linux.deb",
      size: "51.8 MB",
      name: "hardwarevisualizer_1.7.2_amd64.deb",
      browser_download_url: "https://example.com/fake/linux.deb",
      updated_at: publishedAt,
      digest: null,
      sha256: null,
      release_url: releaseUrl,
    },
  },
};

export function fetchLatestReleaseMock(): Promise<ReleaseData> {
  return Promise.resolve(mockReleaseData);
}
