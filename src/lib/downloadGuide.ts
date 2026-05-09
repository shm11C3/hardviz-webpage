import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type DownloadGuideLang = "en" | "ja";
export type DownloadGuideSection =
  | "source-check"
  | "installation"
  | "verification";
export type DownloadGuideEntry = CollectionEntry<"downloadGuide">;

export async function getDownloadGuideEntry(
  lang: DownloadGuideLang,
  section: DownloadGuideSection,
): Promise<DownloadGuideEntry> {
  const entries = await getCollection(
    "downloadGuide",
    ({ data }) => data.lang === lang && data.section === section,
  );
  const entry = entries[0];
  if (!entry) {
    throw new Error(`Download guide entry not found: ${lang}/${section}`);
  }

  return entry;
}
