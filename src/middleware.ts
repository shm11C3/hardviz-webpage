import { defineMiddleware } from "astro:middleware";
import { addJapaneseLineBreaksToHtml } from "./lib/japaneseHtml";

/**
 * Japanese pages get phrase boundaries on every text node, so no component
 * has to remember to add them. Pages are static, so this runs at build time.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const { pathname } = context.url;
  const japanese = pathname === "/ja" || pathname.startsWith("/ja/");
  if (
    !japanese ||
    !response.headers.get("content-type")?.includes("text/html")
  ) {
    return response;
  }

  return new Response(addJapaneseLineBreaksToHtml(await response.text()), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});
