"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Coin3D } from "@/features/cinematic-intro/components/Coin3D";

export function LobbyCoinScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 32, position: [0, 0, 1.9] }}
    >
      <fog attach="fog" args={["#050505", 1.6, 4]} />
      <ambientLight intensity={0.4} color="#F4F1E8" />
      <spotLight
        position={[3, 4, 5]}
        angle={0.5}
        penumbra={0.6}
        intensity={2.2}
        color="#F6D777"
      />
      <pointLight position={[-4, -1, -3]} intensity={0.8} color="#D4AF37" />
      <Environment preset="studio" environmentIntensity={0.5} />
      <Coin3D mode="landed" radius={0.4} />
    </Canvas>
  );
}
