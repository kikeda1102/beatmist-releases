# Highlights Section Design

## Context

BeatMist のランディングページに、製品の主要な強みを伝えるセクションを追加する。CDJ 自動変換、クロスプラットフォーム対応、ライセンスの柔軟さの3点を、購入検討の後押しとして Features と Pricing の間に配置する。

## Design

### Layout

横並び3カラム（モバイルは縦1カラム）。カード枠なし、テキスト中央寄せのクリーンなレイアウト。背景色は `bgPrimary` で、Features（`bgSecondary`）との切り替わりを明確にする。

### Items

| Title | Description |
|---|---|
| CDJ機種を選ぶだけで自動変換 | 対象のCDJ機種を設定しておくだけで、非対応フォーマットを自動的に検出し、最適な形式へ変換します。 |
| Windows / Mac 両対応 | Windows / Mac 両対応です。 |
| 1ライセンスで3台まで | 1つのご購入で、最大3台のPCにアクティベートできます。 |

- アイコンなし
- 説明文はですます調

### Component Structure

新規ファイル `src/components/Highlights.tsx`:

- `Section` — `bgPrimary` 背景、`sectionPadding` 使用
- `Container` — max-width `containerMax`（1200px）
- `Grid` — CSS Grid、3カラム（md 以上）、1カラム（モバイル）
- `Item` — テキスト中央寄せ
- `ItemTitle` — `fonts.heading`、`textPrimary`
- `ItemDescription` — `textSecondary`

### Data

`src/data/content.ts` に `highlights` 配列を追加:

```typescript
interface Highlight {
  readonly title: string;
  readonly description: string;
}
```

### Page Integration

`src/components/App.tsx` で Features と Pricing の間に挿入:

```
Header → Hero → Features → **Highlights** → Pricing → Footer
```

### i18n

`src/i18n/translations/en.ts` に英語翻訳を追加:

- `"CDJ機種を選ぶだけで自動変換"` → `"Auto-Convert by Selecting Your CDJ"`
- `"対象のCDJ機種を設定しておくだけで、非対応フォーマットを自動的に検出し、最適な形式へ変換します。"` → `"Just set your target CDJ model, and unsupported formats are automatically detected and converted to the optimal format."`
- `"Windows / Mac 両対応"` → `"Windows / Mac Compatible"`
- `"Windows / Mac 両対応です。"` → `"Available on both Windows and Mac."`
- `"1ライセンスで3台まで"` → `"1 License, Up to 3 Devices"`
- `"1つのご購入で、最大3台のPCにアクティベートできます。"` → `"Activate on up to 3 PCs with a single purchase."`

## Files to Modify

- `src/data/content.ts` — Highlight interface と highlights データ追加
- `src/components/Highlights.tsx` — 新規作成
- `src/components/App.tsx` — Highlights を Features と Pricing の間に挿入
- `src/i18n/translations/en.ts` — 英語翻訳追加

## Verification

1. `pnpm run build` が成功すること
2. i18n チェック（`pnpm run check:i18n`）がパスすること
3. 開発サーバーで Highlights セクションが正しく表示されること
   - Features と Pricing の間に配置されている
   - 3項目が横並び（デスクトップ）/ 縦並び（モバイル）
   - テキストが中央寄せ
   - 背景色が Features セクションと異なる
