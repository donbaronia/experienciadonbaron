"use client";

import { useMemo } from "react";

export function useFounderSignature(name: string): string {
  return useMemo(
    () =>
      name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .join(""),
    [name]
  );
}
