import type { ServiceResult } from "@/types";
import type { MemberProfile } from "../types";

const profile: MemberProfile = {
  id: "mb-0001",
  name: "Membro Convidado",
  tier: "barao",
  memberSince: "2026-01-15",
  crownPoints: 1240,
  ordersCount: 18,
  favoriteCreation: "Coroa de Fumaça",
};

export async function getMemberProfile(): Promise<ServiceResult<MemberProfile>> {
  return { data: profile, source: "mock" };
}
