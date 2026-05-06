import type { ChangelogLang } from "./changelog";
import { getChangelogEntryByVersion } from "./changelog";

export interface LatestReleaseDetails {
  publishedAt: string | null;
  changesSummary: string | null;
  tags: string[];
}

export function formatReleaseDate(
  publishedAt: string | null | undefined,
  lang: ChangelogLang,
): string | null {
  if (!publishedAt) return null;

  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: lang === "ja" ? "long" : "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: lang === "ja" ? "Asia/Tokyo" : "UTC",
    timeZoneName: "short",
  }).format(date);
}

export async function getLatestReleaseDetails({
  version,
  lang,
  publishedAt,
}: {
  version: string;
  lang: ChangelogLang;
  publishedAt: string | null | undefined;
}): Promise<LatestReleaseDetails> {
  const localizedEntry = await getChangelogEntryByVersion(lang, version);
  const fallbackEntry =
    lang === "ja" && !localizedEntry
      ? await getChangelogEntryByVersion("en", version)
      : undefined;
  const entry = localizedEntry ?? fallbackEntry;

  return {
    publishedAt: formatReleaseDate(publishedAt, lang),
    changesSummary: entry?.data.summary ?? null,
    tags: entry?.data.tags ?? [],
  };
}
