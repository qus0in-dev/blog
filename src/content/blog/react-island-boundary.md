---
title: React 아일랜드 경계 잡기
description: Astro 안에서 React 컴포넌트를 어디까지 둘지 판단한 기준 기록.
pubDate: 2026-04-03
tags:
  - react
  - astro
  - architecture
draft: false
---

인터랙션이 필요한 영역만 React로 분리하는 편이 좋다.

## 기준

- 상태가 필요한가
- 클라이언트 hydration이 필요한가
- 문서 본문만으로 충분한가

## 메모

섬은 작을수록 디버깅이 쉽다.
