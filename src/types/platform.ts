export type Platform =
  | "windows"
  | "linuxAppImage"
  | "linuxDeb"
  | "linuxRPM"
  | "macOSAppleSilicon"
  | "macOSIntel";

export type VersionInfo = {
  type: Platform;
  name: string;
  url: string | null;
  size: string;
  artifactName: string | null;
  sha256: string | null;
  digest: string | null;
  releaseUrl: string | null;
  signatureName?: string;
  signatureUrl?: string;
  verificationCommand: string | null;
  attestationCommand: string | null;
  signingStatus: string;
  recommendedInstallCommand?: string;
};

export type PlatformDownload = {
  platform: "Windows" | "Linux" | "macOS";
  versions: VersionInfo[];
  primary: boolean;
};
