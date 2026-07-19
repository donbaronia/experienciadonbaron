export type MemberTier = "barao" | "conde" | "duque" | "fundador";

export interface Member {
  id: string;
  name: string;
  tier: MemberTier;
  memberSince: string;
  crownPoints: number;
}

export interface ServiceResult<T> {
  data: T;
  source: "mock" | "supabase";
}
