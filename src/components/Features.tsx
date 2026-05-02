import { useCallback, useEffect, useState } from "react";
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
  cursor: pointer;
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 720px;
  width: 90vw;
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1rem;
`;

const LightboxImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

export default function Features() {
  const { t } = useTranslation();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    setLightboxAlt("");
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxSrc, closeLightbox]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  return (
    <Section id="features">
      <Container>
        <SectionTitle>{t("機能")}</SectionTitle>
        <Grid>
          {features.map((feature) => {
            const alt = feature.imageAlt ? t(feature.imageAlt) : "";
            const image = feature.image;
            return (
              <Card key={feature.title}>
                {image && (
                  <CardImageWrapper
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(image, alt)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(image, alt);
                      }
                    }}
                  >
                    <CardImage src={image} alt={alt} />
                  </CardImageWrapper>
                )}
                <CardHeader>
                  {feature.icon && <CardIcon>{feature.icon}</CardIcon>}
                  <CardTitle>{t(feature.title)}</CardTitle>
                  {feature.badge && (
                    <Badge text={feature.badge} variant="new" />
                  )}
                </CardHeader>
                <CardDescription>{t(feature.description)}</CardDescription>
                {feature.href && (
                  <CardLink href={feature.href}>
                    {t("詳しい仕様を見る")} &rarr;
                  </CardLink>
                )}
              </Card>
            );
          })}
        </Grid>
      </Container>
      {lightboxSrc && (
        <Overlay
          role="dialog"
          aria-label={lightboxAlt}
          onClick={closeLightbox}
        >
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxImage src={lightboxSrc} alt={lightboxAlt} />
            <CloseButton onClick={closeLightbox} aria-label="Close">
              &times;
            </CloseButton>
          </LightboxContent>
        </Overlay>
      )}
    </Section>
  );
}
