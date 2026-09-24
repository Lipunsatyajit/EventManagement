import { RoleSectionPage } from "../../_components/role-section-page";

export default function CustomerWishlistPage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Wishlist"
      description="Saved planners and quick access to shortlisted event vendors."
      backHref="/customer/account"
      backLabel="Back to account"
      actionHref="/planners"
      actionLabel="Browse planners"
      items={[
        "Saved planner cards",
        "District and event-type filters",
        "Shareable shortlists",
        "Comparison notes",
      ]}
    />
  );
}
