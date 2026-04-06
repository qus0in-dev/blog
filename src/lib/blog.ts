import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export async function getPublishedPosts() {
  return (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export async function getBlogMeta() {
  const posts = await getPublishedPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const tags = [...tagCounts.keys()].sort((a, b) => {
    const countDiff = (tagCounts.get(b) ?? 0) - (tagCounts.get(a) ?? 0);
    return countDiff !== 0 ? countDiff : a.localeCompare(b);
  });

  return {
    posts,
    tags,
    totalPosts: posts.length,
    latestUpdate: posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate,
  };
}

export function getAdjacentPosts(posts: BlogPost[], currentId: string) {
  const index = posts.findIndex((post) => post.id === currentId);

  return {
    newerPost: index > 0 ? posts[index - 1] : undefined,
    olderPost: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
