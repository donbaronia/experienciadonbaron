/**
 * DIREÇÃO DE ARTE — Lobby (Universo Don Baron)
 *
 * Composição: uma fotografia de arquitetura noturna, não uma landing page.
 * Um único objeto de valor — a moeda — ocupa o centro óptico da tela.
 * Tudo em volta é espaço negativo deliberado; nada compete com ela.
 *
 * Foco visual: a moeda. Pequena (~18% da altura útil), quase imóvel,
 * com luz controlada revelando peso e metal — não um banner, um objeto.
 *
 * Hierarquia (do que mais chama atenção para o que menos):
 *   1. A moeda — único elemento com brilho e movimento.
 *   2. O nome da casa — tipografia silenciosa, sem cor de destaque.
 *   3. O menu — texto puro, só se anuncia quando o olhar já chegou lá
 *      (hover), nunca antes.
 *   4. A logo — canto superior, um selo discreto, nunca protagonista.
 *
 * Fluxo do olhar: entra pela moeda (centro, única fonte de luz "viva"),
 * desce para o nome, só depois nota o menu no canto. Nunca o contrário.
 *
 * Paleta: 95% preto, 4% cinza (texto secundário), 1% dourado — reservado
 * exclusivamente para o metal da moeda, o traço da logo e a linha de
 * hover do menu. Dourado nunca preenche área, só marca um ponto.
 */
import { IntroGate } from "@/features/cinematic-intro/components/IntroGate";
import { LobbyCoin } from "@/features/lobby/components/LobbyCoin";
import { LobbyNav } from "@/features/lobby/components/LobbyNav";

export default function HomePage() {
  return (
    <>
      <IntroGate />
      <div className="relative flex min-h-screen flex-col">
        <LobbyNav />
        <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-14 px-6 py-32">
          <LobbyCoin />
          <div className="text-center">
            <p className="font-display text-3xl leading-tight text-ivory md:text-4xl">
              Universo Don Baron
            </p>
            <p className="mt-5 text-[0.6rem] uppercase tracking-crown text-ash">
              Exclusivo para membros
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
