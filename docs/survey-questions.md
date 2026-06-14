# User Survey — question copy (paste into Tally)

Final copy for the HardwareVisualizer user survey. Build **two separate Tally
forms** — one English, one Japanese — and embed them on `/survey` and
`/ja/survey` respectively (see `src/lib/survey.ts`).

## Tally setup (applies to both forms)

- **Hidden fields** — add four hidden fields with these exact keys (they are
  populated automatically from the embed URL query params; keep the keys
  identical across both forms):
  - `app_version` — app release (e.g. `1.8.1`)
  - `os` — `windows` | `macos` | `linux`
  - `source` — entry point: `app` | `web`
  - `locale` — `en` | `ja`
- **Required:** only Q6 (satisfaction) and Q7 (continuation). Everything else is
  optional.
- **"Other":** for the multi-select questions (Q2, Q3), enable Tally's built-in
  **Other** option so respondents can add their own text.
- Keep the **option order identical** between EN and JA so the two datasets line
  up during analysis.
- The free-text answers (Q4, Q5) are the ones to triage into GitHub issues.
- After creating each form, copy its form ID into `surveyFormIds` in
  `src/lib/survey.ts`.

---

## English form

**Title:** HardwareVisualizer — User Survey

**Intro / welcome:**
> Thanks for using HardwareVisualizer! This short, anonymous survey takes about
> 2–3 minutes and helps decide what to build next. Most questions are optional —
> answer what you like. Aggregated results may be shared publicly; we never
> publish anything that identifies you.

**Q1. How long have you been using HardwareVisualizer?**
_Type: Multiple choice (single) · Optional_
- Less than 1 month
- 1–6 months
- 6–12 months
- More than 1 year

**Q2. Why do you use HardwareVisualizer? (Select all that apply)**
_Type: Checkboxes (multiple) + Other · Optional_
- It's lightweight / low resource usage
- It's free
- It's open source
- Clean, easy-to-read UI
- Historical / long-term data
- Cross-platform (Windows / macOS / Linux)
- An alternative to Task Manager / HWiNFO
- Monitoring during gaming
- Other …

**Q3. Which features do you use most? (Select all that apply)**
_Type: Checkboxes (multiple) + Other · Optional_
- Real-time CPU / RAM / GPU graphs
- Detailed GPU metrics (temperature, clock, usage)
- 30-day history / usage timeline
- Process tracking (finding high-load processes)
- Appearance customization (colors, borders, legends)
- Custom wallpaper / background image
- Background running (e.g. during gaming)
- Other …

**Q4. Anything that bothered you or got in your way?**
_Type: Long text · Optional_
_Helper text: Bugs, confusing UI, missing platform support — anything._

**Q5. What features or improvements would you like to see?**
_Type: Long text · Optional_

**Q6. Overall, how satisfied are you with HardwareVisualizer?**
_Type: Multiple choice (single) · **Required**_
- Very satisfied
- Satisfied
- Neutral
- Dissatisfied
- Very dissatisfied

**Q7. Do you plan to keep using HardwareVisualizer?**
_Type: Multiple choice (single) · **Required**_
- Yes
- No
- Not sure

**Q8. Contact (optional)**
_Type: Short text · Optional_
_Helper text: If you're open to follow-up questions, leave a GitHub username or
email. Totally optional — leave it blank to stay anonymous._

**Thank-you screen:**
> Thanks for helping shape HardwareVisualizer! 🙌 Your feedback goes straight
> into deciding what we build next. Follow updates on GitHub.

---

## Japanese form（日本語フォーム）

**イントロ / ようこそ:**
> HardwareVisualizer をご利用いただきありがとうございます！この匿名アンケートは
> 約2〜3分で回答できます。いただいた声は、次に作るものを決める助けになります。
> ほとんどの設問は任意です。集計結果を公開する場合がありますが、あなたを
> 特定する情報を公開することはありません。

**Q1. HardwareVisualizer をどのくらい使っていますか？**
_形式: 単一選択 · 任意_
- 1ヶ月未満
- 1〜6ヶ月
- 半年〜1年
- 1年以上

**Q2. HardwareVisualizer を使う理由は？（当てはまるものすべて）**
_形式: 複数選択 + その他 · 任意_
- 軽量・リソース消費が少ない
- 無料
- オープンソース
- UIが見やすい・きれい
- 履歴・長期データ
- クロスプラットフォーム（Windows / macOS / Linux）
- タスクマネージャー / HWiNFO の代替
- ゲーム中の監視
- その他 …

**Q3. よく使う機能は？（当てはまるものすべて）**
_形式: 複数選択 + その他 · 任意_
- リアルタイムの CPU / RAM / GPU グラフ
- GPU の詳細（温度・クロック・使用率）
- 30日間の履歴 / 使用状況タイムライン
- プロセス追跡（高負荷プロセスの特定）
- 外観カスタマイズ（色・枠・凡例）
- カスタム壁紙 / 背景画像
- バックグラウンド常駐（ゲーム中など）
- その他 …

**Q4. 使っていて気になった点・困った点はありますか？**
_形式: 長文 · 任意_
_補足: バグ、分かりにくいUI、対応してほしい環境など、何でも。_

**Q5. 追加してほしい機能や改善はありますか？**
_形式: 長文 · 任意_

**Q6. HardwareVisualizer の総合的な満足度は？**
_形式: 単一選択 · **必須**_
- とても満足
- 満足
- どちらでもない
- 不満
- とても不満

**Q7. 今後も HardwareVisualizer を使い続けたいと思いますか？**
_形式: 単一選択 · **必須**_
- はい
- いいえ
- まだわからない

**Q8. 連絡先（任意）**
_形式: 短文 · 任意_
_補足: 追加で質問してもよい方は、GitHub ユーザー名かメールアドレスをご記入ください。
任意です。空欄なら匿名のままです。_

**完了画面:**
> ご協力ありがとうございました！🙌 いただいた声は、次に作るものを決めるのに
> そのまま役立てます。最新情報は GitHub で。
