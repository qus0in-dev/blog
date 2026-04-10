---
name: gh-open-pr-browser
description: Use when the user wants to open the current branch as a GitHub pull request via gh, prefill the title and a short draft body, and finish the submission in the browser.
---

# GH Open PR Browser

Open the current branch as a pull request through `gh`, but stop at the browser handoff instead of fully composing the PR in the terminal.

This skill is for a very specific workflow:

1. inspect the branch and worktree
2. ensure there is nothing uncommitted that should block publishing
3. push the current branch if needed
4. run `gh pr create --web --title "<title>" --body "<body>"`
5. let the user finish the PR in GitHub with `Continue in browser`

## Priorities

1. Do not open a PR from a dirty or ambiguous worktree unless the user explicitly wants that.
2. Prefill the title and a short draft body so the browser review step starts from a usable PR draft.
3. Prefer the repository default base branch unless the user asked for a different base.
4. Keep the shell step minimal and predictable.

## When To Use

- The user wants to raise the current branch as a PR.
- The user wants `gh` rather than the GitHub connector for PR creation.
- The user wants the browser UI for the final submit step.
- The user wants the PR title and a rough body prepared in advance.

## Command Shape

The core command should stay minimal:

```bash
gh pr create --web --title "<title>" --body "<body>"
```

Add `--base <branch>` only when the user explicitly asks for a non-default base.

## Title Rules

- Use the title the user gave if they already specified one.
- If the user did not specify a title, derive it from the commits that are new relative to the current merge target branch, not from the entire historical branch.
- Use the latest merged state of `main`, `master`, or the repository default base branch as the comparison baseline.
- Summarize only the currently unmerged PR-sized change and write a title that covers that delta.
- Check recent branch commits against the latest base-branch merge base so the title reflects only what would be included if the PR were opened now.
- The PR title does not need to follow commit message conventions such as Conventional Commits.
- Prefer a clear natural-language summary over commit-style prefixes.
- Keep the title concise and ready for direct use in GitHub.
- Do not invent issue references, reviewers, labels, or milestones unless the user asked for them.

## Body Rules

- If the user already gave PR body guidance, use it.
- Otherwise, derive a short draft body from the commits that are new relative to the current merge target branch.
- Summarize the branch in a few practical bullets, not a long changelog.
- Prefer a compact structure such as:

```text
## Summary
- ...
- ...

## Notes
- ...
```

- Keep the body short enough that the user can comfortably finish editing in the browser.
- Do not paste full commit logs into the body.
- Do not invent testing claims, follow-up tasks, or issue references unless they are supported by the branch changes.

## Execution Rules

- Use `gh`, not the GitHub connector, for the PR creation step.
- Run `git status --short` before doing anything else.
- Run `git branch --show-current` to identify the current branch.
- Fetch the merge target branch before deriving the PR commit range so the comparison uses the latest remote state.
- Check upstream state before opening the browser flow.
- If the branch has no upstream, push it first.
- If the branch is ahead of upstream, push it first.
- If the worktree has uncommitted changes, stop and tell the user instead of opening the PR flow.
- Pass `--body` with a short draft body when the user did not provide one.
- Do not use `--fill`, `--fill-first`, `--fill-verbose`, or `--template`.
- Do not use editor-based flows such as `gh pr create --editor` for this skill.
- Do not create the PR directly from the terminal when `--web` satisfies the request.
- If opening the browser or pushing requires escalation, request it directly with a short justification.

## What To Check

- current branch name from `git branch --show-current`
- dirty worktree from `git status --short`
- merge target branch from the repository default base branch, or `main` / `master` when that is the actual merge target
- successful `git fetch origin <merge-target-branch>` before deriving the PR range
- latest remote state of the merge target branch after that fetch
- upstream branch existence from `git rev-parse --abbrev-ref --symbolic-full-name @{u}`
- ahead/behind state from `git status --short --branch` or equivalent
- new commit range for the branch relative to the latest merge-base with the target branch
- remote availability if push is required
- browser handoff readiness from `references/pr-checklist.md`

## Blocking Conditions

Stop and ask the user instead of proceeding when:

- the worktree has unstaged or staged but uncommitted changes
- the branch name is missing or detached
- the user has not provided a title and no safe default can be inferred
- the merge target branch cannot be identified confidently
- fetching the target branch failed
- the commit range relative to the target branch cannot be determined safely
- the branch push fails
- `gh` authentication or repository access is not ready

## Workflow

1. Run `git status --short`.
2. If the worktree is dirty, stop and tell the user what is blocking the PR handoff.
3. Run `git branch --show-current`.
4. Identify the merge target branch, preferring the repository default base branch and otherwise the actual `main` or `master`.
5. Run `git fetch origin <merge-target-branch>` so the comparison uses the latest remote base state.
6. Inspect the branch's new commits relative to the latest merge-base with that fetched target branch and derive one title that covers only the current PR scope.
7. Derive a short draft PR body from the same commit range.
8. Verify upstream with `git rev-parse --abbrev-ref --symbolic-full-name @{u}`.
9. If upstream is missing, push with `git push -u origin <current-branch>`.
10. If the branch is ahead locally, push it before opening the browser flow.
11. Build the final command as `gh pr create --web --title "<title>" --body "<body>"`.
12. Add `--base <branch>` when the detected merge target is not what `gh` would infer safely by default.
13. Run the command.
14. Tell the user that the GitHub browser flow was opened and they should finish the PR there.

## Output Standard

When this skill is used successfully, the final user-facing response should be short and concrete:

- confirm whether the branch was pushed
- state the exact title used
- state that a short draft body was prefilled
- state that the browser PR creation page was opened
- tell the user to finish submission in GitHub

## Reference

- Read [references/pr-checklist.md](references/pr-checklist.md) before opening the browser PR flow when readiness is unclear.

## Example

```bash
git push -u origin 26-04-09
gh pr create --web --title "메인과 글 페이지에 카카오 광고 영역 추가" --body "## Summary
- 메인과 글 페이지에 카카오 광고 영역 추가
- 공용 광고 컴포넌트와 표시 스타일 정리"
```
