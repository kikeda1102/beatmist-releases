import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { hero, site } from "../data/content";
import { useTranslation } from "../i18n";
import Button from "./shared/Button";

const Section = styled.section`
  min-height: calc(100vh - ${spacing.headerHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  overflow: hidden;
  background:
    linear-gradient(
      to bottom,
      ${colors.bgPrimary} 0%,
      transparent 40%,
      transparent 70%,
      ${colors.bgPrimary} 100%
    ),
    url("/images/hero-bg.webp") center bottom / cover no-repeat
      ${colors.bgPrimary};

  ${media.md} {
    padding: 4rem 2rem;
  }

  ${media.lg} {
    padding: 5rem 2rem;
  }
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  ${media.md} {
    gap: 2rem;
  }

  ${media.lg} {
    gap: 2.5rem;
  }
`;

const Headline = styled.h1`
  font-family: ${fonts.heading};
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1.0;
  background: linear-gradient(
    135deg,
    ${colors.textPrimary} 0%,
    ${colors.textPrimary} 30%,
    ${colors.accentHover} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter:
    drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))
    drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))
    drop-shadow(0 0 48px rgba(200, 56, 126, 0.25));

  ${media.md} {
    font-size: 7rem;
  }

  ${media.lg} {
    font-size: 8.5rem;
    letter-spacing: -0.06em;
  }

  ${media.xl} {
    font-size: 10rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.375rem;
  line-height: 1.7;
  color: ${colors.textPrimary};
  font-weight: 500;
  text-shadow:
    0 0 8px rgba(0, 0, 0, 0.8),
    0 0 24px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  white-space: pre-line;

  ${media.md} {
    font-size: 1.5rem;
  }

  ${media.lg} {
    font-size: 1.75rem;
  }

  ${media.xl} {
    font-size: 1.875rem;
  }
`;

const HeadlineWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;

  ${media.md} {
    padding: 7rem 0;
  }

  ${media.lg} {
    padding: 9rem 0;
  }
`;

const AppIconBg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  pointer-events: none;
  user-select: none;

  ${media.md} {
    width: 320px;
    height: 320px;
  }

  ${media.lg} {
    width: 380px;
    height: 380px;
  }

  ${media.xl} {
    width: 440px;
    height: 440px;
  }
`;

const ScreenshotImage = styled.img`
  width: 100%;
  max-width: 900px;
  border-radius: 0.75rem;
  border: 1px solid ${colors.border};
  margin-top: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export default function Hero() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <HeadlineWrapper>
          <AppIconBg src="/images/app-icon.png" alt="" aria-hidden="true" />
          <Headline>{hero.headline}</Headline>
        </HeadlineWrapper>
        <Tagline>{t(site.tagline)}</Tagline>
        <Button href={hero.cta.href} variant="primary" size="lg">
          {t(hero.cta.label)}
        </Button>
        <ScreenshotImage src="/images/screenshot.png" alt="BeatMist" />
      </Container>
    </Section>
  );
}
