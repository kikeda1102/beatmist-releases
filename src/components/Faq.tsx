import type { ReactNode } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { faq } from "../data/content";
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

const List = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Item = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const QuestionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Label = styled.span`
  font-family: ${fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.accent};
  flex-shrink: 0;
`;

const QuestionText = styled.p`
  font-family: ${fonts.body};
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  line-height: 1.6;
`;

const AnswerRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const AnswerText = styled.p`
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  line-height: 1.8;
`;

const InlineLink = styled.a`
  color: ${colors.accent};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accentHover};
  }
`;

type FaqLinks = (typeof faq)["items"][number]["links"];

function renderWithLinks(
  text: string,
  links: FaqLinks,
  t: (key: string) => string,
): ReactNode {
  if (!links) return t(text);

  const translated = t(text);
  const parts = translated.split(/\{(\w+)\}/);

  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const link = links[part];
    if (!link) return `{${part}}`;
    return (
      <InlineLink
        key={part}
        href={link.href}
        {...(link.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {t(link.label)}
      </InlineLink>
    );
  });
}

export default function Faq() {
  const { t } = useTranslation();

  return (
    <Section id="faq">
      <Container>
        <SectionTitle>{t(faq.title)}</SectionTitle>
        <List>
          {faq.items.map((item) => (
            <Item key={item.question}>
              <QuestionRow>
                <Label>Q.</Label>
                <QuestionText>{t(item.question)}</QuestionText>
              </QuestionRow>
              <AnswerRow>
                <Label>A.</Label>
                <AnswerText>
                  {renderWithLinks(item.answer, item.links, t)}
                </AnswerText>
              </AnswerRow>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}
