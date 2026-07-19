"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/contexts/session-context";
import type { AuthGate } from "@/core/auth/types";

interface ProvidersProps {
  session: AuthGate;
  children: ReactNode;
}

export function Providers({ session, children }: ProvidersProps) {
  return <SessionProvider value={session}>{children}</SessionProvider>;
}
