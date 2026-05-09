import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Copy as CopyIcon,
  Sparkles,
} from "lucide-react";
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

interface DownloadChecksumTranslations {
  sha256: string;
  copySha256: string;
  copied: string;
  checksumUnavailable: string;
}

interface DownloadTranslations extends Partial<DownloadChecksumTranslations> {
  button: string;
  noDownloads: string;
  title?: string;
  description?: string;
  currentVersion?: string;
  otherVersions?: string;
  changelogLink?: string;
  githubDownloadButton?: string;
  installationLink?: string;
  releaseDate?: string;
  latestChanges?: string;
  latestChangesLink?: string;
}

const getChecksumTranslations = (
  translations: DownloadTranslations,
): DownloadChecksumTranslations | null => {
  const { sha256, copySha256, copied, checksumUnavailable } = translations;

  if (!sha256 || !copySha256 || !copied || !checksumUnavailable) {
    return null;
  }

  return {
    sha256,
    copySha256,
    copied,
    checksumUnavailable,
  };
};

const Download = ({
  downloads: initialDownloads,
  latestVersion,
  latestReleaseDetails,
  releaseNotesDetails,
  translations,
  changelogHref,
  releaseNotesHref,
  githubLatestReleaseHref,
  installationHref,
  embedded = false,
  showHeader = true,
  showLatestChanges = true,
  showFooterLinks = true,
}: {
  downloads: PlatformDownload[];
  latestVersion: string | null;
  latestReleaseDetails: LatestReleaseDetails;
  releaseNotesDetails?: LatestReleaseDetails;
  translations: DownloadTranslations;
  changelogHref?: string;
  releaseNotesHref?: string;
  githubLatestReleaseHref?: string;
  installationHref?: string;
  embedded?: boolean;
  showHeader?: boolean;
  showLatestChanges?: boolean;
  showFooterLinks?: boolean;
}) => {
  const [detectedPlatform, setDetectedPlatform] = useState<
    PlatformDownload["platform"] | null
  >(null);
  const [copiedArtifact, setCopiedArtifact] = useState<string | null>(null);
  const checksumLabels = getChecksumTranslations(translations);

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

  const copySha256 = async (artifactName: string, sha256: string) => {
    if (!navigator.clipboard?.writeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(sha256);
      setCopiedArtifact(artifactName);
      window.setTimeout(() => {
        setCopiedArtifact((current) =>
          current === artifactName ? null : current,
        );
      }, 1800);
    } catch {
      setCopiedArtifact(null);
    }
  };

  const downloads = initialDownloads.map((platform) => ({
    ...platform,
    primary:
      detectedPlatform !== null && platform.platform === detectedPlatform,
  }));
  const currentVersionLabel = translations.currentVersion ?? "";
  const displayedReleaseDetails = releaseNotesDetails ?? latestReleaseDetails;
  const displayedReleaseHref = releaseNotesHref ?? changelogHref;

  const content = (
    <>
      {showHeader ? (
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-slate-900 md:text-4xl dark:text-white">
            {translations.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {translations.description}
          </p>
          <p className="mt-2 text-slate-500 text-sm dark:text-slate-400">
            {latestVersion
              ? `${currentVersionLabel} v${latestVersion}`
              : `${currentVersionLabel} -`}
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
      ) : null}

      <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {downloads.map((platform) => (
          <div
            key={platform.platform}
            className={cn(
              "min-w-0 overflow-hidden rounded-xl border",
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
            <div className="bg-white p-5 sm:p-6 dark:bg-slate-800">
              {platform.versions.map((version) => (
                <div key={version.name} className="mb-4 last:mb-0">
                  <p className="mb-1 break-words text-slate-600 text-sm dark:text-slate-400">
                    {version.name}
                  </p>
                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
                    <span className="text-slate-500 text-xs dark:text-slate-400">
                      {version.size}
                    </span>
                    {version.url ? (
                      <a
                        href={version.url}
                        className={cn(
                          "shrink-0 rounded-lg px-4 py-2 font-medium text-sm",
                          platform.primary
                            ? "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_80%,white_20%)] dark:hover:bg-[color-mix(in_oklab,var(--primary)_90%,black_10%)]"
                            : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
                        )}
                        {...(version.url.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : { "data-astro-prefetch": "hover" })}
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
                  {checksumLabels && version.url ? (
                    <details
                      className="group/checksum relative z-20 mt-4 overflow-visible rounded-lg border border-slate-200 bg-slate-50/80 text-sm dark:border-slate-700 dark:bg-slate-900/40"
                      data-download-checksum={version.type}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 [&::-webkit-details-marker]:hidden">
                        <span className="flex min-w-0 items-center gap-2">
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open/checksum:rotate-90 dark:text-slate-400"
                            aria-hidden="true"
                          />
                          <span className="font-medium text-slate-600 text-xs uppercase dark:text-slate-400">
                            {checksumLabels.sha256}
                          </span>
                        </span>
                        {version.sha256 ? (
                          <button
                            type="button"
                            className="group/copy relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                            aria-label={
                              copiedArtifact ===
                              (version.artifactName ?? version.type)
                                ? checksumLabels.copied
                                : checksumLabels.copySha256
                            }
                            title={
                              copiedArtifact ===
                              (version.artifactName ?? version.type)
                                ? checksumLabels.copied
                                : checksumLabels.copySha256
                            }
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              void copySha256(
                                version.artifactName ?? version.type,
                                version.sha256 ?? "",
                              );
                            }}
                          >
                            {copiedArtifact ===
                            (version.artifactName ?? version.type) ? (
                              <Check className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <CopyIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className="pointer-events-none absolute right-0 bottom-full z-50 mb-2 hidden whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 font-medium text-white text-xs shadow-lg group-hover/copy:block group-focus-visible/copy:block dark:bg-slate-100 dark:text-slate-900"
                              aria-hidden="true"
                              data-copy-tooltip
                            >
                              {copiedArtifact ===
                              (version.artifactName ?? version.type)
                                ? checksumLabels.copied
                                : checksumLabels.copySha256}
                            </span>
                          </button>
                        ) : null}
                      </summary>
                      <div className="border-slate-200 border-t p-3 dark:border-slate-700">
                        {version.sha256 ? (
                          <code className="block overflow-x-auto break-all rounded bg-white px-2 py-1.5 font-mono text-slate-900 text-xs dark:bg-slate-950 dark:text-slate-100">
                            {version.sha256}
                          </code>
                        ) : (
                          <div
                            className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 text-sm dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100"
                            data-checksum-warning
                          >
                            {checksumLabels.checksumUnavailable}
                          </div>
                        )}
                      </div>
                    </details>
                  ) : null}
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

      {installationHref && translations.installationLink ? (
        <div className="mt-8 text-center">
          <a
            href={installationHref}
            className="inline-flex items-center justify-center gap-1.5 font-medium text-slate-700 text-sm hover:text-slate-950 hover:underline dark:text-slate-200 dark:hover:text-white"
            data-astro-prefetch="hover"
          >
            {translations.installationLink}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      ) : null}

      {showLatestChanges &&
      (displayedReleaseDetails.changesSummary ||
        displayedReleaseDetails.tags.length) ? (
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
              {displayedReleaseDetails.changesSummary ? (
                <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-200">
                  {displayedReleaseDetails.changesSummary}
                </p>
              ) : null}
            </div>
            {displayedReleaseHref && translations.latestChangesLink ? (
              <a
                href={displayedReleaseHref}
                className="shrink-0 font-medium text-cyan-700 text-sm hover:underline dark:text-cyan-300"
                data-astro-prefetch="hover"
              >
                {translations.latestChangesLink}
              </a>
            ) : null}
          </div>

          {displayedReleaseDetails.tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {displayedReleaseDetails.tags.map((tag) => (
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

      {showFooterLinks ? (
        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            {translations.otherVersions}
          </p>
          {githubLatestReleaseHref && translations.githubDownloadButton ? (
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
          ) : null}

          {changelogHref && translations.changelogLink ? (
            <a
              href={changelogHref}
              className="mt-4 inline-block font-medium text-foreground"
              data-astro-prefetch="hover"
            >
              {translations.changelogLink}
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="bg-white py-20 dark:bg-slate-800" id="download">
      <div className="container mx-auto px-4">{content}</div>
    </section>
  );
};

export default memo(Download);
