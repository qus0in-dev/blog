export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function buildArchiveHref(
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

export function buildTagHref(
  tag: string,
  activeTag?: string | null,
  searchQuery?: string
) {
  return buildArchiveHref(1, activeTag === tag ? null : tag, searchQuery);
}
