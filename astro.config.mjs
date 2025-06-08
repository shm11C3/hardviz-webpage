import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    buildStart() {
      console.log("[DEBUG] buildStart called");
      console.log("[DEBUG] CF_PAGES_URL:", process.env.CF_PAGES_URL);
      console.log("[DEBUG] CF_PAGES_BRANCH:", process.env.CF_PAGES_BRANCH);
    },
    buildEnd() {
      if (process.env.CF_PAGES_URL === "https://hardviz.com") {
        const robotsDevPath = path.resolve('dist/robots.develop.txt');

        // 開発用の robots.develop.txt が存在する場合は削除
        if (fs.existsSync(robotsDevPath)) {
          fs.unlinkSync(robotsDevPath);
          console.log('robots.develop.txt removed from dist.');
        }
      } else {
        const robotsPath = path.resolve('dist/robots.txt');
        const robotsDevPath = path.resolve('dist/robots.develop.txt');

        // 本番用の robots.txt を削除し、開発用の robots.develop.txt を本番用にリネーム
        if (fs.existsSync(robotsPath)) {
          fs.unlinkSync(robotsPath);
          console.log('robots.txt removed from dist.');
        }

        if (fs.existsSync(robotsDevPath)) {
          fs.renameSync(robotsDevPath, robotsPath);
          console.log('robots.develop.txt renamed to robots.txt in dist.');
        }
      }
    }
  },

  integrations: [react()],
  output: "static",
});
