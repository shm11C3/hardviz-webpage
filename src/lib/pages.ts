import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type PageLang = "en" | "ja";
export type PageEntry = CollectionEntry<"pages">;
export type PageSlug = PageEntry["data"]["page"];

/** Slugs served by the `[page]` routes. */
export const pageSlugs: PageSlug[] = [
  "guide",
  "security",
  "cooling-insight",
  "compare",
];

/**
 * Returns the prose page for a slug in the given language. Every page is
 * written in both languages, so a missing entry is a build error rather than
 * a silent fallback to the other language.
 */
export async function getPageEntry(
  lang: PageLang,
  slug: PageSlug,
): Promise<PageEntry> {
  const entries = await getCollection(
    "pages",
    ({ data }) => data.lang === lang && data.page === slug,
  );
  const entry = entries[0];
  if (!entry) {
    throw new Error(`Page content not found: ${lang}/${slug}`);
  }
  return entry;
}
