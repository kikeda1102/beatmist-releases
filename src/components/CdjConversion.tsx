import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { TranslationProvider, useTranslation } from "../i18n";
import { conversionExamples } from "../data/content";
import Header from "./Header";
import Footer from "./Footer";

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
  min-width: 640px;
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

const Td = styled.td<{ $muted?: boolean }>`
  padding: 0.625rem 1rem;
  font-size: 0.8125rem;
  color: ${(props) => (props.$muted ? colors.textMuted : colors.textSecondary)};
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

const UnsupportedMark = styled.span`
  color: ${colors.accent};
  font-weight: 600;
  text-decoration: line-through;
  text-decoration-color: ${colors.accent};
`;

const SupportBadge = styled.span<{ $supported: boolean }>`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$supported ? "rgba(52,199,89,0.15)" : colors.accentSubtle};
  color: ${(props) => (props.$supported ? colors.success : colors.accent)};
`;

const ExampleCard = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
`;

const ExampleTitle = styled.p`
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 0.75rem;
`;

const ExampleFlow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const SpecBox = styled.div<{ $accent?: boolean }>`
  background-color: ${(props) =>
    props.$accent ? colors.accentSubtle : colors.bgSecondary};
  border: 1px solid
    ${(props) => (props.$accent ? colors.accent : colors.border)};
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  color: ${colors.textPrimary};
  font-family: monospace;
`;

const Arrow = styled.span`
  font-size: 1.25rem;
  color: ${colors.textMuted};
`;

const ExampleReason = styled.p`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
  margin-top: 0.5rem;
`;

const InlineCode = styled.code`
  background-color: ${colors.accentSubtle};
  color: ${colors.accent};
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: "IBM Plex Mono", monospace;
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
  { id: "cdj-specs", label: "対応CDJ機種と再生可能スペック" },
  { id: "auto-mode", label: "自動最適化の変換ロジック" },
  { id: "examples", label: "変換例" },
  { id: "skip-rules", label: "スキップされる変換" },
  { id: "safety", label: "安全機能" },
  { id: "technical", label: "技術仕様" },
];

const conversionExamples: ConversionExample[] = [
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

function CdjConversionContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Title>{t("BeatMistの変換仕様について")}</Title>
        <Lead>
          {t(
            "BeatMistの「設定したCDJに自動最適化」機能は、登録した楽曲ファイルを設定済みのCDJ機種で再生可能なフォーマット・サンプルレート・ビット深度に自動変換します。このドキュメントでは、変換の挙動と仕様を詳しく説明します。",
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

        {/* Section 1: CDJ Model Specs */}
        <Section id="cdj-specs">
          <SectionTitle>{t("対応CDJ機種と再生可能スペック")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistは以下の6機種に対応しています。各機種ごとに対応するフォーマット・サンプルレート・ビット深度が異なります。",
            )}
          </Paragraph>

          <SubTitle>{t("機種別対応フォーマット")}</SubTitle>
          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("機種")}</Th>
                  <Th>MP3</Th>
                  <Th>AAC</Th>
                  <Th>WAV</Th>
                  <Th>AIFF</Th>
                  <Th>FLAC</Th>
                  <Th>ALAC</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>CDJ-3000X</Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>CDJ-3000</Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>CDJ-2000NXS2</Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>CDJ-2000NXS</Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported={false}>
                      {t("非対応")}
                    </SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported={false}>
                      {t("非対応")}
                    </SupportBadge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>CDJ-900NXS</Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported={false}>
                      {t("非対応")}
                    </SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported={false}>
                      {t("非対応")}
                    </SupportBadge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>CDJ-900</Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported>{t("対応")}</SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported={false}>
                      {t("非対応")}
                    </SupportBadge>
                  </Td>
                  <Td>
                    <SupportBadge $supported={false}>
                      {t("非対応")}
                    </SupportBadge>
                  </Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>

          <SubTitle>{t("機種別サンプルレート・ビット深度")}</SubTitle>
          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("機種")}</Th>
                  <Th>{t("WAV サンプルレート")}</Th>
                  <Th>{t("AIFF サンプルレート")}</Th>
                  <Th>{t("PCM ビット深度")}</Th>
                  <Th>{t("MP3 / AAC サンプルレート")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>CDJ-3000X</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>16 / 24 bit</Td>
                  <Td>44.1 / 48 kHz</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-3000</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>16 / 24 bit</Td>
                  <Td>44.1 / 48 kHz</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-2000NXS2</Td>
                  <Td>
                    44.1 / 48 / <UnsupportedMark>88.2</UnsupportedMark> / 96 kHz
                  </Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>16 / 24 bit</Td>
                  <Td>44.1 / 48 kHz</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-2000NXS</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>16 / 24 bit</Td>
                  <Td>44.1 / 48 kHz</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-900NXS</Td>
                  <Td>44.1 / 48 kHz</Td>
                  <Td>44.1 / 48 kHz</Td>
                  <Td>16 / 24 bit</Td>
                  <Td>44.1 / 48 kHz</Td>
                </Tr>
                <Tr>
                  <Td>CDJ-900</Td>
                  <Td>44.1 / 48 kHz</Td>
                  <Td>44.1 / 48 kHz</Td>
                  <Td>16 / 24 bit</Td>
                  <Td>44.1 / 48 kHz</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>

          <NoteBox>
            <NoteLabel>{t("注意:")}</NoteLabel>
            {t(
              "CDJ-2000NXS2はWAVフォーマットのみ88.2kHzに非対応です。AIFFでは88.2kHzに対応しています。88.2kHzのWAVファイルを再生したい場合は、変換先フォーマットにAIFFを選択してください。",
            )}
          </NoteBox>
        </Section>

        {/* Section 2: Auto Mode Logic */}
        <Section id="auto-mode">
          <SectionTitle>{t("自動最適化の変換ロジック")}</SectionTitle>
          <Paragraph>
            {t(
              "自動最適化モードでは、元のファイルのサンプルレートとビット深度を可能な限り維持しつつ、設定したCDJ機種で再生可能なスペックに変換します。",
            )}
          </Paragraph>

          <SubTitle>{t("変換ルール")}</SubTitle>
          <BulletList>
            <ListItem>
              {t(
                "元のサンプルレート・ビット深度がCDJ機種の許容範囲内の場合、スペックはそのまま維持されます。",
              )}
            </ListItem>
            <ListItem>
              {t(
                "元の値がCDJ機種の許容範囲を超過する場合、許容範囲内で最大の値にダウンサンプリング・ダウンビットされます。",
              )}
            </ListItem>
            <ListItem>
              {t(
                "元のファイルのメタデータが不明（サンプルレートやビット深度が取得できない場合）は、安全側のデフォルト値（44.1kHz / 16bit）が適用されます。",
              )}
            </ListItem>
          </BulletList>

          <SubTitle>{t("変換先フォーマット")}</SubTitle>
          <BulletList>
            <ListItem>{t("選択可能なフォーマット: AIFF / WAV / MP3")}</ListItem>
            <ListItem>
              {t(
                "デフォルトの変換先フォーマットはAIFFです。AIFFはロスレスかつ全CDJ機種で対応しているため、最も安全な選択肢です。",
              )}
            </ListItem>
            <ListItem>
              {t("MP3に変換する場合、ビットレートは320kbpsで固定されます。")}
            </ListItem>
          </BulletList>

          <SubTitle>{t("マニュアルモード")}</SubTitle>
          <Paragraph>
            {t(
              "マニュアルモードでは、変換先のフォーマット・サンプルレート・ビット深度（またはビットレート）をユーザーが直接指定できます。",
            )}
          </Paragraph>
          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("変換先フォーマット")}</Th>
                  <Th>{t("選択可能なサンプルレート")}</Th>
                  <Th>{t("選択可能なビット深度 / ビットレート")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>WAV</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>16 / 24 bit</Td>
                </Tr>
                <Tr>
                  <Td>AIFF</Td>
                  <Td>44.1 / 48 / 88.2 / 96 kHz</Td>
                  <Td>16 / 24 bit</Td>
                </Tr>
                <Tr>
                  <Td>MP3</Td>
                  <Td>44.1 / 48 kHz</Td>
                  <Td>128 / 192 / 256 / 320 kbps</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>
        </Section>

        {/* Section 3: Examples */}
        <Section id="examples">
          <SectionTitle>{t("変換例")}</SectionTitle>
          <Paragraph>
            {t("以下は、自動最適化モードでの具体的な変換例です。")}
          </Paragraph>

          {conversionExamples.map((example, index) => (
            <ExampleCard key={index}>
              <ExampleTitle>
                {t("例")} {index + 1}: {example.title}
              </ExampleTitle>
              <ExampleFlow>
                <SpecBox>{example.input}</SpecBox>
                <Arrow>+</Arrow>
                <SpecBox>{example.model}</SpecBox>
                {example.targetFormat !== "-" && (
                  <>
                    <Arrow>→</Arrow>
                    <SpecBox>
                      {t("変換先")}: {example.targetFormat}
                    </SpecBox>
                  </>
                )}
                <Arrow>→</Arrow>
                <SpecBox $accent>{example.output}</SpecBox>
              </ExampleFlow>
              <ExampleReason>{t(example.reason)}</ExampleReason>
            </ExampleCard>
          ))}
        </Section>

        {/* Section 4: Skip Rules */}
        <Section id="skip-rules">
          <SectionTitle>{t("スキップされる変換")}</SectionTitle>
          <Paragraph>
            {t(
              "以下のケースでは、品質が向上しないため変換がスキップされます。",
            )}
          </Paragraph>
          <BulletList>
            <ListItem>
              <strong>{t("同一フォーマット変換")}</strong>
              {t(
                " — 元のフォーマットと変換先フォーマットが同じ場合（例: WAV → WAV）",
              )}
            </ListItem>
            <ListItem>
              <strong>{t("ロッシー → ロスレス変換")}</strong>
              {t(
                " — MP3やAACなどのロッシー形式からWAVやAIFFなどのロスレス形式への変換（例: MP3 → WAV）。ロッシー圧縮で失われた情報はロスレス変換では復元できません。",
              )}
            </ListItem>
          </BulletList>
          <NoteBox>
            <NoteLabel>{t("補足:")}</NoteLabel>
            {t(
              "スキップ対象のトラックは変換実行時に自動的に除外され、変換の事前サマリに内訳が表示されます。",
            )}
          </NoteBox>
        </Section>

        {/* Section 5: Safety */}
        <Section id="safety">
          <SectionTitle>{t("安全機能")}</SectionTitle>

          <SubTitle>{t("バックアップと復元")}</SubTitle>
          <BulletList>
            <ListItem>
              {t(
                "変換前のオリジナルファイルは自動的にバックアップディレクトリに保存されます。",
              )}
            </ListItem>
            <ListItem>
              {t(
                "変換後でも、いつでもオリジナルのフォーマットに復元（リバート）できます。",
              )}
            </ListItem>
            <ListItem>
              {t(
                "変換中にアプリがクラッシュした場合、次回起動時に自動的に復旧処理が実行されます（オーファンリカバリ）。",
              )}
            </ListItem>
          </BulletList>

          <SubTitle>{t("プラン別の制限")}</SubTitle>
          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("プラン")}</Th>
                  <Th>{t("一括変換の上限")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>Free</Td>
                  <Td>{t("100トラックまで")}</Td>
                </Tr>
                <Tr>
                  <Td>Pro</Td>
                  <Td>{t("無制限")}</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>
        </Section>

        {/* Section 6: Technical */}
        <Section id="technical">
          <SectionTitle>{t("技術仕様")}</SectionTitle>
          <Paragraph>
            {t(
              "音声変換にはFFmpegを使用しています。各フォーマットで使用されるコーデックは以下の通りです。",
            )}
          </Paragraph>
          <CodeBlock>
            {`WAV  : pcm_s16le / pcm_s24le
AIFF : pcm_s16be / pcm_s24be
MP3  : libmp3lame (CBR)`}
          </CodeBlock>
          <BulletList>
            <ListItem>
              {t(
                "WAVはリトルエンディアン、AIFFはビッグエンディアンのPCMコーデックを使用します。",
              )}
            </ListItem>
            <ListItem>
              {t(
                "変換時にオリジナルファイルのメタデータ（タイトル、アーティスト等）は保持されます。",
              )}
            </ListItem>
            <ListItem>
              {t(
                "変換後のファイルは元ファイルと同じディレクトリに出力されます。ファイル名が重複する場合は連番が付与されます。",
              )}
            </ListItem>
          </BulletList>
        </Section>

        <HomeLink href="/">&larr; {t("トップページに戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function CdjConversion() {
  return (
    <TranslationProvider>
      <Header />
      <CdjConversionContent />
      <Footer />
    </TranslationProvider>
  );
}
