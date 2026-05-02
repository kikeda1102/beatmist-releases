import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { TranslationProvider, useTranslation } from "../i18n";
import Header from "./Header";
import Footer from "./Footer";

interface Asset {
  readonly name: string;
  readonly platform: string;
  readonly downloads: number;
}

interface Release {
  readonly version: string;
  readonly date: string;
  readonly subtotal: number;
  readonly assets: readonly Asset[];
}

interface DownloadsData {
  readonly total: number;
  readonly releases: readonly Release[];
}

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

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-align: center;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 3rem;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const StatLabel = styled.p`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  line-height: 1.2;
`;

const StatSub = styled.p`
  font-size: 0.8125rem;
  color: ${colors.textSecondary};
  margin-top: 0.375rem;
`;

const SectionHeading = styled.h2`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 1rem;

  ${media.md} {
    font-size: 1.375rem;
  }
`;

const ChartSection = styled.section`
  margin-bottom: 3rem;
`;

const BarRow = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr 3.5rem;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  ${media.md} {
    grid-template-columns: 6rem 1fr 4rem;
  }
`;

const BarLabel = styled.span`
  font-size: 0.75rem;
  color: ${colors.textSecondary};
  text-align: right;
  white-space: nowrap;

  ${media.md} {
    font-size: 0.8125rem;
  }
`;

const BarTrack = styled.div`
  height: 24px;
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.25rem;
  overflow: hidden;
`;

const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  min-width: 2px;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(90deg, ${colors.accent}, ${colors.accentHover});
  border-radius: 0.25rem 0 0 0.25rem;
  transition: width 0.4s ease;
`;

const BarCount = styled.span`
  font-size: 0.75rem;
  color: ${colors.textMuted};
  font-variant-numeric: tabular-nums;

  ${media.md} {
    font-size: 0.8125rem;
  }
`;

const ReleaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReleaseCard = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
`;

const ReleaseHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-bottom: 1rem;
`;

const VersionTag = styled.span`
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.accent};
`;

const ReleaseDate = styled.span`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
`;

const SubtotalBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  background: rgba(245, 240, 250, 0.08);
  border-radius: 0.25rem;
  padding: 0.1rem 0.5rem;
  margin-left: auto;
`;

const AssetRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0;

  & + & {
    border-top: 1px solid ${colors.border};
  }
`;

const PlatformIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${colors.textMuted};
`;

const AssetName = styled.span`
  font-size: 0.8125rem;
  color: ${colors.textSecondary};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AssetCount = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
`;

function WindowsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 71.48l-.026-25.55zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
    </svg>
  );
}

function MacIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.8-105.6-209.6-105.6-330.5 0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.5zm-169.5-145.8c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 103.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function formatDate(dateStr: string, locale: string): string {
  const [year, month, day] = dateStr.split("-");
  if (locale === "en") {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
  }
  return `${year}/${month}/${day}`;
}

function DashboardContent() {
  const { t, locale } = useTranslation();
  const [data, setData] = useState<DownloadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/downloads")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: DownloadsData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const releases = data?.releases ?? [];

  const platformTotals = releases.reduce(
    (acc, release) => {
      release.assets.forEach((asset) => {
        if (asset.platform === "win") acc.win += asset.downloads;
        if (asset.platform === "mac") acc.mac += asset.downloads;
      });
      return acc;
    },
    { win: 0, mac: 0 },
  );

  const maxSubtotal = Math.max(...releases.map((r) => r.subtotal), 1);

  return (
    <Page>
      <Container>
        <Title>{t("ダウンロード統計")}</Title>
        <Lead>{t("BeatMistのダウンロード統計です。")}</Lead>

        {loading && <StatusText>{t("読み込み中...")}</StatusText>}
        {error && (
          <StatusText>
            {t("ダウンロード統計の取得に失敗しました。")}
          </StatusText>
        )}

        {!loading && !error && data && (
          <>
            <StatsGrid>
              <StatCard>
                <StatLabel>{t("合計ダウンロード数")}</StatLabel>
                <StatValue>{data.total.toLocaleString(locale)}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>{t("プラットフォーム別")}</StatLabel>
                <StatValue>
                  {(platformTotals.win + platformTotals.mac).toLocaleString(locale)}
                </StatValue>
                <StatSub>
                  Win: {platformTotals.win.toLocaleString(locale)} / Mac:{" "}
                  {platformTotals.mac.toLocaleString(locale)}
                </StatSub>
              </StatCard>
              <StatCard>
                <StatLabel>{t("リリース数")}</StatLabel>
                <StatValue>
                  {releases.length}
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: colors.textMuted,
                      marginLeft: "0.25rem",
                    }}
                  >
                    {t("件")}
                  </span>
                </StatValue>
              </StatCard>
            </StatsGrid>

            <ChartSection>
              <SectionHeading>
                {t("バージョン別ダウンロード数")}
              </SectionHeading>
              {releases.map((release) => (
                <BarRow key={release.version}>
                  <BarLabel>{release.version}</BarLabel>
                  <BarTrack>
                    <BarFill
                      $width={(release.subtotal / maxSubtotal) * 100}
                    />
                  </BarTrack>
                  <BarCount>
                    {release.subtotal.toLocaleString(locale)}
                  </BarCount>
                </BarRow>
              ))}
            </ChartSection>

            <SectionHeading>{t("リリース別内訳")}</SectionHeading>
            <ReleaseList>
              {releases.map((release) => (
                <ReleaseCard key={release.version}>
                  <ReleaseHeader>
                    <VersionTag>{release.version}</VersionTag>
                    <ReleaseDate>
                      {formatDate(release.date, locale)}
                    </ReleaseDate>
                    <SubtotalBadge>
                      {release.subtotal.toLocaleString(locale)} {t("ダウンロード")}
                    </SubtotalBadge>
                  </ReleaseHeader>
                  {release.assets.map((asset) => (
                    <AssetRow key={asset.name}>
                      <PlatformIcon aria-hidden="true">
                        {asset.platform === "win" ? (
                          <WindowsIcon />
                        ) : (
                          <MacIcon />
                        )}
                      </PlatformIcon>
                      <AssetName title={asset.name}>{asset.name}</AssetName>
                      <AssetCount>
                        {asset.downloads.toLocaleString(locale)}
                      </AssetCount>
                    </AssetRow>
                  ))}
                </ReleaseCard>
              ))}
            </ReleaseList>
          </>
        )}

        <HomeLink href="/">&larr; {t("トップページに戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function DownloadsDashboard() {
  return (
    <TranslationProvider>
      <Header />
      <DashboardContent />
      <Footer />
    </TranslationProvider>
  );
}
