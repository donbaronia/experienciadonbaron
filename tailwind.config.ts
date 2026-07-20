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
          DEFAULT: "#050505",
          soft: "#141414",
          raised: "#1B1B1B",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F6D777",
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
          "linear-gradient(105deg, #8C6D33 0%, #D4AF37 40%, #F6D777 50%, #D4AF37 60%, #8C6D33 100%)",
        "noir-depth":
          "radial-gradient(ellipse at 50% 0%, #1B1B1B 0%, #050505 65%)",
        "gold-fade":
          "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.4) 50%, transparent 100%)",
      },
      boxShadow: {
        "elevation-1": "0 2px 8px rgba(0,0,0,0.35)",
        "elevation-2": "0 8px 24px rgba(0,0,0,0.45)",
        "elevation-3": "0 20px 48px rgba(0,0,0,0.55)",
        glow: "0 0 24px rgba(212, 175, 55, 0.22)",
        "glow-strong": "0 0 48px rgba(212, 175, 55, 0.38)",
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
