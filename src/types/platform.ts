export type Platform = "windows" | "linuxAppImage" | "linuxDeb";

export type VersionInfo = {
  type: Platform;
  name: string;
  url: string | null;
  size: string;
};

export type PlatformDownload = {
  platform: "Windows" | "Linux";
  versions: VersionInfo[];
  primary: boolean;
};
