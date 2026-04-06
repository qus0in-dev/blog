---
name: git-convention-commit
description: Use when drafting, validating, staging, and committing git changes for this repository. Enforce Conventional Commit categories in English, keep optional scopes in English, and write the main subject line in Korean.
---

# Git Convention Commit

Use this skill when the user asks to create a commit, suggest commit messages, validate commit wording, stage changes, or align a commit with the repository's git convention.

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
2. If the user asked to commit the current work, stage the intended files with `git add` first. Prefer `git add -A` when the user clearly wants the whole current change set committed.
3. Choose the best category using `references/categories.md`.
4. Add a scope only when it improves scanability.
5. Write a concise Korean subject that explains the main change.
6. Before finalizing, verify that English appears only in the category and optional scope.
7. If the user asked for an actual commit, run `git commit -m "<message>"` after confirming there is something staged.

## Execution rules

- Do not stop at proposing a message when the user explicitly asked to stage or commit.
- Check `git status --short` before and after staging.
- Avoid interactive git flows.
- If unrelated changes are present and the user did not ask to include them, stage only the relevant files.
- If the user asked to commit the current state without narrowing scope, treat tracked modifications, deletions, and newly added files as in scope.

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
- Does the subject describe the primary change rather than an implementation detail?
- Would this message still make sense in `git log --oneline`?

## Reference

- Read [references/categories.md](references/categories.md) when category choice is ambiguous.
