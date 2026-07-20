"use client";

import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="h-8 w-8 animate-spin rounded-full border border-gold/30 border-t-gold" />
        <p className="text-[0.6rem] uppercase tracking-crown text-gold">
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}
