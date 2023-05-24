import { extendTheme } from "@chakra-ui/react";

const whiteAlpha = {
  100: "rgba(255, 255, 255, 0.04)",
  200: "rgba(255, 255, 255, 0.06)",
  300: "rgba(255, 255, 255, 0.08)",
  400: "rgba(255, 255, 255, 0.16)",
  500: "rgba(255, 255, 255, 0.24)",
  600: "rgba(255, 255, 255, 0.36)",
  700: "rgba(255, 255, 255, 0.48)",
  800: "rgba(255, 255, 255, 0.64)",
  900: "rgba(255, 255, 255, 0.80)",
  1000: "rgba(255, 255, 255, 0.92)",
};

const blackAlpha = {
  100: "rgba(0, 0, 0, 0.04)",
  200: "rgba(0, 0, 0, 0.06)",
  300: "rgba(0, 0, 0, 0.08)",
  400: "rgba(0, 0, 0, 0.16)",
  500: "rgba(0, 0, 0, 0.24)",
  600: "rgba(0, 0, 0, 0.36)",
  700: "rgba(0, 0, 0, 0.48)",
  800: "rgba(0, 0, 0, 0.64)",
  900: "rgba(0, 0, 0, 0.80)",
  1000: "rgba(0, 0, 0, 0.92)",
};

const theme = extendTheme({
  // ... other configurations like fonts and space
  styles: {
    global: {
      body: {
        backgroundColor: "#331567",
      },
    },
  },
  // Shadows
  shadows: {
    xs: "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
    sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    base: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    outline: "0px 0px 0px 2px #D9B9F3",
    inner: "inset 0px 2px 4px rgba(0, 0, 0, 0.06)",
  },
  components: {
    Box: {
      baseStyle: {
        backgroundColor: "#FFFFFF",
      },
    },
  },

  // Spacing
  space: {
    "-2": "-0.125rem",
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.25rem",
    "3": "0.5rem",
    "4": "0.75rem",
    "5": "1rem",
    "6": "1.25rem",
    "7": "1.5rem",
    "8": "1.75rem",
    "9": "2rem",
    "10": "2.25rem",
    "12": "3rem",
    "14": "35rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem",
  },

  //Fonts
  fonts: {
    heading: '"Plus Jakarta Sans", sans-serif',
    body: '"Plus Jakarta Sans", sans-serif',
  },
  fontSizes: {
    "6xl": "3.75rem",
    "5xl": "3rem",
    "4xl": "2.25rem",
    "3xl": "1.875rem",
    "2xl": "1.5rem",
    xl: "1.25rem",
    lg: "1.125rem",
    md: "1rem",
    sm: "0.875rem",
    xs: "0.75rem",
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
    extrabold: "800",
  },
  lineHeights: {
    heading: 1.5,
    body: 1.1,
    text: 0.8,
  },
  letterSpacings: {
    heading: "-0.088rem",
    body: "0rem",
  },
  component: {
    Heading: {
      baseStyle: {
        fontWeight: "extrabold",
        lineHeight: "heading",
        letterSpacing: "heading",
      },
      sizes: {
        h6: { fontSize: "6xl" },
        h5: { fontSize: "5xl" },
        h4: { fontSize: "4xl" },
        h3: { fontSize: "3xl" },
        h2: { fontSize: "2xl" },
        h1: { fontSize: "xl" },
        lg: { fontSize: "lg" },
        md: { fontSize: "md" },
        sm: { fontSize: "sm" },
        xs: { fontSize: "xs" },
      },
    },
    Text: {
      baseStyle: {
        lineHeight: "body",
        letterSpacing: "body",
      },
    },
  },

  // Colors
  colors: {
    primary: {
      25: "#F5F3FF",
      50: "#EDE9FE",
      100: "#DDD6FE",
      200: "#C4B5FD",
      300: "#A78BFA",
      400: "#8B5CF6",
      500: "#7C3AED",
      600: "#6D28D9",
      700: "#5B21B6",
      800: "#3E187A",
      900: "#291052",
    },
    neutral: {
      25: "#FCFCFC",
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EDEDED",
      300: "#E0E0E0",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#1F1F1F",
    },

    green: {
      50: "#F2FEF6",
      100: "#E6FEEE",
      200: "#CCFCDC",
      300: "#B3FBCB",
      400: "#99F9B9",
      500: "#80F8A8",
      600: "#66C686",
      700: "#4D9565",
      800: "#336343",
      900: "#1A3222",
    },
    red: {
      50: "#FFF1F2",
      100: "#FFE4E6",
      200: "#FECDD3",
      300: "#FDA4AF",
      400: "#FB7185",
      500: "#F43F5E",
      600: "#E11D48",
      700: "#BE123C",
      800: "#9F1239",
      900: "#881337",
    },
    yellow: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },
    whiteAlpha,
    blackAlpha,
  },
});

export default theme;
