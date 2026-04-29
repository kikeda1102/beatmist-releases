import styled from "styled-components";
import { colors, spacing } from "../styles/theme";
import { boothCta } from "../data/content";
import { useTranslation } from "../i18n";
import Button from "./shared/Button";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  display: flex;
  justify-content: center;
`;

export default function BoothCta() {
  const { t } = useTranslation();

  return (
    <Section>
      <Button href={boothCta.href} variant="secondary" size="lg">
        {t(boothCta.label)}
      </Button>
    </Section>
  );
}
