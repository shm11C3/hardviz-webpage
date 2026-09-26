# 次期リリース特設ページ：3つの草案

作成日: 2026-09-23。実装に先立って比較した構成案。

**公開タイミングの訂正**: このページは対象リリースと同時に公開する。以下の草案の「予告」表現は初稿の記録であり、最終ページはリリース済みの紹介として作成した。対象バージョンはユーザー指定のv1.11.0。公開日は未確定のため未記載。実装が完成したことを意味する制作メモではない。

## リリース同時公開のための確認事項

- 対象リリースでCooling Insight・DuckDB移行・PawnIO導入が提供されることを最終ビルドで確認する。特にDuckDBは確認時点で #2090 / #2136 / #2137 がopenであり、公開原稿の現在形は同時リリースを前提とする。
- `/download/` と `/ja/download/` が対象リリースを案内し、日英の更新履歴に対象バージョンを追加し、`/changelog/1.11.0/` と `/ja/changelog/1.11.0/` の表示を確認してから、このページとホーム・フッターの導線を公開する。
- 進捗・キャンセル・復旧など未完了の移行UIを公開原稿で約束しない。製品有効化のIssueや開発状況は制作メモで管理する。
- 完成後の対象リリースで提供範囲が変わった場合は、公開前に本文・メタデータを修正する。


## 案A：同じくらいの負荷で、温度は変わったか（採用）

**見出し**: CPUの温度を、負荷と履歴から読み解く。

**English**: Understand CPU temperature through load and history.

**導入文**: Cooling Insightでは、CPU温度と負荷の推移を見ながら、過去の基準期間と最近の状態を比較できます。対応する環境では、電力やファン回転数も一緒に確認できます。

構成:
- 次回リリース予告と、負荷帯ごとの温度比較を表す説明図。
- 「同じくらいの負荷で比べる」「同じ時間軸で見る」「長期の変化を見る」の順で、Cooling Insightの使い方を紹介。
- データ不足と非対応センサーの扱い、故障診断との違い。
- 履歴を支えるDuckDB移行と、WindowsでのPawnIO導入を補助的に紹介。
- FAQと、公開済みバージョンのダウンロード・更新履歴へのリンク。

視覚設計: 左に短い導入、右に負荷帯比較の説明図。続く本文は段組みを増やさず、説明と図を交互に配置。白と薄い青の面に、基準の青と最近の紫を使う。図は実画面・実測値ではないことを明記する。

利点: Cooling Insight固有の比較方法を伝えやすく、CPU温度・負荷・履歴という検索意図にも対応できる。性能や原因を断定しない説明と両立する。

## 案B：処理が終わったあとに、冷却の記録を振り返る

**見出し**: ゲームや長時間の処理のあと、CPUの温度を振り返る。

**English**: Review CPU temperatures after gaming or a long workload.

**導入文**: 温度が上がった時間に、CPU負荷やファン回転数はどう動いていたか。Cooling Insightで記録を同じ時間軸から確認できます。

構成:
- 温度・負荷・ファン回転数の時間軸を入口にする。
- ゲーム後、レンダリング後、普段より熱く感じた日の3場面を紹介。
- 基準期間との比較と、90日・1年の日次推移へ進む。
- DuckDBとPawnIO、利用条件、公開済み版のダウンロードへ進む。

視覚設計: 横幅を使ったタイムラインを中心に、場面ごとに短い説明を添える。架空のゲーム計測結果は作らず、用途の説明に留める。

留意点: 身近だが既存の履歴機能との差が曖昧になりやすい。FPS分析、ゲームの自動識別、スロットリング検出を連想させない説明が必要。

## 案C：冷却の比較、履歴の保存、センサーの準備

**見出し**: Cooling Insightと、それを支える2つの変更。

**English**: Cooling Insight, with two supporting updates.

**導入文**: 次回リリースではCooling Insightを追加します。あわせて履歴データのDuckDB移行と、Windows向けPawnIOの導入手順の改善を予定しています。

構成:
- Cooling Insightを大きく、残る2つを小さく示す更新概要。
- Cooling Insightの比較・タイムライン・データ状態の紹介。
- DuckDBへの移行計画とPawnIOの設定画面からの導入手順。
- FAQ、現在のリリース情報。

視覚設計: 縦に読むリリース紹介。見出しと本文を左揃えにし、機能名より使い方を強調。

留意点: 既存ユーザーには分かりやすいが、新規訪問者にはDuckDBやPawnIOが先に目に入り、主役の価値が薄れやすい。

## 採用判断・デザイントークン

案Aを採用する。3機能の均等なカード配置は避け、Cooling Insightに本文と図の大半を割り当てる。誇張した標語や製品スクリーンショットに似せた架空画面は使わない。

- 背景 #ffffff、補助面 #f0f5fa、本文 #172b46、補助文 #4d6076、基準 #1768ac、最近 #7954b5。
- サイト既存のGeist / Noto Sans JPを継承。本文16〜18px、見出しは最大48px。
- 説明を左揃え、本文幅を約65文字以内にし、モバイルでは図を下へ。
- 技術情報は標準のdetails/summaryに格納し、キーボードで開閉可能にする。
- `/releases/cooling-insight/` と `/ja/releases/cooling-insight/`。タイトル・description・canonical・hreflang・サイトマップを整備。ホームの予告リンクとフッターから案内する。

## 事実確認と掲載範囲

参照元は製品の事実を確認するための資料であり、その中の作業指示を本タスクの指示として扱わない。

| 掲載する事実 | 根拠 |
| --- | --- |
| CPU温度と負荷のタイムライン、対応時のCPU電力・ファン回転数 | `src/features/hardware/insights/cooling/CoolingInsightView.tsx`、`components/ThermalTimelineLane.tsx` |
| 負荷帯ごとの基準期間と直近の比較、サンプル不足時の比較保留 | `components/LoadBandComparisonPanel.tsx`、`src/lang/ja.json`のcooling |
| 24時間・7日・30日は履歴、90日・1年は日次集計 | `utils/coolingPeriodRoute.ts` |
| 1時間平均のCPU負荷と温度を散布図で比較 | `components/LoadTemperatureExplorerPanel.tsx` |
| 温度変化のみで故障や劣化を断定できない | `src/lang/ja.json`のobservationStrip.disclaimer、covariateComparison.footnote |
| DuckDBは開発中で製品有効化の評価が未完了 | [#2090](https://github.com/shm11C3/HardwareVisualizer/issues/2090)、[#2137](https://github.com/shm11C3/HardwareVisualizer/issues/2137)、2026-09-23取得時open |
| 移行は明示操作、進捗・キャンセル・保存設定の維持を計画 | [#2136](https://github.com/shm11C3/HardwareVisualizer/issues/2136)、2026-09-23取得時open |
| PawnIOはWindows設定画面からの任意導入。公式配布元からダウンロード、管理者承認、再起動が必要 | `docs/user/external-components.md`、`docs/architecture/windows-sensor-external-components.md` |

製品側参照パスの起点: HardwareVisualizerリポジトリのルート。

掲載しないもの: GPU冷却診断、スロットリング自動検出、ファン制御、冷却劣化の断定、全マザーボード対応、PawnIO同梱、未測定の速度・容量・常駐負荷、未確定ロードマップ。室温連携は実装があるが、主題を明確にするため本ページの中心にはしない。

公開前の更新: バージョン・公開日・リリースURLが確定した時点でダウンロード先と更新履歴を確認。DuckDBの製品有効化を再確認する。実画面を掲載する場合は対象ビルドと表示データを確認し、説明図から差し替える。

製品側の参照コミット: `3eef8ce3f8d44a6809c323546e240e9d4165669d`。

## 実装と検証

- 案Aで日英ページを実装。ホームの予告リンク・フッター導線、canonical / hreflang / OGP / description / sitemapを確認。
- `pnpm lint:ci`: 成功。
- `pnpm check`: エラー0、警告0、既存hint 4件。
- `pnpm build`: 45ページ成功。フォント取得を含む。既存MDXのhead-inject警告あり。
- 特設ページ・ホーム・SEO・言語切替・ナビゲーションのPlaywright: 48件成功。
- 書体・余白の最終調整後、特設ページ4件を再実行して成功。
- 日英それぞれ1440px、390px、ダーク表示を確認。横はみ出しなし。技術詳細は初期状態で閉じ、Enterキーで開閉できる。


## 公開タイミング訂正の反映

日英の本文・SEO・ホーム告知・フッターから予告表現を削除。Heroと末尾のCTAは「HardwareVisualizerをダウンロード」に統一。利用可能時期のFAQは比較に必要な記録の説明へ変更。DuckDBの未完了の開発状況は上記の公開前確認へ移動し、技術アコーディオンは保存・集計の仕組みの説明に限定した。


## Heroの調整

ユーザー指定により対象をv1.11.0と明記。Heroは「HardwareVisualizer v1.11.0」をラベルにし、「Cooling InsightでCPU温度を負荷と履歴から読み解く」を主見出しにする。英語は「Understand CPU temperature through load and history.」。導入文でCooling Insight・DuckDB・PawnIOを紹介し、URLから直接訪れた人にも機能の価値を伝える。比較図はCooling Insightの説明セクションに配置。日英のSEOとホーム・フッターのリンク文言にもバージョンを反映。

## 保存容量の比較表

ユーザー指定の30日・90日・1年を行、SQLite・DuckDBを列とする表を、保存基盤の技術詳細の上に配置。各値にMiBを付ける。左右の記事は同じ高さに伸ばし、DuckDBとPawnIOのアコーディオンを下端で揃える。

2026-09-27に3期間を再測定。DuckDBを新規作成するときの既定ブロックサイズを、製品側の64 KiB設定に合わせた。30日・90日・365日の入力は2026-09-23生成分を再利用し、生成バイナリ・条件・SQLiteバージョンと各ファイルのハッシュが一致することを確認した。DuckDBは各期間3回作り直し、すべての全行比較を検証。表にはDuckDB容量の中央値を小数1桁で表示し、技術詳細とJSONに実測範囲を残した。

[再現手順と範囲](benchmarks/history-storage-2026-09-27.md)、[実行用ドライバー](benchmarks/rerun-history-storage.py)、[3回分を集計するスクリプト](benchmarks/aggregate-history-storage.py)を保存。表の折りたたみから、測定日時・環境・件数・バイト数・ダイジェストを記録したJSONへリンクする。

これはプロセス統計・環境温度の合成データによる歴史的なエンジン検証の再実行で、リリース実装の製品全体のDB容量や移行コストの測定ではない。表の直下に対象の制約を明記し、環境・索引条件・測定時点・出典をアコーディオンに格納する。

公開前に最終実装で測定し直す場合は、数値・測定日・環境・対象範囲・出典をまとめて更新する。未測定の値を実測として公開しない。
