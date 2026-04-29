# Stripe + Keygen.sh Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace BOOTH sales channel with Stripe Checkout + Keygen.sh license automation, and provide direct GitHub Releases download for the Free plan.

**Architecture:** Landing page (Astro + React, static) links to Stripe Checkout for Pro purchases and GitHub Releases for Free downloads. A Cloudflare Pages Function verifies Stripe payment and creates/retrieves Keygen licenses. A post-checkout success page displays the license key.

**Tech Stack:** Astro 6, React 19, styled-components, Cloudflare Pages Functions, Stripe REST API, Keygen.sh REST API

**Spec:** `docs/superpowers/specs/2026-04-29-stripe-keygen-integration-design.md`

---

## File Structure

### Files to Delete

| File | Reason |
|------|--------|
| `src/components/BoothCta.tsx` | BOOTH CTA section, replaced by Stripe link in Pricing |

### Files to Modify

| File | Responsibility |
|------|---------------|
| `src/data/content.ts` | Remove `boothCta` export, update hero/pricing URLs |
| `src/components/App.tsx` | Remove BoothCta import and usage |
| `src/components/Hero.tsx` | No code changes needed (href updates via content.ts) |
| `src/components/Pricing.tsx` | Free plan opens DownloadModal, Pro plan links to Stripe |
| `src/components/shared/Button.tsx` | Support `onClick` prop (renders `<button>` instead of `<a>`) |
| `src/i18n/translations/en.ts` | Add new translations, remove unused BOOTH translations |

### Files to Create

| File | Responsibility |
|------|---------------|
| `src/components/DownloadModal.tsx` | Win/Mac OS selector modal, fetches GitHub Releases API |
| `src/pages/success.astro` | Astro page for post-checkout redirect |
| `src/components/Success.tsx` | Displays license key with copy button after Stripe payment |
| `functions/api/license.ts` | Cloudflare Pages Function: Stripe verification + Keygen license creation |

---

### Task 1: Remove BOOTH references and update Hero CTA

**Files:**
- Delete: `src/components/BoothCta.tsx`
- Modify: `src/components/App.tsx`
- Modify: `src/data/content.ts`
- Modify: `src/i18n/translations/en.ts`

- [ ] **Step 1: Delete BoothCta.tsx**

```bash
rm /Users/kikeda/Development/my-repos/beatmist-releases/src/components/BoothCta.tsx
```

- [ ] **Step 2: Remove BoothCta from App.tsx**

Replace the full content of `src/components/App.tsx` with:

```tsx
import { TranslationProvider } from "../i18n";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Highlights from "./Highlights";
import Pricing from "./Pricing";
import Footer from "./Footer";

export default function App() {
  return (
    <TranslationProvider>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </TranslationProvider>
  );
}
```

- [ ] **Step 3: Remove boothCta from content.ts and update Hero CTA**

In `src/data/content.ts`, remove the `boothCta` export block:

```typescript
// DELETE this entire block:
export const boothCta = {
  label: "ダウンロードページ(BOOTH)へ",
  href: "https://booth.pm/placeholder",
} as const;
```

In the same file, update the hero CTA href from `"https://booth.pm/placeholder"` to `"#pricing"`:

```typescript
export const hero = {
  headline: "BeatMist",
  cta: {
    label: "無料で試す",
    href: "#pricing",
  },
} as const;
```

- [ ] **Step 4: Update en.ts — remove BOOTH translation**

In `src/i18n/translations/en.ts`, remove the line:

```typescript
  "ダウンロードページ(BOOTH)へ": "Download on BOOTH",
```

- [ ] **Step 5: Verify and commit**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run build`
Expected: Build succeeds without errors.

```bash
git add -A && git commit -m "refactor: remove BOOTH references and update Hero CTA to pricing anchor"
```

---

### Task 2: Extend Button component to support onClick

**Files:**
- Modify: `src/components/shared/Button.tsx`

- [ ] **Step 1: Refactor Button to support both `<a>` and `<button>` rendering**

Replace the full content of `src/components/shared/Button.tsx` with:

```tsx
import styled, { css } from "styled-components";
import { colors } from "../../styles/theme";

interface ButtonStyleProps {
  $variant?: "primary" | "secondary";
  $size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `,
};

const buttonStyles = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
  text-decoration: none;

  ${({ $size = "md" }) => sizeStyles[$size]}

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? css`
          background-color: ${colors.accent};
          color: white;
          border: none;

          &:hover {
            background-color: ${colors.accentHover};
            transform: translateY(-1px);
          }
        `
      : css`
          background: transparent;
          color: ${colors.textPrimary};
          border: 1px solid ${colors.border};

          &:hover {
            border-color: ${colors.borderHover};
            background-color: rgba(255, 255, 255, 0.03);
          }
        `}
`;

const StyledLink = styled.a<ButtonStyleProps>`
  ${buttonStyles}
`;

const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}
`;

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
}: Props) {
  if (onClick) {
    return (
      <StyledButton type="button" onClick={onClick} $variant={variant} $size={size}>
        {children}
      </StyledButton>
    );
  }
  return (
    <StyledLink href={href} $variant={variant} $size={size}>
      {children}
    </StyledLink>
  );
}
```

Note: This refactors from non-transient props (`variant`, `size`) to transient props (`$variant`, `$size`) to prevent DOM attribute warnings.

- [ ] **Step 2: Update all Button consumers to use transient props**

Button consumers pass `variant` and `size` as component props (not styled-component props), so they are unaffected. The transient prefix is internal to the styled components. Verify by building:

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run build`
Expected: Build succeeds without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/Button.tsx && git commit -m "refactor: extend Button to support onClick with button element rendering"
```

---

### Task 3: Create DownloadModal component

**Files:**
- Create: `src/components/DownloadModal.tsx`

- [ ] **Step 1: Create DownloadModal.tsx**

Create `src/components/DownloadModal.tsx`:

```tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media } from "../styles/theme";
import { useTranslation } from "../i18n";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 1rem;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${colors.textMuted};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const Title = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.sm} {
    flex-direction: row;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  padding: 0.875rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  background: transparent;
  color: ${colors.textPrimary};
  border: 1px solid ${colors.border};

  &:hover {
    border-color: ${colors.borderHover};
    background-color: rgba(255, 255, 255, 0.03);
  }

  &[aria-disabled="true"] {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-align: center;
`;

const GITHUB_REPO = "kikeda1102/beatmist-releases";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface Props {
  onClose: () => void;
}

export default function DownloadModal({ onClose }: Props) {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<{
    mac: string | null;
    win: string | null;
  }>({ mac: null, win: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch releases");
        return res.json();
      })
      .then((data: { assets?: GitHubAsset[] }) => {
        const macAsset = data.assets?.find((a) => a.name.endsWith(".dmg"));
        const winAsset = data.assets?.find((a) => a.name.endsWith(".exe"));
        setAssets({
          mac: macAsset?.browser_download_url ?? null,
          win: winAsset?.browser_download_url ?? null,
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <Modal>
        <CloseButton onClick={onClose} aria-label="Close">
          ✕
        </CloseButton>
        <Title>{t("ダウンロード")}</Title>
        <Description>{t("お使いのOSを選択してください")}</Description>

        {loading && <StatusText>{t("読み込み中...")}</StatusText>}

        {error && (
          <StatusText>
            {t("ダウンロードリンクの取得に失敗しました。時間をおいて再度お試しください。")}
          </StatusText>
        )}

        {!loading && !error && (
          <ButtonGroup>
            <DownloadButton
              href={assets.mac ?? undefined}
              aria-disabled={!assets.mac}
            >
              macOS
            </DownloadButton>
            <DownloadButton
              href={assets.win ?? undefined}
              aria-disabled={!assets.win}
            >
              Windows
            </DownloadButton>
          </ButtonGroup>
        )}
      </Modal>
    </Backdrop>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DownloadModal.tsx && git commit -m "feat: add DownloadModal component for OS-specific GitHub Releases download"
```

---

### Task 4: Integrate DownloadModal into Pricing and update Pro link

**Files:**
- Modify: `src/components/Pricing.tsx`
- Modify: `src/data/content.ts`
- Modify: `src/i18n/translations/en.ts`

- [ ] **Step 1: Update content.ts — pricing tier URLs**

In `src/data/content.ts`, update the `pricingTiers` array:

Change the Free tier CTA:
```typescript
    cta: { label: "無料ダウンロード", href: "https://booth.pm/placeholder" },
```
to:
```typescript
    cta: { label: "無料ダウンロード", href: "" },
```

Change the Pro tier CTA:
```typescript
    cta: { label: "購入する", href: "https://booth.pm/placeholder" },
```
to:
```typescript
    cta: { label: "購入する", href: "https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK" },
```

- [ ] **Step 2: Update Pricing.tsx — Free opens modal, Pro links to Stripe**

Replace the full content of `src/components/Pricing.tsx` with:

```tsx
import { useState } from "react";
import styled, { css } from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { pricingTiers } from "../data/content";
import { useTranslation } from "../i18n";
import Badge from "./shared/Badge";
import Button from "./shared/Button";
import DownloadModal from "./DownloadModal";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${colors.textPrimary};

  ${media.md} {
    font-size: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div<{ $recommended: boolean }>`
  background-color: ${colors.bgCard};
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ $recommended }) =>
    $recommended
      ? css`
          border: 2px solid ${colors.accent};
        `
      : css`
          border: 1px solid ${colors.border};
        `}
`;

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const TierNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TierName = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const Price = styled.div`
  font-family: ${fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  line-height: 1.2;
`;

const OriginalPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${colors.textMuted};
  text-decoration: line-through;
  margin-right: 0.5rem;
`;

const DiscountBadge = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.accent};
  background: ${colors.accentSubtle};
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  vertical-align: middle;
`;

const PriceNote = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.textSecondary};
  margin-left: 0.5rem;
`;

const TierDescription = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin-top: 0.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.textSecondary};

  &::before {
    content: "\\2713";
    color: ${colors.success};
    font-weight: 700;
    flex-shrink: 0;
  }
`;

export default function Pricing() {
  const { t } = useTranslation();
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <Section id="pricing">
      <Container>
        <SectionTitle>{t("料金プラン")}</SectionTitle>
        <Grid>
          {pricingTiers.map((tier) => (
            <Card key={tier.name} $recommended={tier.recommended}>
              <CardHeader>
                <TierNameRow>
                  <TierName>{tier.name}</TierName>
                  {tier.recommended && (
                    <Badge text={t("おすすめ")} variant="recommended" />
                  )}
                </TierNameRow>
                <Price>
                  {tier.originalPrice && (
                    <OriginalPrice>{tier.originalPrice}</OriginalPrice>
                  )}
                  {tier.price}
                  {tier.priceNote && <PriceNote>{t(tier.priceNote)}</PriceNote>}
                </Price>
                {tier.originalPrice && (
                  <DiscountBadge>{t("ベータ版期間中は 20% OFF")}</DiscountBadge>
                )}
                <TierDescription>{t(tier.description)}</TierDescription>
              </CardHeader>
              <FeatureList>
                {tier.features.map((feature) => (
                  <FeatureItem key={feature}>{t(feature)}</FeatureItem>
                ))}
              </FeatureList>
              {tier.name === "Free" ? (
                <Button
                  onClick={() => setShowDownloadModal(true)}
                  variant="secondary"
                >
                  {t(tier.cta.label)}
                </Button>
              ) : (
                <Button
                  href={tier.cta.href}
                  variant="primary"
                >
                  {t(tier.cta.label)}
                </Button>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
      {showDownloadModal && (
        <DownloadModal onClose={() => setShowDownloadModal(false)} />
      )}
    </Section>
  );
}
```

- [ ] **Step 3: Update en.ts — add DownloadModal translations, remove unused**

In `src/i18n/translations/en.ts`, add the following entries:

```typescript
  ダウンロード: "Download",
  "お使いのOSを選択してください": "Select your operating system",
  "読み込み中...": "Loading...",
  "ダウンロードリンクの取得に失敗しました。時間をおいて再度お試しください。":
    "Failed to fetch download links. Please try again later.",
```

- [ ] **Step 4: Verify**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run build`
Expected: Build succeeds.

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run check:i18n`
Expected: All translation checks passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Pricing.tsx src/data/content.ts src/i18n/translations/en.ts && git commit -m "feat: integrate DownloadModal for Free plan and Stripe Checkout link for Pro plan"
```

---

### Task 5: Create Success page

**Files:**
- Create: `src/pages/success.astro`
- Create: `src/components/Success.tsx`
- Modify: `src/i18n/translations/en.ts`

- [ ] **Step 1: Create success.astro**

Create `src/pages/success.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
import Success from "../components/Success";
import { site } from "../data/content";
---

<Layout title={`${site.name} - Purchase Complete`} description="Your BeatMist Pro license key">
  <Success client:only="react" />
</Layout>
```

- [ ] **Step 2: Create Success.tsx**

Create `src/components/Success.tsx`:

```tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media } from "../styles/theme";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background-color: ${colors.bgPrimary};
`;

const Card = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 520px;
  width: 100%;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;

  ${media.md} {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
`;

const KeyLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  margin-bottom: 0.5rem;
  text-align: left;
`;

const KeyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const KeyText = styled.code`
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  letter-spacing: 0.05em;
  word-break: break-all;
  text-align: left;
`;

const CopyButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: 0.375rem;
  color: ${colors.textSecondary};
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.borderHover};
    color: ${colors.textPrimary};
  }
`;

const Warning = styled.p`
  font-size: 0.8125rem;
  color: ${colors.accent};
  margin-bottom: 2rem;
  text-align: left;
`;

const Steps = styled.ol`
  text-align: left;
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HomeLink = styled.a`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const StatusText = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  padding: 2rem 0;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  color: ${colors.accent};
  padding: 2rem 0;
`;

const ErrorDetail = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  margin-top: 1rem;
`;

interface LicenseResponse {
  licenseKey?: string;
  error?: string;
}

export default function Success() {
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setError("Invalid session");
      setLoading(false);
      return;
    }

    fetch(`/api/license?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json() as Promise<LicenseResponse>)
      .then((data) => {
        if (data.licenseKey) {
          setLicenseKey(data.licenseKey);
        } else {
          setError(data.error ?? "Failed to retrieve license key");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error");
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Page>
      <Card>
        <Logo>BeatMist</Logo>

        {loading && <StatusText>Loading...</StatusText>}

        {error && (
          <>
            <ErrorText>An error occurred</ErrorText>
            <ErrorDetail>{error}</ErrorDetail>
            <HomeLink href="/" style={{ display: "block", marginTop: "2rem" }}>
              &larr; Back to Home
            </HomeLink>
          </>
        )}

        {licenseKey && (
          <>
            <Title>Purchase Complete!</Title>
            <Subtitle>Thank you for purchasing BeatMist Pro.</Subtitle>

            <KeyLabel>Your License Key</KeyLabel>
            <KeyBox>
              <KeyText>{licenseKey}</KeyText>
              <CopyButton onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </CopyButton>
            </KeyBox>
            <Warning>
              Please save this key. You will need it to activate BeatMist Pro.
            </Warning>

            <Steps>
              <li>Download and install BeatMist</li>
              <li>Open Settings &rarr; License</li>
              <li>Paste your key and click Activate</li>
            </Steps>

            <HomeLink href="/">&larr; Back to Home</HomeLink>
          </>
        )}
      </Card>
    </Page>
  );
}
```

Note: The Success page uses English text directly (no `t()` wrapper) because Stripe Checkout is English by default and the success page is language-neutral. This also avoids adding translation entries for one-time page content.

- [ ] **Step 3: Verify**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run build`
Expected: Build succeeds. A `success/index.html` page is generated in the output.

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run check:i18n`
Expected: All translation checks passed.

- [ ] **Step 4: Commit**

```bash
git add src/pages/success.astro src/components/Success.tsx && git commit -m "feat: add post-checkout success page displaying license key"
```

---

### Task 6: Create Cloudflare Pages Function

**Files:**
- Create: `functions/api/license.ts`

- [ ] **Step 1: Create the license API function**

Create `functions/api/license.ts`:

```typescript
interface Env {
  STRIPE_SECRET_KEY: string;
  KEYGEN_ACCOUNT_ID: string;
  KEYGEN_POLICY_ID: string;
  KEYGEN_API_TOKEN: string;
}

interface StripeSession {
  payment_status: string;
  customer_details?: {
    email?: string;
  };
}

interface KeygenLicense {
  attributes: {
    key: string;
  };
}

interface KeygenListResponse {
  data?: KeygenLicense[];
}

interface KeygenCreateResponse {
  data?: KeygenLicense;
  errors?: Array<{ title: string; detail: string }>;
}

export async function onRequestGet({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json(
      { error: "session_id is required" },
      { status: 400 }
    );
  }

  const stripeRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      },
    }
  );

  if (!stripeRes.ok) {
    return Response.json(
      { error: "Invalid session" },
      { status: 400 }
    );
  }

  const session: StripeSession = await stripeRes.json();

  if (session.payment_status !== "paid") {
    return Response.json(
      { error: "Invalid or unpaid session" },
      { status: 400 }
    );
  }

  const email = session.customer_details?.email;
  if (!email) {
    return Response.json(
      { error: "No customer email found" },
      { status: 400 }
    );
  }

  const keygenHeaders = {
    Authorization: `Bearer ${env.KEYGEN_API_TOKEN}`,
    Accept: "application/vnd.api+json",
  };

  const searchRes = await fetch(
    `https://api.keygen.sh/v1/accounts/${env.KEYGEN_ACCOUNT_ID}/licenses?metadata[stripeSessionId]=${encodeURIComponent(sessionId)}`,
    { headers: keygenHeaders }
  );
  const searchData: KeygenListResponse = await searchRes.json();

  if (searchData.data && searchData.data.length > 0) {
    return Response.json({
      licenseKey: searchData.data[0].attributes.key,
    });
  }

  const createRes = await fetch(
    `https://api.keygen.sh/v1/accounts/${env.KEYGEN_ACCOUNT_ID}/licenses`,
    {
      method: "POST",
      headers: {
        ...keygenHeaders,
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "licenses",
          attributes: {
            metadata: {
              email,
              stripeSessionId: sessionId,
            },
          },
          relationships: {
            policy: {
              data: {
                type: "policies",
                id: env.KEYGEN_POLICY_ID,
              },
            },
          },
        },
      }),
    }
  );

  const createData: KeygenCreateResponse = await createRes.json();

  if (!createData.data?.attributes?.key) {
    const detail = createData.errors?.[0]?.detail ?? "Unknown error";
    return Response.json(
      { error: `Failed to create license: ${detail}` },
      { status: 500 }
    );
  }

  return Response.json({
    licenseKey: createData.data.attributes.key,
  });
}
```

- [ ] **Step 2: Verify the function file compiles**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && npx tsc --noEmit functions/api/license.ts --esModuleInterop --moduleResolution node --target es2020 --module es2020 2>&1 || echo "TypeScript check note: Cloudflare Functions use esbuild at deploy time, minor type issues are OK"`

Note: Cloudflare Pages Functions are compiled by Cloudflare's esbuild pipeline at deploy time. The function uses standard Web APIs (`fetch`, `Response`, `URL`) which are available in the Workers runtime.

- [ ] **Step 3: Commit**

```bash
git add functions/api/license.ts && git commit -m "feat: add Cloudflare Pages Function for Stripe + Keygen license creation"
```

---

### Task 7: End-to-end verification

- [ ] **Step 1: Run full build**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run build`
Expected: Build succeeds without errors.

- [ ] **Step 2: Run i18n check**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run check:i18n`
Expected: All translation checks passed.

- [ ] **Step 3: Start dev server and manually verify**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && pnpm run dev`

Verify in browser:
1. Hero "Try for Free" button scrolls to #pricing section
2. Free plan "Download" button opens the DownloadModal with Mac/Windows options
3. Pro plan "Buy" button links to the Stripe Checkout URL
4. BoothCta section is gone
5. `/success` page renders (shows error state without valid session_id, which is expected)
6. Language switcher (EN/JP) works for new strings

- [ ] **Step 4: Verify project structure is clean**

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && ls src/components/BoothCta.tsx 2>&1`
Expected: "No such file or directory" — BoothCta.tsx is deleted.

Run: `cd /Users/kikeda/Development/my-repos/beatmist-releases && grep -r "booth" src/ --include="*.ts" --include="*.tsx" -il`
Expected: No results — all BOOTH references are removed.

---

## Post-Implementation: Dashboard Configuration (Manual)

After deploying the code, configure the following in external dashboards:

### Stripe Dashboard
1. Create product: "BeatMist Pro", JPY 3,980, one-time payment
2. Create a Payment Link for the product
3. Set success URL: `https://<your-domain>/success?session_id={CHECKOUT_SESSION_ID}`
4. Set cancel URL: `https://<your-domain>/#pricing`
5. Replace `REPLACE_WITH_YOUR_PAYMENT_LINK` in `src/data/content.ts` with the actual Payment Link URL

### Keygen Dashboard
1. Generate an admin API token
2. Note the Policy ID for the Pro plan (3-device limit)

### Cloudflare Pages Dashboard
Set environment variables:
- `STRIPE_SECRET_KEY` — Stripe secret key
- `KEYGEN_ACCOUNT_ID` — Keygen account ID
- `KEYGEN_POLICY_ID` — Keygen policy ID for Pro plan
- `KEYGEN_API_TOKEN` — Keygen admin API token
