import { Card, CardLabel, CardTitle } from "@/components/Card";
import type { VaultReward } from "../types";

const rarityLabel: Record<VaultReward["rarity"], string> = {
  reservado: "Reservado",
  raro: "Raro",
  lendario: "Lendário",
};

interface RewardCardProps {
  reward: VaultReward;
}

export function RewardCard({ reward }: RewardCardProps) {
  return (
    <Card elevated={reward.rarity === "lendario"} className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <CardLabel>{rarityLabel[reward.rarity]}</CardLabel>
        {reward.remainingUnits !== null ? (
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ash">
            {reward.remainingUnits} restantes
          </span>
        ) : null}
      </div>
      <CardTitle>{reward.name}</CardTitle>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-dim">
        {reward.description}
      </p>
      <p className="mt-6 border-t border-ash-line pt-4 font-display text-xl text-gold">
        {reward.costInCrownPoints.toLocaleString("pt-BR")}
        <span className="ml-2 text-xs uppercase tracking-[0.2em] text-ash">
          pontos de coroa
        </span>
      </p>
    </Card>
  );
}
