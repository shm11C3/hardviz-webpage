import { useTranslatedPath, useTranslations } from "../i18n/utils";
import {
  type ChangelogLang,
  getChangelogEntries,
  getChangelogEntriesForJaIndex,
} from "./changelog";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

/**
 * Builds the RSS 2.0 feed of changelog entries for one language. The Japanese
 * feed falls back to the English entry for versions not translated yet, the
 * same way the Japanese changelog index does.
 */
export async function buildChangelogFeed(
  lang: ChangelogLang,
  site: URL,
): Promise<string> {
  // useTranslations and useTranslatedPath are i18n helpers, not React hooks.
  // biome-ignore lint/correctness/useHookAtTopLevel: not a React hook
  const t = useTranslations(lang);
  // biome-ignore lint/correctness/useHookAtTopLevel: not a React hook
  const { translatePath } = useTranslatedPath(lang);
  const entries =
    lang === "ja"
      ? (await getChangelogEntriesForJaIndex()).map(({ entry }) => entry)
      : await getChangelogEntries("en");

  const indexUrl = new URL(translatePath("/changelog"), site).href;
  const feedUrl = new URL(`${translatePath("/changelog")}rss.xml`, site).href;

  const items = entries.map((entry) => {
    const url = new URL(translatePath(`/changelog/${entry.data.version}`), site)
      .href;
    return [
      "    <item>",
      `      <title>${escapeXml(`HardwareVisualizer v${entry.data.version}`)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${entry.data.date.toUTCString()}</pubDate>`,
      ...(entry.data.summary
        ? [`      <description>${escapeXml(entry.data.summary)}</description>`]
        : []),
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(t("changelog.feedTitle"))}</title>`,
    `    <link>${escapeXml(indexUrl)}</link>`,
    `    <description>${escapeXml(t("changelog.description"))}</description>`,
    `    <language>${lang}</language>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
