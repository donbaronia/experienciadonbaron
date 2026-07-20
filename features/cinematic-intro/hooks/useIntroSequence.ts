"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_SEQUENCE, type IntroPhase } from "../types";

interface UseIntroSequenceResult {
  phase: IntroPhase;
  advance: () => void;
}

export function useIntroSequence(): UseIntroSequenceResult {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number>(undefined);

  const advance = useCallback(() => {
    setIndex((current) => Math.min(current + 1, INTRO_SEQUENCE.length - 1));
  }, []);

  useEffect(() => {
    const step = INTRO_SEQUENCE[index];
    if (!step || step.durationMs === null) return;
    timeoutRef.current = window.setTimeout(advance, step.durationMs);
    return () => window.clearTimeout(timeoutRef.current);
  }, [index, advance]);

  return { phase: INTRO_SEQUENCE[index]?.phase ?? "done", advance };
}
