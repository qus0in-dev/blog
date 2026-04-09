import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KakaoAd } from "@/components/ads/kakao-ad";
import { HOME_HERO_DESCRIPTION, HOME_HERO_TITLE } from "@/consts/site";
import { UI_LABELS } from "@/consts/ui";
import type { BlogPost } from "@/lib/blog";

import { getArchiveTagsToggleScript } from "./client";
import { ArchivePagination, ArchiveTagsSection, PostsList } from "./sections";

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
  const archiveTagsToggleScript =
    hiddenTags.length > 0 ? getArchiveTagsToggleScript() : undefined;

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

        <PostsList
          posts={posts}
          activeTag={activeTag}
          searchQuery={searchQuery}
        />

        <KakaoAd className="mt-8" label="Sponsor" />

        <ArchivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          activeTag={activeTag}
          searchQuery={searchQuery}
        />

        <ArchiveTagsSection
          visibleTags={visibleTags}
          hiddenTags={hiddenTags}
          activeTag={activeTag}
          searchQuery={searchQuery}
          toggleScript={archiveTagsToggleScript}
        />
      </section>
    </main>
  );
}
