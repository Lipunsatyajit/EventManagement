import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminBookingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Bookings"
      description="Platform-wide booking monitoring and booking issue tracking."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/reports"
      actionLabel="Open reports"
      items={[
        "Total booking volumes",
        "Pending requests",
        "Completed bookings",
        "Problem cases",
      ]}
    />
  );
}
