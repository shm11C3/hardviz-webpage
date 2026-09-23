# リリースブログの作成

v1.11.0で採用した構成を、次回以降のリリースでも利用するためのガイド。
この形式は**対象バージョンのリリースと同時に公開**する。既存のMDX更新履歴は変更点の一覧、リリースブログは主要機能の使い方や価値を説明するページとして使い分ける。

## 共通部分と記事ごとの部分

- `src/layouts/ReleaseLayout.astro`: サイトのヘッダー・フッター、Hero、目次、末尾CTA、SEOの共通枠。
- `src/styles/release-article.css`: リリース記事内に限定した文字組み・余白・日英/モバイル/ダーク表示。
- `src/components/releases/ReleaseScreenshot.astro`: 任意のスクリーンショット。`placeholder`を指定すると、リンクなしの仮画像と説明を表示する。
- `src/components/releases/CoolingRelease.astro`: v1.11.0固有の本文・説明図。今後の記事が冷却Insightの構成や図に依存する必要はない。
- `docs/templates/release-page.astro.txt`: 次の記事の出発点。公開ルート外に置いた編集用テンプレート。

`ReleaseLayout`は製品名・バージョンを示す`releaseLabel`、見出しなどの文字列と目次の項目を受け取り、本文を通常のAstroのslotで挿入する。独自のデータ形式や汎用セクション定義は増やさず、各記事で必要なHTMLを書けるようにしている。

## 新しい記事を作る

1. `docs/templates/release-page.astro.txt`をコピーして、`src/pages/releases/<slug>.astro`と`src/pages/ja/releases/<slug>.astro`を作る。日本語ページでは`lang`を`ja`、相対importを`../../../`へ変更する。URLは公開後も維持できるものを選ぶ。
2. `src/i18n/ui.ts`の日英それぞれに、記事専用のキーを追加する。たとえば`release.v1_12_0.*`。既存のv1.11.0用`release.*`を上書きしない。テンプレートの`release.NEW.*`を専用キーへ変更する。
3. 記事が長い場合は本文を`src/components/releases/<ReleaseName>.astro`へ分離し、日英のページから共有する。v1.11.0の2ページを実例として参照できる。
4. `sections`の`id`と本文のsection IDを一致させる。記事ごとに項目を増減してよい。空配列なら目次を表示しない。
5. 対象の更新履歴ができたら、`changelogHref={translatePath("/changelog/<version>")}`を指定する。省略時は日英の更新履歴一覧につながる。ダウンロードは共通のダウンロードページにつながる。
6. 公開時にホーム告知とフッターのリンク先・文言を更新する。以前の記事は残す。サイトマップ・canonical・hreflangは既存のサイト設定と共通Layoutから生成される。

## 内容の基本形

- Hero: 製品名・バージョン（例: `HardwareVisualizer v1.11.0`）をラベルにし、主な機能の価値が伝わる見出しを置く。導入文は主な変更を2〜3文で説明する。
- メイン機能: 何ができるか、どんな場面で役立つか。必要なら画面を添える。
- 補助的な変更: 主役より短く扱う。
- 技術詳細: `details` / `summary`で折りたたむ。
- FAQ: 実際の利用条件や迷いやすい点だけを掲載する。不要なら省略する。
- 末尾CTA: 短い紹介文とダウンロード・更新履歴。

誇張した標語、未測定の性能数値、未確認の対応機種は追加しない。実装・Issue・公開するビルドを根拠にする。開発中の懸念や公開前の確認項目は制作メモに残し、公開原稿と混在させない。公開日に提供されない機能は原稿から外す。

## スクリーンショットの追加

スクリーンショットはユーザーが必要に応じて追加する。現在は冷却Insightの比較説明の直後に、グレーの仮画像を配置している。製品画面の画像取得・生成はしていない。

1. 画像を`src/assets/releases/<version>/`へ置く。画像内のユーザー名・ファイルパス・シリアル番号など、公開しない情報を確認する。
2. `ui.ts`に日英の`alt`と`caption`を追加する。画面の見どころを簡潔に説明し、テストデータの場合はその旨をcaptionに明記する。
3. 記事のAstro frontmatterで画像をimportする。既存の仮画像の`src`とalt/captionを差し替え、`placeholder`属性を削除する。新しい箇所には以下の例で追加できる。

以下は`src/pages/releases/<slug>.astro`に直接追加する場合の例。

```astro
---
import screenshot from "../../assets/releases/1.11.0/cooling-ja.png";
import ReleaseScreenshot from "../../components/releases/ReleaseScreenshot.astro";
// lang / t は記事で既に定義されているものを使用する。
---

<ReleaseScreenshot
  src={screenshot}
  alt={t("release.screenshot.alt")}
  caption={t("release.screenshot.caption")}
/>
```

`src/pages/ja/releases/<slug>.astro`では、画像を`../../../assets/releases/1.11.0/cooling-ja.png`、部品を`../../../components/releases/ReleaseScreenshot.astro`からimportする。`CoolingRelease.astro`のように`src/components/releases/`内の部品へ追加する場合は、画像が`../../assets/releases/1.11.0/cooling-ja.png`、部品が`./ReleaseScreenshot.astro`になる。

上記の画像パスと翻訳キーは追加時に作成する例であり、現時点では存在しない。日本語・英語の画像を用意する場合は両方をimportし、`src={lang === "ja" ? screenshotJa : screenshotEn}`で切り替える。片方の言語の画面を共用する場合はcaptionでその言語を伝える。

画像はAstroで最適化し、縦横比を保持して表示する。画像を押すと元画像を表示する。主な機能の説明直後に、`.feature-row`の外で横幅を使って配置すると文字が読みやすい。v1.11.0なら冷却Insightの最初の比較説明の直後が候補。説明図を置き換えるか併用するかは、画像が伝える内容に応じて判断する。

## 表示用クラス

| クラス | 用途 |
| --- | --- |
| `release-section` | 主な機能のセクション |
| `section-name` | 機能名などの短い導入 |
| `feature-row` / `feature-copy` | 説明と図などの2列。モバイルで1列 |
| `small-note` | データ条件・制約の補足 |
| `observation-note` | 読み方などの補足説明 |
| `supporting-section` / `foundation-grid` | 補助的な変更の説明 |
| `faq-section` | 見出しとFAQの2列 |

CSSは`.release-page`配下に限定し、他のページには適用しない。機能固有の図や表のCSSは記事の部品側で管理する。

## 公開前の確認

- バージョン、提供機能、ダウンロード先、更新履歴を対象リリースと一致させる。
- 日英の内容と画像のalt/caption、目次リンク、折りたたみ操作を確認する。
- デスクトップ・スマートフォン・ダーク表示を確認する。
- `pnpm lint:ci`、`pnpm check`、`pnpm build`を実行し、関連する既存E2Eを確認する。
