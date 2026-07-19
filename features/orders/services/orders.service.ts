import type { ServiceResult } from "@/types";
import type { Order } from "../types";

const orders: Order[] = [
  {
    id: "or-0342",
    code: "DB-0342",
    createdAt: "2026-07-18T20:41:00-03:00",
    status: "entregue",
    items: ["Baronesa", "Batata da Casa", "Refrigerante artesanal"],
    totalInCents: 7890,
    crownPointsEarned: 78,
  },
  {
    id: "or-0327",
    code: "DB-0327",
    createdAt: "2026-07-12T21:05:00-03:00",
    status: "entregue",
    items: ["Coroa de Fumaça", "Onion Rings"],
    totalInCents: 8290,
    crownPointsEarned: 82,
  },
  {
    id: "or-0311",
    code: "DB-0311",
    createdAt: "2026-07-05T19:52:00-03:00",
    status: "entregue",
    items: ["O Primeiro Corte", "Milkshake de caramelo salgado"],
    totalInCents: 7190,
    crownPointsEarned: 71,
  },
];

export async function getRecentOrders(): Promise<ServiceResult<Order[]>> {
  return { data: orders, source: "mock" };
}
