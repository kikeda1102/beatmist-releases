import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Tweet } from "react-tweet";
import { colors, fonts, media, spacing } from "../styles/theme";
import { userVoices } from "../data/content";
import { useTranslation } from "../i18n";

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

const Viewport = styled.div`
  overflow: hidden;
  position: relative;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8%;
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
      width: 12%;
    }
  }
`;

const EmblaContainer = styled.div`
  display: flex;
`;

const Slide = styled.div`
  flex: 0 0 85%;
  min-width: 0;
  padding: 0 0.375rem;

  ${media.md} {
    flex: 0 0 55%;
    padding: 0 0.5rem;
  }

  & > div {
    --tweet-body-font-size: 1rem;
    --tweet-body-line-height: 1.35rem;
    --tweet-header-font-size: 0.85rem;
    --tweet-quoted-body-font-size: 0.82rem;
    --tweet-quoted-body-line-height: 1.1rem;
    --tweet-info-font-size: 0.82rem;
    --tweet-actions-font-size: 0.78rem;
    --tweet-container-margin: 0;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
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
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set());

  const visibleTweets = userVoices.filter(
    (tweet) => !failedIds.has(tweet.id),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
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

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, failedIds]);

  const goTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const handleError = useCallback((id: string) => {
    setFailedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  if (visibleTweets.length === 0) return null;

  return (
    <Section id="user-voices" data-theme="dark">
      <Container>
        <SectionTitle>{t("ユーザーの声")}</SectionTitle>
        <Viewport ref={emblaRef}>
          <EmblaContainer>
            {visibleTweets.map((tweet) => (
              <Slide key={tweet.id}>
                <Tweet
                  id={tweet.id}
                  onError={() => queueMicrotask(() => handleError(tweet.id))}
                />
              </Slide>
            ))}
          </EmblaContainer>
        </Viewport>
        {visibleTweets.length > 1 && (
          <Dots>
            {visibleTweets.map((tweet, i) => (
              <Dot
                key={tweet.id}
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
