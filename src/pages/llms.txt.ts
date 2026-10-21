import type { APIRoute } from "astro";
import { useTranslations } from "../i18n/utils";

const getLlmsTxt = (site?: URL) => {
  const t = useTranslations("en");
  const pages = [
    ["/download/", t("download.title"), t("download.description")],
    [
      "/verification/",
      t("download.verificationPage.metaTitle"),
      t("download.verificationPage.metaDescription"),
    ],
    ["/specs/", t("specs.title"), t("specs.docs.description")],
    ["/faq/", t("faq.title"), t("faq.description")],
    ["/changelog/", "Changelog", t("changelog.description")],
  ] as const;

  return `# HardwareVisualizer

> ${t("seo.home.softwareDescription")}

- ${t("seo.home.feature4")}
- ${t("seo.home.feature5")}
- ${t("seo.home.feature6")}
- ${t("seo.home.feature7")}

## Pages

${pages
  .map(
    ([path, title, description]) =>
      `- [${title}](${new URL(path, site).href}): ${description}`,
  )
  .join("\n")}

## Source

- [GitHub repository](https://github.com/shm11c3/HardwareVisualizer)
`;
};

export const GET: APIRoute = ({ site }) => {
  return new Response(getLlmsTxt(site));
};
