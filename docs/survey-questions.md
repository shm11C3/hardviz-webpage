# User Survey — question copy (paste into Tally)

Final copy for the HardwareVisualizer user survey. Build **two separate Tally
forms** — one English, one Japanese — and embed them on `/survey` and
`/ja/survey` respectively (see `src/lib/survey.ts`).

## Tally setup (applies to both forms)

- **Hidden fields** — add six hidden fields with these exact keys (they are
  populated automatically from the embed URL query params; keep the keys
  identical across both forms):
  - `app_version` — app release the respondent runs (e.g. `1.8.1`); sent by the app
  - `os` — `windows` | `macos` | `linux`
  - `source` — entry point: `app` | `web`
  - `locale` — `en` | `ja`
  - `utm_source` — site page the link sits on: `changelog` | `release`
  - `utm_content` — release that page describes (e.g. `1.12.0`), not
    necessarily the version the respondent runs
- **Required:** only Q1 (satisfaction). Q2 and Q3 are optional, so a star
  rating alone is a complete response.
- Keep the **option order identical** between EN and JA so the two datasets line
  up during analysis.
- The free-text answers (Q3) are the ones to triage into GitHub issues.
- There is no contact question: responses stay anonymous.
- After creating each form, copy its form ID into `surveyFormIds` in
  `src/lib/survey.ts`.

---

## Japanese form（日本語フォーム）

Copied from the live form.

**イントロ / ようこそ:**
> HardwareVisualizerをご利用いただきありがとうございます！
> **匿名・約30秒。星評価だけでも大歓迎です。**
> あなたの声が今後の開発に役立ちます。集計結果を公開する場合がありますが、個人を特定する情報は公開しません。

**Q1. HardwareVisualizerの満足度は？**
_形式: 星評価（5段階） · **必須**_

**Q2. 最も気に入っている点は？（任意）**
_形式: 選択式 · 任意_
- 軽量・低リソース消費
- UI・デザイン
- ハードウェア監視機能
- 長期履歴・Insights
- カスタマイズ性
- その他

**Q3. 改善してほしいことは？（任意）**
_形式: 長文 · 任意_
_プレースホルダー: 不満点、バグ、追加してほしい機能など、何でも。_

---

## English form

Same three questions in the same order as the Japanese form. The wording
below is a translation; when the live English form differs, the live form is
the source of truth and this section should be updated to match it.

**Intro / welcome:**
> Thanks for using HardwareVisualizer!
> **Anonymous, about 30 seconds. A star rating alone is welcome.**
> Your feedback helps shape what comes next. Aggregated results may be shared
> publicly; we never publish anything that identifies you.

**Q1. How satisfied are you with HardwareVisualizer?**
_Type: Rating (5 stars) · **Required**_

**Q2. What do you like most? (optional)**
_Type: Choice · Optional_
- Lightweight, low resource use
- UI and design
- Hardware monitoring
- Long-term history and Insights
- Customization
- Other

**Q3. What should be improved? (optional)**
_Type: Long text · Optional_
_Placeholder: Anything: complaints, bugs, features you'd like to see._
