import type { APIRoute } from "astro";

import { SITE_URL } from "../consts/site";
import { getPostPublicSlug, getPublishedPosts } from "../lib/blog";

export const prerender = false;

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const urls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate,
    },
    ...posts.map((post) => ({
      loc: `${SITE_URL}/${getPostPublicSlug(post)}/`,
      lastmod: post.data.updatedDate ?? post.data.pubDate,
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
