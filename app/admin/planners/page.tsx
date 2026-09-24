import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminPlannersPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Planners"
      description="All planners listed in the marketplace with status and review signals."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/planner-approvals"
      actionLabel="Review approvals"
      items={[
        "Planner directory",
        "Status and verification",
        "District coverage",
        "Account moderation",
      ]}
    />
  );
}
