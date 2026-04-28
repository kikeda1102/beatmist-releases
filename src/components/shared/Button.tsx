import styled, { css } from "styled-components";
import { colors } from "../../styles/theme";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
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

const StyledButton = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ size = "md" }) => sizeStyles[size]}

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? css`
          background: linear-gradient(
            135deg,
            ${colors.accentPurple},
            ${colors.accentTeal}
          );
          color: white;
          border: none;

          &:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
        `
      : css`
          background: transparent;
          color: ${colors.textPrimary};
          border: 1px solid ${colors.border};

          &:hover {
            border-color: ${colors.accentPurple};
            color: ${colors.accentPurpleLight};
          }
        `}
`;

interface Props {
  href: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
}: Props) {
  return (
    <StyledButton href={href} variant={variant} size={size}>
      {children}
    </StyledButton>
  );
}
