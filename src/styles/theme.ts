export const colors = {
  bgPrimary: "#0D0B0F",
  bgSecondary: "#141218",
  bgCard: "#1C1922",
  bgCardHover: "#26222E",
  textPrimary: "rgba(245, 240, 250, 0.95)",
  textSecondary: "rgba(245, 240, 250, 0.78)",
  textMuted: "rgba(245, 240, 250, 0.68)",
  accent: "#C8387E",
  accentHover: "#D94A90",
  accentSubtle: "rgba(200, 56, 126, 0.12)",
  success: "#34c759",
  border: "#2E2838",
  borderHover: "#3E3548",
} as const;

export const fonts = {
  heading: "'Outfit', 'Noto Sans JP', system-ui, sans-serif",
  body: "'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif",
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
