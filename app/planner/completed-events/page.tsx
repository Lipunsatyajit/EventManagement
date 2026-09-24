import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerCompletedEventsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Completed events"
      description="Portfolio evidence for the planner profile and marketing pages."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planners/dream-events"
      actionLabel="Open profile"
      items={[
        "Event gallery entries",
        "Budget and venue notes",
        "Services delivered",
        "Review references",
      ]}
    />
  );
}
