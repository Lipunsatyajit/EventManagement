import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminPlannerApprovalsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Planner approvals"
      description="Approve or reject planner registrations before they appear on the marketplace."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/planners"
      actionLabel="Open planners"
      items={[
        "Pending planner applications",
        "Verification status",
        "Approval notes",
        "Review history",
      ]}
    />
  );
}
