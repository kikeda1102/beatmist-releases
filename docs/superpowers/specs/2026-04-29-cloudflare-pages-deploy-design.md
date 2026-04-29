# Cloudflare Pages Deploy Design

## Context

beatmist-releases は Astro 6 + React で構築された静的サイトで、ソフトウェア製品のリリースページとして使用される。商用利用のライセンス制約を考慮し、Cloudflare Pages を選択した。現時点ではデプロイ基盤が未構成のため、GitHub 連携による自動デプロイを設定する。

## Approach

Cloudflare ダッシュボードから GitHub リポジトリを直接接続する方式を採用する。コード側の変更は最小限（`.node-version` ファイルの追加のみ）とし、ビルド設定は Cloudflare ダッシュボードで管理する。

## Code Changes

### `.node-version` ファイルの追加

Cloudflare Pages のビルド環境で Node.js 22 を使用するために追加する。

- Path: `.node-version`
- Content: `22`

これ以外のコード変更は不要。Astro はデフォルトで静的出力（`dist/`）を生成するため、adapter の追加や `astro.config.mjs` の変更は不要。

## Cloudflare Dashboard Setup

1. https://dash.cloudflare.com/ にログイン
2. 「Workers & Pages」→「Create」→「Pages」→「Connect to Git」
3. GitHub アカウントを連携し、`kikeda1102/beatmist-releases` を選択
4. ビルド設定:
   - Framework preset: `Astro`
   - Build command: `pnpm run build`
   - Build output directory: `dist`
5. 「Save and Deploy」で初回デプロイ実行

## Build Configuration Summary

| Item | Value |
|------|-------|
| Framework | Astro 6.1.9 |
| Package Manager | pnpm |
| Build Command | `pnpm run build` |
| Output Directory | `dist` |
| Node.js Version | 22 (via `.node-version`) |
| SSR | なし（静的出力） |
| Environment Variables | なし |

## Post-Deploy

- `main` ブランチへの push で自動デプロイ
- プルリクエスト作成時にプレビューデプロイが自動生成
- カスタムドメインはダッシュボードの「Custom domains」から後日設定可能

## Verification

1. `.node-version` ファイルが正しく作成されていることを確認
2. `pnpm run build` がローカルで成功することを確認
3. Cloudflare ダッシュボードでデプロイが成功することを確認
4. 発行された `*.pages.dev` URL でサイトが正常表示されることを確認
