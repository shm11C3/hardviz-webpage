export const HARDVIZ_GITHUB_REPO = "shm11C3/HardwareVisualizer";
const HARDVIZ_GITHUB_DOCS_BRANCH = "develop";

export function githubRepoUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return `https://github.com/${repo}`;
}

export function githubAllReleasesUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return `https://github.com/${repo}/releases`;
}

export function githubLatestReleaseUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return `https://github.com/${repo}/releases/latest`;
}

export function githubFileUrl(
  path: string,
  repo: string = HARDVIZ_GITHUB_REPO,
  branch: string = HARDVIZ_GITHUB_DOCS_BRANCH,
) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `https://github.com/${repo}/blob/${branch}/${encodedPath}`;
}

export function codeSigningPolicyUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return githubFileUrl("CODE_SIGNING_POLICY.md", repo);
}

export function downloadVerificationGuideUrl(
  lang: "en" | "ja" = "en",
  repo: string = HARDVIZ_GITHUB_REPO,
) {
  const path =
    lang === "ja"
      ? "docs/download-verification.ja.md"
      : "docs/download-verification.md";

  return githubFileUrl(path, repo);
}

export function securityPolicyReportingUrl(repo: string = HARDVIZ_GITHUB_REPO) {
  return `${githubRepoUrl(repo)}/security/policy#reporting-a-vulnerability`;
}

export function githubReleaseTagUrl(
  version: string,
  repo: string = HARDVIZ_GITHUB_REPO,
) {
  return `https://github.com/${repo}/releases/tag/v${version}`;
}
