"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { readAuthSession } from "@/lib/auth-session";
import "./planning-tools.css";

type Task = { id: string; title: string; done: boolean };
type Expense = { id: string; title: string; amount: number };
type Plan = { tasks: Task[]; expenses: Expense[]; budget: number };
const initialPlan: Plan = { budget: 200000, expenses: [], tasks: [
  { id: "date", title: "Choose your date and guest count", done: false },
  { id: "venue", title: "Shortlist venues and check availability", done: false },
  { id: "planner", title: "Compare planners and request consultations", done: false },
  { id: "services", title: "Confirm catering, photography, and decoration", done: false },
  { id: "schedule", title: "Share the final event schedule", done: false },
] };
const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
function validPlan(value: unknown): value is Plan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Plan;
  return Number.isFinite(plan.budget) && plan.budget >= 0 && Array.isArray(plan.tasks) &&
    plan.tasks.every((t) => t && typeof t.id === "string" && typeof t.title === "string" && typeof t.done === "boolean") &&
    Array.isArray(plan.expenses) && plan.expenses.every((e) => e && typeof e.id === "string" && typeof e.title === "string" && Number.isFinite(e.amount) && e.amount >= 0);
}

export function PlanningTools() {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [key, setKey] = useState<string | null>(null);
  const [notice, setNotice] = useState("Loading your plan...");
  const [task, setTask] = useState("");
  useEffect(() => {
    function load() {
      const session = readAuthSession();
      if (session?.role !== "customer") { setKey(null); setNotice("Sign in as a customer to use your personal planning tools."); return; }
      const storageKey = `utkal-plan:${session.email}`;
      try {
        const raw = localStorage.getItem(storageKey);
        const saved: unknown = raw ? JSON.parse(raw) : initialPlan;
        if (!validPlan(saved)) throw new Error("Invalid saved plan");
        setPlan(saved); setKey(storageKey);
        setNotice("Your checklist and estimates are saved only on this browser.");
      } catch { setKey(null); setNotice("Your saved plan could not be read. Check browser storage before editing."); }
    }
    load(); window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);
  function save(next: Plan) {
    if (!key || key !== `utkal-plan:${readAuthSession()?.email}`) return false;
    try { localStorage.setItem(key, JSON.stringify(next)); setPlan(next); setNotice("Saved on this browser."); return true; }
    catch { setNotice("Could not save your changes. Check browser storage and try again."); return false; }
  }
  function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const title = String(data.get("title")).trim(); const amount = Number(data.get("amount"));
    if (!title || !Number.isFinite(amount) || amount < 0) return;
    if (save({ ...plan, expenses: [...plan.expenses, { id: crypto.randomUUID(), title, amount }] })) event.currentTarget.reset();
  }
  const total = plan.expenses.reduce((sum, item) => sum + item.amount, 0);
  const done = plan.tasks.filter((item) => item.done).length;
  return <div className="planning-tools">
    <div className="planning-tools__intro"><p role="status">{notice}</p><Link href={key ? "/customer/bookings" : "/login"}>{key ? "My bookings" : "Sign in"}</Link></div>
    <div className="planning-tools__columns">
      <section className="planning-tools__panel"><span className="planning-tools__eyebrow">One step at a time</span><h2>Event checklist</h2>
        <p>{done} of {plan.tasks.length} tasks complete</p><progress aria-label="Checklist progress" max={Math.max(1, plan.tasks.length)} value={done} />
        <fieldset disabled={!key}><legend className="planning-tools__legend">Your tasks</legend>
          {plan.tasks.map((item) => <div key={item.id} className="planning-tools__task"><label><input type="checkbox" checked={item.done} onChange={() => save({ ...plan, tasks: plan.tasks.map((t) => t.id === item.id ? { ...t, done: !t.done } : t) })} /><span>{item.title}</span></label><button type="button" aria-label={`Remove task ${item.title}`} onClick={() => save({ ...plan, tasks: plan.tasks.filter((t) => t.id !== item.id) })}>Remove</button></div>)}
          <form onSubmit={(event) => { event.preventDefault(); if (task.trim() && save({ ...plan, tasks: [...plan.tasks, { id: crypto.randomUUID(), title: task.trim(), done: false }] })) setTask(""); }}>
            <label>New task<input value={task} onChange={(event) => setTask(event.target.value)} required maxLength={150} placeholder="e.g. Confirm the guest list" /></label><button className="planning-tools__primary">Add task</button>
          </form>
        </fieldset>
      </section>
      <section className="planning-tools__panel"><span className="planning-tools__eyebrow">Plan your spending</span><h2>Budget overview</h2>
        <div className="planning-tools__total"><span>Estimated costs</span><strong>{money(total)}</strong><p>{total > plan.budget ? `${money(total - plan.budget)} over budget` : `${money(plan.budget - total)} remaining`}</p></div>
        <fieldset disabled={!key}><legend className="planning-tools__legend">Budget estimates</legend>
          <label>Total budget (INR)<input type="number" min="0" max="100000000" value={plan.budget} onChange={(event) => { const budget = Number(event.target.value); if (Number.isFinite(budget) && budget >= 0 && budget <= 100000000) save({ ...plan, budget }); }} /></label>
          {plan.expenses.map((item) => <div className="planning-tools__expense" key={item.id}><span>{item.title}</span><strong>{money(item.amount)}</strong><button aria-label={`Remove cost ${item.title}`} onClick={() => save({ ...plan, expenses: plan.expenses.filter((e) => e.id !== item.id) })}>Remove</button></div>)}
          {!plan.expenses.length && <p className="planning-tools__hint">Add estimates for your venue, food, photography, or decoration.</p>}
          <form onSubmit={addExpense}><label>Cost description<input name="title" required maxLength={100} placeholder="e.g. Venue" /></label><label>Estimated amount (INR)<input name="amount" type="number" required min="0" max="100000000" step="1" /></label><button className="planning-tools__primary">Add cost</button></form>
        </fieldset>
        <p className="planning-tools__hint">Estimates only. Payments and final quotes are arranged directly with your planner.</p>
      </section>
    </div>
  </div>;
}
