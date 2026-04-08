import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UI_LABELS } from "@/consts/ui";
import { getPostPublicSlug, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

import { buildArchiveHref, buildTagHref, formatShortDate } from "./helpers";

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function PostsList({
  posts,
  activeTag,
  searchQuery,
}: {
  posts: BlogPost[];
  activeTag?: string | null;
  searchQuery?: string;
}) {
  return (
    <div className="space-y-1">
      {posts.map((post, index) => (
        <article key={post.id} className="group">
          {index > 0 && <Separator className="mb-4" />}
          <div className="grid gap-3 py-2 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-5">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {formatShortDate(post.data.pubDate)}
            </div>
            <div className="space-y-3">
              <a
                href={`/${getPostPublicSlug(post)}/`}
                className="flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <h2 className="font-display text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                    {post.data.title}
                  </h2>
                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
                    {post.data.description}
                  </p>
                </div>
                <ArrowUpRightIcon className="mt-1 hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
              </a>
              <div className="flex flex-wrap gap-2">
                {post.data.tags.map((tag) => (
                  <a key={tag} href={buildTagHref(tag, activeTag, searchQuery)}>
                    <Badge
                      variant={activeTag === tag ? "default" : "secondary"}
                      className="cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
      {posts.length === 0 ? (
        <div className="py-10 text-sm text-muted-foreground">
          {UI_LABELS.noPostsPrefix}
        </div>
      ) : null}
    </div>
  );
}

export function ArchivePagination({
  currentPage,
  totalPages,
  activeTag,
  searchQuery,
}: {
  currentPage: number;
  totalPages: number;
  activeTag?: string | null;
  searchQuery?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <div className="text-sm text-muted-foreground">
        {UI_LABELS.page} {currentPage} / {totalPages}
      </div>
      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <a
            href={buildArchiveHref(currentPage - 1, activeTag, searchQuery)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            {UI_LABELS.previous}
          </a>
        ) : (
          <Button variant="outline" size="sm" disabled>
            {UI_LABELS.previous}
          </Button>
        )}
        {currentPage < totalPages ? (
          <a
            href={buildArchiveHref(currentPage + 1, activeTag, searchQuery)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            {UI_LABELS.next}
          </a>
        ) : (
          <Button variant="outline" size="sm" disabled>
            {UI_LABELS.next}
          </Button>
        )}
      </div>
    </div>
  );
}

export function ArchiveTagsSection({
  visibleTags,
  hiddenTags,
  activeTag,
  searchQuery,
  toggleScript,
}: {
  visibleTags: string[];
  hiddenTags: string[];
  activeTag?: string | null;
  searchQuery?: string;
  toggleScript?: string;
}) {
  return (
    <div id="archive-tags" className="mt-6 border-t border-border pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-muted-foreground">{UI_LABELS.tags}</div>
        {hiddenTags.length > 0 ? (
          <button
            type="button"
            data-role="toggle-tags"
            data-label-open={UI_LABELS.showAllTags}
            data-label-close={UI_LABELS.showTopTags}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {UI_LABELS.showAllTags}
          </button>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <a key={tag} href={buildTagHref(tag, activeTag, searchQuery)}>
            <Badge
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer"
            >
              #{tag}
            </Badge>
          </a>
        ))}
        {hiddenTags.map((tag) => (
          <a
            key={tag}
            href={buildTagHref(tag, activeTag, searchQuery)}
            className="hidden"
            data-role="hidden-tag"
          >
            <Badge
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer"
            >
              #{tag}
            </Badge>
          </a>
        ))}
      </div>
      {hiddenTags.length > 0 && toggleScript ? (
        <script dangerouslySetInnerHTML={{ __html: toggleScript }} />
      ) : null}
    </div>
  );
}
