import type { ServiceResult } from "@/types";
import type { VaultReward } from "../types";

const rewards: VaultReward[] = [
  {
    id: "rw-degustacao",
    name: "Mesa de Degustação às Cegas",
    description:
      "Uma noite na cozinha. Cinco criações que nunca entraram no cardápio, servidas direto da chapa.",
    rarity: "lendario",
    costInCrownPoints: 5000,
    remainingUnits: 2,
  },
  {
    id: "rw-blend",
    name: "Blend Assinado com seu Nome",
    description:
      "Um blend exclusivo desenvolvido com a cozinha, batizado com o seu nome e disponível por 30 dias no Menu Reservado.",
    rarity: "lendario",
    costInCrownPoints: 8000,
    remainingUnits: 1,
  },
  {
    id: "rw-caixa",
    name: "Caixa do Barão",
    description:
      "Kit físico numerado: molho da casa, brasa selecionada e itens de série limitada.",
    rarity: "raro",
    costInCrownPoints: 2500,
    remainingUnits: 12,
  },
  {
    id: "rw-fila-zero",
    name: "Fila Zero por 90 dias",
    description:
      "Seus pedidos entram com prioridade de produção durante três meses.",
    rarity: "raro",
    costInCrownPoints: 1800,
    remainingUnits: null,
  },
  {
    id: "rw-upgrade",
    name: "Upgrade Silencioso",
    description:
      "Em um pedido à sua escolha, a cozinha eleva o corte e a montagem sem custo. Você só descobre ao abrir a caixa.",
    rarity: "reservado",
    costInCrownPoints: 900,
    remainingUnits: null,
  },
  {
    id: "rw-convite",
    name: "Convite Transferível",
    description:
      "Um convite para apresentar alguém ao Universo com o primeiro benefício desbloqueado.",
    rarity: "reservado",
    costInCrownPoints: 600,
    remainingUnits: null,
  },
];

export async function getVaultRewards(): Promise<ServiceResult<VaultReward[]>> {
  return { data: rewards, source: "mock" };
}
