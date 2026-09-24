"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { readAuthSession } from "@/lib/auth-session";
import { saveLocalBooking, localToday } from "@/lib/local-bookings";
import "./consultation-form.css";

export function ConsultationForm() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    const session = readAuthSession();
    if (session?.role !== "customer") { setMessage("Please sign in with a customer account before saving a request."); return; }
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date"));
    if (date < localToday()) { setMessage("Choose today or a future event date."); return; }
    try {
      saveLocalBooking({ id: crypto.randomUUID(), email: session.email, name: String(data.get("name")).trim(),
        mobile: String(data.get("mobile")), district: String(data.get("district")), eventType: String(data.get("eventType")),
        date, budget: Number(data.get("budget")), message: String(data.get("message")), status: "Pending", createdAt: new Date().toISOString() });
      event.currentTarget.reset(); setSuccess(true);
      setMessage("Request saved to My bookings on this browser. No request has been sent to a planner yet.");
    } catch { setMessage("Could not save your request. Check that browser storage is enabled."); }
  }
  return <form className="consultation-form" onSubmit={submit}>
    <p className="consultation-form__note">Demo mode: requests stay on this browser. <Link href="/login">Customer login</Link></p>
    <div className="consultation-form__fields">
      <label>Full name<input name="name" required maxLength={100} autoComplete="name" placeholder="Enter your name" /></label>
      <label>Mobile number<input name="mobile" type="tel" required pattern="[0-9+ ()-]{10,16}" autoComplete="tel" placeholder="Enter mobile number" /></label>
      <label>District / city<select name="district" required defaultValue=""><option value="" disabled>Select location</option>{["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Event type<select name="eventType" required defaultValue=""><option value="" disabled>Select event type</option>{["Wedding", "Birthday", "Reception", "Corporate", "Engagement", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Event date<input name="date" type="date" required /></label>
      <label>Expected budget (INR)<input name="budget" type="number" min="1" max="100000000" step="1" required placeholder="e.g. 200000" /></label>
      <label className="consultation-form__wide">Message / requirements<textarea name="message" maxLength={2000} placeholder="Venue, guest count, and special requirements" /></label>
    </div>
    <p className="consultation-form__note">Your signed-in email will be attached to the request.</p>
    <button type="submit">Save consultation request</button>
    {message && <p role="status">{message} {success && <Link href="/customer/bookings">View my bookings</Link>}</p>}
  </form>;
}
