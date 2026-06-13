import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type AboutLang = "en" | "ja";
export type AboutEntry = CollectionEntry<"about">;

/**
 * Returns the About content entry for the given language, falling back to English
 * when a localized entry is missing (mirrors the changelog fallback behavior).
 */
export async function getAboutEntry(lang: AboutLang): Promise<AboutEntry> {
  const localized = await getCollection(
    "about",
    ({ data }) => data.lang === lang,
  );
  if (localized[0]) return localized[0];

  const fallback = await getCollection(
    "about",
    ({ data }) => data.lang === "en",
  );
  const entry = fallback[0];
  if (!entry) {
    throw new Error("About content entry not found");
  }
  return entry;
}
