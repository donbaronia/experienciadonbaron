"use client";

import { Nfc, ShieldAlert } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { useNfcSupport } from "../hooks/useNfcSupport";

export function NfcActivation() {
  const support = useNfcSupport();

  if (support === "checking") {
    return (
      <p className="text-center text-xs uppercase tracking-[0.25em] text-ash">
        Verificando compatibilidade…
      </p>
    );
  }

  if (support === "unsupported") {
    return (
      <div className="mx-auto flex max-w-md items-start gap-3 border border-ash-line bg-noir-soft p-5">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
        <p className="text-sm leading-relaxed text-ivory-dim">
          Este navegador não lê NFC. Abra pelo Chrome no Android ou apresente o
          cartão no balcão para ativar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <GlowButton>
        <span className="inline-flex items-center gap-3">
          <Nfc className="h-4 w-4" strokeWidth={1.5} />
          Ativar meu cartão
        </span>
      </GlowButton>
      <p className="text-xs uppercase tracking-[0.25em] text-ash">
        Aproxime o cartão após tocar
      </p>
    </div>
  );
}
