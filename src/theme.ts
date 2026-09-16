import { createTheme, type MantineColorsTuple } from "@mantine/core";

const navy: MantineColorsTuple = [
  "#EDF2F7",
  "#DDE5EE",
  "#B9C7D8",
  "#93A7C0",
  "#748CAC",
  "#5F7A9C",
  "#3F5B7E",
  "#102A43",
  "#0B1F33",
  "#071827",
];

const legalGreen: MantineColorsTuple = [
  "#E9F7F1",
  "#D3EFE3",
  "#A6DEC7",
  "#77CCAA",
  "#51BC92",
  "#3AB185",
  "#2A9D74",
  "#16805C",
  "#106B4C",
  "#0B573D",
];

export const theme = createTheme({
  primaryColor: "navy",
  primaryShade: { light: 8, dark: 7 },
  colors: { navy, legalGreen },
  defaultRadius: "md",
  radius: { sm: "6px", md: "10px", lg: "12px" },
  white: "#FFFFFF",
  black: "#16202A",
  fontFamily:
    '"IBM Plex Sans Arabic", "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  headings: {
    fontFamily:
      '"IBM Plex Sans Arabic", "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
    fontWeight: "600",
    sizes: {
      h1: { fontSize: "1.625rem", lineHeight: "1.35" },
      h2: { fontSize: "1.25rem", lineHeight: "1.4" },
      h3: { fontSize: "1.0625rem", lineHeight: "1.45" },
      h4: { fontSize: "0.9375rem", lineHeight: "1.45" },
    },
  },
  lineHeights: { md: "1.55" },
  shadows: {
    xs: "0 1px 2px rgba(11, 31, 51, 0.05)",
    sm: "0 1px 3px rgba(11, 31, 51, 0.07)",
    md: "0 4px 14px rgba(11, 31, 51, 0.08)",
  },
  other: {
    surface: "#FFFFFF",
    appBg: "#F7F9FB",
    border: "#E3E8EF",
    textPrimary: "#16202A",
    textSecondary: "#667085",
    textMuted: "#98A2B3",
    navySoft: "#EDF2F7",
    greenSoft: "#E9F7F1",
  },
  components: {
    Paper: { defaultProps: { withBorder: true, radius: "md", bg: "#FFFFFF" } },
    Card: { defaultProps: { withBorder: true, radius: "md", bg: "#FFFFFF" } },
    Badge: { defaultProps: { radius: "sm", tt: "none", fw: 600 } },
    Button: { defaultProps: { radius: "sm" } },
    ActionIcon: { defaultProps: { radius: "sm" } },
    TextInput: { defaultProps: { radius: "sm" } },
    Select: { defaultProps: { radius: "sm" } },
    Table: { defaultProps: { verticalSpacing: "sm", horizontalSpacing: "md" } },
    Tabs: { defaultProps: { keepMounted: false } },
  },
});
