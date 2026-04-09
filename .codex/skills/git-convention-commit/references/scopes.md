# Scope Hints

Use a scope only when it makes `git log --oneline` easier to scan.

## Common Scopes

- `layout`: page structure, global wrapper, shared page sections
- `archive`: homepage archive listing, filters, pagination, tag browsing
- `content`: authoring flow, content schema, slug rules, editorial structure
- `seo`: metadata, sitemap, robots, canonical, indexing behavior
- `og`: open graph image generation or preview assets
- `deploy`: deploy commands, runtime bindings, deployment config
- `ci`: automation workflow or remote checks

## When To Skip Scope

- the change is already clear without it
- the change spans many areas evenly
- the scope would be too implementation-specific

## Examples

- `feat(layout): 메인과 글 페이지에 카카오 광고 영역 추가`
- `fix(og): 미리보기 이미지 경로 계산 오류 수정`
- `docs: 배포 흐름 설명 보강`
