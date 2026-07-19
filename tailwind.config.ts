import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: "#0A0A09",
          soft: "#111110",
          raised: "#171715",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E3C88F",
          dark: "#8C6D33",
          muted: "#5C4B28",
        },
        ivory: {
          DEFAULT: "#F4F1E8",
          dim: "#C9C5B8",
        },
        ash: {
          DEFAULT: "#8A8578",
          deep: "#3A3833",
          line: "#25241F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        crown: "0.32em",
        wide2: "0.2em",
      },
      spacing: {
        section: "var(--space-section)",
        block: "var(--space-block)",
        13: "3.25rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      transitionTimingFunction: {
        crown: "cubic-bezier(0.22, 1, 0.36, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(105deg, #8C6D33 0%, #C6A15B 40%, #E3C88F 50%, #C6A15B 60%, #8C6D33 100%)",
        "noir-depth":
          "radial-gradient(ellipse at 50% 0%, #171715 0%, #0A0A09 65%)",
        "gold-fade":
          "linear-gradient(90deg, transparent 0%, rgba(198,161,91,0.4) 50%, transparent 100%)",
      },
      boxShadow: {
        "elevation-1": "0 2px 8px rgba(0,0,0,0.35)",
        "elevation-2": "0 8px 24px rgba(0,0,0,0.45)",
        "elevation-3": "0 20px 48px rgba(0,0,0,0.55)",
        glow: "0 0 24px rgba(198, 161, 91, 0.22)",
        "glow-strong": "0 0 48px rgba(198, 161, 91, 0.38)",
        "glow-edge": "inset 0 1px 0 rgba(244,241,232,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        sheen: "sheen 6s ease-in-out infinite",
        "crown-draw": "crownDraw 1.6s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sheen: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        crownDraw: {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
