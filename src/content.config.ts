import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/changelog" }),
  schema: z.object({
    lang: z.enum(["en", "ja"]),
    version: z.string().min(1),
    date: z.coerce.date(),
    title: z.string().min(1),
    summary: z.string().optional(),
    highlights: z.array(z.string().trim().min(1)).default([]),
    tags: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.url(),
        }),
      )
      .default([]),
  }),
});

const downloadGuide = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/download-guide" }),
  schema: z.object({
    lang: z.enum(["en", "ja"]),
    section: z.enum(["source-check", "installation", "verification"]),
    title: z.string().min(1),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/about" }),
  schema: z.object({
    lang: z.enum(["en", "ja"]),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
    tagline: z.string().min(1),
  }),
});

const privacy = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/privacy" }),
  schema: z.object({
    lang: z.enum(["en", "ja"]),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
    tagline: z.string().min(1),
  }),
});

/**
 * Long-form pages written as prose: the guide, the security and data page,
 * the Cooling Insight explainer, and the comparison. `basedOn` names the
 * application release the page describes.
 */
const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/pages" }),
  schema: z.object({
    lang: z.enum(["en", "ja"]),
    // Named `page`, not `slug`: the loader reserves `slug` for the entry id,
    // which would make the two languages collide.
    page: z.enum(["guide", "security", "cooling-insight", "compare"]),
    title: z.string().min(1),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
    lead: z.string().min(1),
    basedOn: z.string().min(1),
    updated: z.coerce.date(),
  }),
});

export const collections = {
  pages,
  changelog,
  downloadGuide,
  about,
  privacy,
};
