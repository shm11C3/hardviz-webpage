import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type PrivacyLang = "en" | "ja";
export type PrivacyEntry = CollectionEntry<"privacy">;

/**
 * Returns the Privacy content entry for the given language, falling back to
 * English when a localized entry is missing (mirrors the About/changelog fallback).
 */
export async function getPrivacyEntry(
  lang: PrivacyLang,
): Promise<PrivacyEntry> {
  const localized = await getCollection(
    "privacy",
    ({ data }) => data.lang === lang,
  );
  if (localized[0]) return localized[0];

  const fallback = await getCollection(
    "privacy",
    ({ data }) => data.lang === "en",
  );
  const entry = fallback[0];
  if (!entry) {
    throw new Error("Privacy content entry not found");
  }
  return entry;
}
