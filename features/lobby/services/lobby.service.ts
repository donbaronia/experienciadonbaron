import { Crown, Gem, Nfc, UtensilsCrossed } from "lucide-react";
import type { ServiceResult } from "@/types";
import type { ExperiencePillar } from "../types";

const pillars: ExperiencePillar[] = [
  {
    id: "vault",
    label: "Recompensas",
    title: "O Vault",
    description:
      "Cada pedido acumula pontos de coroa. O Vault guarda o que ninguém compra: experiências, itens de série limitada e acessos reservados.",
    icon: Gem,
    href: "/vault",
  },
  {
    id: "menu",
    label: "Gastronomia",
    title: "Menu Reservado",
    description:
      "Criações fora de catálogo, assinadas pela cozinha. Disponíveis apenas para membros, em janelas curtas e sem reposição.",
    icon: UtensilsCrossed,
    href: "/menu-reservado",
  },
  {
    id: "nfc",
    label: "Identidade",
    title: "Cartão de Membro",
    description:
      "Um cartão físico com NFC. Aproximou, entrou no Universo. Sua identidade, seu histórico e seus benefícios em um toque.",
    icon: Nfc,
    href: "/nfc",
  },
  {
    id: "founder",
    label: "Origem",
    title: "A Mesa do Fundador",
    description:
      "A história por trás do balcão, contada por quem construiu. E um canal direto com o fundador para quem faz parte do círculo.",
    icon: Crown,
    href: "/fundador",
  },
];

export async function getExperiencePillars(): Promise<
  ServiceResult<ExperiencePillar[]>
> {
  return { data: pillars, source: "mock" };
}
