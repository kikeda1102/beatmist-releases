import styled, { css } from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { pricingTiers } from "../data/content";
import { useTranslation } from "../i18n";
import Badge from "./shared/Badge";
import Button from "./shared/Button";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgPrimary};
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
  max-width: 800px;
  margin: 0 auto;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div<{ $recommended: boolean }>`
  background-color: ${colors.bgCard};
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ $recommended }) =>
    $recommended
      ? css`
          border: 2px solid ${colors.accent};
        `
      : css`
          border: 1px solid ${colors.border};
        `}
`;

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const TierNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TierName = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const Price = styled.div`
  font-family: ${fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  line-height: 1.2;
`;

const PriceNote = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.textSecondary};
  margin-left: 0.5rem;
`;

const TierDescription = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin-top: 0.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.textSecondary};

  &::before {
    content: "\\2713";
    color: ${colors.success};
    font-weight: 700;
    flex-shrink: 0;
  }
`;

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <Section id="pricing">
      <Container>
        <SectionTitle>{t("料金プラン")}</SectionTitle>
        <Grid>
          {pricingTiers.map((tier) => (
            <Card key={tier.name} $recommended={tier.recommended}>
              <CardHeader>
                <TierNameRow>
                  <TierName>{tier.name}</TierName>
                  {tier.recommended && (
                    <Badge text={t("おすすめ")} variant="recommended" />
                  )}
                </TierNameRow>
                <Price>
                  {tier.price}
                  {tier.priceNote && (
                    <PriceNote>{t(tier.priceNote)}</PriceNote>
                  )}
                </Price>
                <TierDescription>{t(tier.description)}</TierDescription>
              </CardHeader>
              <FeatureList>
                {tier.features.map((feature) => (
                  <FeatureItem key={feature}>{t(feature)}</FeatureItem>
                ))}
              </FeatureList>
              <Button
                href={tier.cta.href}
                variant={tier.recommended ? "primary" : "secondary"}
              >
                {t(tier.cta.label)}
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
