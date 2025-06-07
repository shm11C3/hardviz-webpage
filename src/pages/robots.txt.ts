import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const isProd = import.meta.env.PROD;

  const body = isProd
    ? "User-agent: *\nAllow: /"
    : "User-agent: *\nDisallow: /";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
