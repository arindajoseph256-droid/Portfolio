"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for PWA offline support (production only).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      const register = () =>
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* registration failures are non-critical */
        });
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
