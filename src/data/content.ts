export const site = {
  name: "BeatMist",
  tagline: "Sound source management, smarter.",
  description:
    "BeatMist is a sound source management software for music creators. Centralize scattered audio files and streamline your production workflow.",
  url: "https://kikeda1102.github.io/beatmist-releases",
  ogImage: "/images/og-image.png",
} as const;

export const navigation = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Download", href: "#download" },
] as const;

export const hero = {
  headline: "BeatMist",
  subheadline: "Sound source management, smarter.",
  description:
    "Centralize scattered audio files. Tag, search, and preview to streamline your music production workflow.",
  primaryCta: { label: "Purchase on BOOTH", href: "https://booth.pm/placeholder" },
  secondaryCta: { label: "Try for Free", href: "#download" },
} as const;

interface Feature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly badge?: string;
}

export const features: readonly Feature[] = [
  {
    icon: "\u{1F4C1}",
    title: "Centralized Management",
    description:
      "Flexible sound source management independent of folder structure. Browse across multiple storage locations at a glance.",
  },
  {
    icon: "\u{1F3F7}️",
    title: "Tag Management",
    description:
      "Organize sound sources with free tagging. Build your own classification system by genre, instrument, BPM, and more.",
  },
  {
    icon: "\u{1F50D}",
    title: "Fast Search",
    description:
      "Quickly access target sound sources with incremental search. Supports combining multiple search conditions.",
    badge: "NEW",
  },
  {
    icon: "\u{1F3A7}",
    title: "Preview Playback",
    description:
      "Browse without launching your DAW. Quickly check sound sources with waveform display and loop playback.",
  },
  {
    icon: "\u{1F517}",
    title: "DAW Integration",
    description:
      "Instantly import to your favorite DAW via drag & drop. Compatible with major DAWs.",
  },
  {
    icon: "☁️",
    title: "Backup",
    description:
      "Export your sound library settings. Easy environment migration and backup.",
  },
];

interface PricingTier {
  readonly name: string;
  readonly price: string;
  readonly priceNote: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly recommended: boolean;
  readonly cta: { readonly label: string; readonly href: string };
}

export const pricingTiers: readonly PricingTier[] = [
  {
    name: "Free",
    price: "¥0",
    priceNote: "",
    description: "For those who want to try it first",
    features: [
      "Manage up to 100 sound files",
      "Basic tagging",
      "Search",
      "Preview playback",
    ],
    recommended: false,
    cta: { label: "Free Download", href: "#download" },
  },
  {
    name: "Pro",
    price: "¥X,XXX",
    priceNote: "One-time purchase",
    description: "For serious music creators",
    features: [
      "Unlimited sound files",
      "Advanced tag management",
      "Multi-folder management",
      "DAW integration",
      "Batch tag editing",
      "Export / Import",
      "Priority support",
      "All future updates",
    ],
    recommended: true,
    cta: { label: "Purchase on BOOTH", href: "https://booth.pm/placeholder" },
  },
];

export const download = {
  heading: "Download",
  description: "Download for your platform.",
  version: "v0.1.0",
  platforms: [
    { name: "Windows", icon: "\u{1FA9F}", href: "#", note: "Windows 10+" },
    { name: "macOS", icon: "\u{1F34E}", href: "#", note: "macOS 12+" },
  ],
} as const;

export const footer = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "#download" },
  ],
  community: [
    { label: "Discord", href: "#" },
    { label: "X (Twitter)", href: "#" },
  ],
  legal: [
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  copyright: "2026 BeatMist",
} as const;
