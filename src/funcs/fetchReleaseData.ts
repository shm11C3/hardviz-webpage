import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchLatestReleaseMock } from "../../mocks/fetchLatestRelease.mock";
import type { GitHubRelease } from "../types/github";
import type { Platform } from "../types/platform";

export interface ReleasePlatformAsset {
  url: string;
  size: string;
  name: string;
  browser_download_url: string;
  updated_at: string;
  digest: string | null;
  sha256: string | null;
  release_url: string;
  signature_name?: string;
  signature_url?: string;
}

export interface ReleaseData {
  version: string;
  published_at: string | null;
  platforms: {
    [K in Platform]?: ReleasePlatformAsset;
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

type GitHubReleaseAsset = GitHubRelease["assets"][number];

function formatAssetSize(size: number | undefined): string {
  return typeof size === "number"
    ? `${(size / 1024 / 1024).toFixed(1)} MB`
    : "-";
}

function parseSha256Digest(digest: string | null | undefined): string | null {
  if (!digest?.startsWith("sha256:")) {
    return null;
  }

  const sha256 = digest.slice("sha256:".length);
  return /^[a-fA-F0-9]{64}$/.test(sha256) ? sha256.toLowerCase() : null;
}

function isSignatureAsset(asset: GitHubReleaseAsset): boolean {
  return asset.name.toLowerCase().endsWith(".sig");
}

function platformForAsset(asset: GitHubReleaseAsset): Platform | null {
  const name = asset.name;
  const lowerName = name.toLowerCase();

  if (isSignatureAsset(asset)) {
    return null;
  }

  if (lowerName.endsWith(".msi") && !lowerName.includes("offline")) {
    return "windows";
  }

  if (lowerName.endsWith(".rpm")) {
    return "linuxRPM";
  }

  if (name.endsWith(".AppImage")) {
    return "linuxAppImage";
  }

  if (lowerName.endsWith(".deb")) {
    return "linuxDeb";
  }

  if (lowerName.endsWith(".dmg")) {
    if (/arm64|aarch64/i.test(name)) {
      return "macOSAppleSilicon";
    }

    if (/x64|x86.?64|intel/i.test(name)) {
      return "macOSIntel";
    }
  }

  return null;
}

function toReleasePlatformAsset(
  asset: GitHubReleaseAsset,
  releaseUrl: string,
  signatureAsset: GitHubReleaseAsset | undefined,
): ReleasePlatformAsset {
  return {
    url: asset.browser_download_url,
    size: formatAssetSize(asset.size),
    name: asset.name,
    browser_download_url: asset.browser_download_url,
    updated_at: asset.updated_at,
    digest: asset.digest ?? null,
    sha256: parseSha256Digest(asset.digest),
    release_url: releaseUrl,
    ...(signatureAsset
      ? {
          signature_name: signatureAsset.name,
          signature_url: signatureAsset.browser_download_url,
        }
      : {}),
  };
}

function parseRelease(data: GitHubRelease): ReleaseData {
  const signatureAssets = new Map<string, GitHubReleaseAsset>();

  for (const asset of data.assets || []) {
    if (isSignatureAsset(asset)) {
      signatureAssets.set(asset.name.slice(0, -".sig".length), asset);
    }
  }

  const platforms = (data.assets || []).reduce(
    (acc: ReleaseData["platforms"], asset) => {
      const platform = platformForAsset(asset);

      if (!platform) {
        return acc;
      }

      acc[platform] = toReleasePlatformAsset(
        asset,
        data.html_url,
        signatureAssets.get(asset.name),
      );
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
