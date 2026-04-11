"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

interface ToggleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Toggle({
  title,
  children,
  defaultOpen = false,
  className,
}: ToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("my-4 border border-border", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left font-mono text-sm bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 text-green-500 shrink-0 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
        <span className="text-foreground/90">{title}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t border-border [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      )}
    </div>
  );
}
