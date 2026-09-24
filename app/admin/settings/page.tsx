import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminSettingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Settings"
      description="Admin configuration and system preferences."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/login?role=admin"
      actionLabel="Sign out"
      items={[
        "Security preferences",
        "Approval workflow settings",
        "District/category defaults",
        "Notification preferences",
      ]}
    />
  );
}
