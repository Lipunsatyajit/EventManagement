"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { getPlannerSignupOption, plannerSignupOptions } from "@/lib/auth-directory";
import { preparePlannerAccount } from "@/lib/demo-accounts";

type PlannerCreateFormProps = {
  selectedPlannerId?: string;
};

export function PlannerCreateForm({ selectedPlannerId }: PlannerCreateFormProps) {
  const router = useRouter();
  const selectedPlanner = getPlannerSignupOption(selectedPlannerId);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim().includes("@")) {
      setError("Enter a valid planner email address.");
      return;
    }

    if (!fullName.trim() || !mobile.trim()) {
      setError("Enter planner name and mobile number.");
      return;
    }

    setError("");
    try {
      preparePlannerAccount({ email, role: "planner", roleId: selectedPlanner.roleId,
        dashboardHref: "/planner/dashboard", label: selectedPlanner.label, displayName: fullName.trim() });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not save account. Enable browser storage.");
      return;
    }
    router.push(
      `/login/verify?role=planner&email=${encodeURIComponent(email.trim())}&plannerId=${encodeURIComponent(selectedPlanner.plannerId)}`,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#241f1b]">Full name</span>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Enter planner name"
            className="rounded-2xl border border-black/8 bg-[#fffdf8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#241f1b]">Mobile number</span>
          <input
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            placeholder="Enter mobile number"
            className="rounded-2xl border border-black/8 bg-[#fffdf8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#241f1b]">Email address</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter planner email"
          className="rounded-2xl border border-black/8 bg-[#fffdf8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#241f1b]">Planner name</span>
          <select
            value={selectedPlanner.plannerId}
            disabled
            className="rounded-2xl border border-black/8 bg-[#f3ede2] px-4 py-3 text-sm outline-none"
          >
            {plannerSignupOptions.map((option) => (
              <option key={option.plannerId} value={option.plannerId}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#241f1b]">Planner ID</span>
          <input
            readOnly
            value={selectedPlanner.roleId}
            className="rounded-2xl border border-black/8 bg-[#f3ede2] px-4 py-3 text-sm outline-none"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#241f1b]">District</span>
        <input
          readOnly
          value={selectedPlanner.district}
          className="rounded-2xl border border-black/8 bg-[#f3ede2] px-4 py-3 text-sm outline-none"
        />
      </label>

      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}

      <button className="inline-flex w-full items-center justify-center rounded-full bg-[#6a1b9a] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
        Create planner account
      </button>

      <p className="text-sm leading-6 text-[#6b6152]">
        The planner dropdown is preselected and disabled. The planner ID is carried forward so
        the account is tied to the right row in the database.
      </p>
    </form>
  );
}
