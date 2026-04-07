---
name: readme-sync
description: Use when updating README.md so it stays consistent with the current repository behavior. Especially useful after changes to routing, content structure, build scripts, rendering integrations, deployment, or writing/editorial conventions.
---

# README Sync

Update `README.md` so it reflects the repository as it actually works now, not as it worked a few commits ago.

## Priorities

1. Document current behavior, not intentions or stale plans.
2. Prefer repository-specific facts over generic framework descriptions.
3. Keep README concise, but include the pieces a new contributor actually needs first.

## What To Check

- Runtime and package manager requirements from `package.json`
- Actual commands used for dev, build, preview, and deploy
- Content location and naming rules
- Public URL generation rules
- Rendering features that affect authoring, such as Mermaid support
- Asset or OG generation steps that happen during build
- Deployment target and adapter
- Any local skills or editorial conventions that shape day-to-day maintenance

## Writing Rules

- Use short sections with specific headings.
- Do not pad README with generic framework marketing copy.
- If a project has custom behavior, surface it near the top.
- Explain routing or slug rules in plain language.
- If a convention affects future updates, document both the rule and where it is implemented.
- Prefer examples when a rule would otherwise stay abstract.

## Consistency Rules

- README must match the current code paths and script names.
- If the repository uses generated URLs or assets, document the generation rule.
- If the project includes local skills that affect maintenance, mention the relevant ones briefly.
- Remove outdated sections instead of trying to hedge them.

## Output Standard

The resulting README should help a maintainer understand what the project is, how to run it, how content works, and what repository-specific rules they should not accidentally break.
