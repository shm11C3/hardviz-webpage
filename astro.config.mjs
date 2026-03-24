import fs from "node:fs";
import path from "node:path";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

/** Build a map of changelog URL paths → lastmod dates from MDX frontmatter */
function buildChangelogLastmodMap() {
  const dir = path.resolve("src/content/changelog/en");
  const map = new Map();
  let latest = new Date(0);
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    const versionMatch = content.match(/^version:\s*(.+)$/m);
    const dateMatch = content.match(/^date:\s*(.+)$/m);
    if (versionMatch && dateMatch) {
      const version = versionMatch[1].trim();
      const date = new Date(dateMatch[1].trim());
      map.set(`/changelog/${version}/`, date);
      map.set(`/ja/changelog/${version}/`, date);
      if (date > latest) latest = date;
    }
  }
  // Index pages use the latest entry date
  map.set("/changelog/", latest);
  map.set("/ja/changelog/", latest);
  return map;
}

const changelogLastmod = buildChangelogLastmodMap();

/** Post-build: inject <lastmod> into sitemap-index.xml */
function sitemapIndexLastmod() {
  return {
    name: "sitemap-index-lastmod",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const filePath = new URL("sitemap-index.xml", dir);
        const xml = fs.readFileSync(filePath, "utf-8");
        const latest = [...changelogLastmod.values()].reduce(
          (a, b) => (a > b ? a : b),
          new Date(0),
        );
        const lastmod = `<lastmod>${latest.toISOString()}</lastmod>`;
        const patched = xml.replace(/<\/loc>/g, `</loc>${lastmod}`);
        fs.writeFileSync(filePath, patched);
      },
    },
  };
}

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);
console.log("[BUILD INFO] NODE_ENV:", process.env.NODE_ENV);

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://hardviz.com",
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        const lastmod = changelogLastmod.get(url.pathname);
        if (lastmod) {
          item.lastmod = lastmod.toISOString();
        }
        return item;
      },
      namespaces: { news: false, image: false, video: false },
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", ja: "ja-JP" },
      },
    }),
    partytown({
      config: { forward: ["dataLayer.push", "gtag"] },
    }),
    mdx(),
    sitemapIndexLastmod(),
  ],
  output: "static",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: [400, 500, 600, 700, 800],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans JP",
      cssVariable: "--font-noto-sans-jp",
      weights: [400, 500, 700],
      styles: ["normal"],
      subsets: ["japanese"],
    },
  ],
});
