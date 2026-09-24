import type { AuthRoleKey } from "@/lib/auth-directory";
import { findDemoAccount } from "./demo-accounts";

export type AuthSession = {
  email: string;
  role: AuthRoleKey;
  dashboardHref: string;
  loggedInAt: string;
  displayName?: string;
};

export const AUTH_SESSION_KEY = "utkal-auth-session";

export function readAuthSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!rawSession) return null;
    const session = JSON.parse(rawSession) as Partial<AuthSession> | null;
    if (!session || typeof session.email !== "string" || typeof session.loggedInAt !== "string") return null;
    const account = findDemoAccount(session.email);
    if (!account || account.role !== session.role) return null;
    return { ...session, email: account.email, role: account.role,
      dashboardHref: account.dashboardHref, displayName: account.displayName ?? account.label } as AuthSession;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
}
