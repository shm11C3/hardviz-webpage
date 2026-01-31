import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
  integrations: [react(), sitemap(), partytown()],
  output: "static",
});
