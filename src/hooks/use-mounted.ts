"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the component has mounted on the client.
 * Useful to avoid hydration mismatches (e.g. theme-dependent UI).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
