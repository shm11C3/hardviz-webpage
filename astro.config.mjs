import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);
console.log("[DEBUG] CF_PAGES_URL:", process.env.CF_PAGES_URL);
console.log("[DEBUG] CF_PAGES_BRANCH:", process.env.CF_PAGES_BRANCH);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  output: "static",
});
