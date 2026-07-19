"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "filled" | "hairline";
}

export function GlowButton({
  children,
  onClick,
  className,
  type = "button",
  variant = "hairline",
}: GlowButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden px-9",
        "font-body text-xs uppercase tracking-[0.28em]",
        "transition-shadow duration-500 ease-crown",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir",
        variant === "filled"
          ? "animate-sheen bg-gold-sheen bg-[length:200%_auto] text-noir shadow-glow hover:shadow-glow-strong"
          : "border border-gold/40 text-gold shadow-elevation-1 hover:border-gold hover:shadow-glow",
        className
      )}
    >
      {variant === "hairline" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-700 ease-silk group-hover:translate-x-full"
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
