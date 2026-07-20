"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { IntroPhase } from "../types";

interface ParticlesProps {
  phase: IntroPhase;
}

const COUNT = 4000;
const DRAG = 0.55;
const ACTIVE_PHASES: readonly IntroPhase[] = ["explode", "menu", "fade"];
const LIT_PHASES: readonly IntroPhase[] = ["explode", "menu"];

interface ParticleData {
  positions: Float32Array;
  initial: Float32Array;
  direction: Float32Array;
  speed: Float32Array;
}

function buildParticleData(): ParticleData {
  const positions = new Float32Array(COUNT * 3);
  const initial = new Float32Array(COUNT * 3);
  const direction = new Float32Array(COUNT * 3);
  const speed = new Float32Array(COUNT);
  const dir = new THREE.Vector3();

  for (let i = 0; i < COUNT; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * 1.55;
    const ix = Math.cos(angle) * radius;
    const iy = Math.sin(angle) * radius;
    const iz = (Math.random() - 0.5) * 0.18;

    dir
      .set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
      .normalize();

    const idx = i * 3;
    positions[idx] = ix;
    positions[idx + 1] = iy;
    positions[idx + 2] = iz;
    initial[idx] = ix;
    initial[idx + 1] = iy;
    initial[idx + 2] = iz;
    direction[idx] = dir.x;
    direction[idx + 1] = dir.y;
    direction[idx + 2] = dir.z;
    speed[i] = 1.2 + Math.random() * 2.6;
  }

  return { positions, initial, direction, speed };
}

export function Particles({ phase }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const elapsed = useRef(0);
  const prevPhase = useRef<IntroPhase>(phase);
  const { positions, initial, direction, speed } = useMemo(
    () => buildParticleData(),
    []
  );

  useFrame((_, delta) => {
    if (phase === "explode" && prevPhase.current !== "explode") {
      elapsed.current = 0;
    }
    prevPhase.current = phase;

    const active = ACTIVE_PHASES.includes(phase);
    if (active) {
      elapsed.current += delta;

      const t = elapsed.current;
      const falloffBase = (1 - Math.exp(-DRAG * t)) / DRAG;
      for (let i = 0; i < COUNT; i += 1) {
        const idx = i * 3;
        const travel = (speed[i] ?? 0) * falloffBase;
        positions[idx] = (initial[idx] ?? 0) + (direction[idx] ?? 0) * travel;
        positions[idx + 1] =
          (initial[idx + 1] ?? 0) +
          (direction[idx + 1] ?? 0) * travel -
          t * t * 0.05;
        positions[idx + 2] =
          (initial[idx + 2] ?? 0) + (direction[idx + 2] ?? 0) * travel;
      }

      const attribute = pointsRef.current?.geometry.getAttribute("position");
      if (attribute) attribute.needsUpdate = true;
    }

    if (materialRef.current) {
      const targetOpacity = LIT_PHASES.includes(phase) ? 0.9 : 0;
      const damping = 1 - Math.exp(-delta * (phase === "fade" ? 1.2 : 4));
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        targetOpacity,
        damping
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.035}
        sizeAttenuation
        color="#F6D777"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
