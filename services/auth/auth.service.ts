import type { AuthGate } from "@/core/auth/types";

export async function getSession(): Promise<AuthGate> {
  return { status: "guest", user: null };
}
