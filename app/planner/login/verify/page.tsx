import { redirect } from "next/navigation";

export default async function PlannerOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; plannerId?: string }>;
}) {
  const { email = "", plannerId } = await searchParams;
  const suffix = plannerId ? `&plannerId=${encodeURIComponent(plannerId)}` : "";
  redirect(`/login/verify?role=planner&email=${encodeURIComponent(email)}${suffix}`);
}
