# PR Browser Handoff Checklist

Use this checklist before opening the browser PR flow.

## Preconditions

- working tree is clean
- current branch exists and is not detached
- branch is committed
- upstream exists or can be created
- `gh` authentication is already valid

## Safe Defaults

- base branch: repository default
- head branch: current local branch
- prefilled field: title only
- PR body: leave for browser editing

## Stop Conditions

- local changes are still uncommitted
- branch push failed
- `gh` cannot access the repository
- the title is still ambiguous
