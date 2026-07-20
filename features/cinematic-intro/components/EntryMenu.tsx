"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ENTRY_MENU_OPTIONS } from "../types";

interface EntryMenuProps {
  visible: boolean;
  onEnter: () => void;
}

const LINK_CLASS =
  "text-xs uppercase tracking-wide2 transition-colors duration-300 focus-visible:outline-none";

export function EntryMenu({ visible, onEnter }: EntryMenuProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="entry-menu"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 flex flex-col items-center gap-7"
        >
          <p className="text-[0.6rem] uppercase tracking-crown text-ash">
            Universo Don Baron
          </p>
          <div className="pointer-events-auto flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            {ENTRY_MENU_OPTIONS.map((option) =>
              option.id === "enter" ? (
                <button
                  key={option.id}
                  type="button"
                  onClick={onEnter}
                  className={`${LINK_CLASS} text-ivory hover:text-gold focus-visible:text-gold`}
                >
                  {option.label}
                </button>
              ) : (
                <Link
                  key={option.id}
                  href={option.href}
                  className={`${LINK_CLASS} text-ivory-dim hover:text-gold focus-visible:text-gold`}
                >
                  {option.label}
                </Link>
              )
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
