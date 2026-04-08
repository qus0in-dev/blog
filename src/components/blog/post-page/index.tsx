import type { RelatedPostCandidate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { Separator } from "@/components/ui/separator";
import { UI_LABELS } from "@/consts/ui";
import { SITE_URL } from "@/consts/site";
import { getPostPageClientScript } from "./client";
import { CornerDownLeftIcon } from "./icons";
import {
  ContentsCard,
  CopyLinkInline,
  type Heading,
  PostTags,
  ShareActions,
  TagsSection,
} from "./meta";
import { AdjacentPostsNav, RelatedPostsSection } from "./related";

type Props = {
  post: BlogPost;
  postSlug: string;
  headings: Heading[];
  newerPost?: BlogPost;
  olderPost?: BlogPost;
  relatedPosts?: RelatedPostCandidate[];
  children: any;
};

export function PostPage({
  post,
  postSlug,
  headings,
  newerPost,
  olderPost,
  relatedPosts = [],
  children,
}: Props) {
  const postHref = `${SITE_URL}/${postSlug}/`;
  const shareTitle = post.data.title;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-14 sm:px-6 lg:px-8">
      <section className="border-x border-b bg-card/70 px-5 py-5 sm:px-8 lg:px-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          <CornerDownLeftIcon className="size-3.5" />
          {UI_LABELS.archive}
        </a>
      </section>

      <section className="grid gap-8 border-x border-b bg-background px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-10 lg:py-8">
        <article className="min-w-0">
          <header className="space-y-5">
            <div className="space-y-3">
              <h1 className="font-display max-w-4xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                {post.data.title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {post.data.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {UI_LABELS.publishedAt}{" "}
                <time
                  dateTime={post.data.pubDate.toISOString()}
                  data-published-at={post.data.pubDate.toISOString()}
                >
                  {post.data.pubDate
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")}
                </time>
              </p>
            </div>
            <PostTags tags={post.data.tags} />
            <CopyLinkInline href={postHref} />
          </header>

          <Separator className="my-8" />

          <div className="post-content prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-[-0.03em] prose-a:text-foreground prose-a:no-underline hover:prose-a:text-muted-foreground prose-pre:rounded-3xl prose-pre:border prose-pre:border-border prose-pre:bg-[#161616] prose-pre:px-5 prose-pre:py-4 prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:text-muted-foreground prose-hr:border-border">
            {children}
          </div>

          <Separator className="my-8" />

          {headings.length > 0 ? (
            <>
              <div className="lg:hidden">
                <ContentsCard headings={headings} />
              </div>
              <Separator className="my-8 lg:hidden" />
            </>
          ) : null}

          {relatedPosts.length > 0 ? (
            <>
              <RelatedPostsSection
                currentTags={post.data.tags}
                relatedPosts={relatedPosts}
              />
              <Separator className="my-8" />
            </>
          ) : null}

          <TagsSection tags={post.data.tags} />

          <Separator className="my-8" />

          <ShareActions href={postHref} title={shareTitle} />

          <Separator className="my-8" />

          <AdjacentPostsNav newerPost={newerPost} olderPost={olderPost} />

          <script
            dangerouslySetInnerHTML={{
              __html: getPostPageClientScript(postSlug),
            }}
          />
        </article>

        <aside className="hidden space-y-4 lg:block">
          <ContentsCard headings={headings} />
        </aside>
      </section>
    </main>
  );
}
