import { ComputerIcon, LaptopIcon } from "lucide-react";
import { type JSX, memo, useMemo } from "react";
import { cn } from "../lib/utils";
import type { Platform, PlatformDownload } from "../types/platform";

const platform2Icon: Record<"Windows" | "Linux", JSX.Element> = {
  Windows: <ComputerIcon className="h-8 w-8" />,
  Linux: <LaptopIcon className="h-8 w-8" />,
};

const Download = ({
  downloads: initialDownloads,
  latestVersion,
}: {
  downloads: PlatformDownload[];
  latestVersion: string | null;
}) => {
  const downloads = useMemo(() => {
    const ua = navigator.userAgent;
    const detected = (() => {
      if (/Linux/.test(ua)) {
        return "Linux";
      }
      if (/Windows/.test(ua)) {
        return "Windows";
      }
      return "Windows";
    })();

    return initialDownloads.map((platform) => ({
      ...platform,
      primary: platform.platform === detected,
    }));
  }, [initialDownloads]);

  return (
    <section className="bg-white py-20 dark:bg-slate-800" id="download">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-slate-900 md:text-4xl dark:text-white">
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
                  {platform2Icon[platform.platform]}
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
                              ? "bg-cyan-500 text-white"
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
};

export default memo(Download);
