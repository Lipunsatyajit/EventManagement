import { CustomerPortalShell } from "../_components/customer-ui";
import { MyBookings } from "@/app/Component/Customer/my-bookings";

export default function CustomerBookingsPage() {
  return <CustomerPortalShell roleLabel="Customer" title="My bookings"
    description="Track your consultation requests and their status."
    backHref="/customer/account" backLabel="My account">
    <MyBookings />
  </CustomerPortalShell>;
}
