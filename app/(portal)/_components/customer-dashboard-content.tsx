import Link from "next/link";

export function CustomerDashboardContent() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total bookings" value="05" />
          <StatCard label="Pending" value="02" />
          <StatCard label="Confirmed" value="02" />
          <StatCard label="Completed" value="01" />
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-white p-5">
          <div className="text-lg font-semibold text-[#241f1b]">Recent activity</div>
          <div className="mt-4 grid gap-3 text-sm text-[#4e4335]">
            <div className="rounded-2xl bg-[#faf7f2] p-4">Dream Events consultation requested.</div>
            <div className="rounded-2xl bg-[#faf7f2] p-4">Royal Celebration added to wishlist.</div>
            <div className="rounded-2xl bg-[#faf7f2] p-4">Review submitted for a completed reception.</div>
          </div>
        </div>
      </section>

      <aside className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#6a1b9a] to-[#241f1b] p-5 text-white">
          <div className="font-display text-2xl font-semibold">Customer view</div>
          <p className="mt-3 text-sm leading-6 text-white/78">
            Customers get a simple place to follow consultations, bookings, and reviews.
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-white p-5">
          <div className="text-sm font-semibold text-[#241f1b]">Quick actions</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/planners"
              className="rounded-full bg-[#6a1b9a] px-4 py-2 text-sm font-semibold text-white"
            >
              Browse planners
            </Link>
            <Link
              href="/login?role=customer"
              className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
            >
              Sign in again
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
      <div className="text-3xl font-semibold text-[#241f1b]">{value}</div>
      <div className="mt-2 text-sm text-[#6b6152]">{label}</div>
    </div>
  );
}
