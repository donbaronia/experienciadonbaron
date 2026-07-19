import type { ServiceResult } from "@/types";
import type { FounderChapter } from "../types";

const chapters: FounderChapter[] = [
  {
    id: "ch-origem",
    year: "O começo",
    title: "Uma cozinha, uma obsessão",
    narrative:
      "Antes do nome, existia a rotina: acordar cedo, testar blend, errar, refazer. O Don Baron nasceu da recusa em servir qualquer coisa que não fosse a melhor versão possível.",
  },
  {
    id: "ch-escala",
    year: "A escala",
    title: "Mil pedidos por dia",
    narrative:
      "A operação cresceu até virar uma das maiores cozinhas do Piauí. Marcas, frota própria, uma equipe inteira sustentada pelo mesmo padrão da primeira chapa.",
  },
  {
    id: "ch-universo",
    year: "Agora",
    title: "O Universo",
    narrative:
      "O próximo capítulo não é vender mais. É reconhecer quem construiu essa história junto — e abrir uma porta que a maioria nunca vai ver.",
  },
];

export async function getFounderChapters(): Promise<
  ServiceResult<FounderChapter[]>
> {
  return { data: chapters, source: "mock" };
}
