import { IntroGate } from "@/features/cinematic-intro/components/IntroGate";
import { LobbyCoin } from "@/features/lobby/components/LobbyCoin";
import { LobbyNav } from "@/features/lobby/components/LobbyNav";

export default function HomePage() {
  return (
    <>
      <IntroGate />
      <div className="relative flex min-h-screen flex-col">
        <LobbyNav />

        <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-12 px-6 py-32">
          <LobbyCoin />

          <div className="text-center">
            <p className="font-display text-2xl leading-tight text-ivory md:text-3xl">
              Bem-vindo ao
            </p>
            <p className="font-display text-3xl leading-tight text-ivory md:text-4xl">
              Universo Don Baron
            </p>
            <p className="mt-6 text-[0.6rem] uppercase tracking-crown text-ash">
              Exclusivo para membros
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
