import styled, { css } from "styled-components";
import { colors } from "../../styles/theme";

interface ButtonStyleProps {
  $variant?: "primary" | "secondary";
  $size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `,
};

const buttonStyles = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
  text-decoration: none;

  ${({ $size = "md" }) => sizeStyles[$size]}

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? css`
          background-color: ${colors.accent};
          color: white;
          border: none;

          &:hover {
            background-color: ${colors.accentHover};
            transform: translateY(-1px);
          }
        `
      : css`
          background: transparent;
          color: ${colors.textPrimary};
          border: 1px solid ${colors.border};

          &:hover {
            border-color: ${colors.borderHover};
            background-color: rgba(255, 255, 255, 0.03);
          }
        `}
`;

const StyledLink = styled.a<ButtonStyleProps>`
  ${buttonStyles}
`;

const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}
`;

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
}: Props) {
  if (onClick) {
    return (
      <StyledButton type="button" onClick={onClick} $variant={variant} $size={size}>
        {children}
      </StyledButton>
    );
  }
  return (
    <StyledLink href={href} $variant={variant} $size={size}>
      {children}
    </StyledLink>
  );
}
