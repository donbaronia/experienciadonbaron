export type NfcCardStatus = "aguardando_ativacao" | "ativo" | "bloqueado";

export interface NfcMemberCard {
  id: string;
  serialNumber: string;
  status: NfcCardStatus;
  issuedAt: string;
}
