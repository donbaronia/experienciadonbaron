import { formatCurrencyBRL } from "@/lib/utils";
import type { ExclusiveMenuItem } from "../types";

const statusCopy: Record<ExclusiveMenuItem["windowStatus"], string> = {
  aberta: "Janela aberta",
  encerrando: "Últimos dias",
  esgotada: "Esgotado",
};

interface MenuChapterProps {
  item: ExclusiveMenuItem;
}

export function MenuChapter({ item }: MenuChapterProps) {
  const soldOut = item.windowStatus === "esgotada";

  return (
    <article
      className={
        soldOut
          ? "border-b border-ash-line py-10 opacity-50"
          : "border-b border-ash-line py-10"
      }
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-baseline">
        <span className="font-display text-4xl text-gold/60">
          {String(item.chapterNumber).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-3xl text-ivory">{item.name}</h3>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              {statusCopy[item.windowStatus]}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory-dim">
            {item.description}
          </p>
          <p className="mt-4 font-display text-xl text-gold">
            {formatCurrencyBRL(item.priceInCents / 100)}
          </p>
        </div>
      </div>
    </article>
  );
}
