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

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 1rem;
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
`;

const SpecTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 480px;
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

const InlineCode = styled.code`
  background-color: ${colors.accentSubtle};
  color: ${colors.accent};
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: "IBM Plex Mono", monospace;
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

const DocLink = styled.a`
  color: ${colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function WavHeaderContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "BeatMist", href: "/" },
            { label: t("ドキュメント"), href: "/docs" },
            { label: t("WAVヘッダーの互換性について") },
          ]}
        />
        <Title>{t("WAVヘッダーの互換性について")}</Title>
        <Lead>
          {t(
            "一部のWAVファイルは、ファイル内部のヘッダー形式が原因で特定のCDJ機種で読み込めないことがあります。このページでは、その原因とBeatMistの対応について説明します。",
          )}
        </Lead>

        <Section>
          <SectionTitle>{t("WAVヘッダーとは")}</SectionTitle>
          <Paragraph>
            {t(
              "WAVファイルはRIFFコンテナ形式で構成されており、ファイルの先頭付近にあるfmtチャンクに音声データのフォーマット情報（サンプルレート、ビット深度、チャンネル数など）が記録されています。CDJはこのfmtチャンクを読み取って音声を再生します。",
            )}
          </Paragraph>
          <Paragraph>
            {t(
              "多くのDAW（Digital Audio Workstation）やオーディオ編集ソフトは、標準的なWAVヘッダー形式でファイルを出力しますが、一部のソフトウェアは異なるヘッダー形式を使用することがあります。",
            )}
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>
            {t("CDJで読み込めない可能性のあるヘッダー形式")}
          </SectionTitle>

          <SubTitle>
            <InlineCode>WAVE_FORMAT_EXTENSIBLE</InlineCode>
          </SubTitle>
          <Paragraph>
            {t(
              "通常のWAVファイルはフォーマットタグにWAVE_FORMAT_PCM（0x0001）を使用しますが、一部のソフトウェアはWAVE_FORMAT_EXTENSIBLE（0xFFFE）という拡張形式を使用します。この形式はマルチチャンネル音声やチャンネルマスクの指定に対応していますが、CDJ-2000NXS2以前の機種ではエラー（E-8305等）の原因となることがあります。",
            )}
          </Paragraph>

          <SubTitle>{t("fmtチャンクが先頭にない配置")}</SubTitle>
          <Paragraph>
            {t(
              "WAVファイルの仕様上、fmtチャンクはファイル先頭に配置される必要はありませんが、一部のCDJ機種はfmtチャンクがファイル先頭にない場合に正しく読み込めないことがあります。JUNKチャンクやbextチャンク（Broadcast Wave Format）がfmtチャンクより前に配置されている場合がこれに該当します。",
            )}
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>{t("影響を受ける機種")}</SectionTitle>
          <Paragraph>
            {t(
              "ヘッダー互換性の影響は機種によって異なります。",
            )}
          </Paragraph>
          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("機種")}</Th>
                  <Th>{t("影響")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>CDJ-3000X / CDJ-3000</Td>
                  <Td>{t("影響なし — 非標準ヘッダーでも問題なく読み込めます")}</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-2000NXS2</Td>
                  <Td>
                    {t(
                      "影響あり — WAVE_FORMAT_EXTENSIBLEやfmt非先頭配置でエラーになる場合があります",
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td>CDJ-2000NXS</Td>
                  <Td>{t("影響あり")}</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-900NXS / CDJ-900</Td>
                  <Td>{t("影響あり")}</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>
        </Section>

        <Section>
          <SectionTitle>{t("BeatMistの対応")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistはWAVファイルのスキャン時にヘッダー形式を自動検出し、CDJ非対応のヘッダーが見つかった場合にフォーマット列で警告を表示します。",
            )}
          </Paragraph>

          <SubTitle>{t("自動検出（WAVヘッダー）")}</SubTitle>
          <BulletList>
            <ListItem>
              {t(
                "フォルダスキャン時にWAVファイルのfmtチャンクを解析し、フォーマットタグとチャンク配置をチェックします",
              )}
            </ListItem>
            <ListItem>
              {t(
                "非標準ヘッダーが検出された場合、トラック一覧のフォーマット列に警告アイコンが表示されます",
              )}
            </ListItem>
          </BulletList>

          <SubTitle>{t("無劣化修復（リマックス）")}</SubTitle>
          <Paragraph>
            {t(
              "BeatMistはWAVヘッダーの修復に「リマックス」方式を採用しています。これはファイルのヘッダー部分のみを書き換え、音声データには一切変更を加えない方式です。",
            )}
          </Paragraph>
          <BulletList>
            <ListItem>
              {t("音声データの品質は完全に維持されます（ビットパーフェクト）")}
            </ListItem>
            <ListItem>
              {t(
                "WAVE_FORMAT_EXTENSIBLEはWAVE_FORMAT_PCMに変換され、fmtチャンクはファイル先頭に再配置されます",
              )}
            </ListItem>
            <ListItem>
              {t(
                "修復前のオリジナルファイルは自動的にバックアップされ、いつでも復元できます",
              )}
            </ListItem>
          </BulletList>

          <NoteBox>
            <NoteLabel>{t("ヒント:")}</NoteLabel>
            {t(
              "ヘッダーの修復は変換機能から実行できます。スペック（サンプルレート・ビット深度）の変更が不要な場合、ヘッダーのみの無劣化修復が自動的に選択されます。変換仕様の詳細は",
            )}{" "}
            <DocLink href="/docs/conversion">
              {t("変換仕様についてはこちら")}
            </DocLink>
            {t(" をご覧ください。")}
          </NoteBox>
        </Section>

        <HomeLink href="/docs">&larr; {t("ドキュメント一覧に戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function WavHeader() {
  return (
    <TranslationProvider>
      <Header />
      <WavHeaderContent />
      <Footer />
    </TranslationProvider>
  );
}
