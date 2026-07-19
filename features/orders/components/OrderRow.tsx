import { formatCurrencyBRL, formatDateBR } from "@/lib/utils";
import type { Order } from "../types";

const statusCopy: Record<Order["status"], string> = {
  recebido: "Recebido",
  em_producao: "Em produção",
  a_caminho: "A caminho",
  entregue: "Entregue",
};

interface OrderRowProps {
  order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
  return (
    <article className="flex flex-col gap-4 border-b border-ash-line py-8 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-baseline gap-4">
          <h3 className="font-display text-xl text-ivory">{order.code}</h3>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
            {statusCopy[order.status]}
          </span>
        </div>
        <p className="mt-2 text-sm text-ivory-dim">{order.items.join(" · ")}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ash">
          {formatDateBR(order.createdAt)}
        </p>
      </div>
      <div className="text-left md:text-right">
        <p className="font-display text-2xl text-ivory">
          {formatCurrencyBRL(order.totalInCents / 100)}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
          +{order.crownPointsEarned} pontos de coroa
        </p>
      </div>
    </article>
  );
}
