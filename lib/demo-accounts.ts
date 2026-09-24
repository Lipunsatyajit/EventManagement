import { findAccountByEmail, normalizeEmail, type AuthAccount } from "./auth-directory";

const KEY = "utkal-demo-planners";
const PENDING_KEY = "utkal-pending-planner";

function isPlanner(value: unknown): value is AuthAccount {
  if (!value || typeof value !== "object") return false;
  const account = value as Partial<AuthAccount>;
  return account.role === "planner" && typeof account.email === "string" &&
    typeof account.roleId === "string" && typeof account.label === "string" &&
    account.dashboardHref === "/planner/dashboard";
}

export function findDemoAccount(email: string): AuthAccount | undefined {
  const seeded = findAccountByEmail(email);
  if (seeded || typeof window === "undefined") return seeded;
  try {
    const accounts: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(accounts)
      ? accounts.filter(isPlanner).find((account) => account.email === normalizeEmail(email))
      : undefined;
  } catch { return undefined; }
}

export function preparePlannerAccount(account: AuthAccount) {
  if (findDemoAccount(account.email)) throw new Error("This email already has an account. Please sign in.");
  sessionStorage.setItem(PENDING_KEY, JSON.stringify({ ...account, email: normalizeEmail(account.email) }));
}

export function pendingPlannerAccount(email: string) {
  try {
    const account: unknown = JSON.parse(sessionStorage.getItem(PENDING_KEY) ?? "null");
    return isPlanner(account) && account.email === normalizeEmail(email) ? account : undefined;
  } catch { return undefined; }
}

export function completePlannerAccount(account: AuthAccount) {
  const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  const accounts = Array.isArray(stored) ? stored.filter(isPlanner) : [];
  localStorage.setItem(KEY, JSON.stringify([...accounts.filter((item) => item.email !== account.email), account]));
  sessionStorage.removeItem(PENDING_KEY);
}
