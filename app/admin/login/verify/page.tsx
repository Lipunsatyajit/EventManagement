import { redirect } from "next/navigation";

export default async function AdminOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;
  redirect(`/login/verify?role=admin&email=${encodeURIComponent(email)}`);
}
