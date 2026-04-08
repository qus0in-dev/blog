interface Env {
  BLOG_VIEWS_DB: D1Database;
}

declare module "cloudflare:workers" {
  export const env: Env;
}
