import type { ui } from "../i18n/ui";
import type { ReleaseSlug } from "./releases";

type TranslationKey = keyof typeof ui.en;

/**
 * Pointer to the article the homepage announcement links to.
 * Per-article metadata (version, publication date) lives in ./releases.ts.
 */
export const currentRelease = {
  slug: "cooling-insight",
  announcementKey: "release.announcement",
} as const satisfies {
  slug: ReleaseSlug;
  announcementKey: TranslationKey;
};
