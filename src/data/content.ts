export const site = {
  name: "BeatMist",
  tagline: "音源管理を、もっとスマートに。",
  description:
    "BeatMistは、音楽制作者のための音源管理ソフトウェアです。散らばった音源ファイルを一元管理し、制作ワークフローを効率化します。",
  url: "https://kikeda1102.github.io/beatmist-releases",
  ogImage: "/images/og-image.png",
} as const;

export const navigation = [
  { label: "機能", href: "#features" },
  { label: "料金", href: "#pricing" },
  { label: "ダウンロード", href: "#download" },
] as const;

export const hero = {
  headline: "BeatMist",
  subheadline: "音源管理を、もっとスマートに。",
  description:
    "散らばった音源ファイルを一元管理。タグ付け、検索、プレビューで制作ワークフローを効率化する音源管理ソフトウェア。",
  primaryCta: {
    label: "BOOTHで購入",
    href: "https://booth.pm/placeholder",
  },
  secondaryCta: { label: "無料で試す", href: "#download" },
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
    title: "一元管理",
    description:
      "フォルダ構造に依存しない柔軟な音源管理。複数の保存先を横断して一覧表示。",
  },
  {
    icon: "\u{1F3F7}️",
    title: "タグ管理",
    description:
      "自由なタグ付けで音源を整理。ジャンル、楽器、BPMなど自分だけの分類体系を構築。",
  },
  {
    icon: "\u{1F50D}",
    title: "高速検索",
    description:
      "インクリメンタル検索で目的の音源に素早くアクセス。複数条件の組み合わせにも対応。",
    badge: "NEW",
  },
  {
    icon: "\u{1F3A7}",
    title: "プレビュー再生",
    description:
      "DAWを起動せずにブラウズ。波形表示とループ再生で音源を素早く確認。",
  },
  {
    icon: "\u{1F517}",
    title: "DAW連携",
    description:
      "お気に入りのDAWへドラッグ&ドロップで即座にインポート。主要DAWに対応。",
  },
  {
    icon: "☁️",
    title: "バックアップ",
    description:
      "音源ライブラリの設定をエクスポート。環境移行やバックアップも簡単。",
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
    description: "まずは試してみたい方に",
    features: [
      "音源ファイル100件まで管理",
      "基本的なタグ付け",
      "検索機能",
      "プレビュー再生",
    ],
    recommended: false,
    cta: { label: "無料ダウンロード", href: "#download" },
  },
  {
    name: "Pro",
    price: "¥X,XXX",
    priceNote: "買い切り",
    description: "本格的な音楽制作者に",
    features: [
      "音源ファイル無制限",
      "高度なタグ管理",
      "複数フォルダ管理",
      "DAW連携",
      "バッチタグ編集",
      "エクスポート / インポート",
      "優先サポート",
      "今後の全アップデート",
    ],
    recommended: true,
    cta: { label: "BOOTHで購入", href: "https://booth.pm/placeholder" },
  },
];

export const download = {
  heading: "ダウンロード",
  description: "お使いのプラットフォームに合わせてダウンロードしてください。",
  version: "v0.1.0",
  platforms: [
    {
      name: "Windows",
      icon: "\u{1FA9F}",
      href: "#",
      note: "Windows 10以降",
    },
    { name: "macOS", icon: "\u{1F34E}", href: "#", note: "macOS 12以降" },
  ],
} as const;

export const footer = {
  product: [
    { label: "機能紹介", href: "#features" },
    { label: "料金プラン", href: "#pricing" },
    { label: "ダウンロード", href: "#download" },
  ],
  community: [
    { label: "Discord", href: "#" },
    { label: "X (Twitter)", href: "#" },
  ],
  legal: [
    { label: "利用規約", href: "#" },
    { label: "プライバシーポリシー", href: "#" },
  ],
  copyright: "2026 BeatMist",
} as const;
