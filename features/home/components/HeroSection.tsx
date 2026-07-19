import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Reveal>
        <p className="text-xs uppercase tracking-crown text-gold">
          {BRAND.city}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight text-ivory md:text-7xl">
          Existe um universo
          <br />
          <span className="text-gold-sheen animate-sheen bg-[length:200%_auto]">
            atrás do balcão.
          </span>
        </h1>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory-dim">
          O Universo Don Baron não é um cardápio. É um clube de acesso restrito
          para quem faz parte da história — com recompensas, criações reservadas
          e um cartão que abre portas.
        </p>
      </Reveal>
      <Reveal delay={0.45}>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/vault"
            className="inline-flex h-12 items-center bg-gold px-8 text-sm uppercase tracking-[0.25em] text-noir transition-colors duration-300 hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
          >
            Entrar no Vault
          </Link>
          <Link
            href="/fundador"
            className="inline-flex h-12 items-center border border-gold/40 px-8 text-sm uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
          >
            Conhecer a origem
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
