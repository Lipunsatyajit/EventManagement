import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminDistrictsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Districts"
      description="Manage district coverage and location metadata."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/categories"
      actionLabel="Open categories"
      items={[
        "District directory",
        "Coverage mapping",
        "Search filters",
        "Availability rules",
      ]}
    />
  );
}
