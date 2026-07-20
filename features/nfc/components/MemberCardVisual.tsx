"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";

interface MemberCardVisualProps {
  serialNumber: string;
}

export function MemberCardVisual({ serialNumber }: MemberCardVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { rotateX: 4, rotateY: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative mx-auto aspect-[1.586] w-full max-w-md overflow-hidden border border-gold/40 bg-noir-raised p-8 shadow-glow"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(212,175,55,0.15) 0%, transparent 55%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <Logo withWordmark={false} />
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-ash">
            Cartão de membro
          </p>
          <p className="mt-2 font-display text-2xl tracking-[0.2em] text-gold">
            {serialNumber}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
