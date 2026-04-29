# BeatMist Releases

BeatMist の製品ページおよびリリース配布サイトです。

## 技術スタック

- [Astro](https://astro.build/) + React + styled-components
- [Cloudflare Pages](https://pages.cloudflare.com/)（ホスティング・Functions）

## 開発

```bash
pnpm install
pnpm dev        # ローカル開発サーバー（Astro のみ）
pnpm dev:cf     # Cloudflare Functions を含むローカル開発サーバー
pnpm build      # プロダクションビルド
```

### `pnpm dev` と `pnpm dev:cf` の使い分け

| コマンド | 起動するもの | 用途 |
|---------|------------|------|
| `pnpm dev` | Astro 開発サーバーのみ | UI・コンポーネントの開発。軽量で高速 |
| `pnpm dev:cf` | Wrangler 経由で Astro + Cloudflare Functions | API エンドポイント（`/api/*`）を含む完全な環境。Functions の動作確認が必要なときに使用 |

## API エンドポイント

### `GET /api/downloads`

GitHub Releases API からダウンロード数を取得して返します。`.dmg`（macOS）と `.exe`（Windows）のみを集計対象とします。

**レスポンス例:**

```json
{
  "total": 70,
  "releases": [
    {
      "version": "v1.0.7",
      "date": "2026-04-29",
      "assets": [
        { "name": "beatmist-1.0.7-setup.exe", "platform": "win", "downloads": 45 },
        { "name": "beatmist-1.0.7.dmg", "platform": "mac", "downloads": 20 }
      ],
      "subtotal": 65
    }
  ]
}
```

### `POST /api/contact`

お問い合わせフォームの送信を処理します。レート制限あり（60秒間に3回まで）。

### `GET /api/license`

Stripe 決済完了後にライセンスキーを取得します。
