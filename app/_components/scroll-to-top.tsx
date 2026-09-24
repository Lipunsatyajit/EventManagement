"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed right-4 bottom-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#6a1b9a] text-white shadow-[0_20px_50px_rgba(106,27,154,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]/40 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <span className="text-xl">↑</span>
    </button>
  );
}
