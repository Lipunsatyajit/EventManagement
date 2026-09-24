import { AdminDashboardContent, AdminPortalShell } from "../_components/admin-ui";

export default function AdminDashboardPage() {
  return (
    <AdminPortalShell
      roleLabel="Super admin dashboard"
      title="Platform oversight, approvals, and reports."
      description="Admin control room for planner approvals, users, bookings, categories, districts, and reports."
      backHref="/login?role=admin"
      backLabel="Back to admin login"
    >
      <AdminDashboardContent />
    </AdminPortalShell>
  );
}
