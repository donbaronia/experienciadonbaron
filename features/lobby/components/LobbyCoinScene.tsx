"use client";

import { Canvas } from "@react-three/fiber";
import { Coin3D } from "@/features/cinematic-intro/components/Coin3D";

export function LobbyCoinScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 32, position: [0, 0, 2.15] }}
    >
      <ambientLight intensity={0.3} color="#F4F1E8" />
      <spotLight
        position={[3, 4, 5]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.4}
        color="#F6D777"
      />
      <pointLight position={[-4, -1, -3]} intensity={0.5} color="#D4AF37" />
      <Coin3D mode="landed" radius={0.45} />
    </Canvas>
  );
}
