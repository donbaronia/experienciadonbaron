import type { MemberTier } from "@/types";
import { cn } from "@/lib/utils";

const tierCopy: Record<MemberTier, string> = {
  barao: "Barão",
  conde: "Conde",
  duque: "Duque",
  fundador: "Círculo do Fundador",
};

interface TierBadgeProps {
  tier: MemberTier;
  className?: string;
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-gold",
        tier === "fundador" && "border-gold bg-gold/10 shadow-glow",
        className
      )}
    >
      {tierCopy[tier]}
    </span>
  );
}
