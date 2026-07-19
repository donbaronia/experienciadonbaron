"use client";

import { useMemo } from "react";
import type { Order } from "../types";

interface OrdersSummary {
  totalSpentInCents: number;
  totalCrownPoints: number;
}

export function useOrdersSummary(orders: Order[]): OrdersSummary {
  return useMemo(
    () => ({
      totalSpentInCents: orders.reduce(
        (sum, order) => sum + order.totalInCents,
        0
      ),
      totalCrownPoints: orders.reduce(
        (sum, order) => sum + order.crownPointsEarned,
        0
      ),
    }),
    [orders]
  );
}
