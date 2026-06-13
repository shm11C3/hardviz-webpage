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

export const collections = {
  changelog,
  downloadGuide,
  about,
};
