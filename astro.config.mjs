import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);

const robots =
  process.env.PRODUCTION === "true"
    ? {
        policy: [
          {
            userAgent: "*",
            allow: "/",
          },
        ],
      }
    : {
        policy: [
          {
            userAgent: "*",
            disallow: "/",
          },
        ],
      };

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx(), robotsTxt(robots)],
  adapter: cloudflare(),
  output: "static",
});
