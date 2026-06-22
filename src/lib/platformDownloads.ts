import type { ReleaseData } from "../funcs/fetchReleaseData";
import type {
  Platform,
  PlatformDownload,
  VersionInfo,
} from "../types/platform";

const HARDVIZ_RELEASE_REPO = "shm11C3/HardwareVisualizer";

function verificationCommandFor(type: Platform, artifactName: string): string {
  if (type === "windows") {
    return `Get-FileHash .\\${artifactName} -Algorithm SHA256`;
  }

  if (type === "macOSAppleSilicon" || type === "macOSIntel") {
    return `shasum -a 256 ${artifactName}`;
  }

  return `sha256sum ${artifactName}`;
}

function signingStatusFor(type: Platform): string {
  if (type === "windows") {
    return "Authenticode signed for v1.9.0+ installers";
  }

  if (type === "macOSAppleSilicon" || type === "macOSIntel") {
    return "Signed and notarized";
  }

  return "Unsigned package; verify with SHA-256 and attestations";
}

export function createPlatformDownloads(
  release: ReleaseData,
  overrideDownloadHref?: string,
): PlatformDownload[] {
  const urlFor = (url: string | null | undefined) =>
    url ? (overrideDownloadHref ?? url) : null;
  const versionFor = ({
    type,
    name,
  }: {
    type: Platform;
    name: string;
  }): VersionInfo => {
    const asset = release.platforms[type];
    const artifactName = asset?.name ?? null;

    return {
      type,
      name,
      url: urlFor(asset?.browser_download_url),
      size: asset?.size ?? "-",
      artifactName,
      sha256: asset?.sha256 ?? null,
      digest: asset?.digest ?? null,
      releaseUrl: asset?.release_url ?? null,
      verificationCommand: artifactName
        ? verificationCommandFor(type, artifactName)
        : null,
      attestationCommand: artifactName
        ? `gh attestation verify ./${artifactName} -R ${HARDVIZ_RELEASE_REPO}`
        : null,
      signingStatus: signingStatusFor(type),
      ...(asset?.signature_name ? { signatureName: asset.signature_name } : {}),
      ...(asset?.signature_url ? { signatureUrl: asset.signature_url } : {}),
      ...(type === "windows"
        ? {
            recommendedInstallCommand:
              "winget install shm11C3.HardwareVisualizer",
          }
        : {}),
    };
  };

  return [
    {
      platform: "Windows",
      versions: [
        versionFor({
          type: "windows",
          name: "Windows 10/11 (x64)",
        }),
      ],
      primary: false,
    },
    {
      platform: "macOS",
      versions: [
        versionFor({
          type: "macOSAppleSilicon",
          name: "Apple Silicon (ARM64)",
        }),
        versionFor({
          type: "macOSIntel",
          name: "Intel (x64)",
        }),
      ],
      primary: false,
    },
    {
      platform: "Linux",
      versions: [
        versionFor({
          type: "linuxRPM",
          name: "RPM-based Distros (.rpm)",
        }),
        versionFor({
          type: "linuxAppImage",
          name: "AppImage (.AppImage)",
        }),
        versionFor({
          type: "linuxDeb",
          name: "Debian/Ubuntu (.deb)",
        }),
      ],
      primary: false,
    },
  ];
}
