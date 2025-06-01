import {
  Apple,
  LaptopIcon as Linux,
  ComputerIcon as Windows,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

type PlatformKey =
  | "windows-x86_64"
  | "linux-x86_64"
  | "macos-intel"
  | "macos-arm64";
type PlatformAsset = { url: string; size?: string };
type LatestData = {
  version: string;
  platforms: Partial<Record<PlatformKey, PlatformAsset>>;
};

export default function Download() {
  const initialDownloads = [
    {
      platform: "Windows",
      icon: <Windows className="h-8 w-8" />,
      versions: [{ name: "Windows 10/11 (x64)", url: "#", size: "-" }],
      primary: false,
    },
    {
      platform: "macOS",
      icon: <Apple className="h-8 w-8" />,
      versions: [
        { name: "macOS (Intel)", url: "#", size: "-" },
        { name: "macOS (Apple Silicon)", url: "#", size: "-" },
      ],
      primary: false,
    },
    {
      platform: "Linux",
      icon: <Linux className="h-8 w-8" />,
      versions: [
        { name: "AppImage", url: "#", size: "-" },
        { name: "Debian/Ubuntu (.deb)", url: "#", size: "-" },
      ],
      primary: false,
    },
  ];

  const [downloads, setDownloads] = useState(initialDownloads);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);

  useEffect(() => {
    // ユーザーエージェント判定
    const ua = window.navigator.userAgent;
    let detected = "Windows";
    if (/Macintosh|Mac OS X/.test(ua)) {
      detected = "macOS";
    } else if (/Linux/.test(ua)) {
      detected = "Linux";
    } else if (/Windows/.test(ua)) {
      detected = "Windows";
    }
    setDownloads((prev) =>
      prev.map((d) => ({ ...d, primary: d.platform === detected })),
    );
  }, []);

  useEffect(() => {
    // 最新バージョン情報とダウンロードリンク・サイズを取得
    const fetchLatest = async () => {
      let data: LatestData | null = null;
      // 1. /latest.json をfetch
      try {
        const res = await fetch("/latest.json");
        if (res.ok) {
          const json = await res.json();
          data = {
            version: json.version,
            platforms: json.platforms ?? {},
          };
        }
      } catch (e) {
        // ignore
      }
      // 2. 失敗したらGitHub API
      if (!data) {
        try {
          const res = await fetch(
            "https://api.github.com/repos/shm11C3/HardwareVisualizer/releases/latest",
          );
          if (res.ok) {
            const gh = await res.json();
            const platforms = (gh.assets || []).reduce(
              (
                acc: Partial<Record<PlatformKey, PlatformAsset>>,
                asset: {
                  name: string;
                  browser_download_url: string;
                  size?: number;
                },
              ) => {
                if (/windows/i.test(asset.name)) {
                  acc["windows-x86_64"] = {
                    url: asset.browser_download_url,
                    size: asset.size
                      ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                      : "-",
                  };
                } else if (/appimage/i.test(asset.name)) {
                  acc["linux-x86_64"] = {
                    url: asset.browser_download_url,
                    size: asset.size
                      ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                      : "-",
                  };
                } else if (/\.dmg$/i.test(asset.name)) {
                  acc["macos-intel"] = {
                    url: asset.browser_download_url,
                    size: asset.size
                      ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                      : "-",
                  };
                } else if (
                  /\.zip$/i.test(asset.name) &&
                  /arm/i.test(asset.name)
                ) {
                  acc["macos-arm64"] = {
                    url: asset.browser_download_url,
                    size: asset.size
                      ? `${(asset.size / 1024 / 1024).toFixed(1)} MB`
                      : "-",
                  };
                }
                return acc;
              },
              {},
            );
            data = {
              version: gh.tag_name?.replace(/^v/, "") || gh.name,
              platforms,
            };
          }
        } catch (e) {
          // ignore
        }
      }
      if (data?.version) {
        setLatestVersion(data.version);
        setDownloads((prev) => {
          return prev.map((d) => {
            if (d.platform === "Windows" && data?.platforms["windows-x86_64"]) {
              const win = data.platforms["windows-x86_64"];
              return win
                ? {
                    ...d,
                    versions: [
                      {
                        name: "Windows 10/11 (x64)",
                        url: win.url,
                        size: win.size || "-",
                      },
                    ],
                  }
                : d;
            }
            if (d.platform === "Linux" && data?.platforms["linux-x86_64"]) {
              const linux = data.platforms["linux-x86_64"];
              return linux
                ? {
                    ...d,
                    versions: [
                      {
                        name: "AppImage",
                        url: linux.url,
                        size: linux.size || "-",
                      },
                      d.versions[1], // Debian/Ubuntu(.deb)はそのまま
                    ],
                  }
                : d;
            }
            if (d.platform === "macOS") {
              const macIntel = data.platforms["macos-intel"];
              const macArm = data.platforms["macos-arm64"];
              return {
                ...d,
                versions: [
                  macIntel
                    ? {
                        name: "macOS (Intel)",
                        url: macIntel.url,
                        size: macIntel.size || "-",
                      }
                    : d.versions[0],
                  macArm
                    ? {
                        name: "macOS (Apple Silicon)",
                        url: macArm.url,
                        size: macArm.size || "-",
                      }
                    : d.versions[1],
                ],
              };
            }
            return d;
          });
        });
      }
      // 取得できなければ何もしない
    };
    fetchLatest();
  }, []);

  return (
    <section className="bg-white py-20 dark:bg-slate-800" id="download">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl dark:text-white">
            Download HardwareVisualizer
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Available for all major platforms. Free and open source.
          </p>
          <p className="mt-2 text-slate-500 text-sm dark:text-slate-500">
            {latestVersion
              ? `Current version: v${latestVersion}`
              : "Current version: -"}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {downloads.map((platform) => (
            <div
              key={platform.platform}
              className={cn(
                "overflow-hidden rounded-xl border",
                platform.primary
                  ? "border-cyan-500 shadow-cyan-100 shadow-lg dark:shadow-none"
                  : "border-slate-200 dark:border-slate-700",
              )}
            >
              <div
                className={cn(
                  "p-6",
                  platform.primary
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white",
                )}
              >
                <div className="mb-4 flex items-center justify-center">
                  {platform.icon}
                </div>
                <h3 className="text-center font-bold text-xl">
                  {platform.platform}
                </h3>
              </div>
              <div className="bg-white p-6 dark:bg-slate-800">
                {platform.versions.map((version) => (
                  <div key={version.name} className="mb-4 last:mb-0">
                    <p className="mb-1 text-slate-600 text-sm dark:text-slate-400">
                      {version.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-xs dark:text-slate-500">
                        {version.size}
                      </span>
                      <a
                        href={version.url}
                        className={cn(
                          "rounded-lg px-4 py-2 font-medium text-sm",
                          platform.primary
                            ? "bg-cyan-500 text-white hover:bg-cyan-600"
                            : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Looking for other versions or platforms?
          </p>
          <a
            href="https://github.com/shm11C3/HardwareVisualizer/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            View all releases on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
