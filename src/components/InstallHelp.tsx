import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { TranslationProvider, useTranslation } from "../i18n";
import Header from "./Header";
import Footer from "./Footer";

const Page = styled.div`
  min-height: 100vh;
  padding: calc(${spacing.headerHeight} + 3rem) 1.5rem 5rem;
  background-color: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: 720px;
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

const TOC = styled.nav`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  margin-bottom: 3rem;
`;

const TOCTitle = styled.p`
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 0.75rem;
`;

const TOCList = styled.ol`
  list-style: decimal;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const TOCLink = styled.a`
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accent};
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: 1.375rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.border};

  ${media.md} {
    font-size: 1.5rem;
  }
`;

const SubTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
`;

const Paragraph = styled.p`
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const BulletList = styled.ul`
  list-style: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 0.25rem;
`;

const NoteBox = styled.div`
  background-color: ${colors.accentSubtle};
  border-left: 3px solid ${colors.accent};
  border-radius: 0 0.375rem 0.375rem 0;
  padding: 0.875rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

const NoteLabel = styled.span`
  font-weight: 600;
  color: ${colors.accent};
  margin-right: 0.375rem;
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${colors.accentSubtle};
  color: ${colors.accent};
  font-size: 0.8125rem;
  font-weight: 600;
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

const StepItem = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.75rem;
`;

const StepText = styled.div`
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.8;
`;

const StepTitle = styled.span`
  font-weight: 600;
  color: ${colors.textPrimary};
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

const tocSections = [
  { id: "windows-install", label: "Windowsでのインストール" },
  { id: "macos-install", label: "macOSでのインストール" },
  { id: "update", label: "アップデート方法" },
  { id: "uninstall", label: "アンインストール方法" },
  { id: "troubleshooting", label: "トラブルシューティング" },
];

function InstallHelpContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Title>{t("インストールガイド")}</Title>
        <Lead>
          {t(
            "BeatMistのインストール方法、アップデート、アンインストール、トラブルシューティングについてご案内します。",
          )}
        </Lead>

        <TOC>
          <TOCTitle>{t("目次")}</TOCTitle>
          <TOCList>
            {tocSections.map((section) => (
              <li key={section.id}>
                <TOCLink href={`#${section.id}`}>
                  {t(section.label)}
                </TOCLink>
              </li>
            ))}
          </TOCList>
        </TOC>

        {/* Windows Install */}
        <Section id="windows-install">
          <SectionTitle>{t("Windowsでのインストール")}</SectionTitle>

          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>
              <StepTitle>
                {t("インストーラー(.exe)をダウンロード")}
              </StepTitle>
              <br />
              {t("ダウンロードページからWindows版をダウンロードします。")}
            </StepText>
          </StepItem>

          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              <StepTitle>{t("ダウンロードしたファイルを実行")}</StepTitle>
              <br />
              {t(
                "ダウンロードした .exe ファイルをダブルクリックして実行します。",
              )}
            </StepText>
          </StepItem>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>
              <StepTitle>
                {t(
                  "「WindowsによってPCが保護されました」と表示された場合",
                )}
              </StepTitle>
            </StepText>
          </StepItem>

          <NoteBox>
            {t(
              "BeatMistは個人開発ソフトウェアのため、WindowsのSmartScreenが警告を表示する場合があります。「詳細情報」をクリックし、「実行」ボタンを押してインストールを続行してください。",
            )}
          </NoteBox>

          <StepItem>
            <StepNumber>4</StepNumber>
            <StepText>
              <StepTitle>
                {t("インストーラーの指示に従ってインストール")}
              </StepTitle>
              <br />
              {t("表示される手順に沿ってインストールを完了します。")}
            </StepText>
          </StepItem>
        </Section>

        {/* macOS Install */}
        <Section id="macos-install">
          <SectionTitle>{t("macOSでのインストール")}</SectionTitle>

          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>
              <StepTitle>
                {t("インストーラー(.dmg)をダウンロード")}
              </StepTitle>
              <br />
              {t("ダウンロードページからmacOS版をダウンロードします。")}
            </StepText>
          </StepItem>

          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              <StepTitle>
                {t(
                  ".dmgファイルを開いてアプリをApplicationsフォルダにドラッグ",
                )}
              </StepTitle>
            </StepText>
          </StepItem>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>
              <StepTitle>{t("初回起動時の確認")}</StepTitle>
              <br />
              {t(
                "「開発元が未確認」と表示された場合は、右クリックから「開く」を選択してください。",
              )}
            </StepText>
          </StepItem>
        </Section>

        {/* Update */}
        <Section id="update">
          <SectionTitle>{t("アップデート方法")}</SectionTitle>
          <Paragraph>
            {t(
              "アプリ内で新しいバージョンが利用可能になると通知が表示されます。通知に従ってアップデートするか、ダウンロードページから最新版を再ダウンロードしてインストールしてください。",
            )}
          </Paragraph>
        </Section>

        {/* Uninstall */}
        <Section id="uninstall">
          <SectionTitle>{t("アンインストール方法")}</SectionTitle>

          <SubTitle>Windows</SubTitle>
          <Paragraph>
            {t(
              "「設定」→「アプリ」→「インストールされているアプリ」からBeatMistを選択し、「アンインストール」をクリックします。",
            )}
          </Paragraph>

          <SubTitle>macOS</SubTitle>
          <Paragraph>
            {t(
              "ApplicationsフォルダからBeatMistをゴミ箱にドラッグします。",
            )}
          </Paragraph>
        </Section>

        {/* Troubleshooting */}
        <Section id="troubleshooting">
          <SectionTitle>{t("トラブルシューティング")}</SectionTitle>

          <SubTitle>{t("インストールが完了しない場合")}</SubTitle>
          <Paragraph>
            {t(
              "ウイルス対策ソフトが干渉している可能性があります。一時的に無効化してから再度お試しください。",
            )}
          </Paragraph>

          <SubTitle>{t("アプリが起動しない場合")}</SubTitle>
          <Paragraph>
            {t(
              "PCを再起動してからもう一度お試しください。問題が解決しない場合はお問い合わせフォームからご連絡ください。",
            )}
          </Paragraph>
        </Section>

        <HomeLink href="/">&larr; {t("トップページに戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function InstallHelp() {
  return (
    <TranslationProvider>
      <Header />
      <InstallHelpContent />
      <Footer />
    </TranslationProvider>
  );
}
