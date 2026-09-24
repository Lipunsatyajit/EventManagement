"use client";
import { useState } from "react";
import Link from "next/link";
import { planners } from "@/lib/site-content";
import { PlannerCard } from "@/app/(marketing)/_components/planner-card";
import "./planner-search.css";

export function PlannerSearch({ initialDistrict = "", initialEvent = "" }: { initialDistrict?: string; initialEvent?: string }) {
  const [district, setDistrict] = useState(initialDistrict);
  const [eventType, setEventType] = useState(initialEvent);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const districts = Array.from(new Set(planners.map((planner) => planner.district)));
  const types = Array.from(new Set(planners.flatMap((planner) => planner.services)));
  const results = planners.filter((planner) => (!district || planner.district === district) &&
    (!eventType || planner.services.includes(eventType)) && planner.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : Number(b.rating) - Number(a.rating));
  return <div className="planner-search">
    <div className="planner-search__filters">
      <label>Planner name<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" /></label>
      <label>District / city<select value={district} onChange={(e) => setDistrict(e.target.value)}><option value="">All locations</option>{Array.from(new Set([...districts, initialDistrict])).filter(Boolean).map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Event type<select value={eventType} onChange={(e) => setEventType(e.target.value)}><option value="">All events</option>{Array.from(new Set([...types, initialEvent])).filter(Boolean).map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="rating">Highest rated</option><option value="name">Name A-Z</option></select></label>
    </div>
    <div className="planner-search__summary"><p role="status">{results.length} {results.length === 1 ? "planner" : "planners"} found</p><button onClick={() => { setDistrict(""); setEventType(""); setQuery(""); setSort("rating"); }}>Clear filters</button><Link href="/customer/planning">Checklist & budget</Link></div>
    <div className="planner-search__results">{results.map((planner) => <PlannerCard key={planner.slug} planner={planner} />)}</div>
    {!results.length && <div className="planner-search__empty"><h2>No matching planners</h2><p>Try another location or event type, or clear the filters.</p></div>}
  </div>;
}
