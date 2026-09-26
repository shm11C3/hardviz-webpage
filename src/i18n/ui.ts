export const languages = {
  en: "English",
  ja: "日本語",
};

export const defaultLang = "en";

export const showDefaultLang = false;

export const ui = {
  en: {
    "release.screenshot.cooling.alt":
      "Cooling Insight dashboard showing temperature, load, power, and fan trends",
    "release.screenshot.cooling.caption": "Cooling Insight",
    "release.status": "HardwareVisualizer v1.11.0",
    "release.nav": "v1.11.0 update",
    "release.announcement":
      "HardwareVisualizer v1.11.0: Cooling Insight, DuckDB history storage and PawnIO setup.",
    "release.meta.title":
      "Cooling Insight: CPU Temperature vs Load and History | HardwareVisualizer",
    "release.meta.description":
      "Cooling Insight in HardwareVisualizer v1.11.0 compares CPU temperature with load and past readings. Also new: DuckDB history storage and PawnIO setup on Windows.",
    "release.hero.title":
      "Cooling Insight: understand CPU temperature through load and history.",
    "release.hero.body":
      "Cooling Insight now lets you compare CPU temperature with load and past readings. This release also moves history storage to DuckDB and lets you install PawnIO from Settings on Windows.",
    "release.hero.cta": "Download HardwareVisualizer",
    "release.hero.secondary": "View release notes",
    "release.figure.title": "Compare within each CPU load band",
    "release.figure.baseline": "Baseline period",
    "release.figure.recent": "Recent period",
    "release.figure.idle": "Idle",
    "release.figure.low": "Low load",
    "release.figure.mid": "Medium load",
    "release.figure.high": "High load",
    "release.figure.axis": "CPU temperature",
    "release.figure.lower": "Lower",
    "release.figure.higher": "Higher",
    "release.figure.caption":
      "Illustration of the comparison method. Not an application screenshot or measured data.",
    "release.contents": "On this page",
    "release.cooling.name": "Cooling Insight",
    "release.foundation.name": "History & setup",
    "release.faq.name": "Questions & answers",
    "release.comparison.title": "Was it warmer at a similar load?",
    "release.comparison.body":
      "A hotter CPU may simply be doing more work. Cooling Insight groups readings into idle, low, medium and high load, then compares temperatures between the baseline and recent periods.",
    "release.comparison.note":
      "Comparisons need enough recorded data. When samples are insufficient, the view shows that the comparison is not yet available.",
    "release.comparison.detail.title": "A closer look at load and temperature",
    "release.comparison.detail.body":
      "The Load × Temperature Explorer plots hourly average CPU load against hourly average CPU temperature. It separates the baseline and recent periods and shows medians by load band. Bands with too few recorded hours remain unassessed.",
    "release.reading.title": "Follow what changed at the same time.",
    "release.reading.body":
      "After gaming or a long rendering job, review CPU temperature and load on a shared timeline. Available CPU package power and fan-speed readings add context to those changes.",
    "release.reading.temperature": "CPU temperature",
    "release.reading.load": "CPU load",
    "release.reading.power": "CPU package power",
    "release.reading.fan": "Fan speed",
    "release.reading.caption":
      "Illustrative timeline. Not an application screenshot or measured data.",
    "release.reading.available": "On supported hardware",
    "release.reading.note":
      "Available readings depend on the OS and hardware. Unsupported sensors and periods without recorded data are identified separately.",
    "release.long.title": "See changes across days and months.",
    "release.long.body":
      "Switch between 24 hours, 7 days and 30 days of archive history, or 90-day and one-year views built from daily summaries. Compare recent idle temperatures with the established baseline to see sustained changes.",
    "release.long.short": "Archive history",
    "release.long.short.periods": "24 hours / 7 days / 30 days",
    "release.long.daily": "Daily summaries",
    "release.long.daily.periods": "90 days / 1 year",
    "release.long.note":
      "Views show the data you have recorded; a one-year view does not create a year of past readings.",
    "release.limits.title": "An observation to investigate.",
    "release.limits.body":
      "Room temperature, power plans, BIOS settings and software changes can also affect CPU temperature. Cooling Insight helps you review observations; a rise in temperature alone does not diagnose hardware wear or a cooling fault.",
    "release.foundation.title": "Two updates to support that history.",
    "release.foundation.body":
      "This release adds Cooling Insight, updates history storage and makes optional sensor setup easier on Windows.",
    "release.duck.title": "History storage moves to DuckDB",
    "release.duck.body":
      "History storage now uses DuckDB. This update addresses the growing volume of recorded history and the work involved in aggregating data over longer periods.",
    "release.duck.benchmark.caption": "History file size",
    "release.duck.benchmark.period": "History length",
    "release.duck.benchmark.sqliteVersion": "(before v1.11.0)",
    "release.duck.benchmark.duckdbVersion": "(v1.11.0)",
    "release.duck.benchmark.30d": "30 days",
    "release.duck.benchmark.90d": "90 days",
    "release.duck.benchmark.1y": "1 year",
    "release.duck.benchmark.note":
      "Synthetic-data comparison: the DuckDB column shows the median across {runs} builds, about {reduction}% smaller. These are not whole-application database sizes.",
    "release.duck.benchmark.conditions":
      "Measured on {date}, using synthetic Process Stats and Ambient histories ({workload} cases, {samples} process samples per minute). The table shows the median DuckDB file size across {runs} independent builds; observed ranges: {ranges}. File sizes were measured after closing and checkpointing: SQLite includes indexes; DuckDB includes metadata and WAL, with no explicit indexes or primary-key constraints in this fixture. Environment: macOS {macos}; SQLite {sqlite} / DuckDB {duckdb}. This reruns the historical engine experiment; it does not measure final application storage or migration overhead.",
    "release.duck.benchmark.source":
      "Measurement conditions and results (JSON)",
    "release.duck.detail.title": "About the storage update",
    "release.duck.detail.body":
      "DuckDB is a column-oriented database designed for analytical queries. It handles history storage and aggregation inside HardwareVisualizer, including the records used by Cooling Insight. It does not require a separate database server.",
    "release.pawn.title": "Install PawnIO from Settings",
    "release.pawn.body":
      "On Windows, start optional PawnIO installation from HardwareVisualizer. The app downloads the runtime and required modules, reducing manual setup for supported CPU temperature, power and motherboard sensor readings.",
    "release.pawn.note":
      "Optional, Windows only. Requires an internet connection and Windows administrator approval. Sensor availability depends on the hardware.",
    "release.pawn.detail.title": "What happens during installation?",
    "release.pawn.detail.body":
      "In Settings → Advanced → Optional component setup, choose Install. Downloads come from the official GitHub releases and are checked against recorded sizes and SHA-256 hashes. The app requests Windows administrator approval, installs a missing runtime and adds missing modules without overwriting existing files. Restart HardwareVisualizer afterward; restart Windows first if requested. PawnIO is downloaded during setup, not bundled with HardwareVisualizer.",
    "release.faq.available.q": "Do comparisons need time to collect data?",
    "release.faq.available.a":
      "Yes. Cooling Insight needs recorded data to establish a baseline and compare it with recent readings. It shows baseline progress and leaves comparisons unavailable when there are not enough samples.",
    "release.faq.control.q": "Does Cooling Insight adjust my fans?",
    "release.faq.control.a":
      "The features introduced here display and compare recorded readings. They do not change fan curves or cooling settings.",
    "release.faq.setup.q": "Is PawnIO required on every OS?",
    "release.faq.setup.a":
      "No. PawnIO setup is for supported sensor paths on Windows. It is not a setup step for macOS or Linux, and installing it does not make every sensor available.",
    "release.final.title": "Review your CPU’s thermal history.",
    "release.final.body":
      "Use Cooling Insight to review CPU temperature alongside load and compare it with past readings. DuckDB history storage and optional PawnIO setup support this update.",
    "release.related.title": "Related pages",
    "release.related.github": "Release on GitHub",
    "release.related.features": "All features",
    "release.related.specs": "System requirements",
    "nav.home": "Home",
    "nav.Features": "Features",
    "nav.Download": "Download",
    "nav.faq": "FAQ",
    "nav.githubStarsBadgeAlt": "GitHub stars",
    "nav.changelog": "Changelog",
    "seo.ogImageAlt":
      "HardwareVisualizer logo over a dashboard showing CPU, GPU, RAM, and process metrics",
    "seo.home.title": "HardwareVisualizer – CPU & GPU Monitor with History",
    "seo.home.description":
      "Hardware monitor for Windows, macOS, and Linux. See CPU, GPU, temperature, and processes live, then review what happened after gaming or heavy workloads.",
    "seo.home.softwareDescription":
      "Cross-platform hardware monitor with real-time CPU, GPU, temperature, memory, and process details plus locally stored history to help you understand what happened after gaming or heavy workloads.",
    "seo.home.feature1":
      "CPU, GPU, temperature, and sampled process history stored locally",
    "seo.home.feature2":
      "Review what happened after gaming and heavy workloads",
    "seo.home.feature3":
      "Real-time CPU, GPU, temperature, and memory monitoring",
    "seo.home.feature4": "No account and no outbound telemetry",
    "seo.home.feature5": "Authenticode-signed Windows release installer",
    "seo.home.feature6": "Open-source software licensed under GPL-3.0-or-later",
    "seo.home.feature7": "Windows, macOS, and Linux support",
    "hero.title": "Live PC monitoring with history",
    "hero.description":
      "Track CPU and GPU usage and temperatures in real time. Review the history later to see how they changed and which processes were active.",
    "hero.download": "Download for Windows",
    "hero.viewGitHub": "View on GitHub",
    "hero.availability":
      "For Windows 10 and 11. Also available on macOS and Linux.",
    "hero.screenshotAlt":
      "HardwareVisualizer Insights showing CPU and memory usage history over time",
    "screenshots.insightsAlt":
      "HardwareVisualizer Insights - review historical CPU and GPU usage after a workload",
    "screenshots.dashboardAlt":
      "HardwareVisualizer dashboard showing CPU, memory, GPU, process, and sensor monitoring",
    "screenshots.coolingInsightAlt":
      "Cooling Insight dashboard comparing CPU temperature and showing temperature, load, power, and fan history",
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
      "Built in the open for Windows, macOS, and Linux under the GPL-3.0-or-later license.",
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
    "footer.specs": "Compatibility",
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

    "specs.title": "Compatibility Notes",
    "specs.docs.eyebrow": "Compatibility notes",
    "specs.docs.title": "HardwareVisualizer compatibility notes",
    "specs.docs.description":
      "A practical reference for what HardwareVisualizer can show, where coverage is best effort, how the app can be customized, and how to verify official downloads before installing.",
    "specs.docs.primaryCta": "Download from official sources",
    "specs.docs.secondaryCta": "Verify release files",
    "specs.nav.ariaLabel": "Compatibility page sections",
    "specs.nav.title": "On this page",
    "specs.nav.overview": "Overview",
    "specs.nav.operatingSystems": "Operating systems",
    "specs.nav.signals": "Signals",
    "specs.nav.appearance": "Appearance",
    "specs.nav.storageComponents": "Storage Health",
    "specs.nav.privacyVerification": "Privacy and verification",
    "specs.section.overview.eyebrow": "Before you install",
    "specs.section.overview.title": "What the app is built to keep visible",
    "specs.section.overview.description":
      "HardwareVisualizer is a free, open-source desktop monitor for people who want live hardware state, short-window graphs, and recent history in one readable surface.",
    "specs.overview.distribution.label": "Official distribution",
    "specs.overview.distribution.value":
      "GitHub Releases, hardviz.com, and Winget where available.",
    "specs.overview.os.label": "Desktop coverage",
    "specs.overview.os.value":
      "Windows 10/11, macOS builds for Apple Silicon and Intel, plus Linux packages for common desktop distributions.",
    "specs.overview.history.label": "Historical insight",
    "specs.overview.history.value":
      "CPU, memory, GPU, and process history are kept for up to 30 days by default.",
    "specs.overview.privacy.label": "Privacy posture",
    "specs.overview.privacy.value":
      "No outbound telemetry for collected hardware data.",
    "specs.overview.customization.label": "Customization",
    "specs.overview.customization.value":
      "Color themes, graph colors, background images, transparent UI, glass blur, and tray widget preferences.",
    "specs.overview.languages.label": "Languages",
    "specs.overview.languages.value":
      "The app supports English, Japanese, and Russian.",
    "specs.overview.visual.title": "Dashboard reference.",
    "specs.overview.visual.caption":
      "The interface is designed for a glanceable hardware overview rather than a dense diagnostics console.",
    "specs.section.compat.eyebrow": "Platform fit",
    "specs.os.title": "Operating systems and installers",
    "specs.os.description":
      "The app targets desktop operating systems, but sensor depth can vary by OS APIs, device files, drivers, and vendor SDKs.",
    "specs.section.signals.eyebrow": "Hardware coverage",
    "specs.signals.title": "Signals and feature coverage",
    "specs.signals.description":
      "The matrix separates always-useful dashboard surfaces from best-effort sensor paths and planned monitoring work by operating system.",
    "specs.matrix.feature": "Signal / feature",
    "specs.matrix.cpu.label": "CPU / RAM",
    "specs.matrix.cpuTemperature.label": "CPU / sensor temperature",
    "specs.matrix.storage.label": "Storage Health",
    "specs.matrix.fan.label": "Fan",
    "specs.matrix.language.label": "Language",
    "specs.matrix.cpu.windows":
      "Live usage, memory details, and history are core supported surfaces.",
    "specs.matrix.cpu.macos":
      "Live usage, memory details, and history are core supported surfaces.",
    "specs.matrix.cpu.linux":
      "Live usage, memory details, and history are core supported surfaces.",
    "specs.matrix.gpu.windows":
      "Deepest coverage, especially NVIDIA; AMD and Intel depend on driver and API availability.",
    "specs.matrix.gpu.macos":
      "Partial coverage through macOS APIs; visible counters vary by device.",
    "specs.matrix.gpu.linux":
      "Partial coverage through NVIDIA and DRM paths; permissions and drivers matter.",
    "specs.matrix.cpuTemperature.windows":
      "ACPI thermal zones are best effort; PawnIO can improve CPU package temperature on supported CPUs.",
    "specs.matrix.cpuTemperature.macos":
      "Best effort. Sensor exposure depends on the machine and macOS APIs.",
    "specs.matrix.cpuTemperature.linux":
      "Best effort. Sensor access can depend on device files, drivers, and privileges.",
    "specs.matrix.storage.windows":
      "Native and fallback paths can expose SMART or NVMe health fields when available.",
    "specs.matrix.storage.macos":
      "Native paths can expose storage summary and selected health fields when available.",
    "specs.matrix.storage.linux":
      "Native paths and smartctl can improve SMART or NVMe health coverage.",
    "specs.matrix.network.windows":
      "Interface, IP, subnet, and gateway data are available; traffic usage is planned.",
    "specs.matrix.network.macos":
      "Interface, IP, subnet, and gateway data are available; traffic usage is planned.",
    "specs.matrix.network.linux":
      "Interface, IP, subnet, and gateway data are available; traffic usage is planned.",
    "specs.matrix.process.windows":
      "Live Process Table and Process Insight connect current load with history.",
    "specs.matrix.process.macos":
      "Live Process Table and Process Insight connect current load with history.",
    "specs.matrix.process.linux":
      "Live Process Table and Process Insight connect current load with history.",
    "specs.matrix.fan.windows":
      "Fan-speed reads are implemented for supported Super I/O sensors through the optional PawnIO LpcIO module. Coverage varies by motherboard, and this read-only path does not support fan control.",
    "specs.matrix.fan.macos":
      "Cross-vendor fan monitoring remains roadmap and research work.",
    "specs.matrix.fan.linux":
      "Cross-vendor fan monitoring remains roadmap and research work.",
    "specs.matrix.language.windows":
      "English, Japanese, and Russian are supported in the app.",
    "specs.matrix.language.macos":
      "English, Japanese, and Russian are supported in the app.",
    "specs.matrix.language.linux":
      "English, Japanese, and Russian are supported in the app.",
    "specs.signals.cpuTemperature.coverage":
      "CPU package and thermal-zone temperature where available",
    "specs.section.appearance.eyebrow": "Readable on your desk",
    "specs.appearance.title": "Appearance and customization",
    "specs.appearance.description":
      "HardwareVisualizer is meant to stay open, so visual settings are part of the product surface rather than a decorative afterthought.",
    "specs.appearance.colorMode.name": "Color themes",
    "specs.appearance.colorMode.value":
      "System, Light, Dark, Dark+, Sky, Grove, Sunset, Nebula, Orbit, Cappuccino, Espresso.",
    "specs.appearance.colorMode.notes":
      "Theme choices cover neutral, bright, dark, and warm setups without forcing a single visual personality.",
    "specs.appearance.graphColors.name": "Graph colors",
    "specs.appearance.graphColors.value":
      "Per-metric line colors for CPU, memory, and GPU graphs.",
    "specs.appearance.graphColors.notes":
      "Useful when the app is kept on a side display and the important metric needs to be recognizable immediately.",
    "specs.appearance.background.name": "Background images",
    "specs.appearance.background.value":
      "Local background image selection with opacity control.",
    "specs.appearance.background.notes":
      "Background assets stay local and can be toned down so metrics remain readable.",
    "specs.appearance.transparent.name": "Transparent UI",
    "specs.appearance.transparent.value":
      "Transparent window surfaces with adjustable glass blur.",
    "specs.appearance.transparent.notes":
      "The glass effect is configurable, and interactive controls keep opaque enough contrast for day-to-day use.",
    "specs.appearance.tray.name": "Tray widget",
    "specs.appearance.tray.value":
      "CPU, GPU, and GPU temperature metrics, with ordering and visibility preferences.",
    "specs.appearance.tray.notes":
      "Close-to-tray behavior and compact metric access help the monitor stay available without occupying the full desktop.",
    "specs.appearance.preferences.name": "Display preferences",
    "specs.appearance.preferences.value":
      "Language, temperature unit, dashboard visibility, and chart display settings.",
    "specs.appearance.preferences.notes":
      "These settings make the app more useful across regions, Celsius/Fahrenheit habits, and different monitoring workflows.",
    "specs.section.storage.eyebrow": "Deeper hardware paths",
    "specs.storage.title": "Storage Health and optional components",
    "specs.storage.description":
      "Optional components are not bundled, downloaded, installed, or enabled automatically. The app only explains them when a fallback path still leaves visible hardware data unavailable.",
    "specs.storage.live.title": "Live Storage Health",
    "specs.storage.live.body":
      "A cheap native read path refreshes focused storage information without running smartctl on the live polling cadence.",
    "specs.storage.record.title": "Storage Health Record",
    "specs.storage.record.body":
      "Daily health records can include SMART overall health, temperature, NVMe percentage used, available spare, reallocated sectors, pending sectors, offline uncorrectable sectors, and NVMe media errors when available.",
    "specs.storage.pawnio.title": "PawnIO for CPU package temperature",
    "specs.storage.pawnio.body":
      "On Windows, supported Intel and AMD CPUs can expose package temperature through PawnIO modules when the user provides the driver/runtime and sufficient privileges.",
    "specs.storage.smartctl.title": "smartctl for richer storage signals",
    "specs.storage.smartctl.body":
      "smartmontools can improve Storage Health when native OS paths cannot read important SMART or NVMe health fields.",
    "specs.section.verification.eyebrow": "Trust model",
    "specs.verification.title": "Privacy and download verification",
    "specs.verification.description":
      "HardwareVisualizer is open source, avoids outbound telemetry for collected hardware data, and documents how to verify official release files.",
    "specs.verification.official.name": "Official sources",
    "specs.verification.official.detail":
      "Use GitHub Releases, hardviz.com, or Winget where available. Third-party mirrors and password-protected archives are not official.",
    "specs.verification.checksums.name": "SHA-256 checksums",
    "specs.verification.checksums.detail":
      "SHA256SUMS.txt is published for release assets from v1.8.1 onward.",
    "specs.verification.attestations.name": "GitHub Artifact Attestations",
    "specs.verification.attestations.detail":
      "Release artifacts include GitHub Artifact Attestations from v1.8.1 onward where available.",
    "specs.verification.windows.name": "Windows signing",
    "specs.verification.windows.detail":
      "Windows installers are Authenticode signed from v1.9.0 onward.",
    "specs.verification.macos.name": "macOS signing",
    "specs.verification.macos.detail":
      "macOS downloads are signed with Apple Developer ID and notarized.",
    "specs.verification.linux.name": "Linux packages",
    "specs.verification.linux.detail":
      "Linux package signing is not currently provided through GPG, Sigstore, or repository metadata; use checksums and attestations instead.",
    "specs.hero.imageAlt":
      "HardwareVisualizer dashboard showing live hardware metrics",
    "specs.sources.readme": "GitHub README",
    "specs.sources.externalComponents": "Optional components",
    "specs.sources.devStory": "Development story",
    "specs.sources.verification": "Verification guide",
    "specs.signal.gpu.label": "GPU",
    "specs.signal.process.label": "Process",
    "specs.signal.network.label": "Network",
    "specs.compat.name": "Area",
    "specs.compat.coverage": "Coverage",
    "specs.compat.status": "Status",
    "specs.compat.notes": "Notes",
    "specs.compat.status.supported": "Supported",
    "specs.compat.status.partial": "Partial",
    "specs.compat.status.bestEffort": "Best effort",
    "specs.compat.status.planned": "Planned",
    "specs.compat.status.experimental": "Experimental",
    "specs.compat.windows.coverage": "Windows 10/11, x64",
    "specs.compat.windows.notes":
      "MSI and setup installers are available, and Winget is an official Windows installation path where available.",
    "specs.compat.linux.coverage": "Debian/Ubuntu, RPM-based distros, AppImage",
    "specs.compat.linux.notes":
      "Some device files and sensors may require elevated privileges. Desktop-environment limitations can apply.",
    "specs.compat.macos.appleSilicon.name": "macOS (Apple Silicon)",
    "specs.compat.macos.appleSilicon.coverage": "Apple Silicon (ARM64)",
    "specs.compat.macos.appleSilicon.notes":
      "macOS releases are signed and notarized. Sensor coverage depends on the machine and OS API availability.",
    "specs.compat.macos.intel.name": "macOS (Intel)",
    "specs.compat.macos.intel.coverage": "Intel (x64)",
    "specs.compat.macos.intel.notes":
      "Intel macOS builds are experimental. Sensor coverage depends on the machine and OS API availability.",
    "specs.compat.cpu.coverage": "CPU and RAM usage, memory details, history",
    "specs.compat.gpu.coverage":
      "NVIDIA full path, AMD and Intel partial paths",
    "specs.compat.storage.coverage":
      "Storage summary, Storage Health records, Live Storage Health",
    "specs.compat.network.coverage": "Interface, IP, subnet, and gateway data",
    "specs.compat.process.coverage": "Live Process Table and Process Insight",
    "specs.compat.fan.coverage":
      "Windows fan speed on supported Super I/O sensors",
    "specs.compat.language.coverage": "English, Japanese, Russian",
    "specs.cta.download": "Go to downloads",
    "specs.cta.verify": "Open verification guide",

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
      "Yes, HardwareVisualizer is completely free and open-source under the GNU General Public License v3.0 or later (GPL-3.0-or-later). Versions released before the relicense remain available under the MIT license. Download it only from hardviz.com, GitHub Releases, or Winget on Windows where available; third-party mirrors, file-sharing links, YouTube description links, and password-protected archives are not official.",
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
    "faq.specsLink": "Compatibility",
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
    "release.screenshot.cooling.alt":
      "温度、負荷、電力、ファンの推移を表示するCooling Insightの画面",
    "release.screenshot.cooling.caption": "Cooling Insightの画面",
    "release.status": "HardwareVisualizer v1.11.0",
    "release.nav": "v1.11.0 アップデート",
    "release.announcement":
      "HardwareVisualizer v1.11.0：Cooling Insight、DuckDBへの移行、PawnIOの導入支援。",
    "release.meta.title":
      "Cooling InsightでCPU温度を負荷と履歴から比較 | HardwareVisualizer",
    "release.meta.description":
      "HardwareVisualizer v1.11.0の更新内容を紹介。CPU温度を負荷や過去の記録と比べるCooling Insightを追加しました。履歴保存をDuckDBへ移し、Windowsでは設定画面からPawnIOを導入できます。",
    "release.hero.title": "Cooling InsightでCPU温度を負荷と履歴から読み解く",
    "release.hero.body":
      "CPU温度を負荷や過去の記録と比べられる「Cooling Insight」を追加しました。履歴保存をDuckDBへ移し、Windowsでは設定画面からPawnIOを導入できるようになりました。",
    "release.hero.cta": "HardwareVisualizerをダウンロード",
    "release.hero.secondary": "更新履歴を見る",
    "release.figure.title": "CPUの負荷帯ごとに比較",
    "release.figure.baseline": "基準期間",
    "release.figure.recent": "直近期間",
    "release.figure.idle": "アイドル",
    "release.figure.low": "低負荷",
    "release.figure.mid": "中負荷",
    "release.figure.high": "高負荷",
    "release.figure.axis": "CPU温度",
    "release.figure.lower": "低い",
    "release.figure.higher": "高い",
    "release.figure.caption":
      "比較方法を示す説明図です。製品のスクリーンショットや実測データではありません。",
    "release.contents": "このページの内容",
    "release.cooling.name": "Cooling Insight",
    "release.foundation.name": "履歴とセットアップ",
    "release.faq.name": "よくある質問",
    "release.comparison.title": "同じ負荷で温度を比べる",
    "release.comparison.body":
      "CPUが熱くなったとき、単に処理が増えたのかもしれません。Cooling Insightはアイドル・低負荷・中負荷・高負荷に分けて、基準期間と直近期間の温度を比較します。",
    "release.comparison.note":
      "比較には十分な記録が必要です。データが足りない負荷帯は、推測で補わず「比較保留」として表示します。",
    "release.comparison.detail.title": "負荷と温度を詳しく見る",
    "release.comparison.detail.body":
      "「負荷 × 温度 Explorer」では、1時間ごとの平均CPU負荷と平均CPU温度を散布図で表示します。基準期間と直近期間を分け、負荷帯ごとの中央値も確認できます。記録時間が少ない帯域は比較保留になります。",
    "release.reading.title": "同じ時間の変化を確かめる",
    "release.reading.body":
      "ゲームや長時間のレンダリングのあとに、CPU温度と負荷を同じ時間軸で振り返れます。CPUパッケージ電力やファン回転数を取得できる環境では、その変化もあわせて確認できます。",
    "release.reading.temperature": "CPU温度",
    "release.reading.load": "CPU負荷",
    "release.reading.power": "CPUパッケージ電力",
    "release.reading.fan": "ファン回転数",
    "release.reading.caption":
      "説明用の時系列イメージ図です。製品のスクリーンショットや実測データではありません。",
    "release.reading.available": "取得できる環境で表示",
    "release.reading.note":
      "取得できる項目はOSやハードウェアによって異なります。センサーが非対応の場合と、その期間に記録がない場合は分けて表示します。",
    "release.long.title": "数日から数か月の温度変化を見る",
    "release.long.body":
      "24時間・7日・30日の履歴に加え、日次集計による90日・1年の推移を表示できます。最近のアイドル時温度を確立済みの基準期間と比較し、持続的な変化を確認できます。",
    "release.long.short": "履歴データ",
    "release.long.short.periods": "24時間 / 7日 / 30日",
    "release.long.daily": "日次集計",
    "release.long.daily.periods": "90日 / 1年",
    "release.long.note":
      "表示されるのは蓄積された記録です。1年表示を選んでも、記録前のデータが補われることはありません。",
    "release.limits.title": "温度の変化を見るときに",
    "release.limits.body":
      "室温・電源プラン・BIOS設定・ソフトウェア構成の変化も、CPU温度に影響します。Cooling Insightは記録を確認するための機能です。温度の上昇だけで、部品の劣化や冷却の故障を断定するものではありません。",
    "release.foundation.title": "Cooling Insightを支える2つの変更",
    "release.foundation.body":
      "今回のリリースではCooling Insightの追加とあわせて、履歴の保存基盤と、Windowsでセンサーを利用するための導入手順も改善しました。",
    "release.duck.title": "履歴の保存基盤をDuckDBへ",
    "release.duck.body":
      "履歴の保存基盤にDuckDBを採用しました。蓄積する履歴データと、長い期間の集計を扱うための基盤を更新しています。",
    "release.duck.benchmark.caption": "履歴ファイルの保存容量",
    "release.duck.benchmark.period": "履歴の期間",
    "release.duck.benchmark.sqliteVersion": "（v1.11.0未満）",
    "release.duck.benchmark.duckdbVersion": "（v1.11.0）",
    "release.duck.benchmark.30d": "30日",
    "release.duck.benchmark.90d": "90日",
    "release.duck.benchmark.1y": "1年",
    "release.duck.benchmark.note":
      "合成データでの比較です。DuckDBの欄は{runs}回測定の中央値で、各期間約{reduction}%削減。製品全体の保存容量ではありません。",
    "release.duck.benchmark.conditions":
      "{date}測定。プロセス統計と環境温度の合成履歴（{workload}ケース、1分あたり{samples}件のプロセスサンプル）を使用。表のDuckDB容量は独立した{runs}回の作成結果の中央値です。各期間の実測範囲: {ranges}。終了・チェックポイント後のファイル容量で、SQLiteは索引を含み、DuckDBはメタデータ・WALを含みます。この検証用DuckDBには明示的な索引・主キー制約を付けていません。実行環境はmacOS {macos}、SQLite {sqlite} / DuckDB {duckdb}。過去のエンジン比較を同じ条件で再実行したもので、最終製品の保存容量や移行時の一時容量は測定対象外です。",
    "release.duck.benchmark.source": "測定条件と結果を確認する（JSON）",
    "release.duck.detail.title": "保存基盤の変更について",
    "release.duck.detail.body":
      "DuckDBは、データの集計や分析に適した列指向のデータベースです。Cooling Insightで利用する記録を含め、HardwareVisualizer内で履歴の保存と集計を担います。別途データベースサーバーを用意する必要はありません。",
    "release.pawn.title": "PawnIOを設定画面から導入",
    "release.pawn.body":
      "Windowsでは、HardwareVisualizerの設定画面からPawnIOの導入を開始できます。ランタイムと必要なモジュールをダウンロードし、対応するCPUの温度・電力やマザーボードセンサーを利用するための手作業を減らします。",
    "release.pawn.note":
      "Windows向けの任意導入です。インターネット接続とWindowsの管理者承認が必要です。利用できるセンサーはハードウェアによって異なります。",
    "release.pawn.detail.title": "導入時に行われること",
    "release.pawn.detail.body":
      "「設定 → 詳細設定 → 任意コンポーネントのセットアップ」からインストールを選びます。公式GitHubリリースから取得し、サイズとSHA-256ハッシュを検証します。Windowsの管理者承認後、未導入のランタイムと不足するモジュールを追加し、既存ファイルは上書きしません。完了後はアプリを再起動し、Windowsから再起動を求められた場合は先にOSを再起動します。PawnIOは同梱せず、セットアップ時に取得します。",
    "release.faq.available.q": "比較結果が出るまで、記録の蓄積は必要ですか？",
    "release.faq.available.a":
      "はい。基準期間を確立し、最近の状態と比較するために記録の蓄積が必要です。基準期間の確立状況を表示し、サンプルが不足している場合は比較保留として扱います。",
    "release.faq.control.q": "Cooling Insightでファンを制御できますか？",
    "release.faq.control.a":
      "ここで紹介している機能は、記録した値の表示と比較を行います。ファンカーブや冷却設定を変更する機能ではありません。",
    "release.faq.setup.q": "どのOSでもPawnIOが必要ですか？",
    "release.faq.setup.a":
      "いいえ。PawnIOの導入はWindowsの対応センサー向けです。macOSやLinuxでの導入手順ではなく、インストールによってすべてのセンサーが使えるようになるわけでもありません。",
    "release.final.title": "CPU温度の履歴を振り返る",
    "release.final.body":
      "Cooling Insightで、CPU温度を負荷の推移とあわせて確認し、過去の記録と比較できます。DuckDBによる履歴の保存と、PawnIOの導入支援もあわせて利用できます。",
    "release.related.title": "関連ページ",
    "release.related.github": "GitHubのリリースページ",
    "release.related.features": "機能一覧",
    "release.related.specs": "システム要件",
    "nav.home": "ホーム",
    "nav.Features": "機能",
    "nav.Download": "ダウンロード",
    "nav.faq": "FAQ",
    "nav.githubStarsBadgeAlt": "GitHubのスター数",
    "nav.changelog": "変更履歴",
    "seo.ogImageAlt":
      "CPU、GPU、RAM、プロセス情報のダッシュボードに重なるHardwareVisualizerのロゴ",
    "seo.home.title": "HardwareVisualizer – あとから振り返れるCPU・GPUモニター",
    "seo.home.description":
      "Windows、macOS、Linux対応のハードウェアモニター。CPU、GPU、温度、プロセスをリアルタイムで確認し、ゲームや重い処理のあとに何が起きていたか振り返れます。",
    "seo.home.softwareDescription":
      "CPU、GPU、温度、メモリ、プロセスをリアルタイムで確認し、PC内に保存した履歴から、ゲームや重い処理のあとに何が起きていたか振り返れるクロスプラットフォーム対応ハードウェアモニター。",
    "seo.home.feature1":
      "CPU、GPU、温度、サンプリングされたプロセスの履歴をPC内に保存",
    "seo.home.feature2": "ゲームや重い処理のあとに何が起きていたか確認",
    "seo.home.feature3": "CPU、GPU、温度、メモリのリアルタイム監視",
    "seo.home.feature4": "アカウント不要・外部テレメトリなし",
    "seo.home.feature5": "Authenticode署名済みWindowsリリースインストーラ",
    "seo.home.feature6":
      "GPL-3.0-or-laterライセンスのオープンソースソフトウェア",
    "seo.home.feature7": "Windows、macOS、Linux対応",
    "hero.title": "PCの今と、これまでの変化を見る。",
    "hero.description":
      "CPU・GPUの使用率や温度をリアルタイムで表示し、負荷の変化や動いていたアプリも履歴から確認できます。",
    "hero.download": "Windows版をダウンロード",
    "hero.viewGitHub": "GitHubを閲覧",
    "hero.availability": "Windows 10・11に対応。macOS・Linux版も利用できます。",
    "hero.screenshotAlt":
      "CPUとメモリの使用履歴を時系列で表示するHardwareVisualizerのInsights画面",
    "screenshots.insightsAlt":
      "処理後にCPUとGPUの使用履歴を振り返るHardwareVisualizerのInsights画面",
    "screenshots.dashboardAlt":
      "CPU、メモリ、GPU、プロセス、センサーの状態を表示するHardwareVisualizerのダッシュボード",
    "screenshots.coolingInsightAlt":
      "CPU温度の比較と温度、負荷、電力、ファンの履歴を表示するCooling Insight画面",
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
      "Windows、macOS、Linux向けにGPL-3.0-or-laterライセンスで公開・開発されています。",
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
    "footer.specs": "対応環境",
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

    "specs.title": "対応環境ノート",
    "specs.docs.eyebrow": "対応環境について",
    "specs.docs.title": "対応環境ノート",
    "specs.docs.description":
      "HardwareVisualizerが表示できる情報、ベストエフォートになる範囲、見た目のカスタマイズ、公式ダウンロードの検証方法を、インストール前に確認できるリファレンスです。",
    "specs.docs.primaryCta": "公式導線からダウンロード",
    "specs.docs.secondaryCta": "リリースファイルを検証",
    "specs.nav.ariaLabel": "対応環境ページのセクション",
    "specs.nav.title": "このページの内容",
    "specs.nav.overview": "概要",
    "specs.nav.operatingSystems": "対応OS",
    "specs.nav.signals": "計測項目",
    "specs.nav.appearance": "外観",
    "specs.nav.storageComponents": "ストレージ",
    "specs.nav.privacyVerification": "プライバシーと検証",
    "specs.section.overview.eyebrow": "インストール前に",
    "specs.section.overview.title":
      "見える場所に置いておくためのハードウェア情報",
    "specs.section.overview.description":
      "HardwareVisualizerは、ライブのハードウェア状態、短い時間窓のグラフ、直近の履歴を一つの読みやすい画面にまとめる、無料・オープンソースのデスクトップモニターです。",
    "specs.overview.distribution.label": "公式配布元",
    "specs.overview.distribution.value":
      "GitHub Releases、hardviz.com、利用可能な場合はWinget。",
    "specs.overview.os.label": "対応OS",
    "specs.overview.os.value":
      "Windows 10/11、Apple Silicon/Intel向けmacOSビルド、主要Linuxデスクトップ向けパッケージ。",
    "specs.overview.history.label": "履歴データ",
    "specs.overview.history.value":
      "CPU、メモリ、GPU、プロセスの履歴は標準で最大30日分保存されます。",
    "specs.overview.privacy.label": "プライバシー",
    "specs.overview.privacy.value":
      "収集したハードウェア情報の外部テレメトリはありません。",
    "specs.overview.customization.label": "カスタマイズ",
    "specs.overview.customization.value":
      "カラーテーマ、グラフ色、背景画像、透明UI、ガラスぼかし、トレイウィジェット設定。",
    "specs.overview.languages.label": "対応言語",
    "specs.overview.languages.value":
      "アプリは英語、日本語、ロシア語に対応しています。",
    "specs.overview.visual.title": "ダッシュボードの例。",
    "specs.overview.visual.caption":
      "細かい診断コンソールではなく、ひと目で読めるハードウェア概要を重視したUIです。",
    "specs.section.compat.eyebrow": "対応プラットフォーム",
    "specs.os.title": "OSとインストーラ",
    "specs.os.description":
      "デスクトップOSを対象にしていますが、センサーの深さはOS API、デバイスファイル、ドライバー、ベンダーSDKによって変わります。",
    "specs.section.signals.eyebrow": "計測項目",
    "specs.signals.title": "取得できる情報と機能カバー範囲",
    "specs.signals.description":
      "常に役に立つダッシュボード情報、ベストエフォートのセンサー経路、今後の監視対象をOS別のマトリクスで整理しています。",
    "specs.matrix.feature": "項目 / 機能",
    "specs.matrix.cpu.label": "CPU・RAM",
    "specs.matrix.cpuTemperature.label": "CPU／センサー温度",
    "specs.matrix.storage.label": "ストレージの状態",
    "specs.matrix.fan.label": "ファン",
    "specs.matrix.language.label": "言語",
    "specs.matrix.cpu.windows":
      "ライブ使用率、メモリ詳細、履歴は主要な対応領域です。",
    "specs.matrix.cpu.macos":
      "ライブ使用率、メモリ詳細、履歴は主要な対応領域です。",
    "specs.matrix.cpu.linux":
      "ライブ使用率、メモリ詳細、履歴は主要な対応領域です。",
    "specs.matrix.gpu.windows":
      "特にNVIDIAが最も深く対応します。AMDとIntelはドライバーやAPIの可用性に依存します。",
    "specs.matrix.gpu.macos":
      "macOS API経由の部分対応です。表示できるカウンターはデバイスによって変わります。",
    "specs.matrix.gpu.linux":
      "NVIDIAやDRM経路による部分対応です。権限とドライバーが影響します。",
    "specs.matrix.cpuTemperature.windows":
      "ACPIサーマルゾーンはベストエフォートです。対応CPUではPawnIOでCPUパッケージ温度を改善できる場合があります。",
    "specs.matrix.cpuTemperature.macos":
      "ベストエフォートです。センサー公開範囲はマシンとmacOS APIに依存します。",
    "specs.matrix.cpuTemperature.linux":
      "ベストエフォートです。デバイスファイル、ドライバー、権限に左右される場合があります。",
    "specs.matrix.storage.windows":
      "ネイティブまたはフォールバック経路で、利用可能なSMART/NVMeヘルス項目を表示します。",
    "specs.matrix.storage.macos":
      "ネイティブ経路で、利用可能なストレージ概要と一部ヘルス項目を表示します。",
    "specs.matrix.storage.linux":
      "ネイティブ経路とsmartctlにより、SMART/NVMeヘルスの対応範囲を補える場合があります。",
    "specs.matrix.network.windows":
      "インターフェース、IP、サブネット、ゲートウェイに対応します。通信量の監視は計画中です。",
    "specs.matrix.network.macos":
      "インターフェース、IP、サブネット、ゲートウェイに対応します。通信量の監視は計画中です。",
    "specs.matrix.network.linux":
      "インターフェース、IP、サブネット、ゲートウェイに対応します。通信量の監視は計画中です。",
    "specs.matrix.process.windows":
      "Live Process TableとProcess Insightで、現在の負荷と履歴をつなげて確認できます。",
    "specs.matrix.process.macos":
      "Live Process TableとProcess Insightで、現在の負荷と履歴をつなげて確認できます。",
    "specs.matrix.process.linux":
      "Live Process TableとProcess Insightで、現在の負荷と履歴をつなげて確認できます。",
    "specs.matrix.fan.windows":
      "Windowsでは、任意コンポーネントのPawnIO LpcIO経由で、対応するSuper I/Oセンサーのファン速度を取得できます。対応範囲はマザーボードにより異なり、この読み取り専用の経路ではファン制御に対応しません。",
    "specs.matrix.fan.macos":
      "クロスベンダーのファン監視はロードマップと調査段階です。",
    "specs.matrix.fan.linux":
      "クロスベンダーのファン監視はロードマップと調査段階です。",
    "specs.matrix.language.windows":
      "アプリは英語、日本語、ロシア語に対応しています。",
    "specs.matrix.language.macos":
      "アプリは英語、日本語、ロシア語に対応しています。",
    "specs.matrix.language.linux":
      "アプリは英語、日本語、ロシア語に対応しています。",
    "specs.signals.cpuTemperature.coverage":
      "利用可能な場合のCPUパッケージ温度とサーマルゾーン温度",
    "specs.section.appearance.eyebrow": "見た目のカスタマイズ",
    "specs.appearance.title": "見た目とカスタマイズ",
    "specs.appearance.description":
      "HardwareVisualizerは開いたまま使うことを想定しているため、見た目の設定も飾りではなく製品体験の一部です。",
    "specs.appearance.colorMode.name": "カラーテーマ",
    "specs.appearance.colorMode.value":
      "System、Light、Dark、Dark+、Sky、Grove、Sunset、Nebula、Orbit、Cappuccino、Espresso。",
    "specs.appearance.colorMode.notes":
      "ニュートラル、明るめ、暗め、暖色系まで、特定の雰囲気に寄せすぎないテーマを選べます。",
    "specs.appearance.graphColors.name": "グラフの色",
    "specs.appearance.graphColors.value":
      "CPU、メモリ、GPUグラフのライン色を個別に設定できます。",
    "specs.appearance.graphColors.notes":
      "サブディスプレイに常時表示する場合でも、重要なメトリクスをすぐ見分けやすくできます。",
    "specs.appearance.background.name": "背景画像",
    "specs.appearance.background.value":
      "ローカル背景画像の選択と不透明度の調整。",
    "specs.appearance.background.notes":
      "背景アセットはローカルに留まり、メトリクスの読みやすさに合わせて薄くできます。",
    "specs.appearance.transparent.name": "透過UI",
    "specs.appearance.transparent.value":
      "透明なウィンドウ面と調整可能なガラスぼかし。",
    "specs.appearance.transparent.notes":
      "ガラス効果は調整可能で、日常的に操作するコントロールは十分なコントラストを保ちます。",
    "specs.appearance.tray.name": "トレイウィジェット",
    "specs.appearance.tray.value":
      "CPU、GPU、GPU温度の表示、並び順、表示/非表示を設定できます。",
    "specs.appearance.tray.notes":
      "閉じてもトレイに残す設定やコンパクトなメトリクス表示で、デスクトップを占有せずに確認できます。",
    "specs.appearance.preferences.name": "表示設定",
    "specs.appearance.preferences.value":
      "言語、温度単位、ダッシュボード表示、チャート表示の設定。",
    "specs.appearance.preferences.notes":
      "地域、摂氏/華氏の好み、監視したい対象の違いに合わせて使いやすくできます。",
    "specs.section.storage.eyebrow": "追加コンポーネント",
    "specs.storage.title": "Storage Healthと任意コンポーネント",
    "specs.storage.description":
      "任意コンポーネントは同梱、ダウンロード、インストール、自動有効化されません。フォールバック後も表示可能なハードウェア情報が不足するときだけ、アプリ内で説明します。",
    "specs.storage.live.title": "リアルタイムのストレージ情報",
    "specs.storage.live.body":
      "フォーカス中のストレージ情報は、smartctlをライブポーリング周期で実行せず、軽量なネイティブ読み取り経路で更新します。",
    "specs.storage.record.title": "ストレージ健康状態の記録",
    "specs.storage.record.body":
      "日次のヘルス記録では、利用可能な場合にSMART総合ヘルス、温度、NVMe使用率、利用可能スペア、代替処理済みセクター、保留中セクター、オフライン訂正不能セクター、NVMeメディアエラーを扱います。",
    "specs.storage.pawnio.title": "CPUパッケージ温度向けPawnIO",
    "specs.storage.pawnio.body":
      "Windowsでは、ユーザーがPawnIOのドライバー/ランタイムと十分な権限を用意した場合、対応するIntel/AMD CPUのパッケージ温度を取得できる場合があります。",
    "specs.storage.smartctl.title": "より詳しいストレージ情報向けsmartctl",
    "specs.storage.smartctl.body":
      "ネイティブOS経路で重要なSMART/NVMeヘルス情報を読めない場合、smartmontoolsによってStorage Healthが改善されることがあります。",
    "specs.section.verification.eyebrow": "プライバシーと検証",
    "specs.verification.title": "プライバシーとダウンロード検証",
    "specs.verification.description":
      "HardwareVisualizerはオープンソースで、収集したハードウェア情報の外部テレメトリを行わず、公式リリースファイルの検証方法をドキュメント化しています。",
    "specs.verification.official.name": "公式配布元",
    "specs.verification.official.detail":
      "GitHub Releases、hardviz.com、利用可能な場合はWingetを使用してください。第三者ミラーやパスワード付きアーカイブは公式ではありません。",
    "specs.verification.checksums.name": "SHA-256チェックサム",
    "specs.verification.checksums.detail":
      "v1.8.1以降のリリース成果物ではSHA256SUMS.txtが公開されています。",
    "specs.verification.attestations.name": "GitHubの成果物証明",
    "specs.verification.attestations.detail":
      "v1.8.1以降、利用可能な場合はリリース成果物にGitHub Artifact Attestationsが付きます。",
    "specs.verification.windows.name": "Windowsの署名",
    "specs.verification.windows.detail":
      "Windowsインストーラはv1.9.0以降でAuthenticode署名されています。",
    "specs.verification.macos.name": "macOSの署名",
    "specs.verification.macos.detail":
      "macOS版はApple Developer IDで署名され、公証されています。",
    "specs.verification.linux.name": "Linuxパッケージ",
    "specs.verification.linux.detail":
      "Linuxパッケージは現在、GPG、Sigstore、リポジトリメタデータによる署名を提供していません。チェックサムとAttestationを利用してください。",
    "specs.hero.imageAlt":
      "ライブハードウェアメトリクスを表示するHardwareVisualizerのダッシュボード",
    "specs.sources.readme": "README（GitHub）",
    "specs.sources.externalComponents": "追加コンポーネント",
    "specs.sources.devStory": "開発ストーリー",
    "specs.sources.verification": "検証ガイド",
    "specs.signal.gpu.label": "GPU",
    "specs.signal.process.label": "プロセス",
    "specs.signal.network.label": "ネットワーク",
    "specs.compat.name": "項目",
    "specs.compat.coverage": "対応範囲",
    "specs.compat.status": "状態",
    "specs.compat.notes": "補足",
    "specs.compat.status.supported": "対応",
    "specs.compat.status.partial": "一部対応",
    "specs.compat.status.bestEffort": "ベストエフォート",
    "specs.compat.status.planned": "予定",
    "specs.compat.status.experimental": "実験的",
    "specs.compat.windows.coverage": "Windows 10/11、x64",
    "specs.compat.windows.notes":
      "MSIとセットアップ形式のインストーラを提供し、利用可能な場合はWingetも公式インストール経路です。",
    "specs.compat.linux.coverage": "Debian/Ubuntu、RPM系、AppImage",
    "specs.compat.linux.notes":
      "一部のデバイスファイルやセンサーには昇格権限が必要になる場合があります。デスクトップ環境による制限もあります。",
    "specs.compat.macos.appleSilicon.name": "macOS（Apple Silicon）",
    "specs.compat.macos.appleSilicon.coverage": "Apple Silicon（ARM64）",
    "specs.compat.macos.appleSilicon.notes":
      "macOS版は署名・公証済みです。センサーの表示範囲はマシンやOS APIの利用可否によって異なります。",
    "specs.compat.macos.intel.name": "macOS（Intel）",
    "specs.compat.macos.intel.coverage": "Intel（x64）",
    "specs.compat.macos.intel.notes":
      "Intel Mac版は実験的な提供です。センサーの表示範囲はマシンやOS APIの利用可否によって異なります。",
    "specs.compat.cpu.coverage": "CPUとRAM使用率、メモリ詳細、履歴",
    "specs.compat.gpu.coverage": "NVIDIAは深い対応、AMDとIntelは部分対応",
    "specs.compat.storage.coverage":
      "ストレージ概要、Storage Health Record、Live Storage Health",
    "specs.compat.network.coverage":
      "インターフェース、IP、サブネット、ゲートウェイ",
    "specs.compat.process.coverage": "Live Process TableとProcess Insight",
    "specs.compat.fan.coverage": "Windowsの対応Super I/Oセンサーのファン速度",
    "specs.compat.language.coverage": "英語、日本語、ロシア語",
    "specs.cta.download": "ダウンロードへ",
    "specs.cta.verify": "検証ガイドを開く",

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
      "はい、HardwareVisualizerは完全に無料で、GNU General Public License v3.0以降（GPL-3.0-or-later）のオープンソースです。ライセンス変更前にリリースされたバージョンは引き続きMITライセンスで利用できます。ダウンロードは hardviz.com、GitHub Releases、または利用可能な場合はWindowsのWingetのみを利用してください。第三者のダウンロードサイト、ファイル共有リンク、YouTube概要欄のリンク、パスワード付きZIPは公式ではありません。",
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
    "faq.specsLink": "対応環境",
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
