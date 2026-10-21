import type { APIRoute } from "astro";

const getLlmsTxt = (site?: URL) => {
  const url = (path: string) => new URL(path, site).href;

  return `# HardwareVisualizer

> HardwareVisualizer is a free, open-source desktop hardware monitor for Windows 10/11, with macOS and Linux versions. It shows CPU, GPU, temperature, and memory live, and keeps a local history so you can look back after gaming, rendering, or other heavy workloads to see when load peaked, how temperatures changed, and which processes were active.

The main idea is "live monitoring with history": you do not need to watch a graph while you work or play.

## Key features

- Insights: review CPU, memory, CPU temperature, and per-GPU usage, temperature, and memory history (average, maximum, minimum) for up to 30 days, plus sampled process history showing which processes used CPU and memory.
- Cooling Insight (v1.11.0, Windows): compares CPU temperature with its own baseline at similar CPU load (idle, low, medium, high), for up to one year. A shared timeline shows CPU temperature, load, package power, fan speed, and ambient temperature, to help tell whether cooling is getting worse or the room just got warmer. It displays and compares readings; it does not control fans or diagnose hardware faults.
- Live performance views: CPU, GPU, and memory gauges and graphs, per-core usage, running processes, motherboard sensors, fans, and power draw.
- System specifications: CPU, GPU, memory, storage, motherboard/BIOS, and network details, with SMART-based Storage Health.
- Tray widget and customization: tray/menu bar readouts, color themes, graph styles, and local background images.
- Lightweight: built with Tauri and Rust.

## Privacy and trust

- History is stored on your computer. No account and no outbound telemetry.
- Open source under GPL-3.0-or-later.
- The Windows installer is Authenticode-signed. Releases include SHA-256 checksums and GitHub Artifact Attestations.
- Official downloads come only from hardviz.com and GitHub Releases (or \`winget install shm11C3.HardwareVisualizer\`). Listings on other download sites, including a SourceForge project named "Hardware Visualizer", are not affiliated with the project.

## Pages

- [Home](${url("/")}): overview, screenshots, and downloads
- [Download](${url("/download/")}): installers for Windows (MSI/EXE), macOS (Apple Silicon/Intel), and Linux (DEB/RPM/AppImage)
- [Installer verification](${url("/verification/")}): official sources, SHA-256 checksums, GitHub Artifact Attestations, and code signing status
- [Cooling Insight](${url("/releases/cooling-insight/")}): how Cooling Insight compares CPU temperature with load and past readings
- [Compatibility notes](${url("/specs/")}): supported OS, which sensors are available on each platform, and optional components such as PawnIO
- [FAQ](${url("/faq/")}): common questions about the app
- [Changelog](${url("/changelog/")}): release notes for each version
- [About](${url("/about/")}): why the project exists, tech stack, and developer

## Optional

- [Japanese site](${url("/ja/")}): the same pages in Japanese
- [GitHub repository](https://github.com/shm11C3/HardwareVisualizer): source code, README, and issues
- [GitHub Releases](https://github.com/shm11C3/HardwareVisualizer/releases): all release builds
`;
};

export const GET: APIRoute = ({ site }) => {
  return new Response(getLlmsTxt(site));
};
