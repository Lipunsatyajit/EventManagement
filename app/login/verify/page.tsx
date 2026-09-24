import { AuthShell } from "../../(auth)/_components/auth-shell";
import { OtpVerificationForm } from "../../(auth)/_components/otp-verification-form";
import { authRoleOptions, type AuthRoleKey } from "@/lib/auth-directory";

function getRoleLabel(role: AuthRoleKey) {
  return authRoleOptions.find((option) => option.role === role)?.label ?? "Customer";
}

export default async function SharedOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; role?: string; plannerId?: string }>;
}) {
  const { email = "", role, plannerId } = await searchParams;
  const resolvedRole =
    authRoleOptions.find((option) => option.role === role)?.role ?? "customer";
  const roleLabel = getRoleLabel(resolvedRole);

  return (
    <AuthShell
      eyebrow={`${roleLabel} verification`}
      title={`Verify the ${roleLabel.toLowerCase()} email with OTP.`}
      description="This shared OTP screen works for customer, planner, and super admin demo logins."
      footerHref={`/login?role=${resolvedRole}`}
      footerLabel={`Back to ${roleLabel.toLowerCase()} login`}
    >
      <OtpVerificationForm
        email={email}
        role={resolvedRole}
        fallbackHref={
          resolvedRole === "planner"
            ? "/planner/dashboard"
            : resolvedRole === "admin"
              ? "/admin/dashboard"
              : "/planners"
        }
        title={`${roleLabel} OTP verification`}
        description={`A 6-digit code is required for ${email || "your email"} before opening the ${roleLabel.toLowerCase()} dashboard.`}
        overrideDashboardHref={
          plannerId && resolvedRole === "planner"
            ? "/planner/dashboard"
            : resolvedRole === "customer"
              ? "/planners"
              : undefined
        }
        hintText={
          plannerId && resolvedRole === "planner"
            ? `Planner ID ${plannerId} will be attached to this session.`
            : "Use the local mock OTP 123456. Replace this with backend verification when the API is connected."
        }
      />
    </AuthShell>
  );
}
