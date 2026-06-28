import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { colors, fonts, media, spacing } from "../styles/theme";
import { hero, site } from "../data/content";
import { useTranslation } from "../i18n";

const heroScreenshots = [
  { src: "/images/hero-screenshot-1.png", alt: "BeatMist - Library" },
  { src: "/images/hero-screenshot-2.png", alt: "BeatMist - Format Conversion" },
  { src: "/images/hero-screenshot-3.png", alt: "BeatMist - Track Selection" },
  { src: "/images/hero-screenshot-4.png", alt: "BeatMist - Settings" },
];

const heroBgRadialsStyle = {
  background: [
    "radial-gradient(ellipse 50% 35% at 55% 10%, #FF2D8A 0%, rgba(200, 56, 126, 0.3) 40%, transparent 70%)",
    "radial-gradient(ellipse 30% 25% at 10% 30%, rgba(200, 56, 126, 0.35) 0%, transparent 65%)",
    "radial-gradient(ellipse 25% 20% at 90% 20%, rgba(255, 45, 138, 0.25) 0%, transparent 60%)",
  ].join(", "),
};

const Container = styled.div`
  position: relative;
  z-index: 3;
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

const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
  margin-top: 0.5rem;
`;

const CarouselContainer = styled.div`
  display: flex;
`;

const CarouselSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
`;

const SlideImage = styled.img`
  width: 100%;
  max-width: ${spacing.containerMax};
  border-radius: 0.75rem;
  border: 1px solid ${colors.border};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: ${({ $active }) =>
    $active ? colors.accent : colors.border};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? colors.accentHover : colors.borderHover};
  }
`;

export default function Hero() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
      WheelGesturesPlugin(),
    ],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const goTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <section data-hero>
      <div data-hero-bg="radials" style={heroBgRadialsStyle} />
      <picture data-hero-bg="picture">
        <source
          type="image/webp"
          srcSet="/images/hero-bg-960w.webp 960w, /images/hero-bg.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/images/hero-bg.webp"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="auto"
          draggable={false}
        />
      </picture>
      <div data-hero-bg="fade" />
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
        <CarouselViewport ref={emblaRef}>
          <CarouselContainer>
            {heroScreenshots.map((screenshot) => (
              <CarouselSlide key={screenshot.src}>
                <SlideImage
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading="lazy"
                  decoding="async"
                />
              </CarouselSlide>
            ))}
          </CarouselContainer>
        </CarouselViewport>
        <Dots>
          {heroScreenshots.map((screenshot, i) => (
            <Dot
              key={screenshot.src}
              $active={i === selectedIndex}
              onClick={() => goTo(i)}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </Dots>
      </Container>
    </section>
  );
}
