import { env } from "cloudflare:workers";

const VIEW_SESSION_COOKIE = "blog_view_session";

type ViewCountRow = {
  views: number;
};

function getViewsDb() {
  return env.BLOG_VIEWS_DB;
}

function toPositiveInteger(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.trunc(value)
    : 0;
}

export function getViewSessionCookieName() {
  return VIEW_SESSION_COOKIE;
}

export async function getPostViewCount(slug: string) {
  const db = getViewsDb();
  if (!db) return 0;

  const result = await db
    .prepare("SELECT views FROM post_view_totals WHERE slug = ?")
    .bind(slug)
    .first<ViewCountRow>();

  return toPositiveInteger(result?.views);
}

export async function getPostViewCounts(slugs: string[]) {
  const db = getViewsDb();
  const counts = new Map<string, number>();

  for (const slug of slugs) {
    counts.set(slug, 0);
  }

  if (!db || slugs.length === 0) {
    return counts;
  }

  const placeholders = slugs.map(() => "?").join(", ");
  const result = await db
    .prepare(
      `SELECT slug, views FROM post_view_totals WHERE slug IN (${placeholders})`
    )
    .bind(...slugs)
    .all<{ slug: string; views: number }>();

  for (const row of result.results ?? []) {
    counts.set(row.slug, toPositiveInteger(row.views));
  }

  return counts;
}

export async function recordPostView(slug: string, sessionId: string) {
  const db = getViewsDb();
  if (!db) {
    return {
      views: 0,
      counted: false,
    };
  }

  const insertResult = await db
    .prepare(
      `
        INSERT OR IGNORE INTO post_view_sessions (slug, session_id)
        VALUES (?, ?)
      `
    )
    .bind(slug, sessionId)
    .run();

  const counted = toPositiveInteger(insertResult.meta?.changes) > 0;

  if (counted) {
    await db
      .prepare(
        `
          INSERT INTO post_view_totals (slug, views)
          VALUES (?, 1)
          ON CONFLICT(slug) DO UPDATE SET
            views = views + 1,
            updated_at = CURRENT_TIMESTAMP
        `
      )
      .bind(slug)
      .run();
  }

  return {
    views: await getPostViewCount(slug),
    counted,
  };
}
