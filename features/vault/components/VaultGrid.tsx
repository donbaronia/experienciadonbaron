import { Reveal } from "@/components/Reveal";
import { getVaultRewards } from "../services/vault.service";
import { RewardCard } from "./RewardCard";

export async function VaultGrid() {
  const { data: rewards } = await getVaultRewards();

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward, index) => (
        <Reveal key={reward.id} delay={index * 0.08}>
          <RewardCard reward={reward} />
        </Reveal>
      ))}
    </div>
  );
}
