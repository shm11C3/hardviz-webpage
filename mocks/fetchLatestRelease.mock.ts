import type { ReleaseData } from "../src/funcs/fetchReleaseData";

export const mockReleaseData: ReleaseData = {
  version: "1.0.0",
  platforms: {
    windows: {
      url: "https://example.com/fake/windows-installer.msi",
      size: "55.1 MB",
      name: "HardwareVisualizerInstaller.msi",
      browser_download_url: "https://example.com/fake/windows-installer.msi",
      updated_at: new Date().toISOString(),
    },
    linuxAppImage: {
      url: "https://example.com/fake/linux.AppImage",
      size: "60.2 MB",
      name: "HardwareVisualizer.AppImage",
      browser_download_url: "https://example.com/fake/linux.AppImage",
      updated_at: new Date().toISOString(),
    },
    linuxRPM: {
      url: "https://example.com/fake/linux.rpm",
      size: "50.3 MB",
      name: "HardwareVisualizer.rpm",
      browser_download_url: "https://example.com/fake/linux.rpm",
      updated_at: new Date().toISOString(),
    },
  },
};

export function fetchLatestReleaseMock(): Promise<ReleaseData> {
  return Promise.resolve(mockReleaseData);
}
