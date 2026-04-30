import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { footer, site } from "../data/content";
import { useTranslation } from "../i18n";

const FooterWrapper = styled.footer`
  padding: 3rem 1.5rem 3rem;
  background-color: ${colors.bgPrimary};
  border-top: 1px solid ${colors.border};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-items: center;
  text-align: center;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Column = styled.div``;

const ColumnTitle = styled.h4`
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.border};
  margin-bottom: 1.5rem;
`;

const LastUpdated = styled.p`
  font-size: 0.75rem;
  color: ${colors.textSecondary};
  text-align: center;
  margin-bottom: 0.75rem;
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  color: ${colors.textMuted};
  text-align: center;
`;

export default function Footer() {
  const { t } = useTranslation();
  const [buildDate, setBuildDate] = useState("");

  useEffect(() => {
    const meta = document.querySelector('meta[name="build-date"]');
    if (meta) {
      setBuildDate(meta.getAttribute("content") ?? "");
    }
  }, []);

  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <Column>
            <ColumnTitle>BeatMistについて</ColumnTitle>
            <LinkList>
              {footer.product.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{t(link.label)}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>{t("サポート")}</ColumnTitle>
            <LinkList>
              {footer.support.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{t(link.label)}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>CuraRmx</ColumnTitle>
            <LinkList>
              {footer.creator.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>{t("ユーザーコミュニティ")}</ColumnTitle>
            <LinkList>
              {footer.community.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
        </Grid>
        <Divider />
        {buildDate && <LastUpdated>Last updated: {buildDate}</LastUpdated>}
        <Copyright>&copy; {footer.copyright}. All rights reserved.</Copyright>
      </Container>
    </FooterWrapper>
  );
}
