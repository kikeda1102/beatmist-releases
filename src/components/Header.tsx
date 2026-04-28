import { useState } from "react";
import styled from "styled-components";
import { colors, media, spacing } from "../styles/theme";
import { navigation, site } from "../data/content";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${spacing.headerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 10, 15, 0.85);
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
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  letter-spacing: -0.025em;
`;

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  gap: 2rem;

  ${media.md} {
    display: flex;
  }

  @media (max-width: 767px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    position: absolute;
    top: ${spacing.headerHeight};
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    gap: 0;
    background-color: rgba(10, 10, 15, 0.95);
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

  ${media.md} {
    display: none;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <Container>
        <Logo href="#">{site.name}</Logo>
        <MenuButton
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </MenuButton>
        <Nav $open={menuOpen}>
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </Nav>
      </Container>
    </HeaderWrapper>
  );
}
