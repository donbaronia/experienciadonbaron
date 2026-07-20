"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { IntroPhase } from "../types";

interface CameraControllerProps {
  phase: IntroPhase;
}

const TARGET_Z: Record<IntroPhase, number> = {
  void: 8,
  glow: 7.5,
  coinAppear: 7,
  coinRotate: 6.6,
  cameraApproach: 4.4,
  reveal: 3.8,
  explode: 6.5,
  menu: 6.5,
  fade: 6.5,
  done: 6.5,
};

export function CameraController({ phase }: CameraControllerProps) {
  const elapsed = useRef(0);

  useFrame(({ camera }, delta) => {
    elapsed.current += delta;
    const targetZ = TARGET_Z[phase];
    const lambda = phase === "explode" ? 2.4 : 1.6;
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      lambda,
      delta
    );
    camera.position.x = Math.sin(elapsed.current * 0.15) * 0.08;
    camera.position.y = Math.sin(elapsed.current * 0.22) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
