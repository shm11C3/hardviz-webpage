import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);
console.log("[BUILD INFO] NODE_ENV:", process.env.NODE_ENV);

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://hardviz.com',
  integrations: [react(), sitemap(), sitemap()],
  output: "static",
});
