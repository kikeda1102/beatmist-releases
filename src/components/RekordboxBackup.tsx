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

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 1rem;
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
`;

const SpecTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
`;

const Thead = styled.thead`
  background-color: ${colors.bgSecondary};
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 0.625rem 1rem;
  font-size: 0.8125rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
  border-top: 1px solid ${colors.border};
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${colors.bgSecondary};
  }
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

const InlineCode = styled.code`
  background-color: ${colors.accentSubtle};
  color: ${colors.accent};
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: "IBM Plex Mono", monospace;
`;

const CodeBlock = styled.pre`
  background-color: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  font-size: 0.8125rem;
  color: ${colors.textPrimary};
  font-family: "IBM Plex Mono", monospace;
  overflow-x: auto;
  margin-bottom: 1rem;
  line-height: 1.7;
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
  { id: "backup-contents", label: "バックアップの内容" },
  { id: "restore", label: "復元手順" },
  { id: "notes", label: "注意事項" },
];

function RekordboxBackupContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "BeatMist", href: "/" },
            { label: t("ドキュメント"), href: "/docs" },
            { label: t("rekordboxデータベースのバックアップと復元") },
          ]}
        />
        <Title>{t("rekordboxデータベースのバックアップと復元")}</Title>
        <Lead>
          {t(
            "BeatMistの「rekordboxライブラリを更新する」機能を有効にすると、ファイル変換時にrekordboxのデータベースを直接書き換えます。この機能を有効にする際に、BeatMistからデータベースのバックアップを作成できます。",
          )}
        </Lead>

        <TOC>
          <TOCTitle>{t("目次")}</TOCTitle>
          <TOCList>
            {tocSections.map((section) => (
              <li key={section.id}>
                <TOCLink href={`#${section.id}`}>{t(section.label)}</TOCLink>
              </li>
            ))}
          </TOCList>
        </TOC>

        <Section id="backup-contents">
          <SectionTitle>{t("バックアップの内容")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistはrekordboxのデータベースファイルを、指定したフォルダにコピーします。",
            )}
          </Paragraph>
          <Paragraph>
            {t("バックアップフォルダ")}（
            <InlineCode>rekordbox-backup-YYYY-MM-DD-...</InlineCode>）
            {t("には以下のファイルが含まれます:")}
          </Paragraph>

          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("ファイル")}</Th>
                  <Th>{t("説明")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>
                    <InlineCode>master.db</InlineCode>
                  </Td>
                  <Td>{t("rekordboxのメインデータベース")}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <InlineCode>master.db-wal</InlineCode>
                  </Td>
                  <Td>{t("Write-Ahead Log（存在する場合）")}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <InlineCode>master.db-shm</InlineCode>
                  </Td>
                  <Td>{t("Shared Memory（存在する場合）")}</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>
        </Section>

        <Section id="restore">
          <SectionTitle>{t("復元手順")}</SectionTitle>
          <Paragraph>
            {t(
              "rekordboxのデータベースに問題が発生した場合、バックアップからデータベースを復元できます。",
            )}
          </Paragraph>

          <SubTitle>{t("事前準備")}</SubTitle>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>
              <strong>{t("rekordboxを終了する")}</strong>
              {t(
                " — rekordboxが起動中はデータベースファイルを上書きできません",
              )}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              {t("バックアップフォルダを開き、中にあるファイルを確認する")}
            </StepText>
          </StepItem>

          <SubTitle>macOS</SubTitle>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>{t("Finderを開く")}</StepText>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              {t("メニューバーから")}{" "}
              <strong>{t("移動 > フォルダへ移動")}</strong> {t("を選択する")}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>{t("以下のパスを入力して移動する:")}</StepText>
          </StepItem>
          <CodeBlock>~/Library/Application Support/Pioneer/rekordbox</CodeBlock>
          <Paragraph>{t("見つからない場合は以下を試す:")}</Paragraph>
          <CodeBlock>~/Library/Pioneer/rekordbox</CodeBlock>
          <StepItem>
            <StepNumber>4</StepNumber>
            <StepText>
              {t("フォルダ内の")} <InlineCode>master.db</InlineCode>
              {t("（および")} <InlineCode>master.db-wal</InlineCode>
              {"、"}
              <InlineCode>master.db-shm</InlineCode>{" "}
              {t(
                "があればそれも）をバックアップフォルダ内のファイルで上書きする",
              )}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>5</StepNumber>
            <StepText>
              {t("rekordboxを起動し、ライブラリが復元されていることを確認する")}
            </StepText>
          </StepItem>

          <SubTitle>Windows</SubTitle>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>{t("エクスプローラーを開く")}</StepText>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              {t("アドレスバーに以下のパスを入力して移動する:")}
            </StepText>
          </StepItem>
          <CodeBlock>%APPDATA%\Pioneer\rekordbox</CodeBlock>
          <Paragraph>{t("見つからない場合は以下を試す:")}</Paragraph>
          <CodeBlock>%LOCALAPPDATA%\Pioneer\rekordbox</CodeBlock>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>
              {t("フォルダ内の")} <InlineCode>master.db</InlineCode>
              {t("（および")} <InlineCode>master.db-wal</InlineCode>
              {"、"}
              <InlineCode>master.db-shm</InlineCode>{" "}
              {t(
                "があればそれも）をバックアップフォルダ内のファイルで上書きする",
              )}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>4</StepNumber>
            <StepText>
              {t("rekordboxを起動し、ライブラリが復元されていることを確認する")}
            </StepText>
          </StepItem>
        </Section>

        <Section id="notes">
          <SectionTitle>{t("注意事項")}</SectionTitle>
          <BulletList>
            <ListItem>
              {t(
                "復元すると、バックアップ作成後にrekordboxで行った変更（プレイリストの編集、CUEポイントの設定など）は失われます",
              )}
            </ListItem>
            <ListItem>
              {t(
                "バックアップはBeatMistの設定画面で「rekordboxライブラリを更新する」を有効にする際に作成できます",
              )}
            </ListItem>
          </BulletList>
          <NoteBox>
            <NoteLabel>{t("注意:")}</NoteLabel>
            {t(
              "復元作業を行う前に、必ずrekordboxが完全に終了していることを確認してください。rekordboxが起動中にデータベースファイルを上書きすると、データが破損する可能性があります。",
            )}
          </NoteBox>
        </Section>

        <HomeLink href="/docs">&larr; {t("ドキュメント一覧に戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function RekordboxBackup() {
  return (
    <TranslationProvider>
      <Header />
      <RekordboxBackupContent />
      <Footer />
    </TranslationProvider>
  );
}
