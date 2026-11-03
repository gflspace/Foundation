import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F172A", 900: "#0B1222", 800: "#1E293B", 700: "#334155" },
        emerald: { DEFAULT: "#059669", 700: "#047857", 800: "#065F46", 400: "#34D399", 50: "#ECFDF5" },
        gold: { DEFAULT: "#D97706", 600: "#B45309", 700: "#92400E", 400: "#FBBF24", 50: "#FFFBEB" },
        ivory: "#F8FAFC",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: { 18: "4.5rem", 22: "5.5rem" },
      maxWidth: { content: "72rem" },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -8px rgb(15 23 42 / 0.12)",
        glow: "0 0 0 1px rgb(217 119 6 / 0.25), 0 12px 40px -12px rgb(217 119 6 / 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
