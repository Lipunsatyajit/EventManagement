"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./page-loader.module.css";

const HIDE_DELAY_MS = 220;

export function PageLoader() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const routeKey = `${pathname}?${search}`;
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const lastPathRef = useRef(routeKey);

  useEffect(() => {
    const clearTimers = () => {
      if (showTimerRef.current !== null) {
        window.clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }

      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const startLoader = () => {
      clearTimers();
      setVisible(true);
      hideTimerRef.current = window.setTimeout(() => setVisible(false), 10000);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");

      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      if (href.startsWith("#")) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      if (`${url.pathname}?${url.searchParams.toString()}` === lastPathRef.current) {
        return;
      }

      startLoader();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (routeKey === lastPathRef.current) {
      return;
    }

    lastPathRef.current = routeKey;

    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }

    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, HIDE_DELAY_MS);
  }, [routeKey]);

  return (
    <div
      className={`${styles.pageLoader} ${visible ? styles.pageLoaderVisible : ""}`}
      aria-hidden="true"
    >
      <div className={styles.loaderBar} />
    </div>
  );
}
