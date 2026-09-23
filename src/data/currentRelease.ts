import type { ui } from "../i18n/ui";

type TranslationKey = keyof typeof ui.en;

export const currentRelease = {
  slug: "cooling-insight",
  version: "1.11.0",
  // ISO date (YYYY-MM-DD) of the article's publication. Set it when the
  // release ships: it drives the visible date, JSON-LD datePublished,
  // article:published_time and the sitemap lastmod. Leave null until then.
  publishedAt: null,
  navKey: "release.nav",
  announcementKey: "release.announcement",
} as const satisfies {
  slug: string;
  version: string;
  publishedAt: string | null;
  navKey: TranslationKey;
  announcementKey: TranslationKey;
};
