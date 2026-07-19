"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";

export function useHeroParallax(): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 600], [0, -80]);
}
