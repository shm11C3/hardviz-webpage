import { defineCollection, z } from "astro:content";

const changelog = defineCollection({
  type: "content",
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
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  changelog,
};
