import { RoleSectionPage } from "../../_components/role-section-page";

export default function CustomerProfilePage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Profile"
      description="Customer account details, contact info, and preferences."
      backHref="/customer/account"
      backLabel="Back to account"
      actionHref="/login?role=customer"
      actionLabel="Update login email"
      items={[
        "Email and phone details",
        "District preference",
        "Notification settings",
        "Review and booking preferences",
      ]}
    />
  );
}
