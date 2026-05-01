import styled from "styled-components";
import { colors, fonts, spacing } from "../styles/theme";
import { useTranslation } from "../i18n";

const Wrapper = styled.div`
  padding: 0 1.5rem 2.5rem;
  background-color: ${colors.bgSecondary};
`;

const Inner = styled.p`
  max-width: 720px;
  margin: 0 auto;
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 1.6;
`;

const StyledLink = styled.a`
  color: ${colors.accent};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accentHover};
  }
`;

export default function RoadmapBanner() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Inner>
        {t("今後のアップデート予定は")}
        <StyledLink href="/roadmap">
          {t("開発予定ページ")}
        </StyledLink>
        {t("をご覧ください")}
      </Inner>
    </Wrapper>
  );
}
