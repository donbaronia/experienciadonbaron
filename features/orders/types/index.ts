export type OrderStatus = "recebido" | "em_producao" | "a_caminho" | "entregue";

export interface Order {
  id: string;
  code: string;
  createdAt: string;
  status: OrderStatus;
  items: string[];
  totalInCents: number;
  crownPointsEarned: number;
}
