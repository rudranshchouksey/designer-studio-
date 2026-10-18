"use client";

import { useEffect, useState } from "react";

// False until the first page has hydrated, so the initial load is never faded in (that would delay LCP).
let hydrated = false;

/** Re-mounts on every navigation: a quick fade/rise for the incoming page (the 3D canvas stays put in the layout). */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
