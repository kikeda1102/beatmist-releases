export const site = {
  name: "BeatMist",
  tagline: "霧のように直感的。\nDJのための本格的な音源管理ツール",
  description:
    "DJ / Composerのための音源管理ツール。大量の楽曲ファイルのメタデータ把握、波形プレビュー、試聴、フォーマット一括変換を、霧のように直感的に。",
  url: "https://beatmist.com",
  ogImage: "/images/og-image.png",
} as const;

export const navigation = [
  { label: "機能", href: "/#features" },
  { label: "ダウンロード", href: "/#download" },
  { label: "リリースノート", href: "/#release-notes" },
  { label: "料金", href: "/#pricing" },
  { label: "お問い合わせ", href: "/#contact" },
  { label: "ドキュメント", href: "/docs" },
] as const;

export const hero = {
  headline: "BeatMist",
  cta: {
    label: "無料で試す",
    href: "/#download",
  },
} as const;

interface Feature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly badge?: string;
  readonly href?: string;
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
    href: "/docs",
  },
  {
    icon: "\u{1F4C2}",
    title: "Rekordboxインポート状況の確認",
    description:
      "Rekordboxのファイルパスを自動で取得し、各トラックがインポート済みかどうかを一覧で表示。",
    badge: "NEW",
  },
];

interface Highlight {
  readonly title: string;
  readonly description: string;
  readonly href?: string;
}

export const highlights: readonly Highlight[] = [
  {
    title: "CDJ機種を選ぶだけで自動変換",
    description:
      "対象のCDJ機種を設定しておくだけで、非対応フォーマットを自動的に検出し、最適な形式へ変換します。",
    href: "/docs",
  },
  {
    title: "Windows / Mac 両対応",
    description: "Windows / Mac 両対応です (macOSはApple Siliconのみ対応)。",
  },
  {
    title: "1ライセンスで3台まで",
    description: "1つのご購入で、最大3台のPCにアクティベートできます。",
  },
];

export const download = {
  title: "ダウンロード（無料）",
  description: "お使いのOSを選択してください",
  githubRepo: "kikeda1102/beatmist-releases",
} as const;

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
    cta: { label: "無料で始める", href: "/#download" },
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
    cta: {
      label: "ライセンスを購入",
      href: "https://buy.stripe.com/7sY00c0qvd7hf7B10zdMI00",
    },
  },
];

export const contact = {
  title: "お問い合わせ",
  description:
    "ご質問やご要望がありましたら、下記フォームよりお気軽にお問い合わせください。",
  fields: {
    name: "お名前",
    email: "メールアドレス",
    message: "お問い合わせ内容",
    messageHint:
      "不具合のご報告の際は、ご利用のOS（Windows / macOS）とバージョン、BeatMistのバージョンもあわせてご記載ください。エラーの様子がわかるスクリーンショットや動画を共有いただけると、よりスムーズにサポートさせていただくことができます。",
  },
  required: "必須",
  submit: "送信する",
  submitting: "送信中...",
  success:
    "お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。\nもし届かない場合は、迷惑メールフォルダをご確認ください。",
  error:
    "送信に失敗しました。お手数ですが、しばらく経ってからもう一度お試しください。",
  rateLimit:
    "送信回数の上限に達しました。しばらく経ってからもう一度お試しください。",
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
    { label: "機能", href: "/#features" },
    { label: "ダウンロード", href: "/#download" },
    { label: "リリースノート", href: "/#release-notes" },
    { label: "料金プラン", href: "/#pricing" },
  ],
  support: [
    { label: "お問い合わせ", href: "/#contact" },
    { label: "変換仕様について", href: "/docs" },
    { label: "特定商取引法に基づく表記", href: "/tokushoho" },
  ],
  creator: [{ label: "X (Twitter)", href: "https://x.com/purocura" }],
  communityNote: "Discordコミュニティへの招待リンクをソフト内に掲載しています",
  copyright: "2026 BeatMist",
} as const;

export interface ConversionExample {
  readonly title: string;
  readonly input: string;
  readonly model: string;
  readonly targetFormat: string;
  readonly output: string;
  readonly reason: string;
}

export const conversionExamples: readonly ConversionExample[] = [
  {
    title: "WAV 88.2kHz → CDJ-2000NXS2 (WAV)",
    input: "WAV 88.2kHz / 24bit",
    model: "CDJ-2000NXS2",
    targetFormat: "WAV",
    output: "WAV 48kHz / 24bit",
    reason:
      "CDJ-2000NXS2のWAVは88.2kHz非対応。許容範囲内の最大値である48kHzにダウンサンプリング。ビット深度は24bitのまま維持。",
  },
  {
    title: "WAV 88.2kHz → CDJ-2000NXS2 (AIFF)",
    input: "WAV 88.2kHz / 24bit",
    model: "CDJ-2000NXS2",
    targetFormat: "AIFF",
    output: "AIFF 88.2kHz / 24bit",
    reason:
      "CDJ-2000NXS2のAIFFは88.2kHz対応。サンプルレート・ビット深度を維持したままフォーマットのみ変換。",
  },
  {
    title: "FLAC 96kHz/32bit → CDJ-900 (AIFF)",
    input: "FLAC 96kHz / 32bit",
    model: "CDJ-900",
    targetFormat: "AIFF",
    output: "AIFF 48kHz / 24bit",
    reason:
      "CDJ-900のサンプルレート上限は48kHz、ビット深度上限は24bit。両方の値を許容範囲内の最大値にダウン。",
  },
  {
    title: "MP3 44.1kHz → CDJ-3000X",
    input: "MP3 44.1kHz",
    model: "CDJ-3000X",
    targetFormat: "-",
    output: "変換不要",
    reason: "CDJ-3000XはMP3 44.1kHzに対応しているため、変換は行われない。",
  },
  {
    title: "FLAC 88.2kHz → CDJ-2000NXS2 (AIFF)",
    input: "FLAC 88.2kHz / 24bit",
    model: "CDJ-2000NXS2",
    targetFormat: "AIFF",
    output: "AIFF 88.2kHz / 24bit",
    reason:
      "FLACはCDJ-2000NXS2で対応しているが、変換先にAIFFを指定。AIFFは88.2kHz対応のため、スペックを維持したままフォーマットのみ変換。",
  },
];
