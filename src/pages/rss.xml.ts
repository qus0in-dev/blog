import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const items = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${post.id}/`,
    }));

  return rss({
    title: "qus0in dev blog",
    description: "RSS feed for qus0in dev blog",
    site: context.site ?? "https://example.com",
    items,
  });
}
