import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { download } from "../data/content";
import { useTranslation } from "../i18n";
import { parseReleaseBody, type ReleaseChange } from "../lib/parseReleaseBody";

const INITIALLY_VISIBLE = 2;

interface Release {
  readonly version: string;
  readonly date: string;
  readonly changes: readonly ReleaseChange[];
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string | null;
}

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgSecondary};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${colors.textPrimary};

  ${media.md} {
    font-size: 2.5rem;
  }
`;

const ReleaseList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 0 auto;
  gap: 1.5rem;
`;

const ReleaseCard = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const ReleaseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const VersionTag = styled.span`
  display: inline-block;
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.accent};
  background: ${colors.accentSubtle};
  border: 1px solid ${colors.accent};
  border-radius: 1rem;
  padding: 0.2rem 0.75rem;
`;

const ReleaseDate = styled.span`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
`;

const ChangeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChangeItem = styled.li`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

const TypeBadge = styled.span<{ $variant: ReleaseChange["type"] }>`
  display: inline-block;
  flex-shrink: 0;
  font-size: 0.6875rem;
  font-weight: 600;
  border-radius: 0.25rem;
  padding: 0.1rem 0.4rem;
  line-height: 1.4;

  ${({ $variant }) => {
    switch ($variant) {
      case "added":
        return `
          background: ${colors.accentSubtle};
          color: ${colors.accent};
        `;
      case "changed":
        return `
          background: rgba(245, 240, 250, 0.08);
          color: ${colors.textMuted};
        `;
      case "fixed":
        return `
          background: rgba(52, 199, 89, 0.12);
          color: ${colors.success};
        `;
    }
  }}
`;

const ToggleButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.textMuted};
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.textPrimary};
    border-color: ${colors.borderHover};
  }
`;

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-align: center;
`;

function getTypeLabel(
  type: ReleaseChange["type"],
  t: (key: string) => string,
): string {
  switch (type) {
    case "added":
      return t("追加");
    case "changed":
      return t("変更");
    case "fixed":
      return t("修正");
  }
}

function formatDate(isoDate: string, locale: string): string {
  return new Date(isoDate).toLocaleDateString(
    locale === "ja" ? "ja-JP" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export default function ReleaseNotes() {
  const { t, locale } = useTranslation();
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${download.githubRepo}/releases`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch releases");
        return res.json();
      })
      .then((data: GitHubRelease[]) => {
        const parsed = data
          .filter((r) => r.body)
          .map((r) => ({
            version: r.tag_name,
            date: r.published_at,
            changes: parseReleaseBody(r.body ?? ""),
          }))
          .filter((r) => r.changes.length > 0);
        setReleases(parsed);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const hasMore = releases.length > INITIALLY_VISIBLE;
  const visible = showAll ? releases : releases.slice(0, INITIALLY_VISIBLE);

  if (loading || error || releases.length === 0) {
    return (
      <Section id="release-notes">
        <Container>
          <SectionTitle>{t("リリースノート")}</SectionTitle>
          {loading && <StatusText>{t("読み込み中...")}</StatusText>}
          {error && <StatusText>{t("リリースノートの取得に失敗しました。")}</StatusText>}
        </Container>
      </Section>
    );
  }

  return (
    <Section id="release-notes">
      <Container>
        <SectionTitle>{t("リリースノート")}</SectionTitle>
        <ReleaseList>
          {visible.map((release) => (
            <ReleaseCard key={release.version}>
              <ReleaseHeader>
                <VersionTag>{release.version}</VersionTag>
                <ReleaseDate>
                  {formatDate(release.date, locale)}
                </ReleaseDate>
              </ReleaseHeader>
              <ChangeList>
                {release.changes.map((change, i) => (
                  <ChangeItem key={i}>
                    <TypeBadge $variant={change.type}>
                      {getTypeLabel(change.type, t)}
                    </TypeBadge>
                    {change.description}
                  </ChangeItem>
                ))}
              </ChangeList>
            </ReleaseCard>
          ))}
          {hasMore && (
            <ToggleButton onClick={() => setShowAll((prev) => !prev)}>
              {showAll ? t("閉じる") : t("過去のバージョンを表示")}
            </ToggleButton>
          )}
        </ReleaseList>
      </Container>
    </Section>
  );
}
