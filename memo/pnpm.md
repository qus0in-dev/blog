# pnpm

## 최신 버전 세팅 (폴더 외부)

```sh
corepack use pnpm@latest
```

## pnpm dlx 캐시 디렉터리 권한 문제

```sh
sudo rm -rf ~/Library/Caches/pnpm
mkdir -p ~/Library/Caches/pnpm
chmod -R u+rwX ~/Library/Caches/pnpm
```


