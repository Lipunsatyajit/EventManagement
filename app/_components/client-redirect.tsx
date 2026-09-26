"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ClientRedirect({ href, preserveQuery = false }: { href: string; preserveQuery?: boolean }) {
  return <Suspense fallback={<p>Opening page...</p>}><RedirectContent href={href} preserveQuery={preserveQuery} /></Suspense>;
}

function RedirectContent({ href, preserveQuery }: { href: string; preserveQuery: boolean }) {
  const router = useRouter();
  const search = useSearchParams();
  const [path, fixedQuery = ""] = href.split("?");
  const query = new URLSearchParams(preserveQuery ? search.toString() : "");
  new URLSearchParams(fixedQuery).forEach((value, key) => query.set(key, value));
  const target = `${path}${query.size ? `?${query}` : ""}`;
  useEffect(() => { router.replace(target); }, [router, target]);
  return <main className="min-h-screen p-6"><p>Opening page...</p><Link href={target}>Continue</Link></main>;
}
