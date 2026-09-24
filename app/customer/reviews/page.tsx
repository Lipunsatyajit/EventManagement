import { RoleSectionPage } from "../../_components/role-section-page";

export default function CustomerReviewsPage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Reviews"
      description="Ratings and feedback submitted after completed events."
      backHref="/customer/account"
      backLabel="Back to account"
      actionHref="/customer/bookings"
      actionLabel="View bookings"
      items={[
        "Submitted ratings",
        "Review edit history",
        "Photo and event references",
        "Planner response status",
      ]}
    />
  );
}
