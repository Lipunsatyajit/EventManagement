import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerProfilePage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Profile"
      description="Planner profile details shown on the public marketplace."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/settings"
      actionLabel="Open settings"
      items={[
        "Business name and contact",
        "District and service areas",
        "Portfolio summary",
        "Verification status",
      ]}
    />
  );
}
