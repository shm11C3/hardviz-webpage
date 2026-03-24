# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website for [HardwareVisualizer](https://github.com/shm11C3/HardwareVisualizer), a free open-source hardware monitoring tool. Built with Astro (static site generation) + React islands, deployed to Cloudflare Workers.

## Commands

```bash
pnpm install --frozen-lockfile  # Install dependencies (pnpm only, Node >=24 required)
pnpm dev                        # Dev server with hot reload
pnpm build                      # Production build (static HTML to dist/)
pnpm preview                    # Preview production build locally (port 4321)
pnpm lint                       # Lint with Biome
pnpm format                     # Auto-fix formatting and lint issues
pnpm check                      # Type check Astro/TS files (astro check)
pnpm lint:ci                    # Stricter CI lint check
pnpm test:e2e                   # Playwright E2E tests (requires build + preview server)
npx playwright test tests/home.spec.ts           # Run a single test file
npx playwright test -g "test name"               # Run tests matching a pattern
```

## Architecture

**Framework**: Astro 6 with static output (`output: "static"`). Pages are pre-rendered at build time. React components use Astro's island architecture (`client:visible`, `client:only`) for client-side interactivity only where needed.

**Routing**: File-based via `src/pages/`. Trailing slashes are always enforced (`trailingSlash: "always"`).

**i18n**: English (default) and Japanese. English pages live at root (`/`, `/faq/`), Japanese under `/ja/` prefix. The default language prefix is hidden (`showDefaultLang: false` in `src/i18n/ui.ts`). All translation strings are in `src/i18n/ui.ts`. Each localized page is a separate Astro file (e.g., `src/pages/faq.astro` and `src/pages/ja/faq.astro`). Use `useTranslations(lang)` and `useTranslatedPath(lang)` from `src/i18n/utils.ts`.

**Content Collections**: Changelog entries are MDX files in `src/content/changelog/{en,ja}/`. Schema defined in `src/content.config.ts`. Dynamic routes via `src/pages/changelog/[version].astro`.

**Data Fetching**: GitHub release data is fetched at build time in `src/funcs/fetchReleaseData.ts`. In non-production mode (`!process.env.PRODUCTION`), mock data from `mocks/` is used. Cached to `.cache/github-release.json`.

**Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin. Dark mode via `class` strategy. Biome enforces sorted Tailwind classes (`useSortedClasses` rule). Use `cn()` from `src/lib/utils.ts` for conditional class merging (clsx + tailwind-merge).

**Code Quality**: Biome handles both linting and formatting (2-space indent). Some lint rules are relaxed for `.astro` files (see `biome.json` overrides). No unused imports/variables allowed in `.ts`/`.tsx` files.

**Deployment**: Cloudflare Workers via Wrangler. Build produces static assets in `dist/` with a `_worker.js` asset ignore marker.

## Key Conventions

- Package manager is **pnpm** exclusively (npm is blocked via engine config)
- Astro components (`.astro`) for static content; React (`.tsx`) only for interactive islands
- All new user-facing text must have translations in both `en` and `ja` in `src/i18n/ui.ts`
- E2E tests in `tests/` run against the preview server on port 4321
