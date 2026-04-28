import styled from "styled-components";
import { colors, media, spacing } from "../styles/theme";
import { download } from "../data/content";
import Button from "./shared/Button";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgSecondary};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${colors.textPrimary};

  ${media.md} {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: ${colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const Version = styled.span`
  display: inline-block;
  font-size: 0.875rem;
  color: ${colors.textMuted};
  margin-bottom: 2rem;
`;

const PlatformGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PlatformCard = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.accentPurple};
    transform: translateY(-2px);
  }
`;

const PlatformIcon = styled.span`
  font-size: 2.5rem;
`;

const PlatformName = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const PlatformNote = styled.span`
  font-size: 0.75rem;
  color: ${colors.textMuted};
`;

export default function Download() {
  return (
    <Section id="download">
      <Container>
        <SectionTitle>{download.heading}</SectionTitle>
        <Description>{download.description}</Description>
        <Version>{download.version}</Version>
        <PlatformGrid>
          {download.platforms.map((platform) => (
            <PlatformCard key={platform.name}>
              <PlatformIcon>{platform.icon}</PlatformIcon>
              <PlatformName>{platform.name}</PlatformName>
              <PlatformNote>{platform.note}</PlatformNote>
              <Button href={platform.href} variant="secondary" size="sm">
                Download
              </Button>
            </PlatformCard>
          ))}
        </PlatformGrid>
      </Container>
    </Section>
  );
}
