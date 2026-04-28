import styled from "styled-components";
import { colors, media, spacing } from "../styles/theme";
import { footer, site } from "../data/content";

const FooterWrapper = styled.footer`
  padding: 3rem 1.5rem 2rem;
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

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Column = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 1rem;
  text-transform: uppercase;
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

const Copyright = styled.p`
  font-size: 0.75rem;
  color: ${colors.textMuted};
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <Column>
            <ColumnTitle>Product</ColumnTitle>
            <LinkList>
              {footer.product.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>Community</ColumnTitle>
            <LinkList>
              {footer.community.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>Legal</ColumnTitle>
            <LinkList>
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
        </Grid>
        <Divider />
        <Copyright>
          &copy; {footer.copyright}. All rights reserved.
        </Copyright>
      </Container>
    </FooterWrapper>
  );
}
