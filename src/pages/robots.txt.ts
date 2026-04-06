import type { APIRoute } from "astro";

import { SITE_URL } from "../consts/site";

export const prerender = false;

export const GET: APIRoute = async () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
