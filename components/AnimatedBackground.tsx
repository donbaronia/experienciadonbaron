"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Ember {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

function createEmbers(count: number): Ember[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: (index * 83) % 100,
    size: 1 + ((index * 7) % 3) * 0.5,
    delay: (index * 1.7) % 12,
    duration: 16 + ((index * 5) % 10),
  }));
}

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const embers = useMemo(() => createEmbers(14), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-noir" />
      <div className="absolute inset-0 bg-noir-depth" />

      <motion.div
        className="absolute left-1/2 top-[-20%] h-[60vh] w-[70vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 45%, transparent 70%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-30%] right-[-10%] h-[50vh] w-[40vw] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 65%)",
        }}
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {reduceMotion
        ? null
        : embers.map((ember) => (
            <motion.span
              key={ember.id}
              className="absolute rounded-full bg-gold-light"
              style={{
                left: `${ember.left}%`,
                bottom: "-2%",
                width: ember.size,
                height: ember.size,
                opacity: 0,
              }}
              animate={{
                y: ["0vh", "-110vh"],
                opacity: [0, 0.35, 0.2, 0],
              }}
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
