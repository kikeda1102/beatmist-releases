import styled from "styled-components";
import { colors, media, spacing } from "../styles/theme";
import { hero, site } from "../data/content";
import { useTranslation } from "../i18n";
import Button from "./shared/Button";

const Section = styled.section`
  min-height: calc(100vh - ${spacing.headerHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(139, 92, 246, 0.08) 0%,
    transparent 60%
  );
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;

const Headline = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  background: linear-gradient(
    135deg,
    ${colors.textPrimary} 0%,
    ${colors.accentPurpleLight} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media.md} {
    font-size: 4.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  color: ${colors.accentPurpleLight};
  font-weight: 500;

  ${media.md} {
    font-size: 1.5rem;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ScreenshotImage = styled.img`
  width: 100%;
  max-width: 900px;
  border-radius: 0.75rem;
  border: 1px solid ${colors.border};
  margin-top: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export default function Hero() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <Headline>{hero.headline}</Headline>
        <Tagline>{t(site.tagline)}</Tagline>
        <CTAGroup>
          <Button href={hero.primaryCta.href} variant="primary" size="lg">
            {t(hero.primaryCta.label)}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
            {t(hero.secondaryCta.label)}
          </Button>
        </CTAGroup>
        <ScreenshotImage src="/images/screenshot.png" alt="BeatMist" />
      </Container>
    </Section>
  );
}
