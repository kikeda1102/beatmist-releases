import { useState, useEffect } from "react";
import styled from "styled-components";
import { displayRoadmap } from "../config";
import { colors, fonts, media, spacing } from "../styles/theme";
import { TranslationProvider, useTranslation } from "../i18n";
import {
  fetchRoadmap,
  type RoadmapCategory,
  type RoadmapItem,
} from "../lib/parseRoadmap";
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

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-align: center;
`;

const CategorySection = styled.section`
  margin-bottom: 2.5rem;
`;

const CategoryHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1rem;

  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    flex-shrink: 0;
  }
`;

const CategoryName = styled.h2`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};

  ${media.md} {
    font-size: 1.375rem;
  }
`;

const CategoryCount = styled.span`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Card = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
`;

const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.p`
  font-family: ${fonts.heading};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 0.25rem;
`;

const CardDescription = styled.p`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
  line-height: 1.6;
`;

const PriorityBadge = styled.span<{ $priority: RoadmapItem["priority"] }>`
  display: inline-block;
  flex-shrink: 0;
  font-size: 0.6875rem;
  font-weight: 600;
  border-radius: 0.25rem;
  padding: 0.1rem 0.4rem;
  line-height: 1.4;

  ${({ $priority }) => {
    switch ($priority) {
      case "high":
        return `
          background: ${colors.accentSubtle};
          color: ${colors.accent};
        `;
      case "medium":
        return `
          background: rgba(245, 240, 250, 0.08);
          color: ${colors.textMuted};
        `;
      case "low":
        return `
          background: rgba(245, 240, 250, 0.04);
          color: rgba(245, 240, 250, 0.45);
        `;
    }
  }}
`;

const LastUpdated = styled.p`
  font-size: 0.8125rem;
  color: ${colors.textMuted};
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
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

const CATEGORY_COLORS: Record<string, string> = {
  planned: colors.accent,
  considering: colors.textMuted,
  completed: colors.success,
};

function getPriorityLabel(
  priority: RoadmapItem["priority"],
  t: (key: string) => string,
): string {
  switch (priority) {
    case "high":
      return t("優先度: 高");
    case "medium":
      return t("優先度: 中");
    case "low":
      return t("優先度: 低");
  }
}

function RoadmapContent() {
  const { t, locale } = useTranslation();
  const [categories, setCategories] = useState<RoadmapCategory[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRoadmap()
      .then((data) => {
        setCategories(data.categories);
        setLastUpdated(data.last_updated);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const isEn = locale === "en";
  const visibleCategories = categories.filter((c) => c.items.length > 0);

  return (
    <Page>
      <Container>
        <Title>{t("開発予定")}</Title>
        <Lead>{t("BeatMistの今後の開発予定です。")}</Lead>

        {loading && <StatusText>{t("読み込み中...")}</StatusText>}
        {error && (
          <StatusText>{t("開発予定の取得に失敗しました。")}</StatusText>
        )}

        {!loading &&
          !error &&
          visibleCategories.map((category) => (
            <CategorySection key={category.id}>
              <CategoryHeader
                $color={CATEGORY_COLORS[category.id] ?? colors.textMuted}
              >
                <CategoryName>
                  {isEn ? category.label_en : category.label}
                </CategoryName>
                <CategoryCount>({category.items.length})</CategoryCount>
              </CategoryHeader>
              <CardList>
                {category.items.map((item, i) => (
                  <Card key={i}>
                    <PriorityBadge $priority={item.priority}>
                      {getPriorityLabel(item.priority, t)}
                    </PriorityBadge>
                    <CardContent>
                      <CardTitle>{isEn ? item.title_en : item.title}</CardTitle>
                      <CardDescription>
                        {isEn ? item.description_en : item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </CardList>
            </CategorySection>
          ))}

        {lastUpdated && (
          <LastUpdated>
            {t("最終更新:")} {lastUpdated}
          </LastUpdated>
        )}
        <HomeLink href="/">&larr; {t("トップページに戻る")}</HomeLink>
      </Container>
    </Page>
  );
}

export default function Roadmap() {
  useEffect(() => {
    if (!displayRoadmap) {
      window.location.replace("/");
    }
  }, []);

  if (!displayRoadmap) return null;

  return (
    <TranslationProvider>
      <Header />
      <RoadmapContent />
      <Footer />
    </TranslationProvider>
  );
}
