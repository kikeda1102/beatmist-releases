import { useState } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { navigation, site } from "../data/content";
import { useTranslation, x } from "../i18n";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${spacing.headerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(13, 11, 15, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${colors.border};
`;

const Container = styled.div`
  width: 100%;
  max-width: ${spacing.containerMax};
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  letter-spacing: -0.025em;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  gap: 2rem;

  ${media.lg} {
    display: flex;
  }

  @media (max-width: 1023px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    position: absolute;
    top: ${spacing.headerHeight};
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    gap: 0;
    background-color: rgba(13, 11, 15, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${colors.border};
    padding: 1rem 0;
  }
`;

const NavLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.textSecondary};
  transition: color 0.2s ease;
  padding: 0.5rem 0;
  white-space: nowrap;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;

  ${media.lg} {
    display: none;
  }
`;

const LangSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const GlobeIcon = styled.svg`
  width: 14px;
  height: 14px;
  color: ${colors.textMuted};
  flex-shrink: 0;
`;

const LangPill = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.border};
  border-radius: 9999px;
  overflow: hidden;
`;

const LangOption = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? colors.bgCardHover : "transparent")};
  border: none;
  color: ${({ $active }) => ($active ? colors.textPrimary : colors.textMuted)};
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.025em;
  line-height: 1;
  font-family: inherit;

  &:hover {
    color: ${colors.textPrimary};
    background: ${({ $active }) =>
      $active ? colors.bgCardHover : "rgba(255, 255, 255, 0.04)"};
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: -2px;
    border-radius: 9999px;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  return (
    <HeaderWrapper>
      <Container>
        <Logo
          href="/"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "instant" });
              window.history.replaceState(null, "", "/");
            }
          }}
        >
          {site.name}
        </Logo>
        <RightGroup>
          <Nav $open={menuOpen}>
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {t(item.label)}
              </NavLink>
            ))}
          </Nav>
          <LangSwitcher role="radiogroup" aria-label="Language">
            <GlobeIcon
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </GlobeIcon>
            <LangPill>
              <LangOption
                $active={locale === "ja"}
                onClick={() => setLocale("ja")}
                role="radio"
                aria-checked={locale === "ja"}
                aria-label={x("日本語")}
                lang="ja"
              >
                JA
              </LangOption>
              <LangOption
                $active={locale === "en"}
                onClick={() => setLocale("en")}
                role="radio"
                aria-checked={locale === "en"}
                aria-label="English"
                lang="en"
              >
                EN
              </LangOption>
            </LangPill>
          </LangSwitcher>
          <MenuButton
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </MenuButton>
        </RightGroup>
      </Container>
    </HeaderWrapper>
  );
}
