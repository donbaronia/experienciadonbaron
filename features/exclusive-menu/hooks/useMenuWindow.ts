"use client";

import { useMemo } from "react";
import type { ExclusiveMenuItem } from "../types";

export function useMenuWindow(items: ExclusiveMenuItem[]): {
  available: ExclusiveMenuItem[];
  soldOut: ExclusiveMenuItem[];
} {
  return useMemo(
    () => ({
      available: items.filter((item) => item.windowStatus !== "esgotada"),
      soldOut: items.filter((item) => item.windowStatus === "esgotada"),
    }),
    [items]
  );
}
