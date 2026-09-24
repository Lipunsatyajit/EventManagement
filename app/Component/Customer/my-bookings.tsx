"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readAuthSession } from "@/lib/auth-session";
import { readLocalBookings, cancelLocalBooking, type LocalBooking } from "@/lib/local-bookings";
import "./my-bookings.css";

export function MyBookings() {
  const [bookings, setBookings] = useState<LocalBooking[]>([]);
  const [status, setStatus] = useState("All");
  const [message, setMessage] = useState("Loading requests...");
  useEffect(() => {
    function refresh() {
      const session = readAuthSession();
      if (session?.role !== "customer") { setBookings([]); setMessage("Sign in as a customer to view your requests."); return; }
      try {
        setBookings(readLocalBookings().filter((item) => item.email === session.email).reverse());
        setMessage("Demo requests saved on this browser. These have not been sent to planners.");
      } catch { setMessage("Could not read saved requests. Check browser storage."); }
    }
    refresh(); window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);
  function cancel(id: string) {
    const session = readAuthSession();
    if (session?.role !== "customer") return;
    try { cancelLocalBooking(id, session.email); setBookings(readLocalBookings().filter((item) => item.email === session.email).reverse()); }
    catch { setMessage("Could not cancel the request. Please try again."); }
  }
  const visible = bookings.filter((item) => status === "All" || item.status === status);
  return <section className="my-bookings">
    <p role="status">{message}</p>
    <div className="my-bookings__toolbar"><label>Filter by status <select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Pending</option><option>Cancelled</option></select></label><Link href="/#contact">New consultation</Link><Link href="/customer/planning">Checklist & budget</Link></div>
    {!visible.length && <p>No requests to display. Start with a consultation or choose another filter.</p>}
    <div className="my-bookings__grid">{visible.map((item) => <article key={item.id}>
      <div className="my-bookings__toolbar"><h2>{item.eventType}</h2><strong>{item.status}</strong></div>
      <p>{item.district} | {item.date}</p><p>Budget: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(item.budget)}</p>
      <p>{item.message}</p><small>Reference: {item.id.slice(0, 8)}</small>
      {item.status === "Pending" && <button onClick={() => cancel(item.id)}>Cancel request</button>}
    </article>)}</div>
  </section>;
}
