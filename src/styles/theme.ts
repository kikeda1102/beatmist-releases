export const colors = {
  bgPrimary: "#0a0a0f",
  bgSecondary: "#12121a",
  bgCard: "#1a1a2e",
  bgCardHover: "#22223a",
  textPrimary: "#e8e8f0",
  textSecondary: "#9898b0",
  textMuted: "#686880",
  accentPurple: "#8b5cf6",
  accentPurpleLight: "#a78bfa",
  accentPurpleDark: "#7c3aed",
  accentTeal: "#14b8a6",
  accentTealLight: "#2dd4bf",
  border: "#2a2a3e",
  borderAccent: "rgba(139, 92, 246, 0.5)",
} as const;

export const fonts = {
  base: "'Inter', 'Noto Sans JP', system-ui, sans-serif",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
} as const;

export const spacing = {
  headerHeight: "64px",
  containerMax: "1200px",
  sectionPadding: "5rem",
} as const;
