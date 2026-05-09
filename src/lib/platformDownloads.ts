import type { ReleaseData } from "../funcs/fetchReleaseData";
import type { PlatformDownload } from "../types/platform";

export function createPlatformDownloads(
  release: ReleaseData,
  overrideDownloadHref?: string,
): PlatformDownload[] {
  const urlFor = (url: string | null | undefined) =>
    url ? (overrideDownloadHref ?? url) : null;

  return [
    {
      platform: "Windows",
      versions: [
        {
          type: "windows",
          name: "Windows 10/11 (x64)",
          url: urlFor(release.platforms.windows?.browser_download_url),
          size: release.platforms.windows?.size ?? "-",
        },
      ],
      primary: false,
    },
    {
      platform: "macOS",
      versions: [
        {
          type: "macOSAppleSilicon",
          name: "Apple Silicon (ARM64)",
          url: urlFor(
            release.platforms.macOSAppleSilicon?.browser_download_url,
          ),
          size: release.platforms.macOSAppleSilicon?.size ?? "-",
        },
        {
          type: "macOSIntel",
          name: "Intel (x64)",
          url: urlFor(release.platforms.macOSIntel?.browser_download_url),
          size: release.platforms.macOSIntel?.size ?? "-",
        },
      ],
      primary: false,
    },
    {
      platform: "Linux",
      versions: [
        {
          type: "linuxRPM",
          name: "RPM-based Distros (.rpm)",
          url: urlFor(release.platforms.linuxRPM?.browser_download_url),
          size: release.platforms.linuxRPM?.size ?? "-",
        },
        {
          type: "linuxAppImage",
          name: "AppImage (.AppImage)",
          url: urlFor(release.platforms.linuxAppImage?.browser_download_url),
          size: release.platforms.linuxAppImage?.size ?? "-",
        },
        {
          type: "linuxDeb",
          name: "Debian/Ubuntu (.deb)",
          url: urlFor(release.platforms.linuxDeb?.browser_download_url),
          size: release.platforms.linuxDeb?.size ?? "-",
        },
      ],
      primary: false,
    },
  ];
}
