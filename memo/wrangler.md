# wrangler

## wrangler 캐시/로그 디렉터리 루트 권한 이슈

```sh
mkdir -p ~/Library/Preferences/.wrangler/{logs,registry}
sudo chown -R "$USER":staff ~/Library/Preferences/.wrangler
chmod -R u+rwX ~/Library/Preferences/.wrangler
# pnpm dev
```
