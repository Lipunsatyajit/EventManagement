"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PlannerAuthShell, PlannerCreateForm } from "../_components/planner-ui";
import { getPlannerSignupOption } from "@/lib/auth-directory";

export default function PlannerCreatePage() {
  return <Suspense fallback={<p>Loading registration...</p>}><PlannerCreateContent /></Suspense>;
}
function PlannerCreateContent() {
  const plannerId = useSearchParams().get("plannerId") ?? undefined;
  const selectedPlanner = getPlannerSignupOption(plannerId);

  return (
    <PlannerAuthShell
      eyebrow="Planner onboarding"
      title="Create a planner account with a fixed planner ID."
      description="The planner dropdown stays selected and disabled so the account is linked to the correct planner row."
      footerHref="/login?role=planner"
      footerLabel="Back to planner login"
    >
      <div className="mb-5 rounded-[1.4rem] border border-black/5 bg-[#faf7f2] p-4 text-sm leading-6 text-[#4e4335]">
        Selected planner: <span className="font-semibold text-[#241f1b]">{selectedPlanner.label}</span>{" "}
        in <span className="font-semibold text-[#241f1b]">{selectedPlanner.district}</span>
      </div>

      <PlannerCreateForm selectedPlannerId={selectedPlanner.plannerId} />
    </PlannerAuthShell>
  );
}
