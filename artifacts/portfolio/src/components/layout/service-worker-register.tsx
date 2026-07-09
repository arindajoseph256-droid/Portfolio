import { useEffect } from "react";

/**
 * Registers the service worker for PWA offline support (production only).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      import.meta.env.PROD &&
      "serviceWorker" in navigator
    ) {
      const register = () =>
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* registration failures are non-critical */
        });
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
    return undefined;
  }, []);

  return null;
}
