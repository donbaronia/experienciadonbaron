import { Gift, LayoutGrid, Lock, UserCircle2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { IntroGate } from "@/features/cinematic-intro/components/IntroGate";
import { LobbyCoin } from "@/features/lobby/components/LobbyCoin";
import { PortalCard } from "@/features/lobby/components/PortalCard";
import { Sidebar } from "@/features/lobby/components/Sidebar";

const PORTALS = [
  { href: "/menu-reservado", label: "Menu Secreto", icon: Lock },
  { href: "/colecoes", label: "Coleção", icon: LayoutGrid },
  { href: "/beneficios", label: "Benefícios", icon: Gift },
  { href: "/perfil", label: "Meu Perfil", icon: UserCircle2 },
] as const;

export default function HomePage() {
  return (
    <>
      <IntroGate />
      <div className="relative flex min-h-screen flex-col">
        <div className="fixed left-6 top-6 z-40 md:left-8 md:top-8">
          <Logo withWordmark={false} size={32} />
        </div>

        <Sidebar />

        <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-28 pt-28 md:pb-16 md:pl-28">
          <LobbyCoin />

          <div className="text-center">
            <p className="font-display text-3xl leading-tight text-ivory md:text-5xl">
              Bem-vindo ao
            </p>
            <p className="text-gold-sheen animate-sheen bg-[length:200%_auto] font-display text-4xl leading-tight md:text-6xl">
              Universo Don Baron
            </p>
            <p className="mt-4 text-[0.65rem] uppercase tracking-crown text-ash">
              Exclusivo para membros
            </p>
          </div>

          <div className="grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {PORTALS.map((portal) => (
              <PortalCard key={portal.href} {...portal} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
