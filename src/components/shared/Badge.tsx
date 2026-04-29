import styled, { css } from "styled-components";
import { colors } from "../../styles/theme";

const StyledBadge = styled.span<{ $variant: "new" | "recommended" }>`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;

  ${({ $variant }) =>
    $variant === "new"
      ? css`
          background-color: ${colors.accent};
          color: white;
        `
      : css`
          background-color: transparent;
          border: 1px solid ${colors.accent};
          color: ${colors.accent};
        `}
`;

interface Props {
  text: string;
  variant?: "new" | "recommended";
}

export default function Badge({ text, variant = "new" }: Props) {
  return <StyledBadge $variant={variant}>{text}</StyledBadge>;
}
