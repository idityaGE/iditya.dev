"use client";

import { useState } from "react";

export function MobileExpandable({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* display:contents so children participate directly in parent grid */}
      <div
        className="contents"
        data-mobile-expanded={expanded ? "true" : "false"}
      >
        {children}
      </div>

      {/* Toggle button — grid child, only visible on mobile */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="col-span-3 md:hidden bg-background px-3 py-2.5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-green-500 transition-colors"
      >
        <span className="text-green-500">$</span>
        {expanded ? (
          <span>
            show less{" "}
            <span className="text-muted-foreground">--quiet</span>
          </span>
        ) : (
          <span>
            show more{" "}
            <span className="text-muted-foreground">--verbose (2)</span>
          </span>
        )}
      </button>
    </>
  );
}
