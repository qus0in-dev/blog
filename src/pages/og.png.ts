import type { APIRoute } from "astro";

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../consts/site";
import { renderOgPng } from "../lib/og-image";

export const prerender = false;

export const GET: APIRoute = async () => {
  const png = await renderOgPng({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    eyebrow: "TECHNICAL ARCHIVE",
    path: SITE_URL.replace(/^https?:\/\//, ""),
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
