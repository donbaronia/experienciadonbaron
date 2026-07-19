"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "db-intro-seen";

export function IntroReveal() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noir"
          aria-hidden="true"
        >
          <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none">
            <motion.path
              d="M9 33 L12 17 L18.5 25 L24 13 L29.5 25 L36 17 L39 33 Z"
              stroke="#C6A15B"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.path
              d="M11 37.5 H37"
              stroke="#C6A15B"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
            />
          </svg>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-display text-xl text-ivory"
          >
            DON BARON
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-3 text-[0.6rem] uppercase tracking-crown text-gold"
          >
            Universo
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
