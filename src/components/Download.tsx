import {
  Check,
  ChevronRight,
  Copy as CopyIcon,
  ScrollText,
} from "lucide-react";
import { type JSX, memo, useEffect, useState } from "react";
import { FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa";
import type { LatestReleaseDetails } from "../lib/latestRelease";
import { cn } from "../lib/utils";
import type { PlatformDownload } from "../types/platform";

const platformToIcon: Record<PlatformDownload["platform"], JSX.Element> = {
  Windows: <FaWindows aria-hidden="true" />,
  Linux: <FaLinux aria-hidden="true" />,
  macOS: <FaApple aria-hidden="true" />,
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
  verificationLink?: string;
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
  verificationHref,
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
  verificationHref?: string;
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

  const copyLabel = (artifact: string) =>
    copiedArtifact === artifact
      ? checksumLabels?.copied
      : checksumLabels?.copySha256;

  const header = showHeader ? (
    <p className="mt-4 flex flex-wrap justify-center gap-2">
      <span className="badge">
        {currentVersionLabel} {latestVersion ? `v${latestVersion}` : "-"}
      </span>
      {latestReleaseDetails.publishedAt ? (
        <span className="badge">
          {translations.releaseDate} {latestReleaseDetails.publishedAt}
        </span>
      ) : null}
    </p>
  ) : null;

  const content = (
    <>
      <div
        className={cn(
          "grid min-w-0 grid-cols-1 gap-5 text-left md:grid-cols-3",
          showHeader && "mt-[clamp(2rem,4vw,3rem)]",
        )}
      >
        {downloads.map((platform) => (
          <div key={platform.platform} className="panel">
            <h3 className="panel-label">
              {platformToIcon[platform.platform]}
              {platform.platform}
            </h3>
            <div className="mt-2">
              {platform.versions.map((version) => (
                <div
                  key={version.name}
                  className="border-border border-b py-3 last:border-b-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words text-[0.9375rem] text-foreground">
                        {version.name}
                      </p>
                      <p className="mt-0.5 text-muted-foreground text-xs tabular-nums">
                        {version.size}
                      </p>
                    </div>
                    {version.url ? (
                      <a
                        href={version.url}
                        className={cn(
                          "btn btn-sm shrink-0",
                          platform.primary ? "btn-primary" : "btn-outline",
                        )}
                        {...(version.url.startsWith("http")
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                              // Lets the landing page report the click.
                              "data-direct-download": version.type,
                            }
                          : { "data-astro-prefetch": "hover" })}
                      >
                        {translations.button}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline shrink-0 cursor-not-allowed opacity-60"
                        disabled
                      >
                        {translations.button}
                      </button>
                    )}
                  </div>
                  {checksumLabels && version.url ? (
                    <details
                      className="group/checksum relative z-20 mt-3 overflow-visible rounded-xl border border-input border-dashed text-sm"
                      data-download-checksum={version.type}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-1.5 [&::-webkit-details-marker]:hidden">
                        <span className="flex min-w-0 items-center gap-2">
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open/checksum:rotate-90"
                            aria-hidden="true"
                          />
                          <span className="font-medium text-muted-foreground text-xs">
                            {checksumLabels.sha256}
                          </span>
                        </span>
                        {version.sha256 ? (
                          <button
                            type="button"
                            className="group/copy relative inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                            aria-label={copyLabel(
                              version.artifactName ?? version.type,
                            )}
                            title={copyLabel(
                              version.artifactName ?? version.type,
                            )}
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
                              className="pointer-events-none absolute right-0 bottom-full z-50 mb-2 hidden whitespace-nowrap rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground text-xs shadow-lg group-hover/copy:block group-focus-visible/copy:block"
                              aria-hidden="true"
                              data-copy-tooltip
                            >
                              {copyLabel(version.artifactName ?? version.type)}
                            </span>
                          </button>
                        ) : null}
                      </summary>
                      <div className="border-input border-t border-dashed p-3">
                        {version.sha256 ? (
                          <code className="block overflow-x-auto break-all font-mono text-foreground text-xs">
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
                <p className="py-3 text-muted-foreground text-sm">
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
        <p className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href={installationHref}
            className="link"
            data-astro-prefetch="hover"
          >
            {translations.installationLink}
          </a>
          {verificationHref && translations.verificationLink ? (
            <a
              href={verificationHref}
              className="link"
              data-astro-prefetch="hover"
            >
              {translations.verificationLink}
            </a>
          ) : null}
        </p>
      ) : null}

      {showLatestChanges &&
      (displayedReleaseDetails.changesSummary ||
        displayedReleaseDetails.highlights.length ||
        displayedReleaseDetails.tags.length) ? (
        <article
          className="panel mt-5 text-left"
          data-release-notes=""
          data-release-notes-version={displayedReleaseDetails.version}
        >
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="panel-label">
              <ScrollText aria-hidden="true" />
              {translations.latestChanges}
            </p>
            {displayedReleaseHref && translations.latestChangesLink ? (
              <a
                href={displayedReleaseHref}
                className="link text-sm"
                data-astro-prefetch="hover"
              >
                {translations.latestChangesLink}
              </a>
            ) : null}
          </div>
          {displayedReleaseDetails.highlights.length ? (
            <ul
              className="mt-3 max-w-[68ch] list-disc space-y-1.5 pl-5 text-[0.9375rem] text-foreground marker:text-muted-foreground"
              data-release-notes-highlights=""
            >
              {displayedReleaseDetails.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : displayedReleaseDetails.changesSummary ? (
            <p
              className="mt-3 max-w-[68ch] text-[0.9375rem] text-foreground"
              data-release-notes-summary=""
            >
              {displayedReleaseDetails.changesSummary}
            </p>
          ) : null}

          {displayedReleaseDetails.tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {displayedReleaseDetails.tags.map((tag) => (
                <span key={tag} className="badge" data-release-notes-tag="">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ) : null}

      {showFooterLinks ? (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">{translations.otherVersions}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            {githubLatestReleaseHref && translations.githubDownloadButton ? (
              <a
                href={githubLatestReleaseHref}
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-[18px] w-[18px]" aria-hidden="true" />
                {translations.githubDownloadButton}
              </a>
            ) : null}

            {changelogHref && translations.changelogLink ? (
              <a
                href={changelogHref}
                className="btn btn-outline"
                data-astro-prefetch="hover"
              >
                {translations.changelogLink}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section
      className="section"
      id="download"
      aria-labelledby="download-heading"
    >
      <div className="shell">
        <div className="section-head">
          <h2 id="download-heading" className="section-title">
            {translations.title}
          </h2>
          {header}
        </div>
        {content}
      </div>
    </section>
  );
};

export default memo(Download);
