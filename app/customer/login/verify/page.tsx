import { redirect } from "next/navigation";

export default async function CustomerOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;
  redirect(`/login/verify?role=customer&email=${encodeURIComponent(email)}`);
}
