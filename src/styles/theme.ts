export const colors = {
  bgPrimary: "#0E0E0E",
  bgSecondary: "#161616",
  bgCard: "#1E1E1E",
  bgCardHover: "#272727",
  textPrimary: "rgba(255, 255, 255, 0.93)",
  textSecondary: "rgba(255, 255, 255, 0.68)",
  textMuted: "rgba(255, 255, 255, 0.45)",
  accent: "#34CCD0",
  accentHover: "#5DD6DA",
  accentSubtle: "rgba(52, 204, 208, 0.12)",
  textOnAccent: "#0E0E0E",
  secondary: "#F22ED6",
  secondaryHover: "#F558DE",
  secondarySubtle: "rgba(242, 46, 214, 0.12)",
  success: "#34c759",
  border: "#2E2E2E",
  borderHover: "#3A3A3A",
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
  sectionPadding: "var(--section-padding)",
} as const;
