import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { features } from "../data/content";
import { useTranslation } from "../i18n";
import Badge from "./shared/Badge";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: background-color 0.2s ease;
  overflow: hidden;

  &:hover {
    background-color: ${colors.bgCardHover};
  }
`;

const CardImageWrapper = styled.div`
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid ${colors.border};
  background-color: ${colors.bgPrimary};
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const CardIcon = styled.span`
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  word-break: keep-all;
`;

const CardDescription = styled.p`
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

const CardLink = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${colors.accent};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accentHover};
  }
`;

export default function Features() {
  const { t } = useTranslation();

  return (
    <Section id="features">
      <Container>
        <SectionTitle>{t("機能")}</SectionTitle>
        <Grid>
          {features.map((feature) => (
            <Card key={feature.title}>
              {feature.image && (
                <CardImageWrapper>
                  <CardImage
                    src={feature.image}
                    alt={feature.imageAlt ? t(feature.imageAlt) : ""}
                  />
                </CardImageWrapper>
              )}
              <CardHeader>
                {feature.icon && <CardIcon>{feature.icon}</CardIcon>}
                <CardTitle>{t(feature.title)}</CardTitle>
                {feature.badge && <Badge text={feature.badge} variant="new" />}
              </CardHeader>
              <CardDescription>{t(feature.description)}</CardDescription>
              {feature.href && (
                <CardLink href={feature.href}>
                  {t("詳しい仕様を見る")} &rarr;
                </CardLink>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
