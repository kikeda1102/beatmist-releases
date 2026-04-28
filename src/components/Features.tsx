import styled from "styled-components";
import { colors, media, spacing } from "../styles/theme";
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
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.bgCardHover};
    transform: translateY(-2px);
  }
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
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

export default function Features() {
  const { t } = useTranslation();

  return (
    <Section id="features">
      <Container>
        <SectionTitle>{t("機能紹介")}</SectionTitle>
        <Grid>
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardIcon>{feature.icon}</CardIcon>
                <CardTitle>{t(feature.title)}</CardTitle>
                {feature.badge && <Badge text={feature.badge} variant="new" />}
              </CardHeader>
              <CardDescription>{t(feature.description)}</CardDescription>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
