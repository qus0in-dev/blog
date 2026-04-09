---
name: git-convention-commit
description: Use when drafting, validating, staging, and committing git changes for this repository. Enforce Conventional Commit categories in English, keep optional scopes in English, and write the main subject line in Korean.
---

# Git Convention Commit

Use this skill when the user asks to create a commit, suggest commit messages, validate commit wording, stage changes, align a commit with the repository's git convention, or decide whether the project version should move with the current change set.

When version handling matters, follow `$package-version-bump`.

## Output format

Write the commit subject in this format:

```text
<category>(<optional-scope>): <한글 주요 메시지>
```

If a scope is not useful, omit it:

```text
<category>: <한글 주요 메시지>
```

## Rules

- `category` must be English lowercase and follow Conventional Commits.
- `scope` is optional, but when used it must be English lowercase and reflect the main touched area such as `seo`, `archive`, `content`, `layout`, `og`, `deploy`.
- The main subject after `:` must be Korean.
- Keep the subject to one line.
- Do not end the subject with a period.
- Prefer one clear user-facing or codebase-facing action in the subject.
- If the change spans multiple areas, choose the category by the primary user-visible outcome, not by the noisiest file count.

## Workflow

1. Inspect both staged and unstaged changes before writing the message.
2. If the change set contains distinct concerns, split them into separate commits before staging.
3. Keep feature work, content edits, and docs or skill maintenance in different commits whenever the files can be separated cleanly.
4. If the user asked to commit the current work, stage the intended files with `git add` first. Prefer `git add -A` only when the whole current change set belongs to one commit.
5. Choose the best category using `references/categories.md`.
6. Add a scope only when it improves scanability, using `references/scopes.md` when helpful.
7. Write a concise Korean subject that explains the main change.
8. Assess the current change size and user-visible impact, then decide whether `package.json` `version` should be updated before the commit by following `$package-version-bump`.
9. Before finalizing, verify that English appears only in the category and optional scope.
10. If the user asked for an actual commit, run `git commit -m "<message>"` after confirming there is something staged.

## Execution rules

- Do not stop at proposing a message when the user explicitly asked to stage or commit.
- Check `git status --short` before and after staging.
- Avoid interactive git flows.
- If unrelated changes are present and the user did not ask to include them, stage only the relevant files.
- If the user asked to commit the current state without narrowing scope, treat tracked modifications, deletions, and newly added files as in scope.
- When commit boundaries are ambiguous, group by shipped behavior first, then by code structure, and keep generated files with the source change that caused them.
- When `package.json` exists, inspect the current change set and decide whether a version bump is warranted before committing by following `$package-version-bump`.

## Version rule

- Use the current staged and unstaged scope to judge change severity.
- Default to the repository rule in `$package-version-bump`: code changes should bump at least `patch`.
- Skip version updates only for docs-only, content-only, README-only, or skill-only changes unless the user explicitly asks for a release bump.
- Apply a minor bump only for clearly larger product changes such as new packages, major new sections or pages, broad feature additions, or other substantial shipped surface expansion.
- Apply a major bump only when the change is clearly breaking for consumers or public integration points.
- If a version bump is needed, update `package.json` before staging the final commit set.

## Examples

```text
feat: 태그 기반 추천 글 섹션 추가
fix(og): 정적 미리보기 이미지 생성 경로 수정
refactor(content): 콘텐츠 경로 구조와 공개 slug 처리 분리
docs: 배포 구조 설명 보강
chore(ci): 빌드 검증 스크립트 정리
feat: 푸터 링크와 커밋 스킬 추가
```

## Validation checklist

- Is the category an allowed English conventional-commit type?
- Is the scope, if present, English and concise?
- Is the main subject Korean?
- If `package.json` exists, does the chosen version bump match the actual change severity?
- Does the subject describe the primary change rather than an implementation detail?
- Would this message still make sense in `git log --oneline`?

## Reference

- Read [references/categories.md](references/categories.md) when category choice is ambiguous.
- Read [references/scopes.md](references/scopes.md) when scope choice is ambiguous.
