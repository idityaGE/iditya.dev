"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

/**
 * Terminal-style scroll-to-top button.
 * Appears when the user scrolls down past the threshold.
 * Uses a blinking-cursor-inspired animation and terminal chrome.
 */
export function ScrollToTop({ threshold = 400 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-1.5",
        "border bg-background px-3 py-1.5",
        "text-xs font-mono text-muted-foreground",
        "hover:text-green-500 hover:border-green-500/50",
        "transition-all duration-200",
        "shadow-md",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      )}
    >
      <span className="text-green-500">$</span>
      <span>cd ..</span>
      <ChevronUp size={14} className="text-muted-foreground group-hover:text-green-500 transition-colors" />
      <span className="w-2 h-4 bg-muted-foreground/40 animate-pulse" aria-hidden="true" />
    </button>
  );
}
