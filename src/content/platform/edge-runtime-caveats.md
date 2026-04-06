---
title: Edge 런타임에서 막히는 것들
description: 로컬에서는 되지만 Edge 환경에서 바로 막히는 항목을 정리한 기록.
pubDate: 2026-03-29
tags:
  - edge
  - runtime
  - cloudflare
draft: false
---

Node 전용 가정을 남겨두면 배포 후에 바로 드러난다.

## 자주 막히는 부분

- 파일 시스템 의존
- 포트 바인딩 기대
- 환경 변수 차이

## 메모

로컬 개발 편의와 런타임 제약을 분리해서 봐야 한다.
