"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AuthGate } from "@/core/auth/types";

const SessionContext = createContext<AuthGate | null>(null);

interface SessionProviderProps {
  value: AuthGate;
  children: ReactNode;
}

export function SessionProvider({ value, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): AuthGate {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession deve ser usado dentro de <SessionProvider>.");
  }
  return context;
}
