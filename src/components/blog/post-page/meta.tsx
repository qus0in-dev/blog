import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UI_LABELS } from "@/consts/ui";

import { CopyIcon } from "./icons";

export type Heading = {
  depth: number;
  slug: string;
  text: string;
};

export function ContentsCard({ headings }: { headings: Heading[] }) {
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

export function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
          <Badge variant="outline">#{tag}</Badge>
        </a>
      ))}
    </div>
  );
}

export function TagsSection({ tags }: { tags: string[] }) {
  return (
    <section className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {UI_LABELS.tags}
      </div>
      <PostTags tags={tags} />
    </section>
  );
}

export function CopyLinkInline({ href }: { href: string }) {
  return (
    <section>
      <div className="flex max-w-full items-center gap-3">
        <button
          type="button"
          data-copy-url={href}
          data-copy-kind="inline"
          className="min-w-0 truncate text-left font-body text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground sm:text-[0.95rem]"
        >
          {href}
        </button>
        <span
          data-copy-inline-status
          data-copy-inline-default={UI_LABELS.copyHint}
          className="pointer-events-none shrink-0 text-xs text-muted-foreground transition-colors duration-200"
        >
          {UI_LABELS.copyHint}
        </span>
      </div>
    </section>
  );
}

export function ShareActions({ href, title }: { href: string; title: string }) {
  const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(href)}&text=${encodeURIComponent(title)}`;

  return (
    <section>
      <div className="flex items-center justify-start gap-3">
        <button
          type="button"
          aria-label={UI_LABELS.copyLink}
          title={UI_LABELS.copyLink}
          data-copy-url={href}
          data-copy-label-default={UI_LABELS.copyLabel}
          data-copy-label-success={UI_LABELS.copySuccess}
          className="inline-flex h-11 items-center gap-2 rounded-full border bg-card/80 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <CopyIcon className="size-4" />
          <span data-copy-label>{UI_LABELS.copyLabel}</span>
        </button>
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={UI_LABELS.shareOnX}
          title={UI_LABELS.shareOnX}
          className="inline-flex size-11 items-center justify-center rounded-full border bg-card/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 fill-current"
          >
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.639 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.645h2.039L6.486 3.24H4.298z"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
