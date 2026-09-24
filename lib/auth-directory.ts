import { planners } from "@/lib/site-content";

export type AuthRoleKey = "customer" | "planner" | "admin";

export type AuthAccount = {
  email: string;
  role: AuthRoleKey;
  dashboardHref: string;
  roleId: string;
  label: string;
  displayName?: string;
};

export type AuthRoleOption = {
  role: AuthRoleKey;
  label: string;
  description: string;
};

export type PlannerSignupOption = {
  plannerId: string;
  label: string;
  district: string;
  roleId: string;
};

export type DemoCredential = {
  role: AuthRoleKey;
  label: string;
  email: string;
  otp: string;
  dashboardHref: string;
  displayName?: string;
};

export const authAccounts: AuthAccount[] = [
  {
    email: "customer@utkalevents.in",
    role: "customer",
    dashboardHref: "/planners",
    roleId: "cust-001",
    label: "Customer account",
    displayName: "Adelphia",
  },
  {
    email: "dream@utkalevents.in",
    role: "planner",
    dashboardHref: "/planner/dashboard",
    roleId: "plnr-001",
    label: "Dream Events",
    displayName: "Dream Events",
  },
  {
    email: "royal@utkalevents.in",
    role: "planner",
    dashboardHref: "/planner/dashboard",
    roleId: "plnr-002",
    label: "Royal Celebration",
    displayName: "Royal Celebration",
  },
  {
    email: "elegant@utkalevents.in",
    role: "planner",
    dashboardHref: "/planner/dashboard",
    roleId: "plnr-003",
    label: "Elegant Planners",
    displayName: "Elegant Planners",
  },
  {
    email: "admin@utkalevents.in",
    role: "admin",
    dashboardHref: "/admin/dashboard",
    roleId: "adm-001",
    label: "Super admin",
    displayName: "Super Admin",
  },
];

export const authRoleOptions: AuthRoleOption[] = [
  {
    role: "customer",
    label: "Customer",
    description: "Book consultations, track requests, and manage reviews.",
  },
  {
    role: "planner",
    label: "Planner",
    description: "Manage bookings, portfolios, packages, and notifications.",
  },
  {
    role: "admin",
    label: "Super admin",
    description: "Approve planners, monitor reports, and oversee the platform.",
  },
];

export const demoCredentials: DemoCredential[] = [
  {
    role: "customer",
    label: "Customer",
    email: "customer@utkalevents.in",
    otp: "123456",
    dashboardHref: "/planners",
    displayName: "Adelphia",
  },
  {
    role: "planner",
    label: "Planner - Dream Events",
    email: "dream@utkalevents.in",
    otp: "123456",
    dashboardHref: "/planner/dashboard",
    displayName: "Dream Events",
  },
  {
    role: "planner",
    label: "Planner - Royal Celebration",
    email: "royal@utkalevents.in",
    otp: "123456",
    dashboardHref: "/planner/dashboard",
    displayName: "Royal Celebration",
  },
  {
    role: "planner",
    label: "Planner - Elegant Planners",
    email: "elegant@utkalevents.in",
    otp: "123456",
    dashboardHref: "/planner/dashboard",
    displayName: "Elegant Planners",
  },
  {
    role: "admin",
    label: "Super admin",
    email: "admin@utkalevents.in",
    otp: "123456",
    dashboardHref: "/admin/dashboard",
    displayName: "Super Admin",
  },
];

export const plannerSignupOptions: PlannerSignupOption[] = planners.map((planner, index) => ({
  plannerId: `plnr-00${index + 1}`,
  label: planner.name,
  district: planner.district,
  roleId: `plnr-00${index + 1}`,
}));

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function findAccountByEmail(email: string, role?: AuthRoleKey) {
  const normalized = normalizeEmail(email);
  return authAccounts.find((account) => {
    if (account.email !== normalized) {
      return false;
    }

    return role ? account.role === role : true;
  });
}

export function getAccountsByRole(role: AuthRoleKey) {
  return authAccounts.filter((account) => account.role === role);
}

export function getDefaultAccountForRole(role: AuthRoleKey) {
  return getAccountsByRole(role)[0] ?? authAccounts[0];
}

export function getPlannerSignupOption(plannerId?: string) {
  if (!plannerId) {
    return plannerSignupOptions[0];
  }

  return (
    plannerSignupOptions.find((option) => option.plannerId === plannerId) ??
    plannerSignupOptions[0]
  );
}
