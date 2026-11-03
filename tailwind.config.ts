import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Official logo palette (public/brand/logo-original.png)
        // Teal: DEFAULT for fills/accents and text on dark; 600/700 for text or white-text buttons on light (5.6:1+).
        teal: { DEFAULT: "#00A8A0", 50: "#ECF8F7", 100: "#D3F0EE", 300: "#7FD6D0", 400: "#33BAB3", 600: "#00756F", 700: "#00635E" },
        // Purple: white text on DEFAULT is 7.9:1.
        purple: { DEFAULT: "#703890", 50: "#F4EEF8", 100: "#E7D9F0", 400: "#B48ACB", 700: "#5C2D77", 800: "#47225C" },
        // Deep plum for dark sections and body text (16.9:1 on white).
        plum: { DEFAULT: "#2A1238", 900: "#1C0B26", 800: "#3A1C4D", 700: "#4E2A63" },
        // Page canvas
        mist: { DEFAULT: "#F7FAFA", 100: "#EEF4F4" },
        ink: "#111111",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: { 18: "4.5rem", 22: "5.5rem" },
      maxWidth: { content: "72rem" },
      keyframes: { marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } } },
      animation: { marquee: "marquee 40s linear infinite" },
      boxShadow: {
        card: "0 1px 2px rgb(42 18 56 / 0.05), 0 10px 30px -12px rgb(42 18 56 / 0.18)",
        glow: "0 0 0 1px rgb(0 117 111 / 0.25), 0 12px 32px -10px rgb(0 168 160 / 0.55)",
      },
    },
  },
  plugins: [],
};
export default config;
