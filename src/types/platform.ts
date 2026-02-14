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
};

export type PlatformDownload = {
  platform: "Windows" | "Linux" | "macOS";
  versions: VersionInfo[];
  primary: boolean;
};
