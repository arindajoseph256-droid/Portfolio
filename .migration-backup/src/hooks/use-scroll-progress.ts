"use client";

import { useEffect, useState } from "react";

/**
 * Returns page scroll progress as a value between 0 and 1,
 * plus whether the page has been scrolled past a threshold.
 */
export function useScrollProgress(threshold = 40) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setScrolled(scrollTop > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { progress, scrolled };
}
