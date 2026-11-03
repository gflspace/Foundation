import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (enhancement spec §3.1)
        navy: { DEFAULT: "#0F172A", 900: "#0B1222", 800: "#1E293B", 700: "#334155" },
        // Sovereign gold. DEFAULT is for fills/accents on navy; use 600/700 for gold *text* on light backgrounds.
        gold: { DEFAULT: "#D4AF37", 300: "#E8D08A", 400: "#E2C35A", 600: "#8A6A14", 700: "#7A5C0E", 50: "#FBF5E3" },
        // Empowerment violet (Blue Rain cinematic accent)
        violet: { DEFAULT: "#6D28D9", 400: "#A78BFA", 700: "#5B21B6", 800: "#4C1D95", 50: "#F5F3FF" },
        // Warm humanitarian sand canvas
        sand: { DEFAULT: "#FDF8F0", 100: "#F7EED9" },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: { 18: "4.5rem", 22: "5.5rem" },
      maxWidth: { content: "72rem" },
      keyframes: { marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } } },
      animation: { marquee: "marquee 40s linear infinite" },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -8px rgb(15 23 42 / 0.12)",
        glow: "0 0 0 1px rgb(212 175 55 / 0.35), 0 12px 40px -10px rgb(212 175 55 / 0.55)",
      },
    },
  },
  plugins: [],
};
export default config;
