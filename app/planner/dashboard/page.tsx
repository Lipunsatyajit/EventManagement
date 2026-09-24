import { PlannerDashboardContent, PlannerPortalShell } from "../_components/planner-ui";

export default function PlannerDashboardPage() {
  return (
    <PlannerPortalShell
      roleLabel="Planner dashboard"
      title="Manage inquiries, completed events, and packages."
      description="Planner operations center for requests, completed portfolio updates, and customer communication."
      backHref="/login?role=planner"
      backLabel="Back to planner login"
    >
      <PlannerDashboardContent />
    </PlannerPortalShell>
  );
}
