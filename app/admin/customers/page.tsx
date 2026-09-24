import { RoleSectionPage } from "../../_components/role-section-page";

export default function AdminCustomersPage() {
  return (
    <RoleSectionPage
      roleLabel="Admin"
      title="Customers"
      description="Customer accounts, booking activity, and support history."
      backHref="/admin/dashboard"
      backLabel="Back to dashboard"
      actionHref="/admin/bookings"
      actionLabel="Open bookings"
      items={[
        "Customer list",
        "Active consultations",
        "Support history",
        "Review moderation",
      ]}
    />
  );
}
