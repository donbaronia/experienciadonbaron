import type { ServiceResult } from "@/types";
import type { NfcMemberCard } from "../types";

const card: NfcMemberCard = {
  id: "card-0001",
  serialNumber: "DB·0001·PI",
  status: "aguardando_ativacao",
  issuedAt: "2026-07-01",
};

export async function getMemberCard(): Promise<ServiceResult<NfcMemberCard>> {
  return { data: card, source: "mock" };
}
