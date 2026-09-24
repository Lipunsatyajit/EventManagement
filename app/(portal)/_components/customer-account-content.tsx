"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readAuthSession, type AuthSession } from "@/lib/auth-session";
import { LogoutButton } from "@/app/_components/logout-button";
import { readLocalBookings, type LocalBooking } from "@/lib/local-bookings";

export function CustomerAccountContent() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [bookings, setBookings] = useState<LocalBooking[]>([]);

  useEffect(() => {
    const syncSession = () => {
      const current = readAuthSession();
      setSession(current);
      try { setBookings(current?.role === "customer" ? readLocalBookings().filter((item) => item.email === current.email) : []); }
      catch { setBookings([]); }
    };

    syncSession();
    window.addEventListener("focus", syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("focus", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  const displayName = session?.displayName ?? "Customer";

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
              Logged in user
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#241f1b]">
              {displayName}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6b6152] sm:text-base">
              Manage bookings, profile details, wishlist items, and reviews from one customer
              account screen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/planners"
              className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
            >
              Browse planners
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Requests" value={String(bookings.length)} />
          <StatCard label="Pending" value={String(bookings.filter((item) => item.status === "Pending").length)} />
          <StatCard label="Cancelled" value={String(bookings.filter((item) => item.status === "Cancelled").length)} />
          <StatCard label="Confirmed" value="0" />
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-white p-5">
          <div className="text-lg font-semibold text-[#241f1b]">Booking status</div>
          <div className="mt-4 grid gap-3 text-sm text-[#4e4335]">
            <p>Demo requests stored on this browser. Planner confirmation requires the API.</p>
            {bookings.slice(-3).reverse().map((item) => <StatusRow key={item.id} title={`${item.eventType} consultation`} status={item.status} note={`${item.district} | ${item.date}`} />)}
            {!bookings.length && <p>No consultation requests yet.</p>}
          </div>
        </div>
      </section>

      <aside className="shell-card rounded-[2rem] p-6 sm:p-8">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#6a1b9a] to-[#241f1b] p-5 text-white">
          <div className="font-display text-2xl font-semibold">My account</div>
          <p className="mt-3 text-sm leading-6 text-white/78">
            Customer details, saved planners, and contact preferences stay in this account area.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          <AccountBlock
            title="Profile"
            items={[
              session?.email ?? "customer@utkalevents.in",
              "District preference: Bhubaneswar",
              "Notifications: enabled",
            ]}
          />

          <AccountBlock
            title="Quick access"
            items={[
              "My account",
              "My bookings",
              "Wishlist",
              "Reviews",
            ]}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/customer/planning" className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]">Checklist & budget</Link>
          <Link
            href="/customer/bookings"
            className="rounded-full bg-[#6a1b9a] px-4 py-2 text-sm font-semibold text-white"
          >
            View bookings
          </Link>
          <Link
            href="/customer/profile"
            className="rounded-full border border-[#6a1b9a]/18 px-4 py-2 text-sm font-semibold text-[#6a1b9a]"
          >
            Open profile
          </Link>
        </div>
      </aside>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
      <div className="text-3xl font-semibold text-[#241f1b]">{value}</div>
      <div className="mt-2 text-sm text-[#6b6152]">{label}</div>
    </div>
  );
}

function StatusRow({ title, status, note }: { title: string; status: string; note: string }) {
  return (
    <div className="rounded-2xl bg-[#faf7f2] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-medium text-[#241f1b]">{title}</div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6a1b9a]">
          {status}
        </div>
      </div>
      <div className="mt-2 text-sm text-[#6b6152]">{note}</div>
    </div>
  );
}

function AccountBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5">
      <div className="text-lg font-semibold text-[#241f1b]">{title}</div>
      <ul className="mt-4 space-y-3 text-sm text-[#4e4335]">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-[#faf7f2] px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
