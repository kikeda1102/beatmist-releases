import { useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { colors } from "../../styles/theme";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
`;

const Content = styled.div<{ $maxWidth: string }>`
  position: relative;
  max-width: ${({ $maxWidth }) => $maxWidth};
  max-height: 90vh;
  width: 90vw;
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

type LightboxProps = {
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
  maxWidth?: string;
};

const Lightbox = ({ onClose, ariaLabel, children, maxWidth = "720px" }: LightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleKeyDown]);

  return createPortal(
    <Overlay role="dialog" aria-label={ariaLabel} onClick={onClose}>
      <Content $maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
      </Content>
    </Overlay>,
    document.body,
  );
};

export default Lightbox;
