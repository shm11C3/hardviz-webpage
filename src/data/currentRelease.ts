import type { ui } from "../i18n/ui";

type TranslationKey = keyof typeof ui.en;

export const currentRelease = {
  slug: "cooling-insight",
  navKey: "release.nav",
  announcementKey: "release.announcement",
} as const satisfies {
  slug: string;
  navKey: TranslationKey;
  announcementKey: TranslationKey;
};
