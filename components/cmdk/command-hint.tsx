"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Kbd } from "@/components/ui/kbd";
import { X } from "lucide-react";

const STORAGE_KEY = "cmdk-hint-seen";

export function CommandHint() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const dismiss = useCallback(() => {
    setExiting(true);
    const t = setTimeout(() => {
      setShow(false);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // localStorage unavailable
      }
    }, 300);
    timersRef.current.push(t);
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    // Show after a brief delay so the user sees the page first
    const showTimer = setTimeout(() => setShow(true), 2500);
    timersRef.current.push(showTimer);

    // Auto-dismiss after 10s total (2.5s delay + 7.5s visible)
    const hideTimer = setTimeout(() => dismiss(), 10000);
    timersRef.current.push(hideTimer);

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [dismiss]);

  // Also dismiss when user opens command palette (Cmd+K)
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        dismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, dismiss]);

  if (!show) return null;

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl z-40 pointer-events-none px-3">
      <div
        className={`border-x border-b bg-background px-3 py-1.5 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          exiting
            ? "opacity-0 -translate-y-1"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
          <span className="text-green-500">→</span>
          <span>press</span>
          <Kbd className="text-[10px]">⌘ K</Kbd>
          <span>to navigate, search, and more</span>
        </div>
        <button
          onClick={dismiss}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
          aria-label="Dismiss hint"
        >
          <X size={10} />
        </button>
      </div>
    </div>
  );
}
