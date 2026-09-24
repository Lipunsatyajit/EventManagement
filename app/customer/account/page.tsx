import { CustomerAccountContent, CustomerPortalShell } from "../_components/customer-ui";

export default function CustomerAccountPage() {
  return (
    <CustomerPortalShell
      roleLabel="Customer account"
      title="My account, bookings, and profile."
      description="Customer screen for checking bookings, profile details, reviews, and saved planners."
      backHref="/planners"
      backLabel="Browse planners"
    >
      <CustomerAccountContent />
    </CustomerPortalShell>
  );
}
