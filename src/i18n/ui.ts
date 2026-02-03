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
    "hero.description":
      "HardwareVisualizer is a free, lightweight, and open-source hardware monitoring tool for Windows and Linux. Track CPU temperature, GPU usage, memory allocation, and system performance in real-time with beautiful graphs — a perfect alternative to Task Manager or HWiNFO.",
    "hero.download": "Download Now",
    "hero.viewGitHub": "View on GitHub",
    "usage.title": "Make It Truly Yours",
    "usage.description":
      "Customize charts and set your favorite image as the dashboard wallpaper.",
    "usage.customization.title1": "Graphical Monitoring",
    "usage.customization.description1":
      "Line charts show CPU, RAM, GPU usage in real-time with smooth visuals.",
    "usage.customization.title2": "Custom Appearance",
    "usage.customization.description2":
      "Tweak colors, borders, and legends with flexible visual settings.",
    "usage.customization.title3": "Custom Wallpaper",
    "usage.customization.description3":
      "Make your dashboard truly yours with a background image you love.",
    "insights.title": "Track & Identify High Load",
    "insights.card1.title": "Usage Timeline",
    "insights.card1.description": "When was your system under load?",
    "insights.card2.title": "Process Tracking",
    "insights.card2.description": "Find out what caused it.",
    "insights.card3.title": "For Gamers",
    "insights.card3.description":
      "Track your system's performance while gaming.",
    "insights.card4.title": "For Engineers",
    "insights.card4.description":
      "Keep track of resource-hungry compute workloads.",
    "insights.download": "Start Monitoring Now",
    "features.title": "Powerful Monitoring Features",
    "features.description":
      "HardwareVisualizer provides comprehensive hardware monitoring with an intuitive interface and minimal system impact.",
    "features.card1.title": "CPU Monitoring",
    "features.card1.description":
      "Track CPU usage, temperature, and frequency in real-time with detailed per-core statistics.",
    "features.card2.title": "Memory Analysis",
    "features.card2.description":
      "Monitor RAM usage, available memory, and memory allocation across applications.",
    "features.card3.title": "GPU Metrics",
    "features.card3.description":
      "View GPU utilization, temperature, memory usage, and clock speeds for supported graphics cards.",
    "features.card4.title": "Performance Insights",
    "features.card4.description":
      "Analyze long-term hardware usage patterns with historical logs, trend visualization, and process usage statistics.",
    "features.card5.title": "Lightweight",
    "features.card5.description":
      "Built with Tauri for minimal resource usage, ensuring the monitor itself doesn't impact system performance.",
    "features.card6.title": "Open Source",
    "features.card6.description":
      "Fully transparent, community-driven development with the source code available on GitHub.",
    "download.title": "Download HardwareVisualizer",
    "download.description":
      "Available for Windows and Linux OS. Free and open source.",
    "download.currentVersion": "Current version:",
    "download.button": "Download",
    "download.noDownloads": "No downloads available for {platform} yet.",
    "download.otherVersions": "Looking for other versions or platforms?",
    "download.githubLink": "View all releases on GitHub →",
    "download.changelogLink": "View past versions →",

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
      "HardwareVisualizer is a free, lightweight, open-source hardware monitoring tool for Windows and Linux. Monitor CPU temperature, GPU usage, memory, and system performance with real-time graphs and 30-day historical data.",
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

    "specs.title": "System Requirements & Limitations",
    "specs.supportedOS.title": "Supported OS & Architecture",
    "specs.supportedOS.os": "OS",
    "specs.supportedOS.architecture": "Architecture",
    "specs.supportedOS.status": "Status",
    "specs.supportedOS.notes": "Notes",
    "specs.supportedOS.windows.notes": "Latest updates recommended",
    "specs.supportedOS.linux.notes": "Some limitations on Wayland environments",
    "specs.supportedOS.macos.notes": "Under development / Experimental",
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
      "Yes, HardwareVisualizer is completely free and open-source under the MIT license. You can download it from our website or GitHub, and even contribute to the project.",
    "faq.q3": "Which operating systems are supported?",
    "faq.a3":
      "HardwareVisualizer supports Windows 10, Windows 11, and major Linux distributions (Debian/Ubuntu, RPM-based distros, AppImage). macOS support is experimental and under development.",
    "faq.q4": "How is it different from Task Manager or HWiNFO?",
    "faq.a4":
      "HardwareVisualizer is designed to be lightweight with a modern UI. Unlike Task Manager, it provides detailed graphs and 30-day historical data. Compared to HWiNFO, it uses fewer system resources thanks to its Tauri/Rust architecture while offering a customizable interface.",
    "faq.q5": "Can I monitor hardware while gaming?",
    "faq.a5":
      "Yes! HardwareVisualizer runs in the background with minimal resource usage, making it perfect for monitoring CPU usage and memory during gaming sessions. GPU temperature monitoring is currently available for NVIDIA GPUs only. You can also check historical data to see how your system performed.",
    "faq.q6": "Which GPUs are supported?",
    "faq.a6":
      "HardwareVisualizer supports NVIDIA GPUs with full functionality. Support for AMD and Intel GPUs is currently under development.",
    "faq.q7": "Can I request new features or contribute?",
    "faq.a7":
      "Absolutely! You can request new hardware support, themes, languages, and other features by creating an issue on GitHub. Contributions are always welcome — feel free to submit pull requests or join the discussions.",
    "faq.specsLink": "View system requirements",
    "faq.githubLink": "Create an issue on GitHub",
    "faq.viewAll": "View all FAQs",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.Features": "機能",
    "nav.Download": "ダウンロード",
    "nav.faq": "FAQ",
    "nav.changelog": "変更履歴",
    "hero.description":
      "HardwareVisualizerは、WindowsとLinux向けの無料・軽量・オープンソースのハードウェアモニタリングツールです。CPU温度、GPU使用率、メモリ割り当て、システムパフォーマンスを美しいグラフでリアルタイムに追跡。タスクマネージャーやHWiNFOの代替として最適です。",
    "hero.download": "今すぐダウンロード",
    "hero.viewGitHub": "GitHubを閲覧",
    "usage.title": "あなただけのカスタマイズ",
    "usage.description":
      "チャートをカスタマイズし、お気に入りの画像をダッシュボードの壁紙として設定できます。",
    "usage.customization.title1": "グラフィカルな監視",
    "usage.customization.description1":
      "ラインチャートでCPU、RAM、GPUの使用状況をリアルタイムで滑らかなビジュアルで表示します。",
    "usage.customization.title2": "カスタム外観",
    "usage.customization.description2":
      "色、境界線、凡例を柔軟に設定して、視覚的な外観を調整できます。",
    "usage.customization.title3": "カスタム壁紙",
    "usage.customization.description3":
      "好きな背景画像でダッシュボードをあなたのものにできます。",
    "insights.title": "負荷の高いプロセスを追跡・特定",
    "insights.card1.title": "使用状況タイムライン",
    "insights.card1.description": "システムが負荷の高い時期はいつか？",
    "insights.card2.title": "プロセス追跡",
    "insights.card2.description": "何が原因だったのかを見つけます。",
    "insights.card3.title": "ゲーマーに",
    "insights.card3.description":
      "ゲーム中のシステムパフォーマンスを追跡します。",
    "insights.card4.title": "エンジニアに",
    "insights.card4.description":
      "リソースを大量に消費するコンピューティングワークロードを追跡します。",
    "insights.download": "モニタリングを開始する",
    "features.title": "強力なモニタリング機能",
    "features.description":
      "HardwareVisualizerは、直感的なインターフェースと最小限のシステム影響で包括的なハードウェアモニタリングを提供します。",
    "features.card1.title": "CPUモニタリング",
    "features.card1.description":
      "CPU使用率、温度、周波数をリアルタイムでコアごとに詳細にモニタリングします。",
    "features.card2.title": "メモリ監視",
    "features.card2.description":
      "RAM使用量、空きメモリ、アプリごとのメモリ割り当てをモニタリングします。",
    "features.card3.title": "GPUメトリクス",
    "features.card3.description":
      "対応GPUの使用率、温度、メモリ使用量、クロックスピードを表示します。",
    "features.card4.title": "パフォーマンスインサイト",
    "features.card4.description":
      "履歴ログやトレンド可視化、プロセス使用状況で長期的なハードウェア利用傾向を分析します。",
    "features.card5.title": "超軽量",
    "features.card5.description":
      "Rust製でリソース消費が最小限。モニター自体がシステムに負荷をかけません。",
    "features.card6.title": "オープンソース",
    "features.card6.description":
      "完全な透明性とコミュニティ主導の開発。ソースコードはGitHubで公開。",
    "download.title": "HardwareVisualizerをダウンロード",
    "download.description":
      "WindowsおよびLinux OSで利用可能。無料でオープンソース。",
    "download.currentVersion": "現在のバージョン:",
    "download.button": "ダウンロード",
    "download.noDownloads": "{platform}用のダウンロードはまだ利用できません。",
    "download.otherVersions":
      "他のバージョンやプラットフォームをお探しですか？",
    "download.githubLink": "GitHubですべてのリリースを表示 →",
    "download.changelogLink": "過去のリリースを見る →",

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
      "HardwareVisualizerは、WindowsとLinux向けの無料・軽量・オープンソースのハードウェアモニタリングツールです。CPU温度、GPU使用率、メモリ、システムパフォーマンスをリアルタイムグラフと30日間の履歴データで監視。",
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

    "specs.title": "システム要件と制限事項",
    "specs.supportedOS.title": "対応OS・アーキテクチャ",
    "specs.supportedOS.os": "OS",
    "specs.supportedOS.architecture": "アーキテクチャ",
    "specs.supportedOS.status": "状態",
    "specs.supportedOS.notes": "備考",
    "specs.supportedOS.windows.notes": "最新のアップデートを推奨",
    "specs.supportedOS.linux.notes": "Wayland環境では一部制限あり",
    "specs.supportedOS.macos.notes": "開発中 / 実験的",
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
      "はい、HardwareVisualizerは完全に無料で、MITライセンスのオープンソースです。当サイトまたはGitHubからダウンロードでき、プロジェクトへの貢献も可能です。",
    "faq.q3": "どのOSに対応していますか？",
    "faq.a3":
      "HardwareVisualizerはWindows 10、Windows 11、および主要なLinuxディストリビューション（Debian/Ubuntu、RPM系、AppImage）に対応しています。macOS対応は実験的で開発中です。",
    "faq.q4": "タスクマネージャーやHWiNFOとの違いは？",
    "faq.a4":
      "HardwareVisualizerは軽量でモダンなUIを重視しています。タスクマネージャーと異なり、詳細なグラフ、30日間の履歴データを提供します。HWiNFOと比較すると、Tauri/Rustアーキテクチャによりシステムリソースの消費が少なく、カスタマイズ可能なインターフェースを提供します。",
    "faq.q5": "ゲーム中でも監視できますか？",
    "faq.a5":
      "はい！HardwareVisualizerは最小限のリソース使用でバックグラウンドで実行されるため、ゲームセッション中のCPU使用率やメモリの監視に最適です。GPU温度の監視は現在NVIDIA GPUのみ対応しています。履歴データでシステムのパフォーマンスを後から確認することもできます。",
    "faq.q6": "どのGPUに対応していますか？",
    "faq.a6":
      "HardwareVisualizerはNVIDIA GPUにフル機能で対応しています。AMDとIntel GPUの対応は現在開発中です。",
    "faq.q7": "新しい機能をリクエストしたり貢献できますか？",
    "faq.a7":
      "もちろんです！対応ハードウェアの追加、テーマの追加、言語の追加などの機能リクエストはGitHubのIssueで受け付けています。プルリクエストやディスカッションへの参加も大歓迎です。",
    "faq.specsLink": "システム要件を見る",
    "faq.githubLink": "GitHubでIssueを作成",
    "faq.viewAll": "すべてのFAQを見る",
  },
} as const;
