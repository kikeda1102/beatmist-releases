import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { hero, site } from "../data/content";
import { useTranslation } from "../i18n";

const Section = styled.section``;

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
  font-size: 1.625rem;
  line-height: 1.7;
  color: ${colors.textPrimary};
  font-weight: 700;
  text-shadow:
    0 0 16px rgba(0, 0, 0, 1),
    0 0 40px rgba(0, 0, 0, 0.9),
    0 2px 6px rgba(0, 0, 0, 1),
    0 0 80px rgba(0, 0, 0, 0.6);
  max-width: 600px;
  white-space: pre-line;

  ${media.md} {
    font-size: 2.125rem;
    max-width: 700px;
  }

  ${media.lg} {
    font-size: 2.5rem;
    max-width: 800px;
  }

  ${media.xl} {
    font-size: 2.75rem;
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

const Subtext = styled.p`
  font-size: 1.0625rem;
  line-height: 1.8;
  color: ${colors.textPrimary};
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow:
    0 0 16px rgba(0, 0, 0, 1),
    0 0 40px rgba(0, 0, 0, 0.9),
    0 2px 6px rgba(0, 0, 0, 1),
    0 0 80px rgba(0, 0, 0, 0.6);
  max-width: 600px;
  white-space: pre-line;

  ${media.md} {
    font-size: 1.2rem;
  }

  ${media.lg} {
    font-size: 1.3rem;
  }

  ${media.xl} {
    font-size: 1.4rem;
  }
`;

const MobileBr = styled.br`
  ${media.md} {
    display: none;
  }
`;

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.125rem 2.75rem;
  font-size: 1.2rem;
  font-family: ${fonts.heading};
  font-weight: 700;
  letter-spacing: 0.03em;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg,
    #00E5C8 0%,
    #2DB8B0 15%,
    #4A7EB0 30%,
    #6A50B0 45%,
    #8B2FB0 60%,
    ${colors.accent} 80%,
    ${colors.accentHover} 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top-color: rgba(255, 255, 255, 0.2);
  box-shadow:
    0 0 24px rgba(200, 56, 126, 0.3),
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(
      135deg,
      #00FFD9 0%,
      #30C8B8 15%,
      #5588B8 30%,
      #7858B8 45%,
      #A035C8 60%,
      ${colors.accentHover} 80%,
      #E85CA5 100%
    );
    border-color: rgba(0, 229, 200, 0.5);
    border-top-color: rgba(255, 255, 255, 0.3);
    box-shadow:
      0 0 36px rgba(200, 56, 126, 0.4),
      0 12px 32px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
    background: linear-gradient(
      135deg,
      #00CCB0 0%,
      #28A8A0 15%,
      #4470A0 30%,
      #6048A0 45%,
      #7A28A0 60%,
      #B03068 80%,
      ${colors.accent} 100%
    );
  }

  &:focus-visible {
    outline: 2px solid ${colors.accentHover};
    outline-offset: 3px;
  }

  ${media.md} {
    padding: 1.25rem 3rem;
    font-size: 1.3rem;
  }

  ${media.lg} {
    padding: 1.375rem 3.25rem;
    font-size: 1.375rem;
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
    <Section data-hero>
      <Container>
        <HeadlineWrapper>
          <AppIconBg src="/images/app-icon.webp" alt="" aria-hidden="true" />
          <Headline>{hero.headline}</Headline>
        </HeadlineWrapper>
        <Tagline>
          {t("DJのための")}
          <MobileBr />
          {t("プロフェッショナルな")}
          {"\n"}
          {t("音源ライブラリ管理ツール")}
        </Tagline>
        <Subtext>
          {t("楽曲をCDJごとの対応フォーマットに")}
          <MobileBr />
          {t("自動変換。")}
          {"\n"}
          {t("rekordboxのプレイリスト、マイタグも")}
          <MobileBr />
          {t("一括編集可能。")}
        </Subtext>
        <CtaButton href={hero.cta.href}>{t(hero.cta.label)}</CtaButton>
        <ScreenshotImage src="/images/screenshot.png" alt="BeatMist" />
      </Container>
    </Section>
  );
}
