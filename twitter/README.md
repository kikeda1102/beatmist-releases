# Twitter 投稿管理

BeatMist の Twitter (X) 投稿コンテンツを管理するディレクトリです。

## ディレクトリ構成

```
twitter/
  README.md
  posts/
    01-product-features/   # 製品機能の宣伝
    02-tips-and-howto/     # 使い方 Tips
    03-dj-knowledge/       # DJ 全般の豆知識
    04-engagement/         # コミュニティ向け質問
    05-updates-releases/   # リリース告知テンプレート
    06-social-proof/       # ユーザーの声
  _posted/                 # 投稿済みファイルの移動先
```

## ファイル命名規則

```
NNNN-slug.yml
```

- `NNNN`: 4 桁の連番（`0001`, `0002`, ...）
- `slug`: 投稿内容を表す短い英語スラッグ（ケバブケース）

例: `0001-cdj-conversion.yml`, `0012-weekly-question.yml`

## YAML ファイルフォーマット

### 単一ポスト

```yaml
id: feat-0001
category: product-features
tags: [cdj, conversion]
status: draft          # draft | scheduled | posted
scheduled_date: null
posted_date: null
posted_url: null
thread: false

content: |
  BeatMist を使えば、rekordbox のプレイリストを CDJ 対応フォーマットに一発変換できます。
  面倒なファイル管理から解放されましょう。

  #BeatMist #DJ #rekordbox
```

### スレッド（複数ツイート）

`content` の代わりに `tweets` 配列を使用します。

```yaml
id: tips-0003
category: tips-and-howto
tags: [playlist, workflow]
status: draft
scheduled_date: null
posted_date: null
posted_url: null
thread: true

tweets:
  - |
    BeatMist のプレイリスト管理、活用できていますか？
    便利な使い方を 3 つ紹介します。🧵

    #BeatMist #DJ
  - |
    1/3 スマートプレイリスト
    BPM やキーで自動分類されるので、現場で迷うことがなくなります。
  - |
    2/3 タグ機能
    ジャンルや雰囲気でタグ付けしておけば、セットリスト作成が格段に速くなります。
  - |
    3/3 エクスポート
    作成したプレイリストは USB に直接書き出し可能です。
    ぜひ試してみてください！
```

## フィールド一覧

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | string | 一意の識別子（`カテゴリ略称-連番`） |
| `category` | string | 所属カテゴリ名 |
| `tags` | string[] | 検索・分類用タグ |
| `status` | string | `draft` / `scheduled` / `posted` |
| `scheduled_date` | string \| null | 投稿予定日（`YYYY-MM-DD`） |
| `posted_date` | string \| null | 実際の投稿日（`YYYY-MM-DD`） |
| `posted_url` | string \| null | 投稿の URL |
| `thread` | boolean | スレッド投稿かどうか |
| `content` | string | 投稿本文（単一ポスト時） |
| `tweets` | string[] | ツイート配列（スレッド時） |

## 投稿ワークフロー

```
draft → scheduled → posted → _posted/ へ移動
```

1. **draft**: 下書きを作成し、該当カテゴリのディレクトリに配置する
2. **scheduled**: レビュー後に `status: scheduled` へ変更し、`scheduled_date` を設定する
3. **posted**: 投稿完了後に `status: posted` へ変更し、`posted_date` と `posted_url` を記録する
4. **archived**: 投稿済みファイルを `_posted/` ディレクトリへ移動する

## 推奨投稿スケジュール

| 曜日 | カテゴリ | 内容 |
|---|---|---|
| 月曜 | DJ Knowledge (`03-dj-knowledge`) | DJ 全般の豆知識・ノウハウ共有 |
| 水曜 | Product / Tips (`01-product-features`, `02-tips-and-howto`) | 製品機能の紹介や使い方 Tips |
| 金曜 | Engagement (`04-engagement`) | コミュニティ向けの質問・話題提供 |

リリース告知 (`05-updates-releases`) やユーザーの声 (`06-social-proof`) は、発生タイミングに合わせて随時投稿します。
