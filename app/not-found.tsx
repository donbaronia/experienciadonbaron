import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-crown text-gold">404</p>
      <h1 className="mt-5 font-display text-5xl text-ivory">
        Esta porta ainda não abre.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-dim">
        A página que você procura não faz parte do Universo — ou ainda não foi
        revelada.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center border border-gold/40 px-6 text-xs uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold/10"
      >
        Voltar ao início
      </Link>
    </PageContainer>
  );
}
