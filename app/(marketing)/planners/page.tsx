import Link from "next/link";
import { SiteHeader } from "../_components/site-header";
import { SectionHeading } from "../_components/section-heading";
import { PlannerSearch } from "@/app/Component/Customer/planner-search";

export default async function PlannersPage({ searchParams }: { searchParams: Promise<{ district?: string; event?: string }> }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="shell-card rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-black/5 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
                Planner listing
              </div>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#241f1b]">
                Search planners by district and event type
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#6b6152] sm:text-base">
                Explore local specialists and find the right fit for your celebration.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
            >
              Back to home
            </Link>
          </div>

          <PlannerSearch key={`${params.district ?? ""}:${params.event ?? ""}`} initialDistrict={params.district} initialEvent={params.event} />
        </section>

        <section className="mt-6 shell-card rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Next step"
            title="Keep your celebration on track"
            description="Use the checklist and budget tool above to organize your tasks and estimated costs."
          />
        </section>
      </div>
    </main>
  );
}
