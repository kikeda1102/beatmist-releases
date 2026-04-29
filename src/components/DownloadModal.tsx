import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media } from "../styles/theme";
import { useTranslation } from "../i18n";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 1rem;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${colors.textMuted};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const Title = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.sm} {
    flex-direction: row;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  padding: 0.875rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  background: transparent;
  color: ${colors.textPrimary};
  border: 1px solid ${colors.border};

  &:hover {
    border-color: ${colors.borderHover};
    background-color: rgba(255, 255, 255, 0.03);
  }

  &[aria-disabled="true"] {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-align: center;
`;

const GITHUB_REPO = "kikeda1102/beatmist-releases";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface Props {
  onClose: () => void;
}

export default function DownloadModal({ onClose }: Props) {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<{
    mac: string | null;
    win: string | null;
  }>({ mac: null, win: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch releases");
        return res.json();
      })
      .then((data: { assets?: GitHubAsset[] }) => {
        const macAsset = data.assets?.find((a) => a.name.endsWith(".dmg"));
        const winAsset = data.assets?.find((a) => a.name.endsWith(".exe"));
        setAssets({
          mac: macAsset?.browser_download_url ?? null,
          win: winAsset?.browser_download_url ?? null,
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <Modal>
        <CloseButton onClick={onClose} aria-label="Close">
          ✕
        </CloseButton>
        <Title>{t("ダウンロード")}</Title>
        <Description>{t("お使いのOSを選択してください")}</Description>

        {loading && <StatusText>{t("読み込み中...")}</StatusText>}

        {error && (
          <StatusText>
            {t("ダウンロードリンクの取得に失敗しました。時間をおいて再度お試しください。")}
          </StatusText>
        )}

        {!loading && !error && (
          <ButtonGroup>
            <DownloadButton
              href={assets.mac ?? undefined}
              aria-disabled={!assets.mac}
            >
              macOS
            </DownloadButton>
            <DownloadButton
              href={assets.win ?? undefined}
              aria-disabled={!assets.win}
            >
              Windows
            </DownloadButton>
          </ButtonGroup>
        )}
      </Modal>
    </Backdrop>
  );
}
