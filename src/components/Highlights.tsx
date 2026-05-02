import styled from "styled-components";
import { colors, fonts, spacing } from "../styles/theme";
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
`;

const Item = styled.div`
  text-align: center;
  padding: 2rem 0;
  border-bottom: 1px solid ${colors.border};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
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

  return (
    <Section>
      <Container>
        <List>
          {highlights.map((item) => (
            <Item key={item.title}>
              <ItemTitle>{t(item.title)}</ItemTitle>
              <ItemDescription>{t(item.description)}</ItemDescription>
              {item.href && (
                <ItemLink href={item.href}>
                  {t("詳しい仕様を見る")} &rarr;
                </ItemLink>
              )}
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}
