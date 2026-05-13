import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { colors, fonts, media, spacing } from "../styles/theme";
import { useTranslation } from "../i18n";
import TweetCard from "./TweetCard";
import type { CachedTweet } from "./TweetCard";
import tweetsData from "../data/tweets.json";

const tweets = tweetsData as CachedTweet[];

const Section = styled.section`
  padding: ${spacing.sectionPadding} 0;
  background-color: ${colors.bgSecondary};

  ${media.md} {
    padding: ${spacing.sectionPadding} 1.5rem;
  }
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

const Viewport = styled.div`
  overflow: hidden;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4%;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${colors.bgSecondary}, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${colors.bgSecondary}, transparent);
  }

  ${media.md} {
    &::before,
    &::after {
      width: 8%;
    }
  }
`;

const EmblaContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Slide = styled.div`
  flex: 0 0 92%;
  min-width: 0;
  padding: 0 0.5rem;
  display: flex;

  ${media.md} {
    flex: 0 0 50%;
    padding: 0 2rem;
  }

  & > * {
    width: 100%;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 3rem;
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

export default function UserVoices() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
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

  if (tweets.length === 0) return null;

  return (
    <Section id="user-voices">
      <Container>
        <SectionTitle>{t("ユーザーの声")}</SectionTitle>
        <Viewport ref={emblaRef}>
          <EmblaContainer>
            {tweets.map((tweet) => (
              <Slide key={tweet.id_str}>
                <TweetCard tweet={tweet} />
              </Slide>
            ))}
          </EmblaContainer>
        </Viewport>
        {tweets.length > 1 && (
          <Dots>
            {tweets.map((tweet, i) => (
              <Dot
                key={tweet.id_str}
                $active={i === selectedIndex}
                onClick={() => goTo(i)}
                aria-label={`Tweet ${i + 1}`}
              />
            ))}
          </Dots>
        )}
      </Container>
    </Section>
  );
}
