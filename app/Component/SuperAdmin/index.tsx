import {
  AdminAuthShell,
  AdminDashboardContent,
  AdminEmailLoginForm,
  AdminOtpVerificationForm,
  AdminPortalShell,
} from "../../admin/_components/admin-ui";
import { RoleSectionPage } from "../../_components/role-section-page";

export function SuperAdminLoginPage() {
  return (
    <AdminAuthShell
      eyebrow="Super admin portal"
      title="Super admin login with email and OTP."
      description="Super admin access is grouped under the admin folder and resolves to the admin dashboard after verification."
      footerHref="/"
      footerLabel="Back to home"
    >
      <AdminEmailLoginForm
        role="admin"
        actionLabel="Send OTP"
        verifyHref="/admin/login/verify"
        helperText="After verification, admins land on the super admin dashboard."
        noteText="The real implementation should resolve the role from the database using the entered email."
      />
    </AdminAuthShell>
  );
}

export async function SuperAdminOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;

  return (
    <AdminAuthShell
      eyebrow="Super admin verification"
      title="Verify the admin email with OTP."
      description="Super admin access is database-driven. After OTP verification the system routes to the admin dashboard."
      footerHref="/admin/login"
      footerLabel="Back to admin login"
    >
      <AdminOtpVerificationForm
        email={email}
        role="admin"
        fallbackHref="/admin/dashboard"
        title="Admin OTP verification"
        description={`A 6-digit code is required for ${email || "the admin email"} before opening the super admin dashboard.`}
        overrideDashboardHref="/admin/dashboard"
      />
    </AdminAuthShell>
  );
}

export function SuperAdminDashboardPage() {
  return (
    <AdminPortalShell
      roleLabel="Super admin dashboard"
      title="Platform oversight, approvals, and reports."
      description="Admin control room for planner approvals, users, bookings, categories, districts, and reports."
      backHref="/admin/login"
      backLabel="Back to admin login"
    >
      <AdminDashboardContent />
    </AdminPortalShell>
  );
}

export function SuperAdminPlannerApprovalsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Planner approvals"
      description="Approve or reject planner registrations before they appear on the marketplace."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/planners"
      actionLabel="Open planners"
      items={["Pending planner applications", "Verification status", "Approval notes", "Review history"]}
    />
  );
}

export function SuperAdminPlannersPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Planners"
      description="All planners listed in the marketplace with status and review signals."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/planner-approvals"
      actionLabel="Review approvals"
      items={["Planner directory", "Status and verification", "District coverage", "Account moderation"]}
    />
  );
}

export function SuperAdminCustomersPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Customers"
      description="Customer accounts, booking activity, and support history."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/bookings"
      actionLabel="Open bookings"
      items={["Customer list", "Active consultations", "Support history", "Review moderation"]}
    />
  );
}

export function SuperAdminBookingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Bookings"
      description="Platform-wide booking monitoring and booking issue tracking."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/reports"
      actionLabel="Open reports"
      items={["Total booking volumes", "Pending requests", "Completed bookings", "Problem cases"]}
    />
  );
}

export function SuperAdminReviewsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Reviews"
      description="Moderate reviews and flag suspicious activity."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/customers"
      actionLabel="Open customers"
      items={["Review queue", "Flagged feedback", "User ratings", "Content moderation"]}
    />
  );
}

export function SuperAdminCategoriesPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Categories"
      description="Manage event categories displayed on the public site."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/districts"
      actionLabel="Open districts"
      items={["Wedding and reception types", "Corporate event categories", "Photography and decor categories", "Category visibility"]}
    />
  );
}

export function SuperAdminDistrictsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Districts"
      description="Manage district coverage and location metadata."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/categories"
      actionLabel="Open categories"
      items={["District directory", "Coverage mapping", "Search filters", "Availability rules"]}
    />
  );
}

export function SuperAdminReportsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Reports"
      description="Operational reports for bookings, planners, customers, and reviews."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/settings"
      actionLabel="Open settings"
      items={["Bookings report", "Planner growth report", "Review report", "District usage report"]}
    />
  );
}

export function SuperAdminSettingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Settings"
      description="Admin configuration and system preferences."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/login"
      actionLabel="Sign out"
      items={["Security preferences", "Approval workflow settings", "District/category defaults", "Notification preferences"]}
    />
  );
}
