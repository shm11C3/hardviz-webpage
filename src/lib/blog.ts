import { blogPosts } from "../data/blogPosts";
import { type ReleaseSlug, releaseArticles } from "../data/releases";
import type { ui } from "../i18n/ui";
import { useTranslatedPath, useTranslations } from "../i18n/utils";

/** Release articles for the blog index, newest version first. */
export function getBlogPosts(lang: keyof typeof ui) {
  // useTranslations and useTranslatedPath are i18n helpers, not React hooks.
  // biome-ignore lint/correctness/useHookAtTopLevel: not a React hook
  const t = useTranslations(lang);
  // biome-ignore lint/correctness/useHookAtTopLevel: not a React hook
  const { translatePath } = useTranslatedPath(lang);

  return (Object.keys(releaseArticles) as ReleaseSlug[])
    .map((slug) => ({
      version: releaseArticles[slug].version,
      publishedAt: releaseArticles[slug].publishedAt,
      href: translatePath(`/releases/${slug}`),
      title: t(blogPosts[slug].titleKey),
      summary: t(blogPosts[slug].summaryKey),
    }))
    .sort((a, b) =>
      b.version.localeCompare(a.version, undefined, { numeric: true }),
    );
}
