import { ClientRedirect } from "@/app/_components/client-redirect";
export default function VerifyRedirectPage() {
  return <ClientRedirect href="/login/verify?role=customer" preserveQuery />;
}
