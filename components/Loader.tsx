"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Logo } from "@/components/Logo";

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + (index % 2) * 0.3;
    const distance = 60 + (index % 3) * 18;
    return {
      id: index,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      delay: (index % 5) * 0.08,
    };
  });
}

export function Loader() {
  const particles = useMemo(() => createParticles(14), []);

  return (
    <div
      role="status"
      aria-label="Carregando"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-gold-light"
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
            transition={{
              duration: 1.3,
              delay: particle.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
        <Logo withWordmark={false} drawOnMount size={64} />
      </div>
      <div className="h-px w-24 overflow-hidden bg-ash-line">
        <div className="h-full w-full animate-sheen bg-gold-fade bg-[length:200%_100%]" />
      </div>
      <span className="animate-pulse-soft text-[0.6rem] uppercase tracking-crown text-ash">
        Preparando o Universo
      </span>
    </div>
  );
}
