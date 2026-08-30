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

const DocLink = styled.a`
  color: ${colors.accent};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
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

const NumberedList = styled.ol`
  list-style: decimal;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
`;

const tocSections = [
  { id: "features", label: "この機能でできること" },
  { id: "comparison", label: "オンとオフの比較" },
  { id: "backup", label: "rekordboxデータベースのバックアップ" },
  { id: "supported-versions", label: "対応バージョン" },
  { id: "free-plan", label: "Freeプランでの制限" },
  { id: "running-restriction", label: "rekordbox起動中の制限" },
];

function RekordboxLibrarySyncContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "BeatMist", href: "/" },
            { label: t("ドキュメント"), href: "/docs" },
            { label: t("rekordbox 連携") },
          ]}
        />
        <Title>{t("rekordbox 連携")}</Title>
        <Lead>
          {t(
            "BeatMistの設定画面にある「rekordbox 連携」をオンにすると、BeatMistでのファイル変換やプレイリスト・マイタグの操作がrekordboxのデータベースに自動で反映されます。この機能により、BeatMistとrekordboxのライブラリを常に同期した状態に保てます。",
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

        <Section id="features">
          <SectionTitle>{t("この機能でできること")}</SectionTitle>

          <SubTitle>{t("ファイル変換後のライブラリ自動追従")}</SubTitle>
          <Paragraph>
            {t(
              "BeatMistでファイルを別フォーマットに変換すると、rekordboxのデータベースが自動で更新されます。ファイルパス・ファイルサイズ・フォーマット種別・ビットレート・ビット深度・サンプルレートが書き換わるため、rekordbox上でトラックが「見つからない」状態になったり、変換前の情報が残ったりすることはありません。CUEポイントやループなど、rekordboxで設定済みの情報もそのまま保持されます。",
            )}
          </Paragraph>

          <SubTitle>{t("プレイリスト操作")}</SubTitle>
          <Paragraph>
            {t(
              "BeatMistのサイドバーにrekordboxのプレイリストツリーが表示されます。以下の操作が可能です:",
            )}
          </Paragraph>
          <BulletList>
            <ListItem>{t("プレイリストの新規作成")}</ListItem>
            <ListItem>{t("プレイリストの削除")}</ListItem>
            <ListItem>{t("トラックをプレイリストに追加")}</ListItem>
            <ListItem>{t("トラックをプレイリストから削除")}</ListItem>
          </BulletList>

          <SubTitle>{t("マイタグ操作")}</SubTitle>
          <Paragraph>
            {t(
              "BeatMistの右パネルでrekordboxのマイタグを管理できます。以下の操作が可能です:",
            )}
          </Paragraph>
          <BulletList>
            <ListItem>{t("トラックへのマイタグ付与・解除")}</ListItem>
            <ListItem>{t("マイタグの新規作成")}</ListItem>
            <ListItem>{t("マイタグの削除")}</ListItem>
          </BulletList>

          <SubTitle>{t("変換の巻き戻し")}</SubTitle>
          <Paragraph>
            {t(
              "変換前のフォーマットに戻す（リバート）際も、rekordboxのデータベースが自動で元のファイルを参照するように書き戻されます。",
            )}
          </Paragraph>
        </Section>

        <Section id="comparison">
          <SectionTitle>{t("オンとオフの比較")}</SectionTitle>
          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("項目")}</Th>
                  <Th>{t("オン")}</Th>
                  <Th>{t("オフ")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>{t("ファイル変換後のrekordbox更新")}</Td>
                  <Td>{t("自動")}</Td>
                  <Td>{t("なし（手動管理が必要）")}</Td>
                </Tr>
                <Tr>
                  <Td>{t("プレイリスト操作")}</Td>
                  <Td>{t("BeatMist上で可能")}</Td>
                  <Td>{t("不可")}</Td>
                </Tr>
                <Tr>
                  <Td>{t("マイタグ操作")}</Td>
                  <Td>{t("BeatMist上で可能")}</Td>
                  <Td>{t("不可")}</Td>
                </Tr>
                <Tr>
                  <Td>{t("変換後にrekordboxでトラックが見つかるか")}</Td>
                  <Td>{t("自動で追従")}</Td>
                  <Td>{t("見つからない状態になる")}</Td>
                </Tr>
                <Tr>
                  <Td>{t("rekordboxデータベースへの書き込み")}</Td>
                  <Td>{t("あり")}</Td>
                  <Td>{t("なし")}</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>
          <Paragraph>
            {t(
              "この機能を有効にすると、BeatMistがrekordboxのデータベースに対してトラックの追加やファイルパスの更新などを直接書き込みます。これにより、rekordboxを開いたときに変換済みファイルがすぐに反映された状態になります。データベースへの変更はBeatMistのrekordboxデータベースのバックアップ機能（後述）により保護されており、以前の状態に復元することも可能です。",
            )}
          </Paragraph>
        </Section>

        <Section id="backup">
          <SectionTitle>
            {t("rekordboxデータベースのバックアップ")}
          </SectionTitle>
          <Paragraph>
            {t(
              "BeatMistはrekordboxのデータベースを安全に扱うために、以下のバックアップ機能を備えています。",
            )}
          </Paragraph>
          <NumberedList>
            <ListItem>
              <strong>{t("有効化時のバックアップ")}</strong>
              {t(
                " — 「rekordbox 連携」を初めてオンにする際、rekordboxデータベースのバックアップを作成するモーダルが表示されます。任意のフォルダにバックアップを保存できます。",
              )}
            </ListItem>
            <ListItem>
              <strong>{t("自動バックアップ")}</strong>
              {t(
                " — 以降、rekordboxデータベースへの書き込みが発生するたびに、BeatMistが自動でタイムスタンプ付きのバックアップを作成します。",
              )}
            </ListItem>
          </NumberedList>
          <NoteBox>
            <NoteLabel>{t("復元について:")}</NoteLabel>
            {t(
              "万が一データベースに問題が発生した場合は、バックアップから復元できます。復元手順の詳細は",
            )}
            <DocLink href="/docs/rekordbox-backup">
              {t("「rekordboxデータベースのバックアップと復元」")}
            </DocLink>
            {t("を参照してください。")}
          </NoteBox>
        </Section>

        <Section id="supported-versions">
          <SectionTitle>{t("対応バージョン")}</SectionTitle>
          <BulletList>
            <ListItem>{t("rekordbox 6.xおよび7.xに対応しています")}</ListItem>
            <ListItem>
              {t(
                "非対応バージョンの場合、設定画面でチェックボックスがグレーアウトされ、有効化できません",
              )}
            </ListItem>
          </BulletList>
        </Section>

        <Section id="free-plan">
          <SectionTitle>{t("Freeプランでの制限")}</SectionTitle>
          <BulletList>
            <ListItem>
              {t(
                "rekordboxプレイリスト・マイタグの一括編集（複数トラック × 複数プレイリスト / マイタグの同時操作）にはProプランが必要です",
              )}
            </ListItem>
            <ListItem>
              {t(
                "単一トラックと単一プレイリスト / マイタグの操作はFreeプランでも利用いただけます",
              )}
            </ListItem>
          </BulletList>
        </Section>

        <Section id="running-restriction">
          <SectionTitle>{t("rekordbox起動中の制限")}</SectionTitle>
          <Paragraph>
            {t(
              "rekordboxが起動している間はデータベースがロックされるため、BeatMistからの書き込みができません。ファイル変換やプレイリスト・マイタグの操作を行う前に、rekordboxを終了してください。rekordboxの起動が検出された場合は、BeatMistが終了を促すメッセージを表示します。",
            )}
          </Paragraph>
        </Section>

        <HomeLink href="/docs">&larr; {t("ドキュメント一覧に戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function RekordboxLibrarySync() {
  return (
    <TranslationProvider>
      <Header />
      <RekordboxLibrarySyncContent />
      <Footer />
    </TranslationProvider>
  );
}
