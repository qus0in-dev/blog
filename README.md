# qus0in dev blog

Astro 기반 기술 블로그입니다. 레이아웃은 `Pico CSS`를 기반으로 구성했고,
직접 작성한 CSS는 색상 변수와 블로그 정보 구조를 위한 최소한의 오버라이드만
포함합니다.

## Design direction

- 적용형 레이아웃: 모바일에서는 단일 컬럼, 넓은 화면에서는 본문과 사이드바를 분리
- 제한된 색 사용: 거의 흑백에 가까운 중성 팔레트
- 기술 블로그 구조: 아카이브, 태그, 목차, 메타데이터, RSS 노출

## Stack

- Astro
- Astro Content Collections
- Pico CSS

## Commands

| Command | Action |
| :-- | :-- |
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 결과 미리보기 |
| `pnpm deploy` | Cloudflare 배포 |
