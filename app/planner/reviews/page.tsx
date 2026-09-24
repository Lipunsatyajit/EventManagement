import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerReviewsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Reviews"
      description="Planner review management and customer feedback."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/completed-events"
      actionLabel="Open completed events"
      items={[
        "Customer ratings",
        "Review responses",
        "Photos attached to reviews",
        "Feedback moderation",
      ]}
    />
  );
}
