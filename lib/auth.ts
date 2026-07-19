export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthGate {
  status: "guest" | "authenticated";
  user: SessionUser | null;
}

export async function getSession(): Promise<AuthGate> {
  return { status: "guest", user: null };
}
