"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { Suspense, useEffect } from "react";
import { useIntroSequence } from "../hooks/useIntroSequence";
import { Background } from "./Background";
import { CameraController } from "./CameraController";
import { Coin3D } from "./Coin3D";
import { EntryMenu } from "./EntryMenu";
import { GoldenLight } from "./GoldenLight";
import { Particles } from "./Particles";
import { SceneLoader } from "./SceneLoader";

interface IntroExperienceProps {
  onComplete: () => void;
}

export function IntroExperience({ onComplete }: IntroExperienceProps) {
  const { phase, advance } = useIntroSequence();

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  const dimmed = phase === "fade" || phase === "done";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-noir"
      initial={{ opacity: 1 }}
      animate={{ opacity: dimmed ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 35, position: [0, 0, 8] }}
      >
        <Suspense fallback={<SceneLoader />}>
          <GoldenLight phase={phase} />
          <Background phase={phase} />
          <Coin3D phase={phase} />
          <Particles phase={phase} />
          <CameraController phase={phase} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.45}
              luminanceSmoothing={0.9}
              intensity={0.22}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <EntryMenu visible={phase === "menu"} onEnter={advance} />
    </motion.div>
  );
}
