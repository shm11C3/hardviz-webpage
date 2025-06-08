import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);
console.log("[BUILD INFO] NODE_ENV:", process.env.NODE_ENV);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  output: "static",
});
