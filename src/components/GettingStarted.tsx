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

const InlineLink = styled.a`
  color: ${colors.accent};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accentHover};
    text-decoration: underline;
  }
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

const ShowcaseImage = styled.img`
  width: 100%;
  max-width: 720px;
  border-radius: 0.5rem;
  border: 1px solid ${colors.border};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  margin: 1rem 0 1.5rem;
`;

const tocSections = [
  { id: "library", label: "楽曲ライブラリの登録" },
  { id: "waveform", label: "波形プレビューと試聴" },
  { id: "conversion", label: "CDJ機種別フォーマット変換" },
  { id: "backup", label: "バックアップと復元" },
  { id: "metadata", label: "メタデータ編集" },
  { id: "rekordbox", label: "Rekordbox連携" },
  { id: "license", label: "ライセンスについて" },
];

function GettingStartedContent() {
  const { t } = useTranslation();

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "BeatMist", href: "/" },
            { label: t("ドキュメント"), href: "/docs" },
            { label: t("使い方ガイド") },
          ]}
        />
        <Title>{t("使い方ガイド")}</Title>
        <Lead>{t("BeatMistの基本的な使い方を説明します。")}</Lead>

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

        {/* Section 1: Library */}
        <Section id="library">
          <SectionTitle>{t("楽曲ライブラリの登録")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistでは、楽曲ファイルが保存されたフォルダを登録してスキャンすることで、ライブラリを構築します。",
            )}
          </Paragraph>

          <SubTitle>{t("フォルダの追加とスキャン")}</SubTitle>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>
              <StepTitle>{t("フォルダを追加")}</StepTitle>
              <br />
              {t(
                "ツールバーのフォルダ管理ボタンからフォルダを選択して追加します。",
              )}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              <StepTitle>{t("自動スキャン")}</StepTitle>
              <br />
              {t(
                "フォルダを追加すると、自動的にフォルダ内の楽曲ファイルがスキャンされます。",
              )}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>
              <StepTitle>{t("ライブラリに表示")}</StepTitle>
              <br />
              {t(
                "スキャンが完了すると、検出された楽曲がメタデータとともに一覧表示されます。",
              )}
            </StepText>
          </StepItem>

          <ShowcaseImage
            src="/images/showcase/library.png"
            alt={t("フォルダ管理画面")}
          />

          <SubTitle>{t("対応フォーマット")}</SubTitle>
          <BulletList>
            <ListItem>WAV</ListItem>
            <ListItem>MP3</ListItem>
            <ListItem>AIFF</ListItem>
            <ListItem>FLAC</ListItem>
            <ListItem>M4A (AAC / ALAC)</ListItem>
          </BulletList>

          <SubTitle>{t("表示されるメタデータ")}</SubTitle>
          <Paragraph>
            {t(
              "各トラックについて、以下のメタデータが自動的に読み取られ表示されます。",
            )}
          </Paragraph>
          <BulletList>
            <ListItem>Title / Artist / Album / Genre</ListItem>
            <ListItem>BPM / Key</ListItem>
            <ListItem>Comment</ListItem>
            <ListItem>
              {t("Duration / Bitrate / Sample Rate / Bit Depth / File Size")}
            </ListItem>
          </BulletList>

          <SubTitle>{t("検索とソート")}</SubTitle>
          <Paragraph>
            {t(
              "ファイル名、Title、Artist、Album、Genre、Commentでフルテキスト検索が可能です。各カラムのヘッダーをクリックするとソートできます。",
            )}
          </Paragraph>
        </Section>

        {/* Section 2: Waveform */}
        <Section id="waveform">
          <SectionTitle>{t("波形プレビューと試聴")}</SectionTitle>
          <Paragraph>
            {t(
              "トラックを選択すると、画面下部に波形が描画されます。アプリ内でそのまま再生できるので、楽曲の内容をすばやく確認できます。",
            )}
          </Paragraph>
          <ShowcaseImage
            src="/images/showcase/waveform.png"
            alt={t("波形プレビューとトラック一覧")}
          />
          <BulletList>
            <ListItem>
              {t("トラックをクリックして選択すると波形が表示されます")}
            </ListItem>
            <ListItem>
              {t("再生ボタンまたは波形をクリックして再生できます")}
            </ListItem>
            <ListItem>
              {t(
                "シークバーで任意の位置にジャンプ、ボリュームスライダーで音量調整が可能です",
              )}
            </ListItem>
          </BulletList>
        </Section>

        {/* Section 3: CDJ Conversion */}
        <Section id="conversion">
          <SectionTitle>{t("CDJ機種別フォーマット変換")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistの中核機能です。設定したCDJ機種に合わせて、楽曲ファイルのフォーマット・サンプルレート・ビット深度を自動的に最適化します。",
            )}
          </Paragraph>

          <SubTitle>{t("CDJ機種の設定")}</SubTitle>
          <Paragraph>
            {t(
              "設定画面からお使いのCDJ機種を選択してください。CDJ-3000X、CDJ-3000、CDJ-2000NXS2、CDJ-2000NXS、CDJ-900NXS、CDJ-900の6機種に対応しています。",
            )}
          </Paragraph>
          <ShowcaseImage
            src="/images/showcase/cdj-select.png"
            alt={t("CDJ機種選択画面")}
          />

          <SubTitle>{t("自動モード")}</SubTitle>
          <Paragraph>
            {t(
              "自動モードでは、選択したCDJ機種で再生できないフォーマットのトラックを自動検出し、互換性のあるスペックに変換します。元のサンプルレート・ビット深度を可能な限り維持しつつ、CDJの許容範囲内に最適化します。",
            )}
          </Paragraph>
          <ShowcaseImage
            src="/images/showcase/problem-badge.png"
            alt={t("非対応フォーマットの自動検出画面")}
          />

          <SubTitle>{t("マニュアルモード")}</SubTitle>
          <Paragraph>
            {t(
              "マニュアルモードでは、変換先のフォーマット（AIFF / WAV / MP3）、サンプルレート、ビット深度（またはビットレート）を直接指定して変換できます。",
            )}
          </Paragraph>

          <NoteBox>
            <NoteLabel>{t("詳細:")}</NoteLabel>
            {t("変換ロジックや機種別スペックの詳細については")}{" "}
            <InlineLink href="/docs/conversion">{t("変換仕様ドキュメント")}</InlineLink>
            {t(" をご確認ください。")}
          </NoteBox>
        </Section>

        {/* Section 4: Backup */}
        <Section id="backup">
          <SectionTitle>{t("バックアップと復元")}</SectionTitle>
          <Paragraph>
            {t(
              "フォーマット変換時にオリジナルファイルが失われないよう、自動バックアップ機能を搭載しています。",
            )}
          </Paragraph>

          <SubTitle>{t("自動バックアップ")}</SubTitle>
          <Paragraph>
            {t(
              "変換を実行すると、変換前のオリジナルファイルはアプリのバックアップディレクトリに自動的に保存されます。ユーザーの操作は不要です。",
            )}
          </Paragraph>

          <SubTitle>{t("ワンクリック復元")}</SubTitle>
          <Paragraph>
            {t(
              "変換済みのトラックは、ツールバーのリバートボタンからワンクリックでオリジナルのフォーマットに復元できます。",
            )}
          </Paragraph>
          <ShowcaseImage
            src="/images/showcase/backup-revert.png"
            alt={t("バックアップからの復元UI")}
          />

          <SubTitle>{t("バックアップの管理")}</SubTitle>
          <Paragraph>
            {t(
              "設定画面から、バックアップの合計サイズの確認や、バックアップファイルの一括削除が可能です。",
            )}
          </Paragraph>

          <NoteBox>
            <NoteLabel>{t("注意:")}</NoteLabel>
            {t(
              "バックアップを削除すると、そのトラックのオリジナルファイルへの復元ができなくなります。削除前にご確認ください。",
            )}
          </NoteBox>
        </Section>

        {/* Section 5: Metadata */}
        <Section id="metadata">
          <SectionTitle>{t("メタデータ編集")}</SectionTitle>
          <Paragraph>
            {t(
              "ライブラリに表示されたトラックのメタデータ（ID3タグ）をアプリ上で直接編集し、ファイルに書き戻すことができます。",
            )}
          </Paragraph>
          <ShowcaseImage
            src="/images/showcase/metadata-edit.png"
            alt={t("メタデータのインライン編集")}
          />

          <SubTitle>{t("編集可能なフィールド")}</SubTitle>
          <BulletList>
            <ListItem>Title</ListItem>
            <ListItem>Artist</ListItem>
            <ListItem>Album</ListItem>
            <ListItem>Genre</ListItem>
            <ListItem>Key</ListItem>
            <ListItem>Comment</ListItem>
          </BulletList>

          <SubTitle>{t("対応フォーマット")}</SubTitle>
          <Paragraph>
            {t(
              "現在、メタデータの書き戻し（タグ編集）に対応しているフォーマットはMP3のみです。その他のフォーマットではメタデータの閲覧は可能ですが、編集・保存には対応していません。",
            )}
          </Paragraph>

          <NoteBox>
            <NoteLabel>{t("補足:")}</NoteLabel>
            {t(
              "AIFF / WAV / FLAC 等への書き戻し対応は今後のアップデートで予定しています。",
            )}
          </NoteBox>

          <SubTitle>{t("Rekordboxへの反映")}</SubTitle>
          <Paragraph>
            {t(
              "BeatMistで編集したメタデータはファイルのID3タグに直接書き込まれます。Rekordboxで対象トラックを再インポート（またはコレクション更新）することで、変更内容がRekordbox側に反映されます。",
            )}
          </Paragraph>
        </Section>

        {/* Section 6: Rekordbox */}
        <Section id="rekordbox">
          <SectionTitle>{t("Rekordbox連携")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistはRekordboxのコレクションデータベースを自動的に検出し、各トラックのインポート状況を表示します。",
            )}
          </Paragraph>

          <SubTitle>{t("自動検出")}</SubTitle>
          <Paragraph>
            {t(
              "Rekordboxがインストールされている場合、そのデータベースファイルを自動的に検出します。特別な設定は不要です。",
            )}
          </Paragraph>

          <SubTitle>{t("インポート状況の表示")}</SubTitle>
          <Paragraph>
            {t(
              "ライブラリの各トラックについて、Rekordboxへのインポート状況がバッジで表示されます。",
            )}
          </Paragraph>
          <ShowcaseImage
            src="/images/showcase/rekordbox-status.png"
            alt={t("Rekordboxインポート状況の表示")}
          />
          <BulletList>
            <ListItem>
              {t(
                "インポート済み — Rekordboxコレクションに登録されているトラック",
              )}
            </ListItem>
            <ListItem>
              {t("未インポート — まだRekordboxに取り込まれていないトラック")}
            </ListItem>
          </BulletList>

          <SubTitle>{t("ステータスの更新")}</SubTitle>
          <Paragraph>
            {t(
              "Rekordboxでトラックを追加・削除した場合は、BeatMistのRekordboxステータスを手動で更新できます。キャッシュがあるため、通常は高速に反映されます。",
            )}
          </Paragraph>
        </Section>

        {/* Section 7: License */}
        <Section id="license">
          <SectionTitle>{t("ライセンスについて")}</SectionTitle>
          <Paragraph>
            {t(
              "BeatMistはFreeプランとProプランの2つのプランを提供しています。Freeプランでもすべての機能を利用できますが、一括変換のトラック数に制限があります。",
            )}
          </Paragraph>

          <TableWrapper>
            <SpecTable>
              <Thead>
                <tr>
                  <Th>{t("プラン")}</Th>
                  <Th>{t("利用可能な機能")}</Th>
                  <Th>{t("一括変換の上限")}</Th>
                </tr>
              </Thead>
              <tbody>
                <Tr>
                  <Td>Free</Td>
                  <Td>{t("すべての機能")}</Td>
                  <Td>{t("100トラックまで")}</Td>
                </Tr>
                <Tr>
                  <Td>Pro</Td>
                  <Td>{t("すべての機能 + 優先サポート")}</Td>
                  <Td>{t("無制限")}</Td>
                </Tr>
              </tbody>
            </SpecTable>
          </TableWrapper>

          <SubTitle>{t("Proライセンスのアクティベート")}</SubTitle>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>{t("購入後に届くライセンスキーを準備します")}</StepText>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              {t("BeatMistの設定画面で「ライセンス」を開きます")}
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>
              {t("ライセンスキーを入力して「アクティベート」をクリックします")}
            </StepText>
          </StepItem>

          <NoteBox>
            <NoteLabel>{t("補足:")}</NoteLabel>
            {t(
              "1つのライセンスキーで最大3台のPCにアクティベートできます。使用しなくなったPCのアクティベーションは設定画面から解除できます。",
            )}
          </NoteBox>
        </Section>

        <HomeLink href="/docs">&larr; {t("ドキュメント一覧に戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function GettingStarted() {
  return (
    <TranslationProvider>
      <Header />
      <GettingStartedContent />
      <Footer />
    </TranslationProvider>
  );
}
