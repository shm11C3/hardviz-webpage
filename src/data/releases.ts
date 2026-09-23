/**
 * Immutable metadata for each release article under src/pages/releases/.
 * Entries are never edited once published: a later release adds a new key and
 * repoints src/data/currentRelease.ts, so historical articles keep their own
 * version, changelog link, GitHub tag and publication date.
 */
export const releaseArticles = {
  "cooling-insight": {
    version: "1.11.0",
    // ISO date (YYYY-MM-DD) of the article's publication. Set it when the
    // release ships: it drives the visible date, JSON-LD datePublished,
    // article:published_time and the sitemap lastmod. Leave null until then.
    publishedAt: null,
  },
} as const satisfies Record<
  string,
  { version: string; publishedAt: string | null }
>;

export type ReleaseSlug = keyof typeof releaseArticles;
