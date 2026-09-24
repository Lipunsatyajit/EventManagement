"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { type AuthRoleKey } from "@/lib/auth-directory";
import { findDemoAccount, pendingPlannerAccount, completePlannerAccount } from "@/lib/demo-accounts";
import { writeAuthSession } from "@/lib/auth-session";

type OtpVerificationFormProps = {
  email: string;
  role: AuthRoleKey;
  fallbackHref: string;
  title: string;
  description: string;
  overrideDashboardHref?: string;
  hintText?: string;
  expectedOtp?: string;
};

export function OtpVerificationForm({
  email,
  title,
  description,
  hintText,
  expectedOtp = "123456",
}: OtpVerificationFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim() !== expectedOtp) {
      setError("Enter the 6-digit OTP to continue.");
      return;
    }

    const pending = pendingPlannerAccount(email);
    const account = findDemoAccount(email) ?? pending;
    if (!account) {
      setError("No matching account was found for this email.");
      return;
    }

    const target = account.dashboardHref;
    try {
    if (pending) completePlannerAccount(pending);
    writeAuthSession({
      email: account.email,
      role: account.role,
      dashboardHref: target,
      loggedInAt: new Date().toISOString(),
      displayName: account?.displayName ?? account?.label ?? email.split("@")[0] ?? "User",
    });
    router.replace(target);
    } catch {
      setError("Your browser could not save the session. Enable site storage and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-[1.4rem] border border-black/5 bg-[#fffdf8] p-4">
        <div className="text-sm text-[#6b6152]">Verify</div>
        <div className="mt-1 font-semibold text-[#241f1b]">{title}</div>
        <p className="mt-2 text-sm leading-6 text-[#6b6152]">{description}</p>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#241f1b]">OTP code</span>
        <input
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          pattern="[0-9]{6}"
          maxLength={6}
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="Enter 123456"
          className="rounded-2xl border border-black/8 bg-[#fffdf8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
        />
      </label>

      {error ? <p role="alert" className="text-sm text-[#b42318]">{error}</p> : null}

      <button className="inline-flex w-full items-center justify-center rounded-full bg-[#6a1b9a] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
        Verify and continue
      </button>

      <p className="text-sm leading-6 text-[#6b6152]">
        {hintText ??
          `Use the local mock OTP ${expectedOtp}. After verification you will land on the matching dashboard. Replace this with backend verification when the API is connected.`}
      </p>
    </form>
  );
}
