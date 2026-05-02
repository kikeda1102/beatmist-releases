import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { download } from "../data/content";
import { useTranslation } from "../i18n";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(200, 56, 126, 0.08) 0%,
    ${colors.bgPrimary} 70%
  );
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${colors.textPrimary};

  ${media.md} {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.sm} {
    flex-direction: row;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex: 1;
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: ${colors.textPrimary};
  background: ${colors.bgCard};
  border: 1px solid ${colors.border};

  &:hover {
    border-color: ${colors.accent};
    background: ${colors.bgCardHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(200, 56, 126, 0.15);
  }

  &[aria-disabled="true"] {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const OsIcon = styled.span`
  display: flex;
  align-items: center;
  line-height: 1;
`;

const OsSubLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${colors.textMuted};
`;

const VersionBadge = styled.span`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${colors.textMuted};
  background: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  margin-top: 1.5rem;
`;

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-align: center;
`;

const SystemRequirements = styled.p`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
  margin-bottom: 2rem;
`;

const InstallNotes = styled.ul`
  list-style: disc;
  padding-left: 1.25rem;
  margin-top: 1.5rem;
  font-size: 0.8125rem;
  color: ${colors.textMuted};
  line-height: 1.7;
  text-align: left;
`;

const InstallNoteItem = styled.li`
  margin-bottom: 0.25rem;
`;

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name?: string;
  assets?: GitHubAsset[];
}

export default function Download() {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<{
    mac: string | null;
    win: string | null;
  }>({ mac: null, win: null });
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${download.githubRepo}/releases/latest`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch releases");
        return res.json();
      })
      .then((data: GitHubRelease) => {
        const macAsset = data.assets?.find((a) => a.name.endsWith(".dmg"));
        const winAsset = data.assets?.find((a) => a.name.endsWith(".exe"));
        setAssets({
          mac: macAsset?.browser_download_url ?? null,
          win: winAsset?.browser_download_url ?? null,
        });
        setVersion(data.tag_name ?? null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <Section id="download">
      <Container>
        <SectionTitle>{t(download.title)}</SectionTitle>
        <Description>{t(download.description)}</Description>
        <SystemRequirements>
          {t(
            "動作環境: Windows 10以降 / macOS 12以降（Apple Siliconのみ対応）",
          )}
        </SystemRequirements>

        {loading && <StatusText>{t("読み込み中...")}</StatusText>}

        {error && (
          <StatusText>
            {t(
              "ダウンロードリンクの取得に失敗しました。時間をおいて再度お試しください。",
            )}
          </StatusText>
        )}

        {!loading && !error && (
          <>
            <ButtonGroup>
              <DownloadButton
                href={assets.win ?? undefined}
                aria-disabled={!assets.win}
              >
                <OsIcon aria-hidden="true">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 88 88"
                    fill="currentColor"
                  >
                    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 71.48l-.026-25.55zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
                  </svg>
                </OsIcon>
                Windows
              </DownloadButton>
              <DownloadButton
                href={assets.mac ?? undefined}
                aria-disabled={!assets.mac}
              >
                <OsIcon aria-hidden="true">
                  <svg
                    width="32"
                    height="38"
                    viewBox="0 0 814 1000"
                    fill="currentColor"
                  >
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.8-105.6-209.6-105.6-330.5 0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.5zm-169.5-145.8c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 103.5-30.4 135.5-71.3z" />
                  </svg>
                </OsIcon>
                macOS
                <OsSubLabel>Apple Silicon</OsSubLabel>
              </DownloadButton>
            </ButtonGroup>
            {version && <VersionBadge>{version}</VersionBadge>}
            <InstallNotes>
              <InstallNoteItem>
                {t(
                  "Windowsでインストール時に「WindowsによってPCが保護されました」と警告が出ます。「詳細情報」→「実行」を押して、そのまま許可してインストールしてください。",
                )}
              </InstallNoteItem>
              <InstallNoteItem>
                {t(
                  "macOSで初回起動時に「開発元が未確認」と表示された場合は、右クリックから「開く」を選択してください。",
                )}
              </InstallNoteItem>
            </InstallNotes>
          </>
        )}
      </Container>
    </Section>
  );
}
