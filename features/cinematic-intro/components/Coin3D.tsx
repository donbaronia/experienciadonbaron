"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { IntroPhase } from "../types";

interface Coin3DProps {
  phase: IntroPhase;
}

const COIN_RADIUS = 1.6;
const COIN_HEIGHT = 0.18;

/** Reaproveita o path do brasão de components/Logo.tsx (viewBox 48x48), extrudado em relevo. */
function createCrownGeometry(): THREE.ExtrudeGeometry {
  const points: Array<[number, number]> = [
    [9, 33],
    [12, 17],
    [18.5, 25],
    [24, 13],
    [29.5, 25],
    [36, 17],
    [39, 33],
  ];
  const scale = 1 / 15;
  const shape = new THREE.Shape();
  points.forEach(([x, y], index) => {
    const nx = (x - 24) * scale;
    const ny = -(y - 24) * scale;
    if (index === 0) shape.moveTo(nx, ny);
    else shape.lineTo(nx, ny);
  });
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 2,
    steps: 1,
  });
}

const VISIBLE_PHASES: readonly IntroPhase[] = [
  "coinAppear",
  "coinRotate",
  "cameraApproach",
  "reveal",
];

const SPIN_SPEED: Partial<Record<IntroPhase, number>> = {
  coinAppear: 0.6,
  coinRotate: 4.2,
  cameraApproach: 1.1,
};

export function Coin3D({ phase }: Coin3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);
  const settleTargetRef = useRef<number | null>(null);
  const crownGeometry = useMemo(() => createCrownGeometry(), []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (phase === "reveal" && settleTargetRef.current === null) {
      const current = rotationRef.current;
      const laps = Math.round((current - Math.PI) / (2 * Math.PI));
      let target = Math.PI + laps * 2 * Math.PI;
      if (target < current) target += 2 * Math.PI;
      settleTargetRef.current = target;
    }
    if (phase !== "reveal") {
      settleTargetRef.current = null;
    }

    if (settleTargetRef.current !== null) {
      rotationRef.current = THREE.MathUtils.damp(
        rotationRef.current,
        settleTargetRef.current,
        4,
        delta
      );
    } else {
      rotationRef.current += (SPIN_SPEED[phase] ?? 0) * delta;
    }
    group.rotation.y = rotationRef.current;

    const targetScale = VISIBLE_PHASES.includes(phase) ? 1 : 0;
    const lambda = targetScale === 0 && phase === "explode" ? 9 : 2.5;
    const nextScale = THREE.MathUtils.damp(
      group.scale.x,
      targetScale,
      lambda,
      delta
    );
    group.scale.setScalar(nextScale);
  });

  return (
    <group ref={groupRef} scale={0}>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[COIN_RADIUS, COIN_RADIUS, COIN_HEIGHT, 96]}
        />
        <meshStandardMaterial
          color="#C6A15B"
          metalness={1}
          roughness={0.26}
        />
      </mesh>

      <mesh
        geometry={crownGeometry}
        position={[0, 0, COIN_HEIGHT / 2]}
        castShadow
      >
        <meshStandardMaterial
          color="#E3C88F"
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      <Text
        position={[0, 0, -COIN_HEIGHT / 2 - 0.02]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.4}
        color="#0A0A09"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        maxWidth={2.6}
      >
        DON BARON
      </Text>
    </group>
  );
}
