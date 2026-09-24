import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerPackagesPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Packages"
      description="Service packages and pricing tiers for event planning."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/profile"
      actionLabel="Edit package data"
      items={[
        "Wedding packages",
        "Reception packages",
        "Corporate packages",
        "Custom add-ons",
      ]}
    />
  );
}
