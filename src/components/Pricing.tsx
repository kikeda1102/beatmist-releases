import styled, { css } from "styled-components";
import { colors, media, spacing } from "../styles/theme";
import { pricingTiers } from "../data/content";
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
          border: 2px solid ${colors.accentPurple};
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.15);
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
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  line-height: 1.2;
`;

const PriceNote = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${colors.textSecondary};
  margin-left: 0.5rem;
`;

const TierDescription = styled.p`
  font-size: 0.875rem;
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
  font-size: 0.875rem;
  color: ${colors.textSecondary};

  &::before {
    content: "✓";
    color: ${colors.accentTeal};
    font-weight: 700;
    flex-shrink: 0;
  }
`;

export default function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionTitle>Pricing</SectionTitle>
        <Grid>
          {pricingTiers.map((tier) => (
            <Card key={tier.name} $recommended={tier.recommended}>
              <CardHeader>
                <TierNameRow>
                  <TierName>{tier.name}</TierName>
                  {tier.recommended && (
                    <Badge text="Recommended" variant="recommended" />
                  )}
                </TierNameRow>
                <Price>
                  {tier.price}
                  {tier.priceNote && <PriceNote>{tier.priceNote}</PriceNote>}
                </Price>
                <TierDescription>{tier.description}</TierDescription>
              </CardHeader>
              <FeatureList>
                {tier.features.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
              </FeatureList>
              <Button
                href={tier.cta.href}
                variant={tier.recommended ? "primary" : "secondary"}
              >
                {tier.cta.label}
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
