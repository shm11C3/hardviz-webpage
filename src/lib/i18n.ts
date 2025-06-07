export const defaultLang = "ja";
export const languages = ["ja", "en"] as const;
export type Lang = (typeof languages)[number];

interface HeaderText {
  features: string;
  download: string;
  github: string;
}
interface HeroText {
  title: string;
  highlight: string;
  description: string;
  download: string;
  viewOnGithub: string;
}
interface UsageText {
  title: string;
  description: string;
  highlights: { title: string; description: string }[];
}
interface InsightsText {
  title: string;
  description: string;
  highlights: { title: string; description: string }[];
  cta: string;
}
interface FeaturesText {
  title: string;
  description: string;
  features: { title: string; description: string }[];
}
interface DownloadText {
  title: string;
  description: string;
  currentVersion: string;
  noDownload: string;
  otherVersions: string;
  viewReleases: string;
}
interface FooterText {
  tagline: string;
  sections: { title: string; links: { name: string; href: string }[] }[];
}

export interface I18n {
  header: HeaderText;
  hero: HeroText;
  usage: UsageText;
  insights: InsightsText;
  features: FeaturesText;
  download: DownloadText;
  footer: FooterText;
}

export const translations: Record<Lang, I18n> = {
  ja: {
    header: {
      features: "機能",
      download: "ダウンロード",
      github: "GitHub",
    },
    hero: {
      title: "ハードウェアを監視",
      highlight: "リアルタイムで",
      description:
        "Tauriで構築された軽量のオープンソースハードウェア監視ツール。CPU、GPU、メモリなどを最小限の負荷で確認できます。",
      download: "今すぐダウンロード",
      viewOnGithub: "GitHubで見る",
    },
    usage: {
      title: "自分好みにカスタマイズ",
      description:
        "グラフの色や背景画像を変更して、あなた好みのダッシュボードを作成。",
      highlights: [
        {
          title: "グラフィカルモニタリング",
          description: "CPU、メモリ、GPUの使用状況をリアルタイムグラフで表示。",
        },
        {
          title: "外観のカスタマイズ",
          description: "色や境界線、凡例などを自由に調整。",
        },
        {
          title: "壁紙設定",
          description: "お気に入りの画像を背景に設定して自分だけの画面に。",
        },
      ],
    },
    insights: {
      title: "高負荷を把握",
      description: "いつ、なぜシステムが重くなるかを確認。",
      highlights: [
        {
          title: "使用状況タイムライン",
          description: "いつ負荷がかかったかを表示。",
        },
        {
          title: "プロセストラッキング",
          description: "原因となったプロセスを特定。",
        },
        {
          title: "ゲーマー向け",
          description: "ゲーム中のCPU・GPU使用率を記録。",
        },
        {
          title: "エンジニア向け",
          description: "計算処理など重い作業のリソース使用を監視。",
        },
      ],
      cta: "今すぐ監視を開始",
    },
    features: {
      title: "強力なモニタリング機能",
      description:
        "HardwareVisualizerは直感的なUIで包括的なハードウェア監視を提供します。",
      features: [
        {
          title: "CPUモニタリング",
          description: "各コアの使用率や温度をリアルタイム表示。",
        },
        {
          title: "メモリアナライザ",
          description: "RAMの使用量やアプリ毎の割り当てを確認。",
        },
        {
          title: "GPUメトリクス",
          description: "対応GPUの使用率や温度、メモリ使用量を表示。",
        },
        {
          title: "パフォーマンス解析",
          description: "長期的なログやトレンドを可視化。",
        },
        { title: "軽量設計", description: "Tauriで開発され、低負荷で動作。" },
        {
          title: "オープンソース",
          description: "GitHubで開発される透明性の高いプロジェクト。",
        },
      ],
    },
    download: {
      title: "HardwareVisualizerをダウンロード",
      description: "主要なプラットフォームに対応。無料でオープンソース。",
      currentVersion: "現在のバージョン: ",
      noDownload: "{platform} 用のダウンロードはまだありません。",
      otherVersions: "その他のバージョンやプラットフォームをお探しですか？",
      viewReleases: "すべてのリリースを見る →",
    },
    footer: {
      tagline:
        "Tauriで作られた軽量のハードウェアモニタで、リアルタイムにハードウェア状態を確認できます。",
      sections: [
        {
          title: "製品",
          links: [
            { name: "機能", href: "#features" },
            { name: "ダウンロード", href: "#download" },
            {
              name: "更新履歴",
              href: "https://github.com/shm11C3/HardwareVisualizer/releases",
            },
          ],
        },
        {
          title: "リソース",
          links: [
            {
              name: "GitHub",
              href: "https://github.com/shm11C3/HardwareVisualizer",
            },
            {
              name: "問題を報告",
              href: "https://github.com/shm11C3/HardwareVisualizer/issues",
            },
          ],
        },
        {
          title: "コミュニティ",
          links: [
            {
              name: "GitHub Discussions",
              href: "https://github.com/shm11C3/HardwareVisualizer/discussions",
            },
          ],
        },
      ],
    },
  },
  en: {
    header: {
      features: "Features",
      download: "Download",
      github: "GitHub",
    },
    hero: {
      title: "Monitor Your Hardware",
      highlight: "In Real-Time",
      description:
        "A lightweight, open-source hardware monitoring tool built with Tauri. Track CPU, GPU, memory usage and more with minimal system impact.",
      download: "Download Now",
      viewOnGithub: "View on GitHub",
    },
    usage: {
      title: "Make It Truly Yours",
      description:
        "Customize charts and set your favorite image as the dashboard wallpaper.",
      highlights: [
        {
          title: "Graphical Monitoring",
          description:
            "Line charts show CPU, RAM, GPU usage in real-time with smooth visuals.",
        },
        {
          title: "Custom Appearance",
          description:
            "Tweak colors, borders, and legends with flexible visual settings.",
        },
        {
          title: "Custom Wallpaper",
          description:
            "Make your dashboard truly yours with a background image you love.",
        },
      ],
    },
    insights: {
      title: "Track & Identify High Load",
      description: "Know when and why your system slows down.",
      highlights: [
        {
          title: "Usage Timeline",
          description: "When was your system under load?",
        },
        { title: "Process Tracking", description: "Find out what caused it." },
        {
          title: "For Gamers",
          description: "Tracks CPU and GPU usage during gameplay.",
        },
        {
          title: "For Engineers",
          description: "Keep track of resource-hungry compute workloads.",
        },
      ],
      cta: "Start Monitoring Now",
    },
    features: {
      title: "Powerful Monitoring Features",
      description:
        "HardwareVisualizer provides comprehensive hardware monitoring with an intuitive interface and minimal system impact.",
      features: [
        {
          title: "CPU Monitoring",
          description:
            "Track CPU usage, temperature, and frequency in real-time with detailed per-core statistics.",
        },
        {
          title: "Memory Analysis",
          description:
            "Monitor RAM usage, available memory, and memory allocation across applications.",
        },
        {
          title: "GPU Metrics",
          description:
            "View GPU utilization, temperature, memory usage, and clock speeds for supported graphics cards.",
        },
        {
          title: "Performance Insights",
          description:
            "Analyze long-term hardware usage patterns with historical logs, trend visualization, and process usage statistics.",
        },
        {
          title: "Lightweight",
          description:
            "Built with Tauri for minimal resource usage, ensuring the monitor itself doesn't impact system performance.",
        },
        {
          title: "Open Source",
          description:
            "Fully transparent, community-driven development with the source code available on GitHub.",
        },
      ],
    },
    download: {
      title: "Download HardwareVisualizer",
      description: "Available for all major platforms. Free and open source.",
      currentVersion: "Current version: ",
      noDownload: "No downloads available for {platform} yet.",
      otherVersions: "Looking for other versions or platforms?",
      viewReleases: "View all releases on GitHub →",
    },
    footer: {
      tagline:
        "A lightweight hardware monitor built with Tauri for real-time hardware status monitoring.",
      sections: [
        {
          title: "Product",
          links: [
            { name: "Features", href: "#features" },
            { name: "Download", href: "#download" },
            {
              name: "Changelog",
              href: "https://github.com/shm11C3/HardwareVisualizer/releases",
            },
          ],
        },
        {
          title: "Resources",
          links: [
            {
              name: "GitHub",
              href: "https://github.com/shm11C3/HardwareVisualizer",
            },
            {
              name: "Report an Issue",
              href: "https://github.com/shm11C3/HardwareVisualizer/issues",
            },
          ],
        },
        {
          title: "Community",
          links: [
            {
              name: "GitHub Discussions",
              href: "https://github.com/shm11C3/HardwareVisualizer/discussions",
            },
          ],
        },
      ],
    },
  },
};

export function getTranslations(lang: string): I18n {
  return translations[lang as Lang] ?? translations[defaultLang];
}
