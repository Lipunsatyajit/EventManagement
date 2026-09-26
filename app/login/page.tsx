"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell } from "../(auth)/_components/auth-shell";
import { UnifiedLoginForm } from "../(auth)/_components/unified-login-form";
import { authRoleOptions, type AuthRoleKey } from "@/lib/auth-directory";

function getRoleCopy(role: AuthRoleKey) {
  if (role === "planner") {
    return {
      eyebrow: "Planner access",
      title: "Sign in as a planner with email OTP.",
      description:
        "Use one shared login screen for all users. Enter your registered email, verify OTP, and open the planner dashboard.",
      footerHref: "/planner/create",
      footerLabel: "Create planner account",
    };
  }

  if (role === "admin") {
    return {
      eyebrow: "Super admin access",
      title: "Sign in as a super admin with email OTP.",
      description:
        "Use one shared login screen for all users. Enter your registered email, verify OTP, and open the admin dashboard.",
      footerHref: "/",
      footerLabel: "Back to home",
    };
  }

  return {
    eyebrow: "Customer access",
    title: "Sign in as a customer with email OTP.",
    description:
      "Use one shared login screen for all users. Enter your registered email, verify OTP, and open the customer dashboard.",
    footerHref: "/",
    footerLabel: "Back to home",
  };
}

export default function LoginPage() {
  return <Suspense fallback={<p>Loading sign in...</p>}><LoginContent /></Suspense>;
}
function LoginContent() {
  const role = useSearchParams().get("role");
  const initialRole =
    authRoleOptions.find((option) => option.role === role)?.role ?? "customer";
  const copy = getRoleCopy(initialRole);

  return (
    <AuthShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      footerHref={copy.footerHref}
      footerLabel={copy.footerLabel}
    >
      <UnifiedLoginForm />
    </AuthShell>
  );
}
