import Link from "next/link";

type AuthShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: React.ReactNode;
  footerHref: string;
  footerLabel: string;
};

export function AuthShell({
  title,
  description,
  eyebrow,
  children,
  footerHref,
  footerLabel,
}: AuthShellProps) {
  return (
    <main className="min-h-screen px-3 py-4 min-[380px]:px-4 min-[380px]:py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="shell-card overflow-hidden rounded-[2rem]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(106,27,154,0.2),transparent_32%),linear-gradient(135deg,rgba(36,31,27,0.98),rgba(74,33,88,0.95),rgba(212,164,55,0.82))] p-5 text-white min-[380px]:p-6 sm:p-8 lg:p-10">
            <div className="max-w-xl">
              <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-white/70">
                {eyebrow}
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight min-[380px]:text-4xl sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/78 sm:text-base">
                {description}
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <AuthPill label="Customer" value="Consultations" />
              <AuthPill label="Planner" value="Bookings" />
              <AuthPill label="Admin" value="Approvals" />
            </div>
          </div>
        </section>

        <section className="shell-card rounded-[2rem] p-5 min-[380px]:p-6 sm:p-8 lg:p-10">
          <div className="mb-6">
            <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
              Sign in
            </div>
            <div className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#241f1b]">
              Role-based access
            </div>
            <p className="mt-2 text-sm leading-6 text-[#6b6152]">
              Enter your registered email. Your account determines which screen opens after verification.
            </p>
          </div>

          {children}

          <div className="mt-6 border-t border-black/5 pt-4">
            <Link href={footerHref} className="text-sm font-semibold text-[#6a1b9a]">
              {footerLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function AuthPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-4 backdrop-blur">
      <div className="text-xs uppercase tracking-[0.24em] text-white/70">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}
