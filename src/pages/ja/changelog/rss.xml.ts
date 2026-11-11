import type { APIRoute } from "astro";
import { buildChangelogFeed } from "../../../lib/changelogFeed";

export const GET: APIRoute = async ({ site }) =>
  new Response(
    await buildChangelogFeed("ja", site ?? new URL("https://hardviz.com")),
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
