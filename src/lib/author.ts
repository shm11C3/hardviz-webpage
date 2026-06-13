/**
 * Author profile data for shm11C3, shared across the About page, the footer, and
 * the homepage SoftwareApplication JSON-LD. Keeping the handles/links in one place
 * avoids drift between the visible UI and the structured-data `sameAs` signal.
 *
 * Only the handle is published — real name / affiliation are intentionally omitted.
 */

const SITE_URL = "https://hardviz.com";

export const AUTHOR_HANDLE = "shm11C3";

/** Canonical on-site home of the author entity (absolute, for JSON-LD). */
export const AUTHOR_PROFILE_URL = `${SITE_URL}/about/`;

export const authorLinks = {
  github: "https://github.com/shm11C3",
  x: "https://x.com/shm11C3",
} as const;

/** schema.org `sameAs` — off-site profiles that disambiguate the author entity. */
export const authorSameAs = [authorLinks.github, authorLinks.x];

/**
 * Email split + reversed for light obfuscation. The visible `mailto:` is assembled
 * client-side (see About.astro), so the plain address never appears in page source
 * and is kept out of JSON-LD entirely. Reverses to `m11c3.sh@gmail.com`.
 */
export const authorEmailParts = {
  user: "hs.3c11m",
  domain: "moc.liamg",
} as const;
