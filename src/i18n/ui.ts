export const languages = {
  en: "English",
  ja: "日本語",
};

export const defaultLang = "en";

export const showDefaultLang = false;

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.Features": "Features",
    "nav.Download": "Download",
    "nav.faq": "FAQ",
    "nav.changelog": "Changelog",
    "hero.eyebrow": "Cross-platform CPU & GPU hardware monitor",
    "hero.title": "See what made your PC hot or slow.",
    "hero.description":
      "HardwareVisualizer is a cross-platform hardware monitor for CPU, GPU, temperature, and process activity. Review what happened after gaming or heavy workloads—even when you were not watching the live graphs.",
    "hero.download": "Download for Windows",
    "hero.viewGitHub": "View on GitHub",
    "hero.availability":
      "For Windows 10 and 11. Also available on macOS and Linux.",
    "hero.screenshotLabel": "Insights: review what happened",
    "hero.retention": "30 days by default",
    "hero.screenshotAlt":
      "HardwareVisualizer Insights showing CPU and memory usage history over time",
    "hero.trustLabel": "Privacy and distribution assurances",
    "hero.trust.noAccount": "No account",
    "hero.trust.noTelemetry": "No telemetry",
    "hero.trust.openSource": "Open source",
    "hero.trust.signedInstaller": "Signed Windows installer",
    "usage.title": "Customize the Live View",
    "usage.description":
      "Keep the real-time dashboard readable your way with adjustable charts, colors, and a local background image.",
    "usage.customization.title1": "Readable Live Charts",
    "usage.customization.description1":
      "Line charts show current CPU, RAM, and GPU usage at a glance.",
    "usage.customization.title2": "Custom Appearance",
    "usage.customization.description2":
      "Tweak colors, borders, and legends with flexible visual settings.",
    "usage.customization.title3": "Custom Wallpaper",
    "usage.customization.description3":
      "Make your dashboard truly yours with a background image you love.",
    "usage.screenshotAlt":
      "HardwareVisualizer dashboard using a custom local background image",
    "insights.title": "Look Back After the Workload Ends",
    "insights.description":
      "You do not have to watch a live graph while you play, render, compile, or run another demanding task. Open Insights afterward to see when load peaked, temperatures rose, or a process used more resources. History is kept for 30 days by default, and retention is configurable.",
    "insights.card1.title": "Check Peaks During Gaming",
    "insights.card1.description":
      "See when CPU or GPU load peaked and how long demanding activity continued.",
    "insights.card2.title": "Trace Temperature Rises",
    "insights.card2.description":
      "Follow temperature changes over time and see how they relate to CPU or GPU load.",
    "insights.card3.title": "Find the Process Behind the Load",
    "insights.card3.description":
      "Review sampled process activity to see which applications used CPU or memory.",
    "insights.card4.title": "Compare Earlier Periods",
    "insights.card4.description":
      "Return to an earlier period and compare the same CPU, GPU, and temperature metrics with what you see now.",
    "insights.download": "Download HardwareVisualizer",
    "features.title": "Live Details When You Need Them",
    "features.description":
      "Use real-time CPU, GPU, temperature, and memory details when you need to inspect what your PC is doing right now.",
    "features.card1.title": "CPU Monitoring",
    "features.card1.description":
      "Track CPU usage, temperature, and frequency in real-time with detailed per-core statistics.",
    "features.card2.title": "GPU Metrics",
    "features.card2.description":
      "View GPU utilization, temperature, memory usage, and clock speeds for supported graphics cards.",
    "features.card3.title": "Memory Analysis",
    "features.card3.description":
      "Monitor RAM usage, available memory, and memory allocation across applications.",
    "features.card4.title": "System Specifications",
    "features.card4.description":
      "Look up CPU, GPU, memory, storage, and operating system details in one place.",
    "features.card5.title": "Lightweight",
    "features.card5.description":
      "Built with Tauri for minimal resource usage, ensuring the monitor itself doesn't impact system performance.",
    "features.card6.title": "Cross-Platform & Open Source",
    "features.card6.description":
      "Built in the open for Windows, macOS, and Linux under the MIT license.",
    "download.title": "Download HardwareVisualizer",
    "download.description":
      "Available for Windows, macOS, and Linux OS. Free and open source.",
    "download.pageTitle": "Download HardwareVisualizer",
    "download.pageTitleBeforeBreak": "Download",
    "download.pageTitleSeparator": " ",
    "download.pageTitleAfterBreak": "HardwareVisualizer",
    "download.pageDescription":
      "Choose an official installer and verify HardwareVisualizer downloads before installing.",
    "download.metaTitle": "Download HardwareVisualizer",
    "download.metaDescription":
      "Download HardwareVisualizer from official sources only. Get Windows, macOS, and Linux installers, verification guidance, code signing status, and GitHub Releases links.",
    "download.sectionTitle": "Download",
    "download.nav.ariaLabel": "Download and verification navigation",
    "download.nav.download": "Download",
    "download.nav.downloadInstaller": "Download installer",
    "download.nav.installation": "Installation",
    "download.nav.verification": "Installer verification",
    "download.verificationPage.metaTitle": "Installer verification",
    "download.verificationPage.metaDescription":
      "Installer verification for HardwareVisualizer, including official sources, SHA-256 checksums, GitHub Artifact Attestations, and code signing status.",
    "download.verificationPage.latestCommandsTitle":
      "Latest release verification commands (Advanced)",
    "download.verificationPage.latestCommandsDescription":
      "Copy the SHA-256 value from the download page, then run the command for the file you downloaded.",
    "download.verificationPage.infoLabel": "Info",
    "download.verificationPage.beginnerInfo":
      "SHA-256 is a value used to check whether the file you downloaded is the same as the file that was published. If you are not comfortable using command-line tools, you do not need to force this step. First make sure you downloaded the installer from an official source.",
    "download.currentVersion": "Current version:",
    "download.button": "Download",
    "download.noDownloads": "No downloads available for {platform} yet.",
    "download.otherVersions": "Looking for other versions or platforms?",
    "download.githubLink": "View all releases on GitHub →",
    "download.githubDownloadButton": "Download from GitHub",
    "download.changelogLink": "View past versions →",
    "download.installationLink": "See detailed installation instructions",
    "download.releaseDate": "Released:",
    "download.latestChanges": "Release highlights",
    "download.latestChangesLink": "Read full changelog →",
    "download.verify.summary": "Verify this download",
    "download.verify.artifact": "Artifact",
    "download.verify.fileSize": "File size",
    "download.verify.sha256": "Checksum (SHA-256)",
    "download.verify.copySha256": "Copy SHA-256",
    "download.verify.copyCode": "Copy code",
    "download.verify.copied": "Copied",
    "download.verify.checksumUnavailable": "Checksum unavailable",
    "download.verify.verificationCommand": "Verification command",
    "download.verify.githubAttestation": "GitHub attestation",
    "download.verify.signatureFile": "Signature file",
    "download.verify.signingStatus": "Signing status",
    "download.verify.updaterSignatureAvailable":
      "Tauri updater signature for the in-app update path; not a platform signing substitute.",

    "changelog.title": "Changelog",
    "changelog.description":
      "Release notes and updates for HardwareVisualizer.",
    "changelog.emptyTitle": "No releases yet.",
    "changelog.emptyDescription":
      "Check GitHub Releases for the latest updates.",
    "changelog.untranslatedNotice":
      "This entry is not translated yet. Showing English.",
    "changelog.untranslatedBadge": "Untranslated",
    "changelog.announcement":
      "Release notes are now available on the official website.",
    "changelog.back": "Back to Changelog",
    "changelog.githubRelease": "View on GitHub",

    "footer.description":
      "HardwareVisualizer is a cross-platform hardware monitor with real-time CPU and GPU monitoring plus history to help you understand what happened.",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.download": "Download",
    "footer.specs": "Specs",
    "footer.changelog": "Changelog",
    "footer.resources": "Resources",
    "footer.faq": "FAQ",
    "footer.github": "GitHub",
    "footer.reportIssue": "Report an Issue",
    "footer.deepwiki": "DeepWiki (AI Docs)",
    "footer.community": "Community",
    "footer.discussions": "GitHub Discussions",
    "footer.about": "About",
    "footer.privacy": "Privacy",

    "specs.title": "System Requirements & Limitations",
    "specs.supportedOS.title": "Supported OS & Architecture",
    "specs.supportedOS.os": "OS",
    "specs.supportedOS.architecture": "Architecture",
    "specs.supportedOS.status": "Status",
    "specs.supportedOS.notes": "Notes",
    "specs.supportedOS.windows.notes": "Latest updates recommended",
    "specs.supportedOS.linux.notes": "Some limitations on Wayland environments",
    "specs.supportedOS.macos.notes": "Under development / Experimental",
    "specs.supportedOS.macos.appleSilicon.notes": "Officially supported",
    "specs.supportedOS.macos.intel.notes":
      "Experimental - please report issues on GitHub if you encounter problems",
    "specs.supportedHardware.title": "Supported CPU/GPU",
    "specs.supportedHardware.component": "Component",
    "specs.supportedHardware.supported": "Supported",
    "specs.supportedHardware.cpu.notes":
      "Embedded/virtual environments may not be fully supported",
    "specs.supportedHardware.nvidia.notes": "Mainstream drivers required.",
    "specs.supportedHardware.amd.notes":
      "Mainstream drivers required. Some features may be limited or values may be less accurate. Support for AMD GPUs is currently under improvement.",
    "specs.supportedHardware.intel.notes":
      "Mainstream drivers required. Some features may be limited or values may be less accurate. Support for Intel GPUs is currently under improvement.",
    "specs.supportedLanguages.title": "Supported Languages",
    "specs.supportedLanguages.language": "Language",
    "specs.supportedLanguages.status": "Status",
    "specs.supportedLanguages.russian": "Русский (Russian)",
    "specs.supportedLanguages.howToAdd":
      "If you want to add a supported language, please create an issue on GitHub to suggest it.",
    "specs.limitations.title": "Known Limitations & Notes",
    "specs.limitations.item1":
      "Some older or special hardware may not be fully supported.",
    "specs.limitations.item2":
      "Some features are limited on Linux Wayland environments.",
    "specs.limitations.item3":
      "Administrator/root privileges may be required in some cases.",
    "specs.limitations.item4":
      "Specifications may change without notice in beta/development versions.",

    "a11y.skipToMain": "Skip to main content",

    "404.title": "Page Not Found",
    "404.description": "Sorry, the page you are looking for does not exist.",
    "404.goHome": "Go to Home",

    "faq.title": "Frequently Asked Questions",
    "faq.description":
      "Common questions about HardwareVisualizer and hardware monitoring.",
    "faq.q1": "What is HardwareVisualizer?",
    "faq.a1":
      "HardwareVisualizer is a free, open-source, cross-platform hardware monitoring tool. It lets you track CPU temperature, GPU usage, memory allocation, and system performance in real-time with beautiful graphs and minimal system impact.",
    "faq.q2": "Is HardwareVisualizer free?",
    "faq.a2":
      "Yes, HardwareVisualizer is completely free and open-source under the MIT license. Download it only from hardviz.com, GitHub Releases, or Winget on Windows where available; third-party mirrors, file-sharing links, YouTube description links, and password-protected archives are not official.",
    "faq.q3": "Which operating systems are supported?",
    "faq.a3":
      "HardwareVisualizer supports Windows 10, Windows 11, macOS (Apple Silicon officially supported, Intel experimental), and major Linux distributions (Debian/Ubuntu, RPM-based distros, AppImage).",
    "faq.q4": "How is it different from Task Manager or HWiNFO?",
    "faq.a4":
      "HardwareVisualizer is designed to be lightweight with a modern UI. Unlike Task Manager, it provides detailed graphs and configurable long-term history, kept for 30 days by default and extendable in settings. Its always-on monitoring is optimized to minimize background CPU and memory use — when minimized to the system tray it uses only around 32 MB of memory — and the interface stays fully customizable.",
    "faq.q5": "Can I monitor hardware while gaming?",
    "faq.a5":
      "Yes! HardwareVisualizer runs in the background with minimal resource usage, making it perfect for monitoring CPU usage and memory during gaming sessions. GPU temperature monitoring is fully supported on NVIDIA GPUs, with partial support for AMD and Intel GPUs. You can also check historical data to see how your system performed.",
    "faq.q6": "Which GPUs are supported?",
    "faq.a6":
      "HardwareVisualizer fully supports NVIDIA GPUs. AMD and Intel GPUs are partially supported — core metrics such as usage and temperature work, though some readings may be limited or less accurate.",
    "faq.q7": "Can I request new features or contribute?",
    "faq.a7":
      "Absolutely! You can request new hardware support, themes, languages, and other features by creating an issue on GitHub. Contributions are always welcome — feel free to submit pull requests or join the discussions.",
    "faq.specsLink": "View system requirements",
    "faq.githubLink": "Create an issue on GitHub",
    "faq.verificationGuideLink": "Installer verification",
    "faq.viewAll": "View all FAQs",
    "about.heading": "About HardwareVisualizer",
    "about.contact.emailLabel": "Email",
    "about.feedback.heading": "Have feedback?",
    "about.feedback.body":
      "HardwareVisualizer is shaped by the people who use it. A short, anonymous survey helps decide what to build next.",
    "about.feedback.cta": "Answer the survey",
    "footer.survey": "Survey",
    "survey.metaTitle": "Survey - HardwareVisualizer | Share Your Feedback",
    "survey.metaDescription":
      "Share your feedback on HardwareVisualizer — which features you use, what's missing, and how we can improve. Anonymous and takes about 2–3 minutes.",
    "survey.heading": "Help shape HardwareVisualizer",
    "survey.description":
      "Your feedback directly guides what we build next. This survey is anonymous and takes about 2–3 minutes.",
    "survey.privacyNote":
      "Responses are anonymous. We attach some non-identifying context so we can group feedback — your entry point and language, plus your app version and OS when you open the survey from the app — never your hardware details or anything that identifies you. The form is hosted by Tally.",
    "survey.privacyNoteLink": "Read our Privacy Policy →",
    "survey.preparing":
      "The survey is being prepared and will be available here shortly. Thanks for your interest!",
    "survey.backHome": "Back to home",
    "privacy.heading": "Privacy Policy",
    "consent.message":
      "We use cookies for analytics (Google Analytics) to see how the site is used. You can accept or decline.",
    "consent.accept": "Accept",
    "consent.decline": "Decline",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.Features": "機能",
    "nav.Download": "ダウンロード",
    "nav.faq": "FAQ",
    "nav.changelog": "変更履歴",
    "hero.eyebrow": "クロスプラットフォーム対応CPU・GPUハードウェアモニター",
    "hero.title": "See what made your PC hot or slow.",
    "hero.description":
      "HardwareVisualizerは、CPU、GPU、温度、プロセスの状態を記録するクロスプラットフォーム対応のハードウェアモニターです。ゲームや重い処理のあと、グラフを見続けていなくても何が起きていたか確認できます。",
    "hero.download": "Windows版をダウンロード",
    "hero.viewGitHub": "GitHubを閲覧",
    "hero.availability": "Windows 10・11に対応。macOS・Linux版も利用できます。",
    "hero.screenshotLabel": "Insightsで振り返る",
    "hero.retention": "初期設定30日",
    "hero.screenshotAlt":
      "CPUとメモリの使用履歴を時系列で表示するHardwareVisualizerのInsights画面",
    "hero.trustLabel": "プライバシーと配布の信頼性",
    "hero.trust.noAccount": "アカウント不要",
    "hero.trust.noTelemetry": "テレメトリなし",
    "hero.trust.openSource": "オープンソース",
    "hero.trust.signedInstaller": "署名済みWindowsインストーラ",
    "usage.title": "リアルタイム表示を自分好みに",
    "usage.description":
      "チャート、色、PC内の背景画像を調整し、今の状態を見やすいダッシュボードにできます。",
    "usage.customization.title1": "見やすいリアルタイムグラフ",
    "usage.customization.description1":
      "CPU、RAM、GPUの現在の使用状況をラインチャートですぐに確認できます。",
    "usage.customization.title2": "カスタム外観",
    "usage.customization.description2":
      "色、境界線、凡例を柔軟に設定して、視覚的な外観を調整できます。",
    "usage.customization.title3": "カスタム壁紙",
    "usage.customization.description3":
      "好きな背景画像でダッシュボードをあなたのものにできます。",
    "usage.screenshotAlt":
      "PC内の背景画像を設定したHardwareVisualizerのダッシュボード",
    "insights.title": "処理が終わったあとに振り返る",
    "insights.description":
      "ゲーム、レンダリング、ビルドなどの最中にグラフを見続ける必要はありません。終了後にInsightsを開き、負荷のピーク、温度上昇、プロセスの動きを確認できます。履歴は初期設定で30日間保存され、保存期間は変更できます。",
    "insights.card1.title": "ゲーム中のピークを確認",
    "insights.card1.description":
      "CPUやGPUの負荷がいつ最大になり、高負荷がどのくらい続いたか確認できます。",
    "insights.card2.title": "温度上昇を追跡",
    "insights.card2.description":
      "温度の変化を時系列で追い、CPUやGPUの負荷との関係を確認できます。",
    "insights.card3.title": "負荷を掛けたプロセスを確認",
    "insights.card3.description":
      "サンプリングされたプロセスの動きから、CPUやメモリを使ったアプリを確認できます。",
    "insights.card4.title": "以前の記録と見比べる",
    "insights.card4.description":
      "以前の期間に戻り、CPU、GPU、温度の同じ指標を現在の状態と見比べられます。",
    "insights.download": "HardwareVisualizerをダウンロード",
    "features.title": "必要なときは、今の状態も詳しく見る",
    "features.description":
      "CPU、GPU、温度、メモリの詳細をリアルタイムで確認し、PCが今どう動いているか詳しく見られます。",
    "features.card1.title": "CPUモニタリング",
    "features.card1.description":
      "CPU使用率、温度、周波数をリアルタイムでコアごとに詳細にモニタリングします。",
    "features.card2.title": "GPUメトリクス",
    "features.card2.description":
      "対応GPUの使用率、温度、メモリ使用量、クロックスピードを表示します。",
    "features.card3.title": "メモリ監視",
    "features.card3.description":
      "RAM使用量、空きメモリ、アプリごとのメモリ割り当てをモニタリングします。",
    "features.card4.title": "システム仕様",
    "features.card4.description":
      "CPU、GPU、メモリ、ストレージ、OSの詳細を一か所で確認できます。",
    "features.card5.title": "超軽量",
    "features.card5.description":
      "Rust製でリソース消費が最小限。モニター自体がシステムに負荷をかけません。",
    "features.card6.title": "クロスプラットフォーム・OSS",
    "features.card6.description":
      "Windows、macOS、Linux向けにMITライセンスで公開・開発されています。",
    "download.title": "HardwareVisualizerをダウンロード",
    "download.description":
      "Windows、macOS、Linux OSで利用可能。無料でオープンソース。",
    "download.pageTitle": "HardwareVisualizerをダウンロードする",
    "download.pageTitleBeforeBreak": "HardwareVisualizerを",
    "download.pageTitleSeparator": "",
    "download.pageTitleAfterBreak": "ダウンロードする",
    "download.pageDescription":
      "公式インストーラを選択し、インストール前にHardwareVisualizerのダウンロードを確認できます。",
    "download.metaTitle": "HardwareVisualizerをダウンロードする",
    "download.metaDescription":
      "HardwareVisualizerは公式配布元のみからダウンロードしてください。Windows、macOS、Linux向けインストーラ、検証方法、コード署名状況、GitHub Releasesへのリンクを確認できます。",
    "download.sectionTitle": "ダウンロード",
    "download.nav.ariaLabel": "ダウンロードと検証のナビゲーション",
    "download.nav.download": "ダウンロード",
    "download.nav.downloadInstaller": "インストーラをダウンロードする",
    "download.nav.installation": "インストール方法",
    "download.nav.verification": "インストーラの検証",
    "download.verificationPage.metaTitle": "インストーラの検証",
    "download.verificationPage.metaDescription":
      "HardwareVisualizerのインストーラの検証として、公式配布元、SHA-256チェックサム、GitHub Artifact Attestations、コード署名状況の確認方法を案内します。",
    "download.verificationPage.latestCommandsTitle":
      "最新リリースの検証コマンド（上級者向け）",
    "download.verificationPage.latestCommandsDescription":
      "ダウンロードページからSHA-256の値をコピーし、取得したファイルに対応するコマンドを実行してください。",
    "download.verificationPage.infoLabel": "Info",
    "download.verificationPage.beginnerInfo":
      "SHA-256は、ダウンロードしたファイルが配布時と同じか確認するための値です。コマンド操作に慣れていない場合は、この手順を無理に実行する必要はありません。まず公式配布元から入手していることを確認してください。",
    "download.currentVersion": "現在のバージョン:",
    "download.button": "ダウンロード",
    "download.noDownloads": "{platform}用のダウンロードはまだ利用できません。",
    "download.otherVersions":
      "他のバージョンやプラットフォームをお探しですか？",
    "download.githubLink": "GitHubですべてのリリースを表示 →",
    "download.githubDownloadButton": "GitHubからダウンロード",
    "download.changelogLink": "過去のリリースを見る →",
    "download.installationLink": "詳細なインストール方法はこちら",
    "download.releaseDate": "リリース日時:",
    "download.latestChanges": "リリースハイライト",
    "download.latestChangesLink": "変更履歴を詳しく見る →",
    "download.verify.summary": "このダウンロードを検証する",
    "download.verify.artifact": "アーティファクト",
    "download.verify.fileSize": "ファイルサイズ",
    "download.verify.sha256": "チェックサム (SHA-256)",
    "download.verify.copySha256": "SHA-256をコピー",
    "download.verify.copyCode": "コードをコピー",
    "download.verify.copied": "コピーしました",
    "download.verify.checksumUnavailable": "チェックサムを取得できません",
    "download.verify.verificationCommand": "検証コマンド",
    "download.verify.githubAttestation": "GitHub Attestation",
    "download.verify.signatureFile": "署名ファイル",
    "download.verify.signingStatus": "署名状態",
    "download.verify.updaterSignatureAvailable":
      "アプリ内アップデート経路向けのTauri updater署名です。プラットフォーム署名の代替ではありません。",

    "changelog.title": "変更履歴",
    "changelog.description": "HardwareVisualizerのリリースノートと更新情報。",
    "changelog.emptyTitle": "まだ変更履歴がありません。",
    "changelog.emptyDescription": "最新情報はGitHub Releasesをご確認ください。",
    "changelog.untranslatedNotice":
      "このリリースノートはまだ未翻訳のため、英語版を表示しています。",
    "changelog.untranslatedBadge": "未翻訳",
    "changelog.announcement": "リリースノートを公式サイトに追加しました。",
    "changelog.back": "変更履歴へ戻る",
    "changelog.githubRelease": "GitHubで見る",

    "footer.description":
      "HardwareVisualizerは、CPU・GPUのリアルタイム監視と履歴から、PCで何が起きていたか確認できるクロスプラットフォーム対応ハードウェアモニターです。",
    "footer.product": "製品",
    "footer.features": "機能",
    "footer.download": "ダウンロード",
    "footer.specs": "仕様",
    "footer.changelog": "変更履歴",
    "footer.resources": "リソース",
    "footer.faq": "FAQ",
    "footer.github": "GitHub",
    "footer.reportIssue": "問題を報告",
    "footer.deepwiki": "DeepWiki（AIドキュメント）",
    "footer.community": "コミュニティ",
    "footer.discussions": "GitHubディスカッション",
    "footer.about": "About",
    "footer.privacy": "プライバシー",

    "specs.title": "システム要件と制限事項",
    "specs.supportedOS.title": "対応OS・アーキテクチャ",
    "specs.supportedOS.os": "OS",
    "specs.supportedOS.architecture": "アーキテクチャ",
    "specs.supportedOS.status": "状態",
    "specs.supportedOS.notes": "備考",
    "specs.supportedOS.windows.notes": "最新のアップデートを推奨",
    "specs.supportedOS.linux.notes": "Wayland環境では一部制限あり",
    "specs.supportedOS.macos.notes": "開発中 / 実験的",
    "specs.supportedOS.macos.appleSilicon.notes": "正式サポート",
    "specs.supportedOS.macos.intel.notes":
      "実験的サポート - 問題があればGitHubでIssueを作成してください",
    "specs.supportedHardware.title": "対応CPU/GPU",
    "specs.supportedHardware.component": "コンポーネント",
    "specs.supportedHardware.supported": "対応状況",
    "specs.supportedHardware.cpu.notes":
      "組み込み環境・仮想環境では完全に対応していない場合があります",
    "specs.supportedHardware.nvidia.notes": "主流ドライバーが必要です。",
    "specs.supportedHardware.amd.notes":
      "主流ドライバーが必要です。一部機能が制限されるか、値の精度が低下する場合があります。AMD GPU対応は現在改善中です。",
    "specs.supportedHardware.intel.notes":
      "主流ドライバーが必要です。一部機能が制限されるか、値の精度が低下する場合があります。Intel GPU対応は現在改善中です。",
    "specs.supportedLanguages.title": "対応言語",
    "specs.supportedLanguages.language": "言語",
    "specs.supportedLanguages.status": "状態",
    "specs.supportedLanguages.russian": "Русский (ロシア語)",
    "specs.supportedLanguages.howToAdd":
      "対応言語を追加したい場合は、GitHubでIssueを作成して提案してください。",
    "specs.limitations.title": "既知の制限事項・注意点",
    "specs.limitations.item1":
      "一部の古いハードウェアや特殊なハードウェアは完全に対応していない場合があります。",
    "specs.limitations.item2":
      "Linux Wayland環境では一部機能に制限があります。",
    "specs.limitations.item3":
      "場合によっては管理者権限/root権限が必要になることがあります。",
    "specs.limitations.item4":
      "ベータ版・開発版では仕様が予告なく変更される場合があります。",

    "a11y.skipToMain": "メインコンテンツへスキップ",

    "404.title": "ページが見つかりません",
    "404.description": "申し訳ありませんが、探しているページは存在しません。",
    "404.goHome": "ホームに戻る",

    "faq.title": "FAQ",
    "faq.description":
      "HardwareVisualizerとハードウェアモニタリングに関するよくある質問。",
    "faq.q1": "HardwareVisualizerとは何ですか？",
    "faq.a1":
      "HardwareVisualizerは、マルチプラットフォーム対応の無料オープンソースのハードウェアモニタリングツールです。CPU温度、GPU使用率、メモリ割り当て、システムパフォーマンスを美しいグラフでリアルタイムに追跡でき、システムへの影響も最小限です。",
    "faq.q2": "HardwareVisualizerは無料ですか？",
    "faq.a2":
      "はい、HardwareVisualizerは完全に無料で、MITライセンスのオープンソースです。ダウンロードは hardviz.com、GitHub Releases、または利用可能な場合はWindowsのWingetのみを利用してください。第三者のダウンロードサイト、ファイル共有リンク、YouTube概要欄のリンク、パスワード付きZIPは公式ではありません。",
    "faq.q3": "どのOSに対応していますか？",
    "faq.a3":
      "HardwareVisualizerはWindows 10、Windows 11、macOS（Apple Silicon正式対応、Intel実験的）、および主要なLinuxディストリビューション（Debian/Ubuntu、RPM系、AppImage）に対応しています。",
    "faq.q4": "タスクマネージャーやHWiNFOとの違いは？",
    "faq.a4":
      "HardwareVisualizerは軽量でモダンなUIを重視しています。タスクマネージャーと異なり、詳細なグラフと、初期設定で30日間・設定から延長できる長期履歴を提供します。常駐監視はバックグラウンドでのCPU・メモリ使用を最小限に抑えるよう最適化されており（トレイ格納中のメモリ使用量は約32MB）、インターフェースも自由にカスタマイズできます。",
    "faq.q5": "ゲーム中でも監視できますか？",
    "faq.a5":
      "はい！HardwareVisualizerは最小限のリソース使用でバックグラウンドで実行されるため、ゲームセッション中のCPU使用率やメモリの監視に最適です。GPU温度の監視はNVIDIA GPUにフル対応しており、AMD・Intel GPUにも部分的に対応しています。履歴データでシステムのパフォーマンスを後から確認することもできます。",
    "faq.q6": "どのGPUに対応していますか？",
    "faq.a6":
      "HardwareVisualizerはNVIDIA GPUにフル機能で対応しています。AMD・Intel GPUは部分対応で、使用率や温度などの主要な値は取得できますが、一部の値が制限されたり精度が低下する場合があります。",
    "faq.q7": "新しい機能をリクエストしたり貢献できますか？",
    "faq.a7":
      "もちろんです！対応ハードウェアの追加、テーマの追加、言語の追加などの機能リクエストはGitHubのIssueで受け付けています。プルリクエストやディスカッションへの参加も大歓迎です。",
    "faq.specsLink": "システム要件を見る",
    "faq.githubLink": "GitHubでIssueを作成",
    "faq.verificationGuideLink": "インストーラの検証",
    "faq.viewAll": "すべてのFAQを見る",
    "about.heading": "HardwareVisualizer について",
    "about.contact.emailLabel": "メール",
    "about.feedback.heading": "ご意見・ご要望はありますか？",
    "about.feedback.body":
      "HardwareVisualizer は使ってくださる方々によって形作られています。短い匿名アンケートが、次に作るものを決める助けになります。",
    "about.feedback.cta": "アンケートに回答する",
    "footer.survey": "アンケート",
    "survey.metaTitle":
      "アンケート - HardwareVisualizer | ご意見をお聞かせください",
    "survey.metaDescription":
      "HardwareVisualizerへのご意見をお聞かせください。よく使う機能、足りない機能、改善してほしい点など。匿名で約2〜3分です。",
    "survey.heading": "HardwareVisualizer をより良くする",
    "survey.description":
      "あなたの声が次に作るものを直接決めます。アンケートは匿名で、約2〜3分で回答できます。",
    "survey.privacyNote":
      "回答は匿名です。フィードバックを分類するため、非識別の文脈（流入元・言語、およびアプリから開いた場合はアプリのバージョン・OS）を付与します。ハードウェア構成やあなたを特定する情報は含みません。フォームはTallyがホストしています。",
    "survey.privacyNoteLink": "プライバシーポリシーを読む →",
    "survey.preparing":
      "アンケートは準備中です。まもなくこちらで公開します。ご関心ありがとうございます！",
    "survey.backHome": "TOPへ戻る",
    "privacy.heading": "プライバシーポリシー",
    "consent.message":
      "サイトの利用状況を把握するため、アクセス解析（Google Analytics）にCookieを使用します。同意・拒否を選べます。",
    "consent.accept": "同意する",
    "consent.decline": "拒否する",
  },
} as const;
