---
name: release-notes
description: >-
  Create a localized changelog / release-notes entry for a new HardwareVisualizer
  version on this website. Use when asked to "add release notes", "create the
  changelog for vX.Y.Z", "リリースノートを作成", or otherwise document a new
  HardwareVisualizer release. Fetches the upstream GitHub release and the PRs it
  references, then writes matching English and Japanese MDX entries under
  src/content/changelog/ following this repo's schema and house style.
---

# Create HardwareVisualizer release notes

This website hosts the changelog for [HardwareVisualizer](https://github.com/shm11C3/HardwareVisualizer).
Each app release gets a localized changelog entry (English **and** Japanese). This skill
turns an upstream GitHub release into those two MDX files.

## Input

The target version, given as either:

- a bare version: `1.9.1`
- a `v`-prefixed version: `v1.9.1`
- a full release URL: `https://github.com/shm11C3/HardwareVisualizer/releases/tag/v1.9.1`

Normalize to a bare `MAJOR.MINOR.PATCH` string (no `v`) for the `version` field and file names;
use the `v`-prefixed form in the `title` and in compare links.

## Where things live

| What | Path |
| --- | --- |
| English entry | `src/content/changelog/en/<version>.mdx` |
| Japanese entry | `src/content/changelog/ja/<version>.mdx` |
| Collection schema | `src/content.config.ts` (the `changelog` collection) |
| Dynamic route | `src/pages/changelog/[version].astro` |
| Top-page "featured version" | `src/config/releaseNotes.ts` (`homeReleaseNotesVersion`) |
| Home-card resolver | `src/lib/homeReleaseNotes.ts` |
| Home E2E test | `tests/home.spec.ts` |

The collection loads via a glob on `src/content/changelog/**/*.mdx`, so a new file is picked
up automatically — there is **no index to edit**.

## Procedure

1. **Resolve the version and source.** Build the release URL
   `https://github.com/shm11C3/HardwareVisualizer/releases/tag/v<version>`.

2. **Read the upstream release notes.** Use `WebFetch` on the release URL to extract the
   title, date, every change bullet, the PR numbers, and the compare link. The auto-generated
   GitHub notes are terse — for anything non-trivial, `WebFetch` each referenced PR
   (`.../HardwareVisualizer/pull/<n>`) to understand what actually changed and why. Describe
   the **final shipped behavior**: if one PR supersedes or reworks another in the same release,
   document the end state, not both contradictory steps.

3. **Match house style.** Read the two or three most recent existing entries in
   `src/content/changelog/en/` and `.../ja/` (e.g. the previous minor and patch) before writing,
   so tone, section headings, and tag style match.

4. **Write both MDX files** using the frontmatter schema and a body template below. English and
   Japanese are both required and must cover the same changes.

5. **Decide on the top-page featured version** — see "homeReleaseNotesVersion" below. Default to
   leaving it unchanged unless the user asks to feature the new version on the top page.

6. **Validate** (see "Validation").

7. **Commit, push, open a PR** as ready for review.

## Frontmatter schema

From `src/content.config.ts`:

```ts
{
  lang: "en" | "ja",        // required, must match the folder
  version: string,           // required, bare e.g. "1.9.1" (NO leading v)
  date: Date,                // required, release date; "YYYY-MM-DD" is fine
  title: string,             // required, e.g. "v1.9.1"
  summary?: string,          // optional but STRONGLY recommended (shown on cards)
  tags: string[],            // defaults to []; include a few
  links?: { label: string; url: string }[], // optional, usually omitted
}
```

Notes:
- `version` is matched by **exact string equality** elsewhere — keep it bare and consistent.
- Recommended: provide a `summary` **and** at least one `tag` on every entry so cards and the
  changelog index render well. The hard *build-time* rule is narrower (at least one of the two
  for the featured version) — see "homeReleaseNotesVersion" and gotchas.

## Body templates

End every entry with a `**Full Changelog**` compare link.

### Feature release (EN)

```mdx
---
lang: en
version: 1.9.0
date: 2026-06-22
title: "v1.9.0"
summary: "One or two sentences describing the headline change(s)."
tags:
  - Release
  - <Feature Name>
  - <Area>
---

## What's Changed

A short intro paragraph framing the release and the headline feature.

A second paragraph with supporting detail, platform notes, or a link to a setup guide.

## <Theme / Area heading>

- Bullet describing a concrete change.
- Another concrete change.

## <Second theme heading>

- More changes grouped by theme.

**Full Changelog**: [v1.8.1...v1.9.0](https://github.com/shm11C3/HardwareVisualizer/compare/v1.8.1...v1.9.0)
```

### Feature release (JA)

```mdx
---
lang: ja
version: 1.9.0
date: 2026-06-22
title: "v1.9.0"
summary: "見出しとなる変更点を1〜2文で説明します。"
tags:
  - リリース
  - <Feature Name>
  - <領域>
---

## 変更内容

リリース全体と目玉機能を説明する短い導入段落。

補足の詳細、プラットフォーム別の注記、セットアップガイドへのリンクなどを書く段落。

## <テーマ / 領域の見出し>

- 具体的な変更点を説明する箇条書き。
- もう一つの具体的な変更点。

## <2つ目のテーマの見出し>

- テーマごとにまとめた変更点。

**Full Changelog**: [v1.8.1...v1.9.0](https://github.com/shm11C3/HardwareVisualizer/compare/v1.8.1...v1.9.0)
```

### Small patch / bug fix

For a tiny release, skip the prose intro and use a single `## Fixed` (EN) / `## 修正` (JA)
section with PR links, e.g.:

```mdx
## Fixed

- fix(gpu): Resolve AMD GPU name mismatch via PCI BDF ([#1268](https://github.com/shm11C3/HardwareVisualizer/pull/1268))
```

```mdx
## 修正

- fix(gpu): ダッシュボードとモニタリング間でAMD GPU名が不一致になる問題をPCI BDFにより修正（[#1268](https://github.com/shm11C3/HardwareVisualizer/pull/1268)）
```

## Japanese style notes

- Match the existing entries: declarative `〜しました` / `〜できるようにしました` bullets.
- Keep product and feature proper nouns in English in both prose and tags
  (e.g. `Storage Health`, `Transparent UI`, `PawnIO`, `macOS`, `Windows`).
- Translate generic words for tags: `Release → リリース`, `Monitoring → 監視`,
  `Reliability → 信頼性`, `Performance → パフォーマンス`, `Bug Fixes → 不具合修正`,
  `Verification → 検証`, `Documentation → ドキュメント`, `Temperature → 温度`.
- Keep the literal `**Full Changelog**:` label in English (as the existing JA entries do).
- If a setup guide is linked, prefer its localized path when one exists
  (e.g. `docs/user/external-components.ja.md`).

## homeReleaseNotesVersion (top-page card)

`src/config/releaseNotes.ts` exports `homeReleaseNotesVersion`. The top-page release-notes
card features that exact version (or, when `null`, the latest downloadable release).

- **Adding notes for a version you also want featured on the top page** → set
  `homeReleaseNotesVersion` to that bare version (e.g. `"1.9.1"`).
- **Adding notes but the top page should keep showing an older version** → leave it unchanged.
- The featured version's changelog entry **must** have at least one of `summary` or `tags`, or
  `getHomeReleaseNotesDetails` (`src/lib/homeReleaseNotes.ts`) throws during build —
  `hasReleaseNotes` checks `Boolean(changesSummary || tags.length)`. Providing both is still
  recommended for a complete-looking card.
- `tests/home.spec.ts` reads this constant directly and asserts the card has a summary **or**
  a tag (`summaryCount + tagCount > 0`), so the home E2E assertion stays in sync automatically —
  no test edit needed when you bump it.

Only change this when the user's intent is clear; otherwise ask.

## Validation

Requires Node >= 24 and pnpm (`pnpm install --frozen-lockfile`). Run:

```bash
pnpm check        # astro check — validates MDX frontmatter against the schema
pnpm lint         # Biome
pnpm build        # full static build; also exercises the home-card resolver
pnpm test:e2e     # Playwright; or: npx playwright test tests/home.spec.ts
```

`pnpm build` is the key gate: it validates the content-collection schema for the new files,
generates `/changelog/<version>/` (+ `/ja/...`), and — if you bumped the featured version —
proves the home card resolves to it. After building you can spot-check:

```bash
# featured version on the home card (both locales)
grep -o 'data-release-notes-version="[^"]*"' dist/index.html dist/ja/index.html
# the new changelog pages exist
ls dist/changelog/<version>/index.html dist/ja/changelog/<version>/index.html
```

## Commit & PR

- Branch, commit the two MDX files (plus `src/config/releaseNotes.ts` only if you bumped it),
  and open a PR as ready for review.
- Suggested commit subject: `feat: add v<version> release notes`.
- All new user-facing text must exist in both `en` and `ja` (repo convention).

## Gotchas

- `version` frontmatter is bare (`1.9.1`), not `v1.9.1`; `title` is `"v1.9.1"`.
- Don't forget the Japanese entry — the build succeeds with only one locale, but the site
  expects both and the JA changelog index falls back to English when a translation is missing.
- The home-card resolver throws only if the *featured* version's entry has **neither** a
  `summary` nor any `tags` (it needs at least one of the two).
- Adding a changelog entry does **not** require touching any index file or route — the glob
  loader and `[version].astro` handle new versions automatically.
