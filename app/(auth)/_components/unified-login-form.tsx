"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { findDemoAccount } from "@/lib/demo-accounts";

export function UnifiedLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleUserChange(nextEmail: string) {
    setEmail(nextEmail);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const account = findDemoAccount(email);
    if (!account) {
      setError("Enter a registered email address.");
      return;
    }

    setError("");
    router.push(`/login/verify?email=${encodeURIComponent(account.email)}&role=${account.role}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#241f1b]">Email address</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => handleUserChange(event.target.value)}
          placeholder="Enter email address"
          className="rounded-2xl border border-black/8 bg-[#fffdf8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
        />
      </label>

      {error ? <p role="alert" className="text-sm text-[#b42318]">{error}</p> : null}

      <button className="inline-flex w-full items-center justify-center rounded-full bg-[#6a1b9a] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
        Send OTP
      </button>

      <p className="text-sm leading-6 text-[#6b6152]">
        This is a UI-only login. Enter the email and use OTP 123456. After verification you will
        be routed to the matching customer, planner, or super admin dashboard.
      </p>
    </form>
  );
}
