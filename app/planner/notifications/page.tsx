import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerNotificationsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Notifications"
      description="Alerts for incoming consultation requests and booking updates."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/bookings"
      actionLabel="Check bookings"
      items={[
        "New consultation requests",
        "Payment follow-up reminders",
        "Customer responses",
        "Pending approval alerts",
      ]}
    />
  );
}
