import Link from "next/link";
import { PortalShell } from "@/app/(portal)/_components/portal-shell";

type RoleSectionPageProps = {
  roleLabel: string;
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  actionHref?: string;
  actionLabel?: string;
  items: string[];
};

export function RoleSectionPage({
  roleLabel,
  title,
  description,
  backHref,
  backLabel,
  actionHref,
  actionLabel,
  items,
}: RoleSectionPageProps) {
  return (
    <PortalShell
      roleLabel={roleLabel}
      title={title}
      description={description}
      backHref={backHref}
      backLabel={backLabel}
    >
      <div className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="text-lg font-semibold text-[#241f1b]">Scaffolded section</div>
        <ul className="mt-4 grid gap-3 text-sm text-[#4e4335] sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="rounded-2xl bg-white p-4">
              {item}
            </li>
          ))}
        </ul>
        {actionHref && actionLabel ? (
          <div className="mt-5">
            <Link
              href={actionHref}
              className="rounded-full bg-[#6a1b9a] px-4 py-2 text-sm font-semibold text-white"
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </PortalShell>
  );
}
