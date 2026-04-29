# Highlights Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Features と Pricing の間に、製品の主要な強み（CDJ自動変換、Win/Mac対応、3台アクティベート）を伝える Highlights セクションを追加する。

**Architecture:** `content.ts` にデータ定義、`Highlights.tsx` に表示コンポーネント、`App.tsx` で配置、`en.ts` で英語翻訳。既存の Section → Container → Grid パターンを踏襲し、カード枠なし・テキスト中央寄せで Features との差別化を図る。

**Tech Stack:** React, styled-components, Astro (static)

**Spec:** `docs/superpowers/specs/2026-04-29-highlights-section-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/data/content.ts` | Modify | `Highlight` interface と `highlights` データ配列を追加 |
| `src/components/Highlights.tsx` | Create | Highlights セクションコンポーネント |
| `src/components/App.tsx` | Modify | Highlights を Features と Pricing の間に挿入 |
| `src/i18n/translations/en.ts` | Modify | 英語翻訳6件を追加 |

---

### Task 1: データ定義の追加

**Files:**
- Modify: `src/data/content.ts:67` (features 配列の後)

- [ ] **Step 1: `Highlight` interface と `highlights` データを追加**

`src/data/content.ts` の `features` 配列の後（現在の68行目付近、`PricingTier` interface の前）に以下を追加:

```typescript
interface Highlight {
  readonly title: string;
  readonly description: string;
}

export const highlights: readonly Highlight[] = [
  {
    title: "CDJ機種を選ぶだけで自動変換",
    description:
      "対象のCDJ機種を設定しておくだけで、非対応フォーマットを自動的に検出し、最適な形式へ変換します。",
  },
  {
    title: "Windows / Mac 両対応",
    description: "Windows / Mac 両対応です。",
  },
  {
    title: "1ライセンスで3台まで",
    description: "1つのご購入で、最大3台のPCにアクティベートできます。",
  },
];
```

- [ ] **Step 2: ビルド確認**

Run: `pnpm run build`
Expected: ビルド成功

- [ ] **Step 3: コミット**

```bash
git add src/data/content.ts
git commit -m "feat: highlights データ定義を追加"
```

---

### Task 2: Highlights コンポーネントの作成

**Files:**
- Create: `src/components/Highlights.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/Highlights.tsx` を以下の内容で作成:

```tsx
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { highlights } from "../data/content";
import { useTranslation } from "../i18n";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Item = styled.div`
  text-align: center;
`;

const ItemTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 0.75rem;
`;

const ItemDescription = styled.p`
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

export default function Highlights() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <Grid>
          {highlights.map((item) => (
            <Item key={item.title}>
              <ItemTitle>{t(item.title)}</ItemTitle>
              <ItemDescription>{t(item.description)}</ItemDescription>
            </Item>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: ビルド確認**

Run: `pnpm run build`
Expected: ビルド成功

- [ ] **Step 3: コミット**

```bash
git add src/components/Highlights.tsx
git commit -m "feat: Highlights コンポーネントを作成"
```

---

### Task 3: App.tsx にセクションを挿入

**Files:**
- Modify: `src/components/App.tsx`

- [ ] **Step 1: Highlights を import して Features と Pricing の間に配置**

`src/components/App.tsx` に import を追加し、`<Features />` と `<Pricing />` の間に `<Highlights />` を挿入:

```tsx
import { TranslationProvider } from "../i18n";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Highlights from "./Highlights";
import Pricing from "./Pricing";
import BoothCta from "./BoothCta";
import Footer from "./Footer";

export default function App() {
  return (
    <TranslationProvider>
      <Header />
      <main>
        <Hero />
        <Features />
        <Highlights />
        <Pricing />
        <BoothCta />
      </main>
      <Footer />
    </TranslationProvider>
  );
}
```

- [ ] **Step 2: ビルド確認**

Run: `pnpm run build`
Expected: ビルド成功

- [ ] **Step 3: コミット**

```bash
git add src/components/App.tsx
git commit -m "feat: Highlights セクションを Features と Pricing の間に配置"
```

---

### Task 4: 英語翻訳の追加

**Files:**
- Modify: `src/i18n/translations/en.ts`

- [ ] **Step 1: highlights セクションの翻訳を追加**

`src/i18n/translations/en.ts` の pricing section コメントの前に以下を追加:

```typescript
  // highlights section
  "CDJ機種を選ぶだけで自動変換": "Auto-Convert by Selecting Your CDJ",
  "対象のCDJ機種を設定しておくだけで、非対応フォーマットを自動的に検出し、最適な形式へ変換します。":
    "Just set your target CDJ model, and unsupported formats are automatically detected and converted to the optimal format.",
  "Windows / Mac 両対応": "Windows / Mac Compatible",
  "Windows / Mac 両対応です。": "Available on both Windows and Mac.",
  "1ライセンスで3台まで": "1 License, Up to 3 Devices",
  "1つのご購入で、最大3台のPCにアクティベートできます。":
    "Activate on up to 3 PCs with a single purchase.",
```

- [ ] **Step 2: i18n チェック**

Run: `pnpm run check:i18n`
Expected: `All translation checks passed.`

- [ ] **Step 3: ビルド確認**

Run: `pnpm run build`
Expected: ビルド成功

- [ ] **Step 4: コミット**

```bash
git add src/i18n/translations/en.ts
git commit -m "feat: Highlights セクションの英語翻訳を追加"
```

---

### Task 5: 目視確認

- [ ] **Step 1: 開発サーバーで確認**

Run: `pnpm run dev`

Playwright でスクリーンショットを撮り、以下を確認:
- Highlights セクションが Features と Pricing の間に表示されている
- 3項目が横並び（デスクトップ）
- テキストが中央寄せ
- 背景色が Features セクション（`bgSecondary`）と異なる（`bgPrimary`）
- 英語切り替えで翻訳が正しく表示される
