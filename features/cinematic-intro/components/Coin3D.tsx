"use client";

/**
 * A moeda é o único elemento "vivo" da tela — por isso seu movimento
 * precisa ser quase inteiro contido. Em repouso (modo "landed"): uma
 * oscilação de poucos graus, lenta o bastante para nunca ser percebida
 * como "girando" — objetos valiosos não giram sozinhos, eles apenas
 * existem, e a luz é que se move sobre eles. O único movimento grande
 * é o clique: uma única rotação deliberada, nunca repetida.
 */
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { IntroPhase } from "../types";

interface Coin3DProps {
  phase?: IntroPhase;
  mode?: "intro" | "landed";
  radius?: number;
}

const DEFAULT_RADIUS = 0.45;
const COIN_HEIGHT = 0.16;
const TEETH = 72;

function createSerratedCoinShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const points = TEETH * 2;
  const innerRadius = radius * 0.965;
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const r = i % 2 === 0 ? radius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createCoinBodyGeometry(radius: number): THREE.ExtrudeGeometry {
  const geometry = new THREE.ExtrudeGeometry(createSerratedCoinShape(radius), {
    depth: COIN_HEIGHT,
    bevelEnabled: true,
    bevelThickness: COIN_HEIGHT * 0.2,
    bevelSize: radius * 0.015,
    bevelSegments: 2,
    curveSegments: 1,
  });
  geometry.translate(0, 0, -COIN_HEIGHT / 2);
  return geometry;
}

/** Monograma "D"+"B" sólido (Shape à mão, sem holes — geometria estável). */
function createMonogramShapes(): THREE.Shape[] {
  const d = new THREE.Shape();
  d.moveTo(22, 32);
  d.lineTo(22, 88);
  d.bezierCurveTo(40, 88, 56, 76, 56, 60);
  d.bezierCurveTo(56, 44, 40, 32, 22, 32);
  d.closePath();

  const b = new THREE.Shape();
  b.moveTo(50, 32);
  b.lineTo(50, 88);
  b.lineTo(56, 88);
  b.bezierCurveTo(74, 88, 82, 80, 82, 74);
  b.bezierCurveTo(82, 66, 74, 60, 58, 60);
  b.bezierCurveTo(74, 60, 82, 54, 82, 46);
  b.bezierCurveTo(82, 38, 74, 32, 56, 32);
  b.closePath();

  const crown = new THREE.Shape();
  crown.moveTo(40, 22);
  crown.lineTo(43, 11);
  crown.lineTo(50, 17);
  crown.lineTo(57, 11);
  crown.lineTo(60, 22);
  crown.closePath();

  return [d, b, crown];
}

function createCrestReliefGeometries(radius: number): THREE.ExtrudeGeometry[] {
  const depth = radius * 0.09;
  const scale = (radius * 1.5) / 70;

  return createMonogramShapes().map((shape) => {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: depth * 0.3,
      bevelSize: depth * 0.25,
      bevelSegments: 2,
      curveSegments: 8,
    });
    geometry.translate(-52, -60, 0);
    geometry.scale(scale, -scale, 1);
    return geometry;
  });
}

const VISIBLE_PHASES: readonly IntroPhase[] = [
  "coinAppear",
  "coinRotate",
  "cameraApproach",
  "reveal",
];

const SPIN_SPEED: Partial<Record<IntroPhase, number>> = {
  coinAppear: 0.3,
  coinRotate: 0.9,
  cameraApproach: 0.4,
};

const OSCILLATION_AMPLITUDE = 0.06;
const OSCILLATION_SPEED = 0.1;
const SPIN_TWEEN_DURATION = 1.4;
const BASE_TILT_X = -0.32;
const BASE_YAW = 0.4;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function Coin3D({ phase = "void", mode = "intro", radius }: Coin3DProps) {
  const coinRadius = radius ?? DEFAULT_RADIUS;
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);
  const baseRotationRef = useRef(mode === "landed" ? BASE_YAW : 0);
  const spinTweenRef = useRef<{ startTime: number; from: number; to: number } | null>(
    null
  );
  const tiltXRef = useRef(mode === "landed" ? BASE_TILT_X : 0);
  const tiltZRef = useRef(0);
  const settleTargetRef = useRef<number | null>(null);
  const elapsed = useRef(0);

  const bodyGeometry = useMemo(
    () => createCoinBodyGeometry(coinRadius),
    [coinRadius]
  );
  const crestGeometries = useMemo(
    () => createCrestReliefGeometries(coinRadius),
    [coinRadius]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    elapsed.current += delta;

    if (mode === "landed") {
      if (spinTweenRef.current) {
        const { startTime, from, to } = spinTweenRef.current;
        const t = Math.min(
          (elapsed.current - startTime) / SPIN_TWEEN_DURATION,
          1
        );
        baseRotationRef.current = from + (to - from) * easeOutCubic(t);
        if (t >= 1) spinTweenRef.current = null;
      }

      const oscillation =
        Math.sin(elapsed.current * OSCILLATION_SPEED) * OSCILLATION_AMPLITUDE;
      group.rotation.y = baseRotationRef.current + oscillation;

      const targetTiltX = BASE_TILT_X + state.pointer.y * 0.08;
      const targetTiltZ = -state.pointer.x * 0.08;
      tiltXRef.current = THREE.MathUtils.damp(
        tiltXRef.current,
        targetTiltX,
        4,
        delta
      );
      tiltZRef.current = THREE.MathUtils.damp(
        tiltZRef.current,
        targetTiltZ,
        4,
        delta
      );
      group.rotation.x = tiltXRef.current;
      group.rotation.z = tiltZRef.current;
      group.position.y = Math.sin(elapsed.current * 0.4) * coinRadius * 0.04;

      const nextScale = THREE.MathUtils.damp(group.scale.x, 1, 3, delta);
      group.scale.setScalar(nextScale);
    } else {
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
          3,
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
    }
  });

  return (
    <group
      ref={groupRef}
      scale={mode === "landed" ? 1 : 0}
      onClick={
        mode === "landed"
          ? () => {
              if (spinTweenRef.current) return;
              const currentOscillation =
                Math.sin(elapsed.current * OSCILLATION_SPEED) *
                OSCILLATION_AMPLITUDE;
              const currentRotation =
                baseRotationRef.current + currentOscillation;
              spinTweenRef.current = {
                startTime: elapsed.current,
                from: currentRotation,
                to: currentRotation + Math.PI * 2,
              };
            }
          : undefined
      }
    >
      <mesh
        castShadow
        receiveShadow
        geometry={bodyGeometry}
        onPointerOver={
          mode === "landed"
            ? (event) => {
                event.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            : undefined
        }
        onPointerOut={
          mode === "landed"
            ? () => {
                document.body.style.cursor = "auto";
              }
            : undefined
        }
      >
        <meshStandardMaterial color="#9C7A34" metalness={1} roughness={0.4} />
      </mesh>

      {crestGeometries.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          position={[0, 0, COIN_HEIGHT / 2]}
          castShadow
        >
          <meshStandardMaterial color="#C7A146" metalness={1} roughness={0.32} />
        </mesh>
      ))}

      <Text
        position={[0, coinRadius * 0.18, -COIN_HEIGHT / 2 - 0.02]}
        rotation={[0, Math.PI, 0]}
        fontSize={coinRadius * 0.24}
        color="#050505"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        maxWidth={coinRadius * 1.8}
      >
        DON BARON
      </Text>
      <Text
        position={[0, -coinRadius * 0.15, -COIN_HEIGHT / 2 - 0.02]}
        rotation={[0, Math.PI, 0]}
        fontSize={coinRadius * 0.13}
        color="#050505"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        maxWidth={coinRadius * 1.8}
      >
        EXCLUSIVE MEMBER
      </Text>
    </group>
  );
}
