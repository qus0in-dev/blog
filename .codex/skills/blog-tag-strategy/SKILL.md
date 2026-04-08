---
name: blog-tag-strategy
description: Use when writing or revising frontmatter tags for files under src/content. Keep tags in English, allow up to 10 tags, and intentionally reuse some existing repository tag vocabulary when it is semantically valid.
---

# Blog Tag Strategy

Assign tags for `src/content` posts so they stay searchable, honest, and connected to the rest of the blog.

## Core Rules

- Tags must be English only.
- Use at most 10 tags.
- Prefer 5 to 8 tags unless the article genuinely spans more axes.
- Reuse existing repository tags when they fit. Do not create near-duplicate synonyms just to sound more specific.
- Keep tags truthful. Do not force overlap with older posts when the topic does not actually match.

## Tag Mix

Build the final set from these buckets when relevant:

- Primary topic: the main technology or concept the article centers on
- Secondary topic: adjacent frameworks, protocols, or tools
- Architectural layer: terms like `observability`, `web-architecture`, `servlet`
- Platform or vendor: terms like `cloudflare`
- Operational or analytical lens: terms like `analytics`, `workers`

## Overlap Strategy

- Before adding tags, scan current published posts in `src/content/published`.
- Reuse 2 to 4 existing tags when the article shares real subject matter with earlier posts.
- Keep 1 to 3 tags specific to the new article so it does not collapse into generic labeling.
- If no meaningful overlap exists, choose clean new tags rather than fake continuity.

## Canonicalization Rules

- Prefer the existing canonical tag if the repo already has one. Example: keep `cloudflare`, not `cloudflare-workers`, unless the narrower tag is necessary.
- Avoid same-meaning variants such as singular/plural or hyphen/no-hyphen duplicates unless one is already established and the other is clearly different.
- Prefer stack or concept nouns over vague editorial labels. Avoid tags like `backend-note`, `thinking`, `study`, `troubleshooting` unless the repository already treats them as real categories.

## Workflow

1. Read the article title, description, and frontmatter.
2. Scan current tag vocabulary from `src/content/published`.
3. Draft a candidate set grouped by topic, platform, and architectural layer.
4. Remove weak or redundant tags.
5. Ensure the final set has some meaningful overlap with existing posts when appropriate.
6. Keep the final list at 10 or fewer tags.

## Output Standard

The final tags should help a reader discover related posts across the blog, while still describing the article accurately on its own.
