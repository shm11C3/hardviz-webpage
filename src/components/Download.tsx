import {
  Apple,
  LaptopIcon as Linux,
  ComputerIcon as Windows,
} from "lucide-react";
import React, { useEffect, useState, type JSX } from "react";
import { fetchLatestRelease } from "../funcs/fetcReleaseData";
import { cn } from "../lib/utils";
import type { Platform } from "../types/platform";

export default function Download() {
  const initialDownloads: Array<{
    platform: string;
    icon: JSX.Element;
    versions: Array<{
      type: Platform;
      name: string;
      url: string | null;
      size: string;
    }>;
    primary: boolean;
  }> = [
    {
      platform: "Windows",
      icon: <Windows className="h-8 w-8" />,
      versions: [
        { type: "windows", name: "Windows 10/11 (x64)", url: null, size: "-" },
      ],
      primary: false,
    },
    {
      platform: "Linux",
      icon: <Linux className="h-8 w-8" />,
      versions: [
        { type: "linuxAppImage", name: "AppImage", url: null, size: "-" },
        {
          type: "linuxDeb",
          name: "Debian/Ubuntu (.deb)",
          url: null,
          size: "-",
        },
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
      try {
        const release = await fetchLatestRelease();
        setLatestVersion(release.version);
        setDownloads((prev) =>
          prev.map((platform) => {
            const asset = release.platforms[platform.versions[0]?.type];
            if (asset) {
              return {
                ...platform,
                versions: platform.versions.map((v) => ({
                  ...v,
                  url: asset.browser_download_url,
                  size: asset.size || "-",
                })),
              };
            }
            return platform;
          }),
        );
      } catch (e) {
        console.error("Failed to fetch latest release data:", e);
        return;
      }
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

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
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
                      {version.url ? (
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
                      ) : (
                        <div
                          className={cn(
                            "rounded-lg px-4 py-2 font-medium text-sm",
                            platform.primary
                              ? "bg-cyan-500 text-white hover:bg-cyan-600"
                              : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white",
                          )}
                        >
                          Download
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {platform.versions.length === 0 && (
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    No downloads available for {platform.platform} yet.
                  </p>
                )}
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
