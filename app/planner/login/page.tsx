import { redirect } from "next/navigation";

export default function PlannerLoginPage() {
  redirect("/login?role=planner");
}
