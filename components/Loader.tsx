import { Logo } from "@/components/Logo";

export function Loader() {
  return (
    <div
      role="status"
      aria-label="Carregando"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6"
    >
      <Logo withWordmark={false} drawOnMount className="scale-125" />
      <div className="h-px w-24 overflow-hidden bg-ash-line">
        <div className="h-full w-full animate-sheen bg-gold-fade bg-[length:200%_100%]" />
      </div>
      <span className="animate-pulse-soft text-[0.6rem] uppercase tracking-crown text-ash">
        Preparando o Universo
      </span>
    </div>
  );
}
