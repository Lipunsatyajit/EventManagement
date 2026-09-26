"use client";
import { sitePath } from "@/lib/site-path";

import { clearAuthSession } from "@/lib/auth-session";

type LogoutButtonProps = {
  className?: string;
  label?: string;
  compact?: boolean;
};

export function LogoutButton({
  className = "",
  label = "Logout",
  compact = false,
}: LogoutButtonProps) {
  function handleLogout() {
    clearAuthSession();
    window.location.assign(sitePath("/"));
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#6a1b9a]/20 bg-white ${compact ? "px-3 py-2.5" : "px-4 py-2.5"} text-sm font-semibold text-[#6a1b9a] transition-colors hover:bg-[#6a1b9a]/6 ${className}`}
      aria-label="Logout"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
        <path d="M10 16l4-4-4-4" />
        <path d="M14 12H4" />
      </svg>
      <span className="leading-none tracking-[0.08em]">{label}</span>
    </button>
  );
}
