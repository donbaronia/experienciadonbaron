"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { IntroPhase } from "../types";

interface BackgroundProps {
  phase: IntroPhase;
}

function createGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(227,200,143,0.9)");
    gradient.addColorStop(0.4, "rgba(198,161,91,0.35)");
    gradient.addColorStop(1, "rgba(198,161,91,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const VOID_PHASES: readonly IntroPhase[] = ["void", "fade", "done"];

export function Background({ phase }: BackgroundProps) {
  const glowTexture = useMemo(() => createGlowTexture(), []);
  const sprite = useRef<THREE.Sprite>(null);

  useFrame((_, delta) => {
    if (!sprite.current) return;
    const targetOpacity = VOID_PHASES.includes(phase) ? 0 : 0.8;
    const material = sprite.current.material as THREE.SpriteMaterial;
    const damping = 1 - Math.exp(-delta * 0.9);
    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      targetOpacity,
      damping
    );
  });

  return (
    <>
      <fog attach="fog" args={["#0A0A09", 6, 16]} />
      <sprite ref={sprite} position={[0, 0.3, -3]} scale={[9, 9, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  );
}
