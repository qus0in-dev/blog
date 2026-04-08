import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;
export type RelatedPostCandidate = {
  post: BlogPost;
  postSlug: string;
  sharedTagCount: number;
  viewCount: number;
};

function toShortHash(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function getPostPublicSlug(post: BlogPost) {
  const fileName = post.id.split("/").filter(Boolean).at(-1) ?? post.id;
  return toShortHash(fileName);
}

export async function getPublishedPosts() {
  return (await getCollection("blog")).sort(
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

export function getRelatedPosts(
  posts: BlogPost[],
  currentPost: BlogPost,
  viewCounts: Map<string, number>,
  limit = 8
) {
  const currentTags = new Set(currentPost.data.tags);

  const candidates = posts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => ({
      post,
      postSlug: getPostPublicSlug(post),
      sharedTagCount: post.data.tags.filter((tag) => currentTags.has(tag)).length,
      viewCount: viewCounts.get(post.id) ?? 0,
    }))
    .filter(({ sharedTagCount }) => sharedTagCount > 0)
    .sort((a, b) => b.sharedTagCount - a.sharedTagCount || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf());

  const lowViewFirst = [...candidates]
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }

      if (a.viewCount !== b.viewCount) {
        return a.viewCount - b.viewCount;
      }

      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    })
    .slice(0, 2);

  const pickedIds = new Set(lowViewFirst.map(({ post }) => post.id));
  const highViewLast = candidates
    .filter(({ post }) => !pickedIds.has(post.id))
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }

      if (b.viewCount !== a.viewCount) {
        return b.viewCount - a.viewCount;
      }

      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    })
    .slice(0, 1);

  const ordered = [...lowViewFirst, ...highViewLast];
  const orderedIds = new Set(ordered.map(({ post }) => post.id));
  const fallback = candidates.filter(({ post }) => !orderedIds.has(post.id));

  return [...ordered, ...fallback].slice(0, limit);
}

export async function getPublishedPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => getPostPublicSlug(post) === slug);
}
