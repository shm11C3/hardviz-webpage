import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchLatestReleaseMock } from "../../mocks/fetchLatestRelease.mock";
import type { GitHubRelease } from "../types/github";
import type { Platform } from "../types/platform";

export interface ReleaseData {
  version: string;
  published_at: string | null;
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

const CACHE_DIR = join(process.cwd(), ".cache");
const CACHE_FILE = join(CACHE_DIR, "github-release.json");

function readCache(): ReleaseData | null {
  try {
    if (existsSync(CACHE_FILE)) {
      const raw = readFileSync(CACHE_FILE, "utf-8");
      console.log("[fetchLatestRelease] Using cached release data");
      return JSON.parse(raw) as ReleaseData;
    }
  } catch (e) {
    console.warn("[fetchLatestRelease] Failed to read cache:", e);
  }
  return null;
}

function writeCache(data: ReleaseData): void {
  try {
    if (!existsSync(CACHE_DIR)) {
      mkdirSync(CACHE_DIR, { recursive: true });
    }
    writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
    console.log("[fetchLatestRelease] Cached release data");
  } catch (e) {
    console.warn("[fetchLatestRelease] Failed to write cache:", e);
  }
}

function parseRelease(data: GitHubRelease): ReleaseData {
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
    published_at: data.published_at ?? null,
    platforms,
  };
}

export async function fetchLatestRelease(): Promise<ReleaseData> {
  if (!process.env.PRODUCTION) {
    return fetchLatestReleaseMock();
  }

  const headers: Record<string, string> = {
    "User-Agent": "hardviz-webpage (Astro SSG)",
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      "https://api.github.com/repos/shm11C3/HardwareVisualizer/releases/latest",
      { headers },
    );

    const remaining = res.headers.get("x-ratelimit-remaining");
    console.log(
      `[fetchLatestRelease] GitHub API status=${res.status}, rate-limit-remaining=${remaining}`,
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const data: GitHubRelease = await res.json();
    const releaseData = parseRelease(data);
    writeCache(releaseData);
    return releaseData;
  } catch (e) {
    console.warn("[fetchLatestRelease] API request failed:", e);

    const cached = readCache();
    if (cached) {
      return cached;
    }

    console.warn("[fetchLatestRelease] No cache available, using mock data");
    return fetchLatestReleaseMock();
  }
}
