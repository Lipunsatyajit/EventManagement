import Link from "next/link";
import type { EventCard as EventCardType } from "@/lib/site-content";

const accentMap: Record<EventCardType["accent"], string> = {
  violet: "from-[#4d1a84] via-[#7b2a90] to-[#e09d1f]",
  amber: "from-[#6d3d05] via-[#b76f10] to-[#e5b54d]",
  rose: "from-[#7a1338] via-[#b52b54] to-[#ec7c7f]",
  emerald: "from-[#184e45] via-[#2f775b] to-[#8ac28c]",
  slate: "from-[#222733] via-[#3d485c] to-[#93a2c0]",
};

type EventCardProps = {
  event: EventCardType;
};

export function EventCard({ event }: EventCardProps) {
  const coverTone = accentMap[event.accent];

  return (
    <article
      id={event.slug}
      className="grid gap-5 rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(50,31,11,0.08)] lg:grid-cols-[180px_minmax(0,1fr)_140px]"
    >
      <div className={`h-48 rounded-[1.1rem] bg-gradient-to-br ${coverTone}`} />

      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#241f1b]">{event.title}</h3>
            <p className="mt-1 text-sm text-[#6b6152]">{event.summary}</p>
          </div>
          <span className="rounded-full bg-[#6a1b9a]/8 px-3 py-1 text-sm font-semibold text-[#6a1b9a]">
            {event.photoCount}
          </span>
        </div>

        <dl className="mt-4 grid gap-3 text-sm text-[#4e4335] sm:grid-cols-2">
          <div>
            <dt className="font-medium text-[#6b6152]">Venue</dt>
            <dd className="mt-1">{event.venue}</dd>
          </div>
          <div>
            <dt className="font-medium text-[#6b6152]">Date</dt>
            <dd className="mt-1">{event.date}</dd>
          </div>
          <div>
            <dt className="font-medium text-[#6b6152]">Budget</dt>
            <dd className="mt-1">{event.budget}</dd>
          </div>
          <div>
            <dt className="font-medium text-[#6b6152]">Services</dt>
            <dd className="mt-1">{event.services.join(", ")}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-20 rounded-2xl bg-[#6a1b9a]/10" />
          <div className="h-20 rounded-2xl bg-[#d4a437]/18" />
          <div className="h-20 rounded-2xl bg-[#241f1b]/8" />
          <div className="flex items-center justify-center rounded-2xl bg-[#241f1b] text-lg font-semibold text-white">
            {event.photoCount}
          </div>
        </div>

        <Link
          href={`/planners/dream-events#${event.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-[#6a1b9a]/25 px-4 py-2 text-sm font-semibold text-[#6a1b9a] transition-colors hover:bg-[#6a1b9a]/6"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
