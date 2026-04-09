---
name: package-version-bump
description: Use when deciding whether package.json version should change in this repository. Default to at least a patch bump for code, runtime, build, deploy, or behavior changes.
---

# Package Version Bump

Use this skill when deciding whether `package.json` `version` should change before a commit.

For this repository, code changes should normally move the package version. Do not leave the version unchanged just because the user did not explicitly ask for a bump.

## Default Rule

- If shipped code changed, bump at least `patch`.
- If only docs, content, README, or skill instructions changed, version may stay unchanged.
- If the change is ambiguous, prefer bumping `patch` over leaving the version untouched.

## What Counts As Shipped Code

Treat these as versioned surface changes:

- `src/` runtime or rendering changes
- `scripts/` behavior changes that affect build, publish, generation, or deploy
- `package.json` script or dependency changes
- `wrangler.jsonc`, migrations, worker bindings, or deployment configuration changes
- Generated files that materially change site behavior because of a source-code change

Do not require a version bump for these alone:

- `src/content/**`
- `README.md`
- `.codex/skills/**`
- other docs-only or editorial-only changes

## Bump Levels

- `patch`: default for bug fixes, UI tweaks, tracking changes, refactors that affect shipped behavior, config changes, routing changes, scripts that alter output, or any normal code change
- `minor`: use for clearly larger shipped additions such as new end-user features, new APIs, major sections, or broader capability expansion
- `major`: use only for intentional breaking changes

## Workflow

1. Inspect the intended commit scope.
2. Decide whether the scope contains shipped code or only docs/content/skill changes.
3. If shipped code changed, update `package.json` before staging the final commit.
4. Use `references/bump-examples.md` when the bump level is ambiguous.
5. Use the smallest honest bump, with `patch` as the fallback.
6. If multiple commits are being split, assess the version bump against the commit being prepared, not the whole worktree.

## Repository Preference

- This repository treats code changes as shippable changes.
- A commit that changes code but leaves `package.json` version unchanged should be treated as an exception that needs explicit user direction.

## Reference

- Read [references/bump-examples.md](references/bump-examples.md) when deciding between patch, minor, and no bump.
