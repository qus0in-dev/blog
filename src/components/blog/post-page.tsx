import { ArrowLeft, ArrowRight, Copy, CornerDownLeft } from "lucide-react";

import { getPostPublicSlug, type BlogPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UI_LABELS } from "@/consts/ui";
import { SITE_URL } from "@/consts/site";

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
        <ul className="space-y-2.5 font-ui">
          {headings
            .filter((heading) => heading.depth <= 3)
            .map((heading) => (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className={
                    heading.depth === 1
                      ? "block text-[1.05rem] leading-6 font-semibold tracking-[-0.04em] text-foreground hover:text-muted-foreground"
                      : heading.depth === 2
                        ? "block pl-3 text-[0.95rem] leading-6 font-medium tracking-[-0.02em] text-foreground/90 hover:text-foreground"
                        : "block pl-8 text-[0.84rem] leading-5 tracking-[-0.01em] text-muted-foreground hover:text-foreground"
                  }
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

function CopyLinkInline({ href }: { href: string }) {
  return (
    <section>
      <div className="flex max-w-full items-center gap-3">
        <button
          type="button"
          data-copy-url={href}
          data-copy-kind="inline"
          className="min-w-0 truncate font-body text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground sm:text-[0.95rem]"
        >
          {href}
        </button>
        <span
          data-copy-inline-status
          className="pointer-events-none shrink-0 text-xs text-muted-foreground opacity-0 transition-opacity duration-200"
        >
          복사됨
        </span>
      </div>
    </section>
  );
}

function ShareActions({ href, title }: { href: string; title: string }) {
  const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(href)}&text=${encodeURIComponent(title)}`;

  return (
    <section>
      <div className="flex items-center justify-start gap-3">
        <button
          type="button"
          aria-label="링크 복사"
          title="링크 복사"
          data-copy-url={href}
          data-copy-label-default="링크"
          data-copy-label-success="복사됨"
          className="inline-flex h-11 items-center gap-2 rounded-full border bg-card/80 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Copy className="size-4" />
          <span data-copy-label>링크</span>
        </button>
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="X에 공유"
          title="X에 공유"
          className="inline-flex size-11 items-center justify-center rounded-full border bg-card/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 fill-current"
          >
            <path
              d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.639 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.645h2.039L6.486 3.24H4.298z"
            ></path>
          </svg>
        </a>
      </div>
    </section>
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
  const postHref = `${SITE_URL}/${getPostPublicSlug(post)}/`;
  const shareTitle = post.data.title;

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

          <ShareActions href={postHref} title={shareTitle} />

          <Separator className="my-8" />

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

          <script
            dangerouslySetInnerHTML={{
              __html: `
                (() => {
                  const buttons = document.querySelectorAll("[data-copy-url]");

                  for (const button of buttons) {
                    button.addEventListener("click", async () => {
                      const url = button.getAttribute("data-copy-url");
                      const kind = button.getAttribute("data-copy-kind");
                      const label = button.querySelector("[data-copy-label]");
                      const inlineStatus = button.parentElement?.querySelector("[data-copy-inline-status]");
                      const defaultLabel = button.getAttribute("data-copy-label-default") || "주소 복사";
                      const successLabel = button.getAttribute("data-copy-label-success") || "복사됨";

                      if (!url) return;

                      try {
                        await navigator.clipboard.writeText(url);

                        if (kind === "inline" && inlineStatus) {
                          inlineStatus.textContent = successLabel;
                          inlineStatus.classList.remove("opacity-0");
                          window.setTimeout(() => {
                            inlineStatus.classList.add("opacity-0");
                          }, 1800);
                          return;
                        }

                        if (!label) return;

                        label.textContent = successLabel;
                        window.setTimeout(() => {
                          label.textContent = defaultLabel;
                        }, 1800);
                      } catch {
                        if (kind === "inline" && inlineStatus) {
                          inlineStatus.textContent = "복사 실패";
                          inlineStatus.classList.remove("opacity-0");
                          window.setTimeout(() => {
                            inlineStatus.classList.add("opacity-0");
                            inlineStatus.textContent = "복사됨";
                          }, 1800);
                          return;
                        }

                        if (!label) return;

                        label.textContent = "복사 실패";
                        window.setTimeout(() => {
                          label.textContent = defaultLabel;
                        }, 1800);
                      }
                    });
                  }
                })();
              `,
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
