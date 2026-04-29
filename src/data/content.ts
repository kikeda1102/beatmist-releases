export const site = {
  name: "BeatMist",
  tagline: "霧のように直感的。\nDJのための本格的な音源管理ツール",
  description:
    "DJ / Composerのための音源管理ツール。大量の楽曲ファイルのメタデータ把握、波形プレビュー、試聴、フォーマット一括変換を、霧のように直感的に。",
  url: "https://kikeda1102.github.io/beatmist-releases",
  ogImage: "/images/og-image.png",
} as const;

export const navigation = [
  { label: "機能", href: "#features" },
  { label: "料金", href: "#pricing" },
  { label: "お問い合わせ", href: "#contact" },
] as const;

export const hero = {
  headline: "BeatMist",
  cta: {
    label: "無料で試す",
    href: "#pricing",
  },
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
    title: "楽曲ライブラリ管理",
    description:
      "フォルダを指定するだけでWAV / MP3 / AIFF / FLACを自動検出。Title、Artist、BPM、Keyなどのメタデータを一覧表示。",
  },
  {
    icon: "\u{1F3F7}️",
    title: "Rekordbox互換メタデータ編集",
    description:
      "ID3タグをアプリ上で編集し、ファイルに書き戻し。Rekordboxに再インポートするだけで反映。",
  },
  {
    icon: "\u{1F30A}",
    title: "波形プレビュー",
    description:
      "楽曲を選択すると波形を即座に描画。視覚的に楽曲の構成を把握できる。",
  },
  {
    icon: "\u{1F3A7}",
    title: "試聴",
    description:
      "アプリ内で楽曲を再生。シークバーで任意のポイントへジャンプし、素早く確認。",
  },
  {
    icon: "\u{1F504}",
    title: "CDJ機種別フォーマット一括変換",
    description:
      "対象のCDJを選ぶだけで、非対応フォーマットを自動検出し最適な形式へ一括変換。",
    badge: "NEW",
  },
];

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

interface PricingTier {
  readonly name: string;
  readonly price: string;
  readonly originalPrice?: string;
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
      "楽曲ファイル100曲まで一括変換",
      "CDJ機種別フォーマット一括変換",
      "楽曲メタデータの閲覧、編集",
      "Rekordbox互換",
      "波形プレビュー、試聴",
    ],
    recommended: false,
    cta: { label: "無料ダウンロード", href: "" },
  },
  {
    name: "Pro",
    price: "¥3,980",
    originalPrice: "¥4,980",
    priceNote: "買い切り",
    description: "Freeプランの全機能に加え、以下の機能が利用可能に",
    features: [
      "ファイル数無制限での一括変換",
      "優先サポート",
      "無料での一生涯アップデート",
    ],
    recommended: true,
    cta: { label: "購入する", href: "https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK" },
  },
];

export const contact = {
  title: "お問い合わせ",
  description: "ご質問やご要望がありましたら、下記フォームよりお気軽にお問い合わせください。",
  fields: {
    name: "お名前",
    email: "メールアドレス",
    message: "お問い合わせ内容",
  },
  required: "必須",
  submit: "送信する",
  submitting: "送信中...",
  success: "お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。\nもし届かない場合は、迷惑メールフォルダをご確認ください。",
  error: "送信に失敗しました。お手数ですが、しばらく経ってからもう一度お試しください。",
  rateLimit: "送信回数の上限に達しました。しばらく経ってからもう一度お試しください。",
  validationError: "入力内容に誤りがあります。",
  validation: {
    nameRequired: "お名前を入力してください",
    nameMax: "お名前は100文字以内で入力してください",
    nameInvalid: "不正な文字が含まれています",
    emailRequired: "メールアドレスを入力してください",
    emailInvalid: "有効なメールアドレスを入力してください",
    messageRequired: "お問い合わせ内容を入力してください",
    messageMax: "お問い合わせ内容は2000文字以内で入力してください",
  },
} as const;

export const footer = {
  product: [
    { label: "機能", href: "#features" },
    { label: "料金プラン", href: "#pricing" },
    { label: "お問い合わせ", href: "#contact" },
  ],
  legal: [
    { label: "特定商取引法に基づく表記", href: "/tokushoho" },
  ],
  community: [
    { label: "X (Twitter)", href: "https://x.com/purocura" },
  ],
  copyright: "2026 BeatMist",
} as const;
