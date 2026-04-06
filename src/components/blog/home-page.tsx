import { ArrowUpRight } from "lucide-react";

import { getPostPublicSlug, type BlogPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HOME_HERO_DESCRIPTION, HOME_HERO_TITLE } from "@/consts/site";
import { UI_LABELS } from "@/consts/ui";

type Props = {
  posts: BlogPost[];
  tags: string[];
  totalPosts: number;
  latestUpdate?: Date;
  activeTag?: string | null;
  searchQuery?: string;
  currentPage: number;
  totalPages: number;
  filteredCount: number;
};

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);
}

function buildArchiveHref(
  page: number,
  activeTag?: string | null,
  searchQuery?: string
) {
  const params = new URLSearchParams();

  if (activeTag) {
    params.set("tag", activeTag);
  }

  if (searchQuery) {
    params.set("q", searchQuery);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function buildTagHref(tag: string, activeTag?: string | null, searchQuery?: string) {
  return buildArchiveHref(1, activeTag === tag ? null : tag, searchQuery);
}

export function HomePage({
  posts,
  tags,
  totalPosts,
  activeTag,
  searchQuery,
  currentPage,
  totalPages,
  filteredCount,
}: Props) {
  const topTags = tags.slice(0, 20);
  const visibleTags =
    activeTag && !topTags.includes(activeTag) && tags.includes(activeTag)
      ? [...topTags, activeTag]
      : topTags;
  const hiddenTags = tags.filter((tag) => !visibleTags.includes(tag));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-14 sm:px-6 lg:px-8">
      <section className="border-x border-b bg-card/70">
        <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="max-w-5xl space-y-3">
            <h1 className="font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-7xl">
              {HOME_HERO_TITLE}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {HOME_HERO_DESCRIPTION}
            </p>
          </div>
        </div>
      </section>

      <section className="border-x border-b bg-background px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="mb-6 space-y-4 border-b border-border pb-4">
          <form action="/" method="get" className="flex flex-col gap-2 sm:flex-row">
            {activeTag ? <input type="hidden" name="tag" value={activeTag} /> : null}
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder={UI_LABELS.searchPlaceholder}
              className="h-10 min-w-0 flex-1 rounded-full border border-border bg-card px-4 text-sm outline-none ring-0 placeholder:text-muted-foreground"
            />
            <Button type="submit" size="sm" className="h-10 rounded-full px-4">
              {UI_LABELS.searchButton}
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              {UI_LABELS.totalPosts} {totalPosts}개
            </Badge>
            {searchQuery ? (
              <>
                <Badge variant="secondary">
                  {UI_LABELS.activeSearch} {searchQuery}
                </Badge>
                <a
                  href={activeTag ? `/?tag=${encodeURIComponent(activeTag)}` : "/"}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {UI_LABELS.clearSearch}
                </a>
              </>
            ) : null}
            {activeTag ? (
              <>
                <Badge variant="default">
                  {UI_LABELS.activeTag} #{activeTag}
                </Badge>
                <Badge variant="secondary">{filteredCount}개</Badge>
                <a
                  href={searchQuery ? `/?q=${encodeURIComponent(searchQuery)}` : "/"}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {UI_LABELS.clearFilter}
                </a>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">{UI_LABELS.allPosts}</span>
            )}
          </div>
        </div>

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
                    <ArrowUpRight className="mt-1 hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="text-sm text-muted-foreground">
            {UI_LABELS.page} {currentPage} / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Button asChild variant="outline" size="sm">
                <a href={buildArchiveHref(currentPage - 1, activeTag, searchQuery)}>
                  {UI_LABELS.previous}
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                {UI_LABELS.previous}
              </Button>
            )}
            {currentPage < totalPages ? (
              <Button asChild variant="outline" size="sm">
                <a href={buildArchiveHref(currentPage + 1, activeTag, searchQuery)}>
                  {UI_LABELS.next}
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                {UI_LABELS.next}
              </Button>
            )}
          </div>
        </div>

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
          {hiddenTags.length > 0 ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (() => {
                    const root = document.getElementById("archive-tags");
                    if (!root || root.dataset.bound === "true") return;
                    root.dataset.bound = "true";
                    const button = root.querySelector('[data-role="toggle-tags"]');
                    const hiddenTags = root.querySelectorAll('[data-role="hidden-tag"]');
                    if (!button || hiddenTags.length === 0) return;
                    let expanded = false;
                    button.addEventListener("click", () => {
                      expanded = !expanded;
                      hiddenTags.forEach((tag) => {
                        tag.classList.toggle("hidden", !expanded);
                        tag.classList.toggle("inline-flex", expanded);
                      });
                      button.textContent = expanded
                        ? button.dataset.labelClose
                        : button.dataset.labelOpen;
                    });
                  })();
                `,
              }}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
