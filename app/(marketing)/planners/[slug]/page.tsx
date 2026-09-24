import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../_components/site-header";
import { EventCard } from "../../_components/event-card";
import { planners, completedEvents } from "@/lib/site-content";

export function generateStaticParams() {
  return planners.map((planner) => ({ slug: planner.slug }));
}

export default async function PlannerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const planner = planners.find((item) => item.slug === slug);

  if (!planner) {
    notFound();
  }

  const relatedEvents = completedEvents.slice(0, 2);

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="shell-card rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-black/5 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
                Planner profile
              </div>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#241f1b]">
                {planner.name}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#6b6152] sm:text-base">
                {planner.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/planners"
                className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
              >
                Back to listing
              </Link>
              <Link
                href="/#contact"
                className="rounded-full bg-[#6a1b9a] px-4 py-2 text-sm font-semibold text-white"
              >
                Book consultation
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-[#4d1a84] via-[#7b2a90] to-[#e09d1f] p-6 text-white">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-white/80">Location</div>
                  <div className="mt-2 text-xl font-semibold">{planner.district}</div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-white/80">Rating</div>
                  <div className="mt-2 text-xl font-semibold">
                    {planner.rating} / 5.0 from {planner.reviews} reviews
                  </div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-white/80">Services</div>
                  <div className="mt-2 text-xl font-semibold">
                    {planner.services.join(", ")}
                  </div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-white/80">Track record</div>
                  <div className="mt-2 text-xl font-semibold">{planner.completedEvents}</div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/5 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-[#6b6152]">
                Consultation highlights
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4e4335]">
                <li>District based availability</li>
                <li>Completed event portfolio</li>
                <li>Offline payment follow up</li>
                <li>Planner notification flow</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6 shell-card rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
                Completed events
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#241f1b]">
                Recent portfolio work
              </h2>
            </div>
            <Link
              href="/#services"
              className="hidden rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a] md:inline-flex"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {relatedEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
