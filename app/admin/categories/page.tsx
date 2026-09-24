import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminCategoriesPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Categories"
      description="Manage event categories displayed on the public site."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/districts"
      actionLabel="Open districts"
      items={[
        "Wedding and reception types",
        "Corporate event categories",
        "Photography and decor categories",
        "Category visibility",
      ]}
    />
  );
}
