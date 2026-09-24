import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerSettingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Settings"
      description="Planner account and notification preferences."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/login?role=planner"
      actionLabel="Sign out"
      items={[
        "Passwordless login preferences",
        "Notification settings",
        "Business profile options",
        "Account security",
      ]}
    />
  );
}
