import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type ChangelogLang = "en" | "ja";
export type ChangelogEntry = CollectionEntry<"changelog">;

function sortByDateDesc(a: ChangelogEntry, b: ChangelogEntry) {
  return b.data.date.getTime() - a.data.date.getTime();
}

export async function getChangelogEntries(lang: ChangelogLang) {
  const entries = await getCollection(
    "changelog",
    ({ data }) => data.lang === lang,
  );
  return entries.sort(sortByDateDesc);
}

export async function getChangelogEntryByVersion(
  lang: ChangelogLang,
  version: string,
): Promise<ChangelogEntry | undefined> {
  const entries = await getCollection(
    "changelog",
    ({ data }) => data.lang === lang && data.version === version,
  );
  return entries[0];
}

export async function getChangelogVersionsForJaRoute() {
  const [enEntries, jaEntries] = await Promise.all([
    getChangelogEntries("en"),
    getChangelogEntries("ja"),
  ]);

  const versions = new Set<string>();
  for (const entry of enEntries) versions.add(entry.data.version);
  for (const entry of jaEntries) versions.add(entry.data.version);

  return Array.from(versions);
}

export async function getChangelogEntriesForJaIndex(): Promise<
  Array<{ entry: ChangelogEntry; untranslated: boolean }>
> {
  const [enEntries, jaEntries] = await Promise.all([
    getChangelogEntries("en"),
    getChangelogEntries("ja"),
  ]);

  const jaByVersion = new Map(jaEntries.map((e) => [e.data.version, e]));

  return enEntries
    .map((en) => {
      const ja = jaByVersion.get(en.data.version);
      return {
        entry: ja ?? en,
        untranslated: !ja,
      };
    })
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}
