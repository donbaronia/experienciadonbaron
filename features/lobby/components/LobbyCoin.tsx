"use client";

import { useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

const LobbyCoinScene = lazy(() =>
  import("./LobbyCoinScene").then((mod) => ({ default: mod.LobbyCoinScene }))
);

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function LobbyCoin() {
  const reduceMotion = useReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setCanRender3D(!reduceMotion && supportsWebGL());
  }, [reduceMotion]);

  return (
    <div className="relative mx-auto flex h-[9vh] min-h-[70px] w-full max-w-[180px] items-center justify-center">
      {canRender3D ? (
        <Suspense fallback={null}>
          <LobbyCoinScene />
        </Suspense>
      ) : (
        <Logo withWordmark={false} size={40} />
      )}
    </div>
  );
}
