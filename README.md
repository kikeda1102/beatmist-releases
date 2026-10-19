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

## お問い合わせフォーム

フォームの送信は、共通のお問い合わせ API（`https://contact.sync-note.com/v1/contact/beatmist`、リポジトリは contact-api）に送ります。入力の確認、回数の上限、Turnstile の確認、メールの送信は API が行います。

API の URL と Turnstile のサイトキーは、既定では本番の値を使います。ローカルで共通 API の `wrangler dev` に送るときは、`.env` に次のように書きます。

```bash
PUBLIC_CONTACT_API_URL=http://127.0.0.1:8787
# Cloudflare のテスト用のサイトキー（必ず通る）
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

## ユーザーの声（ツイート）

トップページのカルーセルに表示するツイートは `src/data/tweets.json` から読み込まれます。

### ツイートの追加・更新方法

1. `src/data/content.ts` の `userVoices` 配列にツイートIDを追加
2. `pnpm fetch-tweets` を実行して `tweets.json` を再生成
3. 生成された `tweets.json` をコミットに含める（ビルド時には取得しない）

## 開発予定（ロードマップ）

サイトの [/roadmap](https://beatmist.com/roadmap) ページに表示される開発予定は、リポジトリルートの `roadmap.yml` から動的に取得されます。

### 表示の制御

`src/config.ts` の `displayRoadmap` フラグで、開発予定に関連する全UI（ヘッダーナビ・フッターリンク・トップページのバナー・`/roadmap` ページ）の表示/非表示を一括制御できます。

```typescript
// src/config.ts
export const displayRoadmap = true;  // false にすると全て非表示
```

フラグを `false` にした場合、`/roadmap` への直接アクセスはトップページにリダイレクトされます。変更にはデプロイが必要です。

### データの更新方法

GitHub 上で [`roadmap.yml`](https://github.com/kikeda1102/beatmist-releases/blob/main/roadmap.yml) を直接編集・コミットするだけでサイトに反映されます（デプロイ不要）。GitHub CDN のキャッシュにより、反映まで最大約5分かかります。

### YAML の構造

```yaml
last_updated: "2026-05-01"

categories:
  - id: planned          # planned / considering / completed
    label: "対応予定"      # 日本語表示名
    label_en: "Planned"   # 英語表示名
    items:
      - title: "機能名"
        title_en: "Feature Name"
        description: "説明"
        description_en: "Description"
        priority: high    # high / medium / low
```

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

### `GET /api/license`

Stripe 決済完了後にライセンスキーを取得します。
