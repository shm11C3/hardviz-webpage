import { CalendarDays, Sparkles } from "lucide-react";
import { type JSX, memo, useEffect, useState } from "react";
import { FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa";
import type { LatestReleaseDetails } from "../lib/latestRelease";
import { cn } from "../lib/utils";
import type { PlatformDownload } from "../types/platform";

const platformToIcon: Record<PlatformDownload["platform"], JSX.Element> = {
  Windows: <FaWindows className="h-8 w-8" />,
  Linux: <FaLinux className="h-8 w-8" />,
  macOS: <FaApple className="h-8 w-8" />,
};

interface DownloadTranslations {
  title: string;
  description: string;
  currentVersion: string;
  button: string;
  noDownloads: string;
  otherVersions: string;
  changelogLink: string;
  githubDownloadButton: string;
  releaseDate: string;
  latestChanges: string;
  latestChangesLink: string;
}

const Download = ({
  downloads: initialDownloads,
  latestVersion,
  latestReleaseDetails,
  translations,
  changelogHref,
  githubLatestReleaseHref,
}: {
  downloads: PlatformDownload[];
  latestVersion: string | null;
  latestReleaseDetails: LatestReleaseDetails;
  translations: DownloadTranslations;
  changelogHref: string;
  githubLatestReleaseHref: string;
}) => {
  const [detectedPlatform, setDetectedPlatform] = useState<
    PlatformDownload["platform"] | null
  >(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Macintosh|Mac OS X/.test(ua)) {
      setDetectedPlatform("macOS");
    } else if (/Linux/.test(ua)) {
      setDetectedPlatform("Linux");
    } else {
      setDetectedPlatform("Windows");
    }
  }, []);

  const downloads = initialDownloads.map((platform) => ({
    ...platform,
    primary:
      detectedPlatform !== null && platform.platform === detectedPlatform,
  }));

  return (
    <section className="bg-white py-20 dark:bg-slate-800" id="download">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-slate-900 md:text-4xl dark:text-white">
            {translations.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {translations.description}
          </p>
          <p className="mt-2 text-slate-500 text-sm dark:text-slate-400">
            {latestVersion
              ? `${translations.currentVersion} v${latestVersion}`
              : `${translations.currentVersion} -`}
          </p>
          {latestReleaseDetails.publishedAt ? (
            <p className="mt-2 inline-flex items-center justify-center gap-2 text-slate-500 text-sm dark:text-slate-400">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <span>
                {translations.releaseDate} {latestReleaseDetails.publishedAt}
              </span>
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {downloads.map((platform) => (
            <div
              key={platform.platform}
              className={cn(
                "overflow-hidden rounded-xl border",
                platform.primary
                  ? "border-primary shadow-accent shadow-lg dark:shadow-none"
                  : "border-slate-200 dark:border-slate-700",
              )}
            >
              <div
                className={cn(
                  "relative isolate overflow-hidden p-6",
                  platform.primary
                    ? "relative overflow-hidden bg-hardviz text-white"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white",
                )}
              >
                <div className="pointer-events-none absolute inset-0 z-0 bg-hardviz-glow opacity-90 blur-2xl" />
                <div className="pointer-events-none absolute inset-0 z-0 bg-black/15" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-center">
                    {platformToIcon[platform.platform]}
                  </div>
                  <h3 className="text-center font-bold text-xl">
                    {platform.platform}
                  </h3>
                </div>
              </div>
              <div className="bg-white p-6 dark:bg-slate-800">
                {platform.versions.map((version) => (
                  <div key={version.name} className="mb-4 last:mb-0">
                    <p className="mb-1 text-slate-600 text-sm dark:text-slate-400">
                      {version.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-xs dark:text-slate-400">
                        {version.size}
                      </span>
                      {version.url ? (
                        <a
                          href={version.url}
                          className={cn(
                            "rounded-lg px-4 py-2 font-medium text-sm",
                            platform.primary
                              ? "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_80%,white_20%)] dark:hover:bg-[color-mix(in_oklab,var(--primary)_90%,black_10%)]"
                              : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {translations.button}
                        </a>
                      ) : (
                        <div
                          className={cn(
                            "rounded-lg px-4 py-2 font-medium text-sm",
                            platform.primary
                              ? "bg-primary text-primary-foreground"
                              : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white",
                          )}
                        >
                          {translations.button}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {platform.versions.length === 0 && (
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    {translations.noDownloads.replace(
                      "{platform}",
                      platform.platform,
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {latestReleaseDetails.changesSummary ||
        latestReleaseDetails.tags.length ? (
          <article className="mx-auto mt-12 max-w-4xl rounded-lg border border-slate-200 bg-slate-50/70 p-5 text-left shadow-sm md:p-6 dark:border-slate-700 dark:bg-slate-900/30">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-semibold text-lg text-slate-900 dark:text-white">
                  <Sparkles
                    className="h-5 w-5 text-cyan-500"
                    aria-hidden="true"
                  />
                  {translations.latestChanges}
                </p>
                {latestReleaseDetails.changesSummary ? (
                  <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-200">
                    {latestReleaseDetails.changesSummary}
                  </p>
                ) : null}
              </div>
              <a
                href={changelogHref}
                className="shrink-0 font-medium text-cyan-700 text-sm hover:underline dark:text-cyan-300"
                data-astro-prefetch="true"
              >
                {translations.latestChangesLink}
              </a>
            </div>

            {latestReleaseDetails.tags.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {latestReleaseDetails.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-600 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ) : null}

        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            {translations.otherVersions}
          </p>
          <div className="mt-6">
            <a
              href={githubLatestReleaseHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-5 w-5" />
              {translations.githubDownloadButton}
            </a>
          </div>

          <a
            href={changelogHref}
            className="mt-4 inline-block font-medium text-foreground"
            data-astro-prefetch
          >
            {translations.changelogLink}
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Download);
