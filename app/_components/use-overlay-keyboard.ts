"use client";
import { useEffect, useEffectEvent } from "react";

export function useOverlayKeyboard(id: string, open: boolean, onClose: () => void, trapFocus = false) {
  const close = useEffectEvent(onClose);
  useEffect(() => {
    if (!open) return;
    const overlay = document.getElementById(id);
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const controls = () => Array.from(overlay?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)') ?? [])
      .filter((element) => element.getClientRects().length > 0);
    if (trapFocus) controls()[0]?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (trapFocus && event.key === "Tab") {
        const items = controls(); const first = items[0]; const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); if (trigger?.isConnected) trigger.focus(); };
  }, [id, open, trapFocus]);
}
