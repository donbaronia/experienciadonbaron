import type { MemberTier } from "@/types";

export interface MemberProfile {
  id: string;
  name: string;
  tier: MemberTier;
  memberSince: string;
  crownPoints: number;
  ordersCount: number;
  favoriteCreation: string;
}
