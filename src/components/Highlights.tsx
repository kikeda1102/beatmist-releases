import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { highlights } from "../data/content";
import { useTranslation } from "../i18n";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
`;

const dividerStyle = `
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 900px;
  margin: 0 auto;
`;

const TextOnlyItem = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 0;
  ${dividerStyle}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;

    &::after {
      display: none;
    }
  }
`;

const ImageItem = styled.div<{ $reverse: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 4rem;
  ${dividerStyle}

  &:last-child {
    padding-bottom: 0;

    &::after {
      display: none;
    }
  }

  ${media.md} {
    flex-direction: ${({ $reverse }) => ($reverse ? "row-reverse" : "row")};
    align-items: center;
    gap: 3rem;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 0.75rem;
  border: 1px solid ${colors.border};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  background-color: ${colors.bgSecondary};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.md} {
    width: 58%;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextWrapper = styled.div`
  text-align: center;

  ${media.md} {
    text-align: left;
    flex: 1;
  }
`;

const ItemTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.375rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
  white-space: pre-line;
`;

const ItemLink = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.accent};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accentHover};
  }
`;

export default function Highlights() {
  const { t } = useTranslation();

  let imageIndex = 0;

  return (
    <Section>
      <Container>
        <List>
          {highlights.map((item) => {
            if (item.image) {
              const reverse = imageIndex % 2 === 1;
              imageIndex++;
              return (
                <ImageItem key={item.title} $reverse={reverse}>
                  <TextWrapper>
                    <ItemTitle>{t(item.title)}</ItemTitle>
                    <ItemDescription>{t(item.description)}</ItemDescription>
                    {item.href && (
                      <ItemLink href={item.href}>
                        {t("詳しい仕様を見る")} &rarr;
                      </ItemLink>
                    )}
                  </TextWrapper>
                  <ImageWrapper>
                    <ItemImage
                      src={item.image}
                      alt={item.imageAlt ? t(item.imageAlt) : ""}
                    />
                  </ImageWrapper>
                </ImageItem>
              );
            }

            return (
              <TextOnlyItem key={item.title}>
                <ItemTitle>{t(item.title)}</ItemTitle>
                <ItemDescription>{t(item.description)}</ItemDescription>
                {item.href && (
                  <ItemLink href={item.href}>
                    {t("詳しい仕様を見る")} &rarr;
                  </ItemLink>
                )}
              </TextOnlyItem>
            );
          })}
        </List>
      </Container>
    </Section>
  );
}
