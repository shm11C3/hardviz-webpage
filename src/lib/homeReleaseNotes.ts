import { homeReleaseNotesVersion } from "../config/releaseNotes";
import type { ChangelogLang } from "./changelog";
import {
  getLatestReleaseDetails,
  type LatestReleaseDetails,
} from "./latestRelease";

function normalizeVersion(version: string | null): string | null {
  const normalized = version?.trim().replace(/^v/i, "");
  return normalized || null;
}

function hasReleaseNotes(details: LatestReleaseDetails): boolean {
  return Boolean(details.changesSummary || details.tags.length);
}

export async function getHomeReleaseNotesDetails({
  lang,
  latestReleaseDetails,
}: {
  lang: ChangelogLang;
  latestReleaseDetails: LatestReleaseDetails;
}): Promise<LatestReleaseDetails> {
  const selectedVersion =
    normalizeVersion(homeReleaseNotesVersion) ?? latestReleaseDetails.version;

  if (selectedVersion === latestReleaseDetails.version) {
    return latestReleaseDetails;
  }

  const selectedReleaseDetails = await getLatestReleaseDetails({
    version: selectedVersion,
    lang,
    publishedAt: null,
  });

  if (!hasReleaseNotes(selectedReleaseDetails)) {
    throw new Error(
      `Home release notes version "${selectedVersion}" does not have changelog summary or tags. Update src/config/releaseNotes.ts or add a changelog entry.`,
    );
  }

  return selectedReleaseDetails;
}
