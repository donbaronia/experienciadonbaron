"use client";

import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { IntroPhase } from "../types";

interface GoldenLightProps {
  phase: IntroPhase;
}

const LIT_PHASES: readonly IntroPhase[] = [
  "glow",
  "coinAppear",
  "coinRotate",
  "cameraApproach",
  "reveal",
  "explode",
  "menu",
];

export function GoldenLight({ phase }: GoldenLightProps) {
  const keyLight = useRef<THREE.SpotLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);

  useFrame((_, delta) => {
    const target = LIT_PHASES.includes(phase) ? 1 : 0;
    const damping = 1 - Math.exp(-delta * 1.1);

    if (keyLight.current) {
      keyLight.current.intensity = THREE.MathUtils.lerp(
        keyLight.current.intensity,
        target * 3.2,
        damping
      );
    }
    if (rimLight.current) {
      rimLight.current.intensity = THREE.MathUtils.lerp(
        rimLight.current.intensity,
        target * 1.6,
        damping
      );
    }
    if (ambient.current) {
      ambient.current.intensity = THREE.MathUtils.lerp(
        ambient.current.intensity,
        target * 0.18,
        damping
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0} color="#F4F1E8" />
      <spotLight
        ref={keyLight}
        position={[3, 4, 5]}
        angle={0.5}
        penumbra={0.6}
        intensity={0}
        color="#F6D777"
        castShadow
      />
      <pointLight
        ref={rimLight}
        position={[-4, -1, -3]}
        intensity={0}
        color="#D4AF37"
      />
      <Environment preset="studio" environmentIntensity={0.6} />
    </>
  );
}
