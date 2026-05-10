import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { TranslationProvider, useTranslation } from "../i18n";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./shared/Breadcrumb";

const Page = styled.div`
  min-height: 100vh;
  padding: calc(${spacing.headerHeight} + 3rem) 1.5rem 5rem;
  background-color: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 1rem;

  ${media.md} {
    font-size: 2rem;
  }
`;

const Lead = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 3rem;

  ${media.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.a`
  display: block;
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: ${colors.bgCardHover};
    border-color: ${colors.borderHover};
  }
`;

const CardTitle = styled.p`
  font-family: ${fonts.heading};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

const HomeLink = styled.a`
  display: inline-block;
  margin-top: 2rem;
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const docPages = [
  {
    href: "/install-help",
    title: "インストールガイド",
    description:
      "Windows / macOS でのインストール方法、アップデート、アンインストール、トラブルシューティングについてご案内します。",
  },
  {
    href: "/docs/getting-started",
    title: "使い方ガイド",
    description:
      "ライブラリ登録、波形プレビュー、CDJ変換、メタデータ編集、Rekordbox連携など、BeatMistの基本的な使い方を説明します。",
  },
  {
    href: "/docs/conversion",
    title: "変換仕様について",
    description:
      "CDJ機種別の対応フォーマット、自動最適化の変換ロジック、変換例、安全機能、技術仕様を詳しく説明します。",
  },
  {
    href: "/docs/rekordbox-library-sync",
    title: "rekordboxライブラリの自動更新",
    description:
      "ファイル変換やrekordboxプレイリスト・MyTagの操作をrekordboxデータベースに自動反映する機能について説明します。",
  },
  {
    href: "/docs/rekordbox-backup",
    title: "rekordboxデータベースのバックアップと復元",
    description:
      "rekordboxライブラリ更新機能で作成したバックアップからデータベースを復元する方法を説明します。",
  },
];

function DocsIndexContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "BeatMist", href: "/" },
            { label: t("ドキュメント") },
          ]}
        />
        <Title>{t("ドキュメント")}</Title>
        <Lead>
          {t(
            "BeatMistの使い方や技術仕様について、以下のドキュメントをご用意しています。",
          )}
        </Lead>

        <CardGrid>
          {docPages.map((page) => (
            <Card key={page.href} href={page.href}>
              <CardTitle>{t(page.title)}</CardTitle>
              <CardDescription>{t(page.description)}</CardDescription>
            </Card>
          ))}
        </CardGrid>

        <HomeLink href="/">&larr; {t("トップページに戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function DocsIndex() {
  return (
    <TranslationProvider>
      <Header />
      <DocsIndexContent />
      <Footer />
    </TranslationProvider>
  );
}
