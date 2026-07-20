"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CREST_B_BOTTOM_INNER,
  CREST_B_BOTTOM_OUTER,
  CREST_B_SPINE,
  CREST_B_TOP_INNER,
  CREST_B_TOP_OUTER,
  CREST_CROWN,
  CREST_CROWN_DOTS,
  CREST_D_INNER,
  CREST_D_OUTER,
  CREST_SHIELD_OUTLINE,
} from "@/components/brand/crest-paths";
import { cn } from "@/lib/utils";

export type LogoVariant = "gold" | "mono" | "black";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  drawOnMount?: boolean;
  variant?: LogoVariant;
  size?: number;
}

const VARIANT_COLORS: Record<
  LogoVariant,
  { shield: string; mark: string; stroke: string }
> = {
  gold: { shield: "#050505", mark: "#D4AF37", stroke: "#D4AF37" },
  mono: { shield: "none", mark: "currentColor", stroke: "currentColor" },
  black: { shield: "#050505", mark: "#050505", stroke: "#050505" },
};

export function Logo({
  className,
  withWordmark = true,
  drawOnMount = false,
  variant = "gold",
  size = 36,
}: LogoProps) {
  const reduceMotion = useReducedMotion();
  const colors = VARIANT_COLORS[variant];
  const animateOutline = drawOnMount && !reduceMotion;

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 100 120"
        aria-hidden="true"
        style={{ width: size, height: (size * 120) / 100 }}
        className="shrink-0"
      >
        {animateOutline ? (
          <motion.path
            d={CREST_SHIELD_OUTLINE}
            fill={colors.shield}
            stroke={colors.stroke}
            strokeWidth={1.5}
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          />
        ) : (
          <path
            d={CREST_SHIELD_OUTLINE}
            fill={colors.shield}
            stroke={colors.stroke}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        )}
        <g fill={colors.mark} fillRule="evenodd">
          <path d={`${CREST_D_OUTER} ${CREST_D_INNER}`} />
          <path d={CREST_B_SPINE} />
          <path d={`${CREST_B_TOP_OUTER} ${CREST_B_TOP_INNER}`} />
          <path d={`${CREST_B_BOTTOM_OUTER} ${CREST_B_BOTTOM_INNER}`} />
        </g>
        <path d={CREST_CROWN} fill={colors.mark} />
        {CREST_CROWN_DOTS.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={colors.mark} />
        ))}
      </svg>
      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-crown text-ivory">
            DON BARON
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.5em] text-gold">
            Universo
          </span>
        </span>
      ) : null}
    </span>
  );
}
