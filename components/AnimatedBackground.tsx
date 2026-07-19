"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-noir" />
      <motion.div
        className="absolute left-1/2 top-[-20%] h-[60vh] w-[60vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198,161,91,0.14) 0%, rgba(198,161,91,0.04) 45%, transparent 70%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-30%] right-[-10%] h-[50vh] w-[40vw] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198,161,91,0.07) 0%, transparent 65%)",
        }}
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
