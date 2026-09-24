import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminReportsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Reports"
      description="Operational reports for bookings, planners, customers, and reviews."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/settings"
      actionLabel="Open settings"
      items={[
        "Bookings report",
        "Planner growth report",
        "Review report",
        "District usage report",
      ]}
    />
  );
}
