import Link from "next/link";

export function AdminDashboardContent() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total planners" value="320" />
          <StatCard label="Total customers" value="2,450" />
          <StatCard label="Total bookings" value="1,250" />
          <StatCard label="Total reviews" value="980" />
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-white p-5">
          <div className="text-lg font-semibold text-[#241f1b]">Pending approvals</div>
          <div className="mt-4 grid gap-3 text-sm text-[#4e4335]">
            <div className="rounded-2xl bg-[#faf7f2] p-4">Celebration Makers - Bhubaneswar - Pending review.</div>
            <div className="rounded-2xl bg-[#faf7f2] p-4">Moments Creation - Cuttack - Pending review.</div>
            <div className="rounded-2xl bg-[#faf7f2] p-4">Golden Events - Puri - Pending review.</div>
          </div>
        </div>
      </section>

      <aside className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#241f1b] to-[#6a1b9a] p-5 text-white">
          <div className="font-display text-2xl font-semibold">Super admin view</div>
          <p className="mt-3 text-sm leading-6 text-white/78">
            Admins oversee approvals, users, reports, and district/category management.
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-white p-5">
          <div className="text-sm font-semibold text-[#241f1b]">Quick actions</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin/planner-approvals"
              className="rounded-full bg-[#6a1b9a] px-4 py-2 text-sm font-semibold text-white"
            >
              Planner approvals
            </Link>
            <Link
              href="/admin/reports"
              className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
            >
              View reports
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
