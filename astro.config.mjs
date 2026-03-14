import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

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
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", ja: "ja-JP" },
      },
    }),
    partytown({
      config: { forward: ["dataLayer.push", "gtag"] },
    }),
    mdx(),
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
  ],
});
