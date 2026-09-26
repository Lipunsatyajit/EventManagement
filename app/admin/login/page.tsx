import { ClientRedirect } from "@/app/_components/client-redirect";
export default function LoginRedirectPage() {
  return <ClientRedirect href="/login?role=admin" />;
}
