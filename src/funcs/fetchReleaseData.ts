import { fetchLatestReleaseMock } from "../../mocks/fetchLatestRelease.mock";
import type { GitHubRelease } from "../types/github";
import type { Platform } from "../types/platform";

export interface ReleaseData {
  version: string;
  platforms: {
    [K in Platform]?: {
      url: string;
      size: string;
      name: string;
      browser_download_url: string;
      updated_at: string;
    };
  };
}

export function fetchLatestRelease(): Promise<ReleaseData> {
  if (!process.env.PRODUCTION) {
    return fetchLatestReleaseMock();
  }

  return fetch(
    "https://api.github.com/repos/shm11C3/HardwareVisualizer/releases/latest",
    {
      headers: {
        "User-Agent": "hardviz-webpage (Astro SSG)",
        Accept: "application/vnd.github+json",
      },
    },
  )
    .then((res) => {
      console.log("fetchLatestRelease", res);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((data: GitHubRelease) => {
      const platforms = (data.assets || []).reduce(
        (
          acc: ReleaseData["platforms"],
          asset: { name: string; browser_download_url: string; size?: number },
        ) => {
          if (
            /.msi/.test(asset.name) &&
            !/offline/.test(asset.name) &&
            !/.sig/.test(asset.name)
          ) {
            acc.windows = {
              url: asset.browser_download_url,
              size: asset.size
                ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                : "-",
              name: asset.name,
              browser_download_url: asset.browser_download_url,
              updated_at: data.published_at,
            };
          } else if (/.rpm/.test(asset.name) && !/.sig/.test(asset.name)) {
            acc.linuxRPM = {
              url: asset.browser_download_url,
              size: asset.size
                ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                : "-",
              name: asset.name,
              browser_download_url: asset.browser_download_url,
              updated_at: data.published_at,
            };
          } else if (/.AppImage/.test(asset.name) && !/.sig/.test(asset.name)) {
            acc.linuxAppImage = {
              url: asset.browser_download_url,
              size: asset.size
                ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                : "-",
              name: asset.name,
              browser_download_url: asset.browser_download_url,
              updated_at: data.published_at,
            };
          } else if (/.deb/.test(asset.name) && !/.sig/.test(asset.name)) {
            acc.linuxDeb = {
              url: asset.browser_download_url,
              size: asset.size
                ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                : "-",
              name: asset.name,
              browser_download_url: asset.browser_download_url,
              updated_at: data.published_at,
            };
          } else if (/.dmg/.test(asset.name) && !/.sig/.test(asset.name)) {
            if (/arm64|aarch64/i.test(asset.name)) {
              acc.macOSAppleSilicon = {
                url: asset.browser_download_url,
                size: asset.size
                  ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                  : "-",
                name: asset.name,
                browser_download_url: asset.browser_download_url,
                updated_at: data.published_at,
              };
            } else if (/x64|x86.?64|intel/i.test(asset.name)) {
              acc.macOSIntel = {
                url: asset.browser_download_url,
                size: asset.size
                  ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                  : "-",
                name: asset.name,
                browser_download_url: asset.browser_download_url,
                updated_at: data.published_at,
              };
            }
          }
          return acc;
        },
        {},
      );
      return {
        version: data.tag_name?.replace(/^v/, "") || data.name,
        platforms,
      };
    });
}
