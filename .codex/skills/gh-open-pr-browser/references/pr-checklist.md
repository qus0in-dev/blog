# PR Browser Handoff Checklist

Use this checklist before opening the browser PR flow.

## Preconditions

- working tree is clean
- current branch exists and is not detached
- branch is committed
- branch commit range is inspectable against its base or upstream
- upstream exists or can be created
- `gh` authentication is already valid

## Safe Defaults

- base branch: repository default
- head branch: current local branch
- prefilled fields: title and short draft body
- PR body: keep it short and editable in the browser
- title basis: summarize all new commits in the PR scope, not only the latest commit
- title style: natural PR summary, not commit-type convention
- body basis: summarize the same commit range in a few practical bullets

## Stop Conditions

- local changes are still uncommitted
- branch push failed
- `gh` cannot access the repository
- the title is still ambiguous
