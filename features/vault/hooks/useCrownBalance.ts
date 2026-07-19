"use client";

import { useState } from "react";

interface CrownBalance {
  balance: number;
  canAfford: (cost: number) => boolean;
}

export function useCrownBalance(initialBalance = 0): CrownBalance {
  const [balance] = useState(initialBalance);

  return {
    balance,
    canAfford: (cost: number) => balance >= cost,
  };
}
