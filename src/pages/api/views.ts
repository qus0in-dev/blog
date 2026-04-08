import type { APIRoute } from "astro";

import {
  getPostViewCount,
  getViewSessionCookieName,
  recordPostView,
} from "@/lib/views";

type RequestBody = {
  slug?: unknown;
};

function createSessionId() {
  return crypto.randomUUID();
}

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  let payload: RequestBody;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const slug = typeof payload.slug === "string" ? payload.slug.trim() : "";

  if (!slug) {
    return new Response(JSON.stringify({ error: "invalid_slug" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let sessionId = cookies.get(getViewSessionCookieName())?.value;

  if (!sessionId) {
    sessionId = createSessionId();
    cookies.set(getViewSessionCookieName(), sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: new URL(request.url).protocol === "https:",
    });
  }

  const result = await recordPostView(slug, sessionId);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
};

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get("slug")?.trim() ?? "";

  if (!slug) {
    return new Response(JSON.stringify({ error: "invalid_slug" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({
      views: await getPostViewCount(slug),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
};
