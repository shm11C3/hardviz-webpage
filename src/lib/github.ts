export const HARDVIZ_GITHUB_REPO = "shm11C3/HardwareVisualizer";

export function githubRepoUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return `https://github.com/${repo}`;
}

export function githubAllReleasesUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return `https://github.com/${repo}/releases`;
}

export function githubReleaseTagUrl(
  version: string,
  repo: string = HARDVIZ_GITHUB_REPO,
) {
  return `https://github.com/${repo}/releases/tag/v${version}`;
}
