CREATE TABLE IF NOT EXISTS post_view_totals (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_view_sessions (
  slug TEXT NOT NULL,
  session_id TEXT NOT NULL,
  first_viewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (slug, session_id)
);

CREATE INDEX IF NOT EXISTS idx_post_view_sessions_session_id
  ON post_view_sessions (session_id);
