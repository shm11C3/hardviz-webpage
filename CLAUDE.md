# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website for [HardwareVisualizer](https://github.com/shm11C3/HardwareVisualizer), a free open-source hardware monitoring tool. Built with Astro (static site generation) + React islands, deployed to Cloudflare Pages.

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

**Prose pages**: The guide, security and data, Cooling Insight, and comparison pages are MDX files in `src/content/pages/{en,ja}/`, served by `src/pages/[page].astro` (and `src/pages/ja/[page].astro`) through `src/components/DocPage.astro`. The frontmatter field that names the page is `page`, not `slug`: the loader reserves `slug` for the entry id, which would make the two languages collide. `basedOn` is the application release the page describes. Headings become anchors; where an anchor must be the same in both languages (`/security/#network`), put `<a id="..."></a>` before the heading in the file whose heading slug differs.

**Home page**: `Hero.astro` holds the headline, the download buttons, the application screenshot in a translucent frame whose three tabs (Performance, Insights, Cooling Insight) switch the image, and the facts strip (version, platforms, license, price). Then `Screens.astro` (one row per application screen, with the period that screen displays), `PlatformMatrix.astro`, `Trust.astro`, the `Download.tsx` island, `Feedback.astro`, and `FAQPreview.astro`. Home sections start with a centred `.section-head`.

**Feeds**: `/changelog/rss.xml` and `/ja/changelog/rss.xml` are built by `src/lib/changelogFeed.ts`.

**Data Fetching**: GitHub release data is fetched at build time in `src/funcs/fetchReleaseData.ts`. In non-production mode (`!process.env.PRODUCTION`), mock data from `mocks/` is used. Cached to `.cache/github-release.json`.

**Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin. Dark mode via `class` strategy. The design language is "wallpaper and glass", defined in `src/styles/global.css`: one wallpaper drawn with gradients stays fixed behind the page (`body::before`), and content sits on translucent panels above it. It keeps the mood of the application (navy ground, darker rounded panels, the three chart colours) without copying its tokens or components. The three series colours mark the three screens: `--live` (teal, Performance), `--record` (pink, Insights) and `--notice` (yellow, Cooling Insight), available as `text-live` / `text-record` / `text-notice`. Everything else uses the neutral tokens (`bg-background`, `text-foreground`, `text-soft`, `text-muted-foreground`, `border-border`, `border-input`, `bg-primary`, `bg-muted`). Shared classes: `.shell` (page column), `.section`, `.section-head` (centred heading block), `.section-title`, `.lead`, `.panel` (translucent panel) with `.panel-label`, `.badge`, `.rows`, `.btn` with `.btn-primary` / `.btn-outline` (pills), `.data-table`, `.note`, `.link`. The header is a floating translucent pill. Type is Noto Sans JP for both languages (its Latin glyphs set the English pages); code uses the system monospace font. The palette and components are the site's own; do not copy tokens or components from the application's CSS.

**Code Quality**: Biome handles both linting and formatting (2-space indent). Some lint rules are relaxed for `.astro` files (see `biome.json` overrides). No unused imports/variables allowed in `.ts`/`.tsx` files.

**Deployment**: Cloudflare Pages (project `hardviz-webpage`) via its Git integration: pushes to `master` deploy to production at hardviz.com, and other branches get preview deployments. Pages runs `pnpm build` and serves the static `dist/` output. Response headers and redirects are configured in `public/_headers` and `public/_redirects` (Pages syntax); `astro preview` does not apply them, so check them on a Pages preview deployment.

## Key Conventions

- Package manager is **pnpm** exclusively (npm is blocked via engine config)
- Astro components (`.astro`) for static content; React (`.tsx`) only for interactive islands
- All new user-facing text must have translations in both `en` and `ja` in `src/i18n/ui.ts`
- E2E tests in `tests/` run against the preview server on port 4321
- Headings are plain: the product name, the application's screen names, or a noun ("Download", "Security and data"). No slogans, no three-beat phrases, and no Japanese headings split in two by a comma (「XX、YY」)
- Copy states facts only, and describes the released version of the app, not `develop`. Check claims against the app repository at the release tag before writing them; use the app's own interface labels (`src/lang/{en,ja}.json` there) when naming screens and settings
- Japanese text passes through `addJapaneseLineBreaks` (BudouX) with the `budoux-ja` class on its container, so lines break between phrases
