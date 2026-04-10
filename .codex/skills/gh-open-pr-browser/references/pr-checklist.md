# PR Browser Handoff Checklist

Use this checklist before opening the browser PR flow.

## Preconditions

- working tree is clean
- current branch exists and is not detached
- branch is committed
- merge target branch is known
- branch commit range is inspectable against the latest merge-base with the target branch
- upstream exists or can be created
- `gh` authentication is already valid

## Safe Defaults

- base branch: repository default
- head branch: current local branch
- prefilled fields: title and short draft body
- PR body: keep it short and editable in the browser
- title basis: summarize only the commits still new relative to the latest target-branch state
- title style: natural PR summary, not commit-type convention
- body basis: summarize the same commit range in a few practical bullets

## Stop Conditions

- local changes are still uncommitted
- target branch is unclear
- commit range against the target branch is unclear
- branch push failed
- `gh` cannot access the repository
- the title is still ambiguous
