import Link from "next/link";
import type { PlannerCard as PlannerCardType } from "@/lib/site-content";

const accentMap: Record<PlannerCardType["accent"], string> = {
  violet: "from-[#4d1a84] via-[#7b2a90] to-[#e09d1f]",
  amber: "from-[#6d3d05] via-[#b76f10] to-[#e5b54d]",
  rose: "from-[#7a1338] via-[#b52b54] to-[#ec7c7f]",
  emerald: "from-[#184e45] via-[#2f775b] to-[#8ac28c]",
  slate: "from-[#222733] via-[#3d485c] to-[#93a2c0]",
};

type PlannerCardProps = {
  planner: PlannerCardType;
};

export function PlannerCard({ planner }: PlannerCardProps) {
  const coverTone = accentMap[planner.accent];

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-[0_18px_50px_rgba(50,31,11,0.08)]">
      <div className={`h-40 bg-gradient-to-br ${coverTone} p-4`}>
        <div className="flex h-full flex-wrap items-end justify-between gap-2 rounded-[1.1rem] border border-white/20 bg-black/10 p-4 text-white backdrop-blur-[2px]">
          <div>
            <div className="font-display text-xl font-semibold">{planner.name}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/80">
              {planner.district}
            </div>
          </div>
          <div className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold">
            {planner.completedEvents}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#241f1b]">{planner.name}</h3>
            <p className="mt-1 text-sm text-[#6b6152]">{planner.summary}</p>
          </div>
          <div className="rounded-full bg-[#6a1b9a]/8 px-3 py-1 text-sm font-semibold text-[#6a1b9a]">
            {planner.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {planner.services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-black/8 bg-[#faf7f2] px-3 py-1 text-xs font-medium text-[#4e4335]"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#6b6152]">
          <span>{planner.reviews} reviews</span>
          <span>{planner.district}</span>
        </div>

        <Link
          href={`/planners/${planner.slug}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#6a1b9a] px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}
