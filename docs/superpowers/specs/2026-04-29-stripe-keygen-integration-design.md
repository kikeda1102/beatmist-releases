# Stripe + Keygen.sh Integration Design

## Context

BeatMist currently lists BOOTH.pm as the sales channel, but BOOTH lacks webhooks/API for automating license key issuance via Keygen.sh. Switching to Stripe + Keygen enables a fully automated purchase → license delivery flow. The BeatMist desktop app already has complete Keygen integration (key input UI, API validation, machine activation, offline caching), so no changes to the app codebase are needed.

## Goals

- Replace all BOOTH references with Stripe Checkout (Pro purchase) and GitHub Releases (Free download)
- Automate license key delivery via a post-checkout success page
- Provide a direct download experience (Win/Mac selector, no page navigation to GitHub)

## Architecture

### Overall Flow

```
Landing Page
├─ Free "Download" → OS selector modal → GitHub Releases direct download
└─ Pro "Buy"       → Stripe Checkout   → Payment complete
                                           ↓
                              /success?session_id=cs_xxx
                                           ↓
                              Cloudflare Pages Function
                              ├─ Stripe API: verify session (payment_status === 'paid')
                              ├─ Keygen API: find or create license (idempotent by email)
                              └─ Return license key → display on page with copy button

BeatMist App (no changes)
  Settings → paste key → Keygen validation → Pro activation
```

### Idempotency

When creating a license, the Cloudflare Function first searches for an existing Keygen license by the Stripe customer's email. If found, it returns the existing key. If not, it creates a new license. This prevents duplicate licenses on page reload.

## Landing Page Changes

### Files to Modify

| File | Change |
|------|--------|
| `src/data/content.ts` | Replace BOOTH URLs with Stripe Checkout URL and GitHub Releases URL. Remove `boothCta` export |
| `src/components/App.tsx` | Remove `BoothCta` import and usage |
| `src/components/Hero.tsx` | Change CTA href to `#pricing` anchor |
| `src/components/Pricing.tsx` | Free button opens DownloadModal; Pro button links to Stripe Checkout |
| `src/i18n/translations/en.ts` | Add English translations for new strings |

### Files to Delete

| File | Reason |
|------|--------|
| `src/components/BoothCta.tsx` | Replaced by Stripe Checkout link in Pricing |

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/DownloadModal.tsx` | Win/Mac OS selector modal for Free download |
| `src/pages/success.astro` | Astro page for post-checkout redirect |
| `src/components/Success.tsx` | React component displaying the license key |
| `functions/api/license.ts` | Cloudflare Pages Function for Stripe + Keygen |

## Component Specifications

### DownloadModal

Triggered when clicking the Free plan's download button.

1. Fetch `https://api.github.com/repos/kikeda1102/beatmist-releases/releases/latest`
2. Parse assets to find `.dmg` (Mac) and `.exe` (Windows) files
3. Display two download buttons (Mac / Windows)
4. Clicking a button navigates to the asset's `browser_download_url` for direct download
5. Modal closes on backdrop click or close button

### Success Page (`/success`)

1. Read `session_id` from URL query parameters
2. Call `GET /api/license?session_id={session_id}`
3. States:
   - **Loading**: spinner with message
   - **Success**: display license key with copy-to-clipboard button and warning to save the key
   - **Error**: show error message with support contact info
4. Style consistent with the landing page theme (dark, accent color)

### Cloudflare Pages Function (`functions/api/license.ts`)

**Endpoint**: `GET /api/license?session_id={CHECKOUT_SESSION_ID}`

**Processing flow**:

1. Validate `session_id` parameter exists
2. Call Stripe API: `checkout.sessions.retrieve(session_id)` with `expand: ['customer']`
   - Verify `payment_status === 'paid'`
   - Extract customer email
3. Call Keygen API: search licenses by customer email metadata
   - If license exists → return its key
   - If not → create new license with email metadata → return the key
4. Response: `{ licenseKey: "BM-PRO-XXXX-XXXX-XXXX" }`

**Error responses**:

| Condition | HTTP Status | Response |
|-----------|-------------|----------|
| Missing session_id | 400 | `{ error: "session_id is required" }` |
| Invalid/unpaid session | 400 | `{ error: "Invalid or unpaid session" }` |
| Keygen API failure | 500 | `{ error: "Failed to create license" }` |

**Environment variables** (set in Cloudflare Pages dashboard):

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Stripe API access |
| `KEYGEN_ACCOUNT_ID` | Keygen account identifier |
| `KEYGEN_PRODUCT_ID` | Keygen product identifier |
| `KEYGEN_POLICY_ID` | License policy (Pro, 3-device limit) |
| `KEYGEN_API_TOKEN` | Keygen admin API token |

**Security**:

- `session_id` is verified via Stripe API; invalid IDs cannot produce a `paid` status
- All secrets stored in Cloudflare environment variables (never exposed client-side)
- CORS restricted to same origin

## Dashboard Configuration (Manual)

### Stripe

1. Create product: "BeatMist Pro", one-time payment, JPY 3,980
2. Create Payment Link or Checkout Session URL for the product
3. Set success redirect URL: `https://<domain>/success?session_id={CHECKOUT_SESSION_ID}`

### Keygen

- Use existing Account ID, Product, and Policy (Pro, 3-device limit)
- Generate an admin API token for the Cloudflare Function

### Cloudflare Pages

- Set environment variables listed above in the Pages project settings

## What Does NOT Change

- **BeatMist desktop app**: license key input, Keygen API validation, machine activation, offline caching — all unchanged
- **GitHub Actions release workflow**: continues to build and publish to GitHub Releases as before
- **Keygen Policy/Product configuration**: existing setup is reused

## Verification

1. **Free download flow**: Click Free plan button → modal shows Mac/Win → click downloads the correct installer from GitHub Releases
2. **Pro purchase flow**: Click Pro plan button → Stripe Checkout → complete test payment → redirected to success page → license key displayed → copy button works
3. **Idempotency**: Refresh success page → same license key shown (no duplicate created)
4. **Error handling**: Visit `/success` without valid `session_id` → error message shown
5. **License activation**: Paste the displayed key into BeatMist app → Pro plan activated
6. **i18n**: Switch to English → all new strings properly translated
