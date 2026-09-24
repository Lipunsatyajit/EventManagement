import { CustomerPortalShell } from "../_components/customer-ui";
import { PlanningTools } from "@/app/Component/Customer/planning-tools";

export default function PlanningPage() {
  return <CustomerPortalShell roleLabel="Customer" title="Your celebration, organized."
    description="Keep track of tasks and estimated costs in one place."
    backHref="/customer/account" backLabel="My account"><PlanningTools /></CustomerPortalShell>;
}
