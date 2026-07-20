"use client";

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

const DEFAULT_RADIUS = 1.1;
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

/** Monograma "D"+"B" sólido (mesma técnica comprovada da coroa do Sprint 002: Shape à mão, sem holes). */
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

function createHaloTexture(): THREE.CanvasTexture {
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
    gradient.addColorStop(0, "rgba(246,215,119,0.55)");
    gradient.addColorStop(0.5, "rgba(212,175,55,0.18)");
    gradient.addColorStop(1, "rgba(212,175,55,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createSparklePositions(radius: number, count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + Math.sin(i) * 0.3;
    const orbit = radius * (1.5 + Math.random() * 0.6);
    positions[i * 3] = Math.cos(angle) * orbit;
    positions[i * 3 + 1] = Math.sin(angle) * orbit * 0.6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 0.8;
  }
  return positions;
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

const LANDED_BASE_SPIN = 0.22;
const LANDED_SPIN_BURST = 16;

export function Coin3D({ phase = "void", mode = "intro", radius }: Coin3DProps) {
  const coinRadius = radius ?? DEFAULT_RADIUS;
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const rotationRef = useRef(0);
  const tiltXRef = useRef(0);
  const tiltZRef = useRef(0);
  const spinSpeedRef = useRef(LANDED_BASE_SPIN);
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
  const haloTexture = useMemo(() => createHaloTexture(), []);
  const sparklePositions = useMemo(
    () => createSparklePositions(coinRadius, 36),
    [coinRadius]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    elapsed.current += delta;

    if (mode === "landed") {
      spinSpeedRef.current = THREE.MathUtils.damp(
        spinSpeedRef.current,
        LANDED_BASE_SPIN,
        1.4,
        delta
      );
      rotationRef.current += spinSpeedRef.current * delta;
      group.rotation.y = rotationRef.current;

      const targetTiltX = state.pointer.y * 0.14;
      const targetTiltZ = -state.pointer.x * 0.14;
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
      group.position.y = Math.sin(elapsed.current * 0.6) * coinRadius * 0.05;

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
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = elapsed.current * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={mode === "landed" ? 1 : 0}
      onClick={
        mode === "landed"
          ? () => {
              spinSpeedRef.current += LANDED_SPIN_BURST;
            }
          : undefined
      }
    >
      <sprite
        ref={haloRef}
        scale={[coinRadius * 4.2, coinRadius * 4.2, 1]}
        position={[0, 0, -coinRadius * 0.3]}
      >
        <spriteMaterial
          map={haloTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparklePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          sizeAttenuation
          color="#F6D777"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

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
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.24} />
      </mesh>

      {crestGeometries.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          position={[0, 0, COIN_HEIGHT / 2]}
          castShadow
        >
          <meshStandardMaterial color="#F6D777" metalness={1} roughness={0.16} />
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
