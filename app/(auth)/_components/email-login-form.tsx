"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { findAccountByEmail, type AuthRoleKey } from "@/lib/auth-directory";

type EmailLoginFormProps = {
  role: AuthRoleKey;
  actionLabel: string;
  verifyHref: string;
  helperText: string;
  noteText: string;
  ctaLink?: {
    href: string;
    label: string;
  };
};

export function EmailLoginForm({
  role,
  actionLabel,
  verifyHref,
  helperText,
  noteText,
  ctaLink,
}: EmailLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const roleLabel = useMemo(() => {
    if (role === "planner") return "Planner";
    if (role === "admin") return "Super admin";
    return "Customer";
  }, [role]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    const account = findAccountByEmail(trimmed);
    if (!account) {
      setError("Enter a registered email address.");
      return;
    }

    setError("");
    router.push(`${verifyHref}?email=${encodeURIComponent(account.email)}&role=${account.role}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#241f1b]">Email address</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={`Enter ${roleLabel.toLowerCase()} email`}
          className="rounded-2xl border border-black/8 bg-[#fffdf8] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
        />
      </label>

      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}

      <button className="inline-flex w-full items-center justify-center rounded-full bg-[#6a1b9a] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
        {actionLabel}
      </button>

      <p className="text-sm leading-6 text-[#6b6152]">{helperText}</p>

      {ctaLink ? (
        <a
          href={ctaLink.href}
          className="inline-flex text-sm font-semibold text-[#6a1b9a]"
        >
          {ctaLink.label}
        </a>
      ) : null}

      <div className="rounded-[1.2rem] border border-black/5 bg-[#faf7f2] p-4 text-sm leading-6 text-[#4e4335]">
        {noteText}
      </div>
    </form>
  );
}
