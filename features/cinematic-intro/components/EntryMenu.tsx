"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { ENTRY_MENU_OPTIONS } from "../types";

interface EntryMenuProps {
  visible: boolean;
  onEnter: () => void;
}

export function EntryMenu({ visible, onEnter }: EntryMenuProps) {
  const secondaryOptions = ENTRY_MENU_OPTIONS.filter(
    (option) => option.id !== "enter"
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="entry-menu"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex flex-col items-center gap-8"
        >
          <p className="text-[0.6rem] uppercase tracking-crown text-gold">
            Universo Don Baron
          </p>
          <div className="pointer-events-auto flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <GlowButton variant="filled" onClick={onEnter}>
              Entrar
            </GlowButton>
            {secondaryOptions.map((option) => (
              <Link
                key={option.id}
                href={option.href}
                className="text-xs uppercase tracking-wide2 text-ivory-dim transition-colors duration-300 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
              >
                {option.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
