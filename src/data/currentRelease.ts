import type { ui } from "../i18n/ui";
import type { ReleaseSlug } from "./releases";

type TranslationKey = keyof typeof ui.en;

/**
 * Pointer to the article the homepage announcement and footer link to.
 * Per-article metadata (version, publication date) lives in ./releases.ts.
 */
export const currentRelease = {
  slug: "windows-sensor-service",
  navKey: "release.v1_12_0.nav",
  announcementKey: "release.v1_12_0.announcement",
} as const satisfies {
  slug: ReleaseSlug;
  navKey: TranslationKey;
  announcementKey: TranslationKey;
};
