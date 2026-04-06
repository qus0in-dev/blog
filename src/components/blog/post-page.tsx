import { ArrowLeft, ArrowRight, CornerDownLeft } from "lucide-react";

import { getPostPublicSlug, type BlogPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UI_LABELS } from "@/consts/ui";

type Heading = {
  depth: number;
  slug: string;
  text: string;
};

type Props = {
  post: BlogPost;
  headings: Heading[];
  newerPost?: BlogPost;
  olderPost?: BlogPost;
  relatedPosts?: BlogPost[];
  children: any;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function ContentsCard({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-[1.5rem] bg-card/70">
      <CardContent className="space-y-3 p-5">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {UI_LABELS.contents}
        </div>
        <ul className="space-y-2">
          {headings
            .filter((heading) => heading.depth <= 3)
            .map((heading) => (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {heading.text}
                </a>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function PostPage({
  post,
  headings,
  newerPost,
  olderPost,
  relatedPosts = [],
  children,
}: Props) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-14 sm:px-6 lg:px-8">
      <section className="border-x border-b bg-card/70 px-5 py-5 sm:px-8 lg:px-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          <CornerDownLeft className="size-3.5" />
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
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{formatDate(post.data.pubDate)}</Badge>
              {post.data.tags.map((tag) => (
                <a key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                  <Badge variant="outline">#{tag}</Badge>
                </a>
              ))}
            </div>
          </header>

          <Separator className="my-8" />

          <div className="prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-[-0.03em] prose-a:text-foreground prose-a:no-underline hover:prose-a:text-muted-foreground prose-code:rounded prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-pre:rounded-3xl prose-pre:border prose-pre:border-border prose-pre:bg-[#161616] prose-pre:px-5 prose-pre:py-4 prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:text-muted-foreground prose-hr:border-border">
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
              <section className="space-y-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {UI_LABELS.relatedPosts}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <a
                      key={relatedPost.id}
                      href={`/${getPostPublicSlug(relatedPost)}/`}
                      className="rounded-[1.5rem] border bg-card p-5 transition-colors hover:bg-accent"
                    >
                      <div className="mb-3 flex flex-wrap gap-2">
                        {relatedPost.data.tags
                          .filter((tag) => post.data.tags.includes(tag))
                          .slice(0, 2)
                          .map((tag) => (
                            <Badge key={tag} variant="outline">
                              #{tag}
                            </Badge>
                          ))}
                      </div>
                      <div className="font-display text-base font-semibold tracking-[-0.03em]">
                        {relatedPost.data.title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {relatedPost.data.description}
                      </p>
                    </a>
                  ))}
                </div>
              </section>

              <Separator className="my-8" />
            </>
          ) : null}

          <nav className="grid gap-3 sm:grid-cols-2">
            {newerPost ? (
              <a
                href={`/${getPostPublicSlug(newerPost)}/`}
                className="group rounded-[1.5rem] border bg-card p-5 transition-colors hover:bg-accent"
              >
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  <ArrowLeft className="size-3.5" />
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
                  <ArrowRight className="size-3.5" />
                </div>
                <div className="font-display text-base font-semibold tracking-[-0.03em]">
                  {olderPost.data.title}
                </div>
              </a>
            ) : null}
          </nav>
        </article>

        <aside className="hidden space-y-4 lg:block">
          <ContentsCard headings={headings} />
        </aside>
      </section>
    </main>
  );
}
