import { useState } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { features } from "../data/content";
import { useTranslation } from "../i18n";
import Lightbox from "./shared/Lightbox";
import ProblemBadgeMock from "./features/ProblemBadgeMock";
import BackupRevertMock from "./features/BackupRevertMock";
import MetadataEditMock from "./features/MetadataEditMock";
import RekordboxStatusMock from "./highlights/RekordboxStatusMock";
import RekordboxPlaylistMock from "./features/RekordboxPlaylistMock";
import LibraryMock from "./features/LibraryMock";

const svgMockComponents: Record<string, React.ComponentType> = {
  "/images/showcase/problem-badge.png": ProblemBadgeMock,
  "/images/showcase/backup-revert.png": BackupRevertMock,
  "/images/showcase/metadata-edit.png": MetadataEditMock,
  "/images/showcase/rekordbox-status.png": RekordboxStatusMock,
  "/images/showcase/rekordbox-playlist.png": RekordboxPlaylistMock,
  "/images/showcase/library.png": LibraryMock,
};

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
  overflow: hidden;
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

const LightboxMockWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 0.5rem;
  overflow: hidden;
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

const LightboxImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
`;

type LightboxState =
  | { type: "image"; src: string; alt: string }
  | { type: "mock"; key: string; alt: string }
  | null;

export default function Features() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const closeLightbox = () => setLightbox(null);

  const openLightbox = (imageKey: string, alt: string) => {
    if (svgMockComponents[imageKey]) {
      setLightbox({ type: "mock", key: imageKey, alt });
    } else {
      setLightbox({ type: "image", src: imageKey, alt });
    }
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
                    {svgMockComponents[image] ? (
                      (() => {
                        const MockComponent = svgMockComponents[image];
                        return <MockComponent />;
                      })()
                    ) : (
                      <CardImage src={image} alt={alt} />
                    )}
                  </CardImageWrapper>
                )}
                <CardHeader>
                  {feature.icon && <CardIcon>{feature.icon}</CardIcon>}
                  <CardTitle>{t(feature.title)}</CardTitle>
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
      {lightbox && (
        <Lightbox onClose={closeLightbox} ariaLabel={lightbox.alt}>
          {lightbox.type === "mock" && svgMockComponents[lightbox.key] ? (
            (() => {
              const MockComponent = svgMockComponents[lightbox.key];
              return (
                <LightboxMockWrapper>
                  <MockComponent />
                </LightboxMockWrapper>
              );
            })()
          ) : lightbox.type === "image" ? (
            <LightboxImage src={lightbox.src} alt={lightbox.alt} />
          ) : null}
        </Lightbox>
      )}
    </Section>
  );
}
