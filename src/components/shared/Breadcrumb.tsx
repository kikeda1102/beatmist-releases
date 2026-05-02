import styled from "styled-components";
import { colors } from "../../styles/theme";
import { useTranslation } from "../../i18n";

const Nav = styled.nav`
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Separator = styled.span`
  color: ${colors.textMuted};
  user-select: none;
`;

const Link = styled.a`
  color: ${colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accent};
  }
`;

const Current = styled.span`
  color: ${colors.textSecondary};
`;

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  const { t } = useTranslation();

  return (
    <Nav aria-label="breadcrumb">
      <List>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label}>
              {i > 0 && <Separator aria-hidden="true">/</Separator>}
              {isLast || !item.href ? (
                <Current aria-current="page"> {t(item.label)}</Current>
              ) : (
                <Link href={item.href}> {t(item.label)}</Link>
              )}
            </li>
          );
        })}
      </List>
    </Nav>
  );
}
