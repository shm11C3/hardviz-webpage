import type { ui } from "../i18n/ui";
import type { ReleaseSlug } from "./releases";

type TranslationKey = keyof typeof ui.en;

/**
 * What the blog index shows for each release article, reusing the article's
 * own heading and description. Every key of ./releases.ts needs an entry
 * here; `pnpm check` fails when one is missing.
 */
export const blogPosts = {
  "cooling-insight": {
    titleKey: "release.hero.title",
    summaryKey: "release.meta.description",
  },
  "windows-sensor-service": {
    titleKey: "release.v1_12_0.hero.title",
    summaryKey: "release.v1_12_0.meta.description",
  },
} as const satisfies Record<
  ReleaseSlug,
  { titleKey: TranslationKey; summaryKey: TranslationKey }
>;
