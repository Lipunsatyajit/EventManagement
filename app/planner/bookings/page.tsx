import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerBookingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Bookings"
      description="Planner booking requests, confirmations, and follow-up tasks."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/login?role=planner"
      actionLabel="Review new request"
      items={[
        "Pending consultation requests",
        "Confirmed event bookings",
        "Offline discussion notes",
        "Client communication history",
      ]}
    />
  );
}
