"use client";

/**
 * Iluminação de vitrine de joalheria: um único foco estreito e
 * controlado define a forma da peça através da luz e da sombra que
 * ela projeta — não um ambiente genericamente iluminado. Ambient
 * baixo o bastante para que o metal dependa do reflexo (Environment),
 * não de brilho próprio; é isso que faz o ouro parecer ouro de verdade.
 */
import { Environment, Lightformer } from "@react-three/drei";
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
      <ambientLight intensity={0.22} color="#F4F1E8" />
      <spotLight
        position={[3, 4, 5]}
        angle={0.32}
        penumbra={0.5}
        intensity={2.6}
        color="#F6D777"
      />
      <pointLight position={[-4, -1, -3]} intensity={0.45} color="#D4AF37" />
      {/* Ambiente procedural (sem fetch externo de HDRI — só luzes geradas em runtime) */}
      <Environment resolution={128} environmentIntensity={0.4}>
        <Lightformer
          intensity={2.5}
          color="#F6D777"
          position={[0, 3, -3]}
          scale={[6, 3, 1]}
        />
        <Lightformer
          intensity={0.8}
          color="#D4AF37"
          position={[-3, 1, 2]}
          scale={[3, 2, 1]}
        />
        <Lightformer
          intensity={0.5}
          color="#F4F1E8"
          position={[3, -1, 2]}
          scale={[3, 2, 1]}
        />
      </Environment>
      <Coin3D mode="landed" radius={0.4} />
    </Canvas>
  );
}
