import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminReviewsPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Reviews"
      description="Moderate reviews and flag suspicious activity."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/customers"
      actionLabel="Open customers"
      items={[
        "Review queue",
        "Flagged feedback",
        "User ratings",
        "Content moderation",
      ]}
    />
  );
}
