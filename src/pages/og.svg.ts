import type { APIRoute } from "astro";

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../consts/site";
import { renderOgSvg } from "../lib/og";

export const prerender = false;

export const GET: APIRoute = async () => {
  const svg = renderOgSvg({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    eyebrow: "TECHNICAL ARCHIVE",
    path: SITE_URL.replace(/^https?:\/\//, ""),
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
