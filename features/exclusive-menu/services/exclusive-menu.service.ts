import type { ServiceResult } from "@/types";
import type { ExclusiveMenuItem } from "../types";

const items: ExclusiveMenuItem[] = [
  {
    id: "mn-capitulo-1",
    name: "O Primeiro Corte",
    chapterNumber: 1,
    description:
      "Brioche de fermentação lenta, blend maturado 21 dias, manteiga de brasa e cebola caramelizada no melado escuro.",
    priceInCents: 5490,
    windowStatus: "esgotada",
  },
  {
    id: "mn-capitulo-2",
    name: "Coroa de Fumaça",
    chapterNumber: 2,
    description:
      "Costela defumada por 8 horas, desmanchada sobre queijo de casca lavada e picles da casa.",
    priceInCents: 6290,
    windowStatus: "encerrando",
  },
  {
    id: "mn-capitulo-3",
    name: "Baronesa",
    chapterNumber: 3,
    description:
      "Smash duplo em pão de leitelho, creme de queijo defumado e geleia de pimenta dourada da casa.",
    priceInCents: 4890,
    windowStatus: "aberta",
  },
];

export async function getExclusiveMenu(): Promise<
  ServiceResult<ExclusiveMenuItem[]>
> {
  return { data: items, source: "mock" };
}
