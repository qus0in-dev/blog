import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

import { SITE_NAME } from "../../consts/site";
import { renderOgPng } from "../../lib/og-image";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }

  const post = await getEntry("blog", slug);

  if (!post || post.data.draft) {
    return new Response("Not Found", { status: 404 });
  }

  const png = await renderOgPng({
    title: post.data.title,
    description: post.data.description,
    eyebrow: SITE_NAME,
    path: `/${post.id}/`,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
