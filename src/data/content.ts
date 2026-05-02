import { displayRoadmap } from "../config";

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
  ...(displayRoadmap ? [{ label: "開発予定", href: "/roadmap" }] : []),
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
  readonly image?: string;
  readonly imageAlt?: string;
}

export const features: readonly Feature[] = [
  {
    icon: "\u{1F504}",
    title: "CDJ機種別フォーマット一括変換",
    description:
      "6機種のCDJに対応。非対応フォーマットを自動検出し、サンプルレート・ビット深度を最適値にスマートダウンスケーリング。自動モードとマニュアルモードを切り替えて、変換を完全にコントロールできます。",
    href: "/docs",
    image: "/images/showcase/problem-badge.png",
    imageAlt:
      "CDJ-3000で非対応のビット深度・サンプルレートに赤いバッジが表示されている画面",
  },
  {
    icon: "\u{1F6E1}️",
    title: "自動バックアップ & ワンクリック復元",
    description:
      "変換時に元のファイルは自動的にバックアップされます。変換後でもワンクリックでいつでも元に戻せるので、安心して変換できます。",
    badge: "NEW",
    image: "/images/showcase/backup-revert.png",
    imageAlt: "変換済みファイルのワンクリック復元UI",
  },
  {
    icon: "\u{1F3F7}️",
    title: "Rekordbox互換メタデータ編集",
    description:
      "ID3タグ（Title、Artist、Key、Commentなど）をアプリ上で編集し、ファイルのタグを直接更新。Rekordboxに再インポートするだけで反映されます。",
    image: "/images/showcase/metadata-edit.png",
    imageAlt: "アプリ上でのメタデータ編集画面",
  },
  {
    icon: "\u{1F4C2}",
    title: "Rekordboxインポート状況の確認",
    description:
      "Rekordboxのファイルパスを自動で取得し、各トラックがインポート済みかどうかを一覧で表示。",
    badge: "NEW",
    image: "/images/showcase/rekordbox-status.png",
    imageAlt: "各トラックのRekordboxインポート状況の一覧表示",
  },
  {
    icon: "\u{1F4C1}",
    title: "楽曲ライブラリ管理",
    description:
      "複数フォルダからWAV / MP3 / AIFF / FLAC / M4Aを自動検出。Title、Artist、BPM、Keyなどのメタデータを一覧表示し、検索やソートで目的の楽曲にすばやくアクセスできます。",
    image: "/images/showcase/library.png",
    imageAlt: "楽曲ライブラリの一覧表示画面",
  },
  {
    icon: "\u{1F3B5}",
    title: "波形プレビュー & 試聴",
    description:
      "楽曲を選択すると波形を即座に描画。アプリ内でそのまま再生でき、シークバーで任意のポイントへジャンプ。視覚と聴覚で楽曲をすばやく確認できます。",
    image: "/images/showcase/waveform.png",
    imageAlt: "波形プレビューと再生コントロールの画面",
  },
];

interface Highlight {
  readonly title: string;
  readonly description: string;
  readonly href?: string;
  readonly image?: string;
  readonly imageAlt?: string;
}

export const highlights: readonly Highlight[] = [
  {
    title: "CDJ機種を選ぶだけで自動変換",
    description:
      "使用するCDJ機種を選ぶだけ。\n非対応フォーマットを自動で検出し、最適な形式に変換します。",
    href: "/docs",
    image: "/images/showcase/cdj-select.png",
    imageAlt: "CDJ機種選択と非対応フォーマットの自動検出画面",
  },
  {
    title: "Rekordboxとシームレスに連携",
    description:
      "各トラックのRekordboxインポート状況をひと目で確認できます。\nメタデータ編集もアプリ上で完結し、再インポートするだけで反映。",
    image: "/images/showcase/rekordbox-status.png",
    imageAlt: "各トラックのRekordboxインポート状況の一覧表示",
  },
  {
    title: "無料ですぐに始められる",
    description:
      "Freeプランで全機能をお試しいただけます。\nProプランは買い切りで、追加費用はかかりません。",
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
    ...(displayRoadmap ? [{ label: "開発予定", href: "/roadmap" }] : []),
  ],
  support: [
    { label: "お問い合わせ", href: "/#contact" },
    { label: "変換仕様について", href: "/docs" },
    { label: "インストールガイド", href: "/install-help" },
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
