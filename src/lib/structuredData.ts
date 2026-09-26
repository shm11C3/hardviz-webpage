import type { ui } from "../i18n/ui";
import { useTranslatedPath } from "../i18n/utils";
import { AUTHOR_HANDLE, AUTHOR_PROFILE_URL, authorSameAs } from "./author";

/**
 * Centralized schema.org entity identifiers and builders for JSON-LD structured data.
 *
 * A single Organization / Person / WebSite graph is emitted on every page from the
 * layout. Page-level nodes (e.g. SoftwareApplication, ProfilePage) link back to these
 * entities by `@id`, so Google resolves one coherent entity graph rather than
 * disconnected nodes. `sameAs` ties the project and its author to their off-site
 * footprint (GitHub, X), the primary entity-disambiguation signal for
 * E-E-A-T / authoritativeness.
 */

const SITE_URL = "https://hardviz.com";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Reference objects to link entities by `@id` from other JSON-LD nodes. */
export const organizationRef = { "@id": ORGANIZATION_ID } as const;
export const personRef = { "@id": PERSON_ID } as const;

const orgDescription = {
  en: "Free, lightweight, open-source hardware monitoring tool for Windows, macOS, and Linux.",
  ja: "Windows、macOS、Linux向けの無料・軽量・オープンソースのハードウェアモニタリングツール。",
};

const siteDescription = {
  en: "Lightweight open-source hardware monitoring tool for real-time CPU, GPU, and memory tracking",
  ja: "CPU、GPU、メモリをリアルタイムで監視する軽量オープンソースのハードウェアモニタリングツール",
};

const personDescription = {
  en: "Indie developer and creator of HardwareVisualizer, building open-source desktop tools with Rust and TypeScript.",
  ja: "個人開発者 / HardwareVisualizer 作者。Rust と TypeScript でオープンソースのデスクトップツールを作っています。",
};

const personJobTitle = {
  en: "Software developer",
  ja: "ソフトウェア開発者",
};

const aboutPageName = {
  en: "About HardwareVisualizer",
  ja: "HardwareVisualizer について",
};

/**
 * Base entity graph (Organization, Person, WebSite) emitted on every page.
 * `lang` selects localized descriptions and `inLanguage`.
 */
export function buildBaseGraph(lang: keyof typeof ui) {
  const isJa = lang === "ja";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "HardwareVisualizer",
    url: SITE_URL,
    logo: `${SITE_URL}/app-icon.png`,
    description: isJa ? orgDescription.ja : orgDescription.en,
    founder: personRef,
    sameAs: [
      "https://github.com/shm11C3/HardwareVisualizer",
      "https://github.com/shm11C3",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR_HANDLE,
    // The on-site About page is the canonical home of the author entity; GitHub and
    // the other profiles remain in `sameAs` for off-site disambiguation.
    url: AUTHOR_PROFILE_URL,
    mainEntityOfPage: AUTHOR_PROFILE_URL,
    jobTitle: isJa ? personJobTitle.ja : personJobTitle.en,
    description: isJa ? personDescription.ja : personDescription.en,
    sameAs: authorSameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "HardwareVisualizer",
    url: SITE_URL,
    description: isJa ? siteDescription.ja : siteDescription.en,
    inLanguage: isJa ? "ja" : "en",
    publisher: organizationRef,
  };

  return [organization, person, website];
}

/**
 * AboutPage node for the /about page. The page is primarily about the project
 * (Organization), and also describes its developer (Person); both are referenced
 * by `@id` so the page ties into the central entity graph.
 */
export function buildAboutPage(lang: keyof typeof ui) {
  const isJa = lang === "ja";
  // useTranslatedPath is an i18n path helper, not a React hook.
  // biome-ignore lint/correctness/useHookAtTopLevel: not a React hook
  const { translatePath } = useTranslatedPath(lang);
  const aboutUrl = new URL(translatePath("/about"), `${SITE_URL}/`).href;

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${aboutUrl}#aboutpage`,
    url: aboutUrl,
    name: isJa ? aboutPageName.ja : aboutPageName.en,
    inLanguage: isJa ? "ja" : "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: organizationRef,
    about: [organizationRef, personRef],
  };
}

const breadcrumbHome = {
  en: "Home",
  ja: "ホーム",
};

export interface ReleaseArticleInput {
  /** Absolute canonical URL of the article. */
  url: string;
  headline: string;
  description: string;
  /** Product version the article announces, e.g. "1.11.0". */
  version: string;
  /** ISO date (YYYY-MM-DD); omitted from the node when not yet published. */
  datePublished?: string | null;
  /** Absolute URL of the article's share image. */
  image?: string;
}

/**
 * TechArticle + BreadcrumbList for a release article page. The article links back
 * to the central Person / Organization / WebSite entities by `@id` and names the
 * product it is about, so search engines file it under the same entity graph as
 * the homepage SoftwareApplication node.
 */
export function buildReleaseArticle(
  lang: keyof typeof ui,
  input: ReleaseArticleInput,
) {
  const isJa = lang === "ja";
  const { url, headline, description, version, datePublished, image } = input;

  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline,
    description,
    inLanguage: isJa ? "ja" : "en",
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    ...(image ? { image } : {}),
    author: personRef,
    publisher: organizationRef,
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "SoftwareApplication",
      name: "HardwareVisualizer",
      url: `${SITE_URL}/`,
      softwareVersion: version,
      publisher: organizationRef,
    },
  };

  const homeUrl = isJa ? `${SITE_URL}/ja/` : `${SITE_URL}/`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isJa ? breadcrumbHome.ja : breadcrumbHome.en,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: headline,
        item: url,
      },
    ],
  };

  return [article, breadcrumb];
}
