export type RewardRarity = "reservado" | "raro" | "lendario";

export interface VaultReward {
  id: string;
  name: string;
  description: string;
  rarity: RewardRarity;
  costInCrownPoints: number;
  remainingUnits: number | null;
}
