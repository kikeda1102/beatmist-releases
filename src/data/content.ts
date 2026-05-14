import { displayRoadmap, displayUserVoices } from "../config";

export const site = {
  name: "BeatMist",
  tagline: "DJのためのプロフェッショナルな音源ライブラリ管理ツール",
  description:
    "DJのための音源ライブラリ管理ツール。楽曲をCDJごとの対応フォーマットに自動変換。rekordboxのプレイリスト、マイタグも一括編集可能。",
  url: "https://beatmist.com",
  ogImage: "/images/og-image.png",
} as const;

export const navigation = [
  { label: "機能", href: "/#features" },
  ...(displayUserVoices
    ? [{ label: "ユーザーの声", href: "/#user-voices" }]
    : []),
  { label: "料金プラン", href: "/#pricing" },
  { label: "ダウンロード", href: "/#download" },
  { label: "FAQ", href: "/#faq" },
  { label: "リリースノート", href: "/#release-notes" },
  { label: "お問い合わせ", href: "/#contact" },
  { label: "ドキュメント", href: "/docs" },
  ...(displayRoadmap ? [{ label: "開発予定", href: "/roadmap" }] : []),
] as const;

export const userVoices = [
  { id: "2050889538466447504" },
  { id: "2050549215412318219" },
  { id: "2054842055218905256" },
  { id: "2049683478967693756" },
  // { id: "2049494675829280993" },
  { id: "2053994222890684712" },
] as const;

export const introduction = {
  body: "BeatMistは、CDJに適応する楽曲フォーマットへの一括変換や\nrekordboxとのシームレスな連携など、\nDJのための本格的な音源管理を提供するデスクトップアプリケーションです。",
} as const;

export const hero = {
  headline: "BeatMist",
  subtext:
    "楽曲をCDJごとの対応フォーマットに自動変換。\nrekordboxのプレイリスト、マイタグも一括編集可能。",
  cta: {
    label: "無料ではじめる",
    href: "/#download",
  },
} as const;

interface Feature {
  readonly icon?: string;
  readonly title: string;
  readonly description: string;
  readonly href?: string;
  readonly image?: string;
  readonly imageAlt?: string;
}

export const features: readonly Feature[] = [
  {
    title: "楽曲ライブラリ管理",
    description:
      "複数フォルダからWAV / MP3 / AIFF / FLAC / M4Aを自動検出。Title、Artist、BPM、Keyなどのメタデータを一覧表示し、検索やソートで目的の楽曲にすばやくアクセスできます。",
    image: "/images/showcase/library.png",
    imageAlt: "楽曲ライブラリの一覧表示画面",
  },
  {
    title: "CDJ機種別フォーマット一括変換",
    description:
      "6機種のCDJに対応。非対応フォーマットを自動検出し、サンプルレート・ビット深度を最適値にスマートダウンスケーリング。自動モードとマニュアルモードを切り替えて、変換を完全にコントロールできます。",
    href: "/docs/conversion",
    image: "/images/showcase/problem-badge.png",
    imageAlt:
      "CDJ-3000で非対応のビット深度・サンプルレートに赤いバッジが表示されている画面",
  },
  {
    title: "自動バックアップ & ワンクリック復元",
    description:
      "変換時に元のファイルは自動的にバックアップされます。変換後でもワンクリックでいつでも元に戻せるので、安心して変換できます。",
    image: "/images/showcase/backup-revert.png",
    imageAlt: "変換済みファイルのワンクリック復元UI",
  },
  {
    title: "メタデータ編集",
    description:
      "ID3タグ（Title、Artist、Key、Commentなど）をアプリ上で編集し、ファイルのタグを直接更新。rekordboxに再インポートするだけで反映されます。",
    image: "/images/showcase/metadata-edit.png",
    imageAlt: "アプリ上でのメタデータ編集画面",
  },
  {
    title: "rekordboxインポート・CUE状況の確認",
    description:
      "rekordboxのデータベースを自動で読み取り、各トラックのインポート状況とCUE情報の有無を一覧で表示。rekordboxへのインポート漏れやCUEのうち忘れをすばやく確認できます。",
    image: "/images/showcase/rekordbox-status.png",
    imageAlt: "各トラックのrekordboxインポート・CUE状況の一覧表示",
  },
  {
    title: "プレイリスト・マイタグ編集",
    description:
      "rekordboxのプレイリストをBeatMist側で自動的に取得し、プレイリスト登録やマイタグの編集が可能。rekordboxではできない複数トラックのマイタグ一括編集も、BeatMist Proで簡単に行えます。",
    image: "/images/showcase/rekordbox-playlist.png",
    imageAlt: "rekordboxプレイリスト読み込み・編集画面",
  },
];

interface Highlight {
  readonly title: string;
  readonly description: string;
  readonly href?: string;
  readonly hrefLabel?: string;
  readonly image?: string;
  readonly imageAlt?: string;
}

export const highlights: readonly Highlight[] = [
  {
    title: "CDJ機種を選ぶだけで自動変換",
    description:
      "使用するCDJ機種を選ぶだけ。\n非対応フォーマットを自動で検出し、最適な形式に変換します。",
    href: "/docs/conversion",
    image: "/images/showcase/cdj-select.png",
    imageAlt: "CDJ機種選択と非対応フォーマットの自動検出画面",
  },
  {
    title: "rekordboxとシームレスに連携",
    description:
      "各トラックのrekordboxインポート状況をひと目で確認できます。\nメタデータ編集、プレイリスト、マイタグの一括編集もBeatMist上で完結。",
    image: "/images/showcase/rekordbox-status.png",
    imageAlt: "各トラックのrekordboxインポート状況の一覧表示",
  },
  {
    title: "無料ですぐに始められる",
    description: "Freeプランでもすべての基本機能を本格的にご利用いただけます。",
    href: "/#pricing",
    hrefLabel: "料金プランを見る",
  },
];

interface TechTrustItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

interface TechTrust {
  readonly title: string;
  readonly lead: string;
  readonly items: readonly TechTrustItem[];
  readonly link: { readonly label: string; readonly href: string };
}

export const techTrust: TechTrust = {
  title: "変換エンジンについて",
  lead: "BeatMistの音声変換は、映像・音楽業界で世界標準として使われているオープンソースライブラリ「FFmpeg」を採用しています。",
  items: [
    {
      icon: "🏛️",
      title: "業界標準の変換品質",
      description:
        "FFmpegは、YouTube・Spotify・Adobe製品をはじめ、世界中のプロフェッショナルが信頼する音声・映像処理エンジンです。BeatMistはこのFFmpegをそのまま使用しているため、独自の処理による予期しない音質劣化の心配がありません。",
    },
    {
      icon: "🎚️",
      title: "スペックを維持する設計思想",
      description:
        "BeatMistの自動変換は、CDJで再生可能な範囲内で元のサンプルレート・ビット深度を最大限に維持します。不必要なダウンスケーリングは行いません。",
    },
    {
      icon: "🛡️",
      title: "元ファイルは常に安全",
      description:
        "変換前のオリジナルファイルは自動バックアップされ、いつでもワンクリックで復元できます。万が一のときも安心です。",
    },
  ],
  link: {
    label: "変換の詳しい仕様を見る",
    href: "/docs/conversion",
  },
};

interface FaqLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

interface FaqItem {
  readonly question: string;
  readonly answer: string;
  readonly links?: Readonly<Record<string, FaqLink>>;
}

interface Faq {
  readonly title: string;
  readonly items: readonly FaqItem[];
}

export const faq: Faq = {
  title: "よくあるご質問",
  items: [
    {
      question: "ソフトウェアとしての品質は大丈夫ですか？",
      answer:
        "BeatMistは高い頻度でアップデートを行い、ユーザーからのフィードバックに基づいて継続的に品質改善を行っています。{releaseNotes}から更新履歴をご確認いただけます。音声変換の核心部分には業界標準のFFmpegを採用しており、独自アルゴリズムによる予期しない不具合のリスクを排除しています。また、変換前の自動バックアップ機能により、万が一の問題が発生してもオリジナルファイルは常に安全に保護されています。",
      links: {
        releaseNotes: { label: "リリースノート", href: "/#release-notes" },
      },
    },
    {
      question: "使い方がわからなくなったらどうすればいいですか？",
      answer:
        "BeatMistには使い方ガイドと{docs}を用意しています。基本操作から変換ロジックの詳細まで、ステップバイステップで確認できます。また、{contact}や{twitter}、Discordコミュニティでもサポートを受け付けていますので、お気軽にご相談ください。",
      links: {
        docs: { label: "ドキュメント", href: "/docs" },
        contact: { label: "お問い合わせフォーム", href: "/#contact" },
        twitter: {
          label: "X (Twitter)",
          href: "https://x.com/beat_mist",
          external: true,
        },
      },
    },
    {
      question: "楽曲ファイルが壊れたり、音質が劣化することはありませんか？",
      answer:
        "BeatMistは変換前に必ずオリジナルファイルを自動バックアップします。変換後も、ワンクリックでいつでも元の状態に戻せます。また、音声変換にはFFmpegを使用しており、ロスレス形式間の変換ではビット単位で完全な変換が行われます。ダウンサンプリングが必要な場合も、CDJの対応範囲内で最大のスペックを維持する設計です。",
    },
  ],
};

export const download = {
  title: "ダウンロード",
  description:
    "さっそく使ってみましょう。すべての基本機能を無料でお使いいただけます。",
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

export const pricing = {
  title: "料金プラン",
  description:
    "Freeプランですべての基本機能をお使いいただけます。\nProライセンスではプレイリスト・マイタグの一括編集など全機能が解放されます。\n買い切りのため、将来のアップデートもすべて無料で受けることができます。",
} as const;

export const pricingTiers: readonly PricingTier[] = [
  {
    name: "Free",
    price: "¥0",
    priceNote: "",
    description: "基本機能はすべて無料で利用可能です",
    features: [
      "楽曲ファイル100曲まで一括変換",
      "CDJ機種別フォーマット一括変換",
      "楽曲メタデータの閲覧、編集",
      "rekordbox互換",
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
      "ファイル数無制限での一括フォーマット変換",
      "rekordboxプレイリスト・マイタグの一括編集",
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
    { label: "インストールガイド", href: "/install-help" },
    { label: "使い方ガイド", href: "/docs/getting-started" },
    { label: "変換仕様について", href: "/docs/conversion" },
    { label: "特定商取引法に基づく表記", href: "/tokushoho" },
  ],
  community: {
    links: [{ label: "BeatMist X (Twitter)", href: "https://x.com/beat_mist" }],
    note: "Discordコミュニティ:\n招待リンクをソフト内に掲載しています",
  },
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
