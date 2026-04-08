import type { BlogPost, RelatedPostCandidate } from "@/lib/blog";
import { getPostPublicSlug } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { UI_LABELS } from "@/consts/ui";

import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

export function RelatedPostsSection({
  currentTags,
  relatedPosts,
}: {
  currentTags: string[];
  relatedPosts: RelatedPostCandidate[];
}) {
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {UI_LABELS.relatedPosts}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {relatedPosts.map((relatedPost) => (
          <a
            key={relatedPost.post.id}
            href={`/${relatedPost.postSlug}/`}
            data-related-post
            data-related-post-slug={relatedPost.postSlug}
            data-related-shared-tag-count={relatedPost.sharedTagCount}
            data-related-view-count={relatedPost.viewCount}
            className="rounded-[1.5rem] border bg-card p-5 transition-[opacity,colors] hover:bg-accent"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {relatedPost.post.data.tags
                .filter((tag) => currentTags.includes(tag))
                .slice(0, 2)
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-2 py-0.5 text-[10px]"
                  >
                    #{tag}
                  </Badge>
                ))}
            </div>
            <div className="font-display text-base font-semibold tracking-[-0.03em]">
              {relatedPost.post.data.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {relatedPost.post.data.description}
            </p>
            <div className="mt-3 hidden" data-related-seen-badge>
              <Badge variant="secondary">{UI_LABELS.justRead}</Badge>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function AdjacentPostsNav({
  newerPost,
  olderPost,
}: {
  newerPost?: BlogPost;
  olderPost?: BlogPost;
}) {
  return (
    <nav className="grid gap-3 sm:grid-cols-2">
      {newerPost ? (
        <a
          href={`/${getPostPublicSlug(newerPost)}/`}
          className="group rounded-[1.5rem] border bg-card p-5 transition-colors hover:bg-accent"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <ArrowLeftIcon className="size-3.5" />
            {UI_LABELS.newer}
          </div>
          <div className="font-display text-base font-semibold tracking-[-0.03em]">
            {newerPost.data.title}
          </div>
        </a>
      ) : (
        <div />
      )}
      {olderPost ? (
        <a
          href={`/${getPostPublicSlug(olderPost)}/`}
          className="group rounded-[1.5rem] border bg-card p-5 text-left transition-colors hover:bg-accent"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {UI_LABELS.older}
            <ArrowRightIcon className="size-3.5" />
          </div>
          <div className="font-display text-base font-semibold tracking-[-0.03em]">
            {olderPost.data.title}
          </div>
        </a>
      ) : null}
    </nav>
  );
}
