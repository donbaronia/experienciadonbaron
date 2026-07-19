"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export function GlowButton({
  children,
  onClick,
  className,
  type = "button",
}: GlowButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden px-8",
        "bg-gold-sheen bg-[length:200%_auto] font-body text-sm uppercase tracking-[0.25em] text-noir",
        "shadow-glow transition-shadow duration-500 hover:shadow-glow-strong",
        "animate-sheen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
