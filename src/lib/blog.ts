import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function getPostPublicSlug(post: BlogPost) {
  return post.data.slug ?? post.id.split("/").filter(Boolean).at(-1) ?? post.id;
}

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

export function getRelatedPosts(posts: BlogPost[], currentPost: BlogPost, limit = 3) {
  const currentTags = new Set(currentPost.data.tags);

  return posts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => ({
      post,
      sharedTagCount: post.data.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter(({ sharedTagCount }) => sharedTagCount > 0)
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }

      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export async function getPublishedPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => getPostPublicSlug(post) === slug);
}
