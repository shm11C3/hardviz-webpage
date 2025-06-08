import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

console.log("[BUILD INFO] PRODUCTION:", process.env.PRODUCTION);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    buildEnd() {
      if (process.env.SKIP_ROBOTS === 'true') {
        const robotsPath = path.resolve('dist/robots.txt');
        if (fs.existsSync(robotsPath)) {
          fs.unlinkSync(robotsPath);
          console.log('robots.txt removed from dist.');
        }
      }
    }
  },

  integrations: [react()],
  output: "static",
});
