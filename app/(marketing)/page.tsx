import Image from "next/image";
import { ConsultationForm } from "@/app/Component/Customer/consultation-form";
import Link from "next/link";
import { SiteHeader } from "./_components/site-header";
import { SectionHeading } from "./_components/section-heading";
import { PlannerCard } from "./_components/planner-card";
import { EventCard } from "./_components/event-card";
import {
  categoryItems,
  completedEvents,
  dashboardCards,
  featureItems,
  heroStats,
  planners,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:gap-10 lg:py-10">
        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="shell-card overflow-hidden rounded-[2rem]">
            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(106,27,154,0.2),transparent_35%),linear-gradient(135deg,rgba(36,31,27,0.98),rgba(72,31,87,0.94),rgba(134,63,21,0.9))]" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

              <div className="relative z-10 max-w-2xl text-white">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
                  Odisha event planner marketplace
                </span>
                <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Plan your perfect event with trusted planners in Odisha.
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  Search by district, explore completed events, and request consultations for
                  weddings, receptions, birthdays, and corporate occasions.
                </p>
              </div>

            <form action="/planners" className="relative z-10 mt-8 grid md:grid-cols-[1fr_1fr_auto] gap-2 rounded-2xl bg-white p-2 shadow-xl">

  <label className="grid gap-1 rounded-xl px-4 py-2">
    <span className="text-xs uppercase tracking-wide text-gray-500">
      District
    </span>

    <select name="district" className="bg-transparent text-sm font-semibold outline-none">
      <option value="">Select District</option>
      <option value="Bhubaneswar">Bhubaneswar</option>
      <option value="Cuttack">Cuttack</option>
      <option value="Puri">Puri</option>
      <option value="Rourkela">Rourkela</option>
    </select>
  </label>

  <label className="grid gap-1 rounded-xl px-4 py-2">
    <span className="text-xs uppercase tracking-wide text-gray-500">
      Event Type
    </span>

    <select name="event" className="bg-transparent text-sm font-semibold outline-none">
      <option value="">Select Event</option>
      <option value="Wedding">Wedding</option>
      <option value="Birthday">Birthday</option>
      <option value="Corporate">Corporate</option>
    </select>
  </label>

  <button
    type="submit"
    className="inline-flex items-center justify-center rounded-xl bg-[#6a1b9a] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#571582]"
  >
    Search Planners
  </button>

</form>
            </div>
          </div>

          <aside
            id="contact"
            className="shell-card rounded-[2rem] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-display text-2xl font-semibold text-[#241f1b]">
                  Book a consultation
                </div>
                <p className="mt-2 text-sm leading-6 text-[#6b6152]">
                  Capture the request details and route customers to the right planner.
                </p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#6a1b9a]/10 text-xl text-[#6a1b9a]">
                <Image src="/icon.svg" alt="" width={56} height={56} />
              </div>
            </div>

            <ConsultationForm />
          </aside>
        </section>

        <section className="shell-card rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Discover"
            title="Popular categories"
            description="Start with common event types, then move into planners, packages, and portfolios."
          />

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {categoryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.2rem] border border-black/5 bg-white px-3 py-4 text-center shadow-sm"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#6a1b9a]/10 text-sm font-semibold text-[#6a1b9a]">
                  {item.icon}
                </div>
                <div className="mt-3 text-sm font-semibold text-[#241f1b]">{item.label}</div>
                <div className="mt-1 text-[11px] leading-4 text-[#6b6152]">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="shell-card rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Featured"
              title="Top rated event planners"
              description="Each planner card highlights district coverage, review signals, and the kinds of events they handle best."
              actionLabel="View all planners"
            />

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {planners.map((planner) => (
                <PlannerCard key={planner.slug} planner={planner} />
              ))}
            </div>
          </div>

          <div className="shell-card rounded-[2rem] p-6 sm:p-8 lg:w-[300px] xl:w-[360px]">
            <div className="grid grid-cols-2 gap-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.1rem] border border-black/5 bg-white p-4">
                  <div className="text-2xl font-semibold text-[#241f1b]">{stat.value}</div>
                  <div className="mt-1 text-xs leading-4 text-[#6b6152]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.4rem] bg-[#241f1b] p-5 text-white">
              <div className="font-display text-2xl font-semibold">Built for offline discussion</div>
              <p className="mt-3 text-sm leading-6 text-white/75">
                The v1 flow ends with consultation requests, planner notifications, and
                follow-up through direct contact rather than online payments.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Customer</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Planner</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Admin</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="shell-card rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Completed events"
            title="Planner portfolios and finished work"
            description="The completed-events section is a core requirement from the draft: it turns portfolio proof into an immediate trust signal."
          />

          <div className="mt-6 grid gap-4">
            {completedEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="shell-card rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Roadmap"
              title="Core dashboard shells"
              description="The mockup shows customer, planner, and admin surfaces. These cards establish the structure before the actual workflows are built."
            />

            <div className="mt-6 grid gap-4">
              {dashboardCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.4rem] border border-black/5 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#241f1b]">{card.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6b6152]">
                        {card.description}
                      </p>
                    </div>
                    <Link
                      href={card.href}
                      className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
                    >
                      Open
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    {card.stats.map((stat) => (
                      <div key={stat.label} className="rounded-[1.1rem] bg-[#faf7f2] p-4">
                        <div className="text-xl font-semibold text-[#241f1b]">{stat.value}</div>
                        <div className="mt-1 text-xs text-[#6b6152]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="shell-card rounded-[2rem] p-6 sm:p-8">
            <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
              Key features
            </div>
            <ul className="mt-5 space-y-3">
              {featureItems.map((item) => (
                <li key={item.label} className="flex gap-3 rounded-[1rem] bg-white px-4 py-3 shadow-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6a1b9a]" />
                  <span className="text-sm leading-6 text-[#4e4335]">{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <footer className="shell-card rounded-[2rem] px-6 py-5 sm:px-8" id="footer">
          <div className="flex flex-col gap-4 border-b border-black/5 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="font-display text-2xl font-semibold text-[#241f1b]">Utkal Events</div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6152]">
                Marketplace foundation for Odisha event planning, consultations, and portfolio
                discovery.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/planners"
                className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
              >
                Browse planners
              </Link>
              <Link
                href="#services"
                className="rounded-full bg-[#6a1b9a] px-4 py-2 text-sm font-semibold text-white"
              >
                View portfolios
              </Link>
            </div>
          </div>
          <div className="pt-4 text-xs uppercase tracking-[0.24em] text-[#8d7f6e]">
            Odisha Event Planner v1 requirements mapped into a Next.js app structure
          </div>
        </footer>
      </div>
    </main>
  );
}
