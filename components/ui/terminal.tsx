import { cn } from "@/lib/utils";

/**
 * Traffic light dots used in terminal-style headers.
 * The three colored dots (red, yellow, green) that appear at the top
 * of every terminal-style section and card.
 *
 * @param size - "sm" (1.5x1.5) for compact contexts, "md" (2x2) default
 */
export function TrafficLightDots({
  size = "md",
  className,
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";
  return (
    <div className={cn("flex gap-1", className)} aria-hidden="true">
      <span className={cn(dotSize, "bg-red-500/80")} />
      <span className={cn(dotSize, "bg-yellow-500/80")} />
      <span className={cn(dotSize, "bg-green-500/80")} />
    </div>
  );
}

/**
 * Terminal-style path label (e.g., "~/home", "~/blogs/slug").
 * Consistent 10px monospace muted text.
 */
export function TerminalPath({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-mono text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Terminal command text (e.g., "$ whoami", "$ cat readme.md").
 * Uppercase, wider tracking, muted foreground.
 */
export function TerminalCommand({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // If children is a string that starts with $, wrap the $ in a green span
  const content =
    typeof children === "string" && children.startsWith("$") ? (
      <>
        <span className="text-green-500">$</span>
        {children.slice(1)}
      </>
    ) : (
      children
    );

  return (
    <div
      className={cn(
        "text-xs font-mono text-muted-foreground uppercase tracking-wider",
        className,
      )}
    >
      {content}
    </div>
  );
}

/**
 * Green arrow accent marker used as list bullets and link indicators.
 * The signature green "→" that appears throughout the design.
 */
export function GreenArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-green-500 text-xs font-mono flex-shrink-0",
        className,
      )}
    >
      →
    </span>
  );
}

/**
 * Tag/badge chip for tech stack, categories, and labels.
 * Zero border radius, monospace, muted background.
 *
 * @param size - "xs" (8px, compact padding), "sm" (9px), "md" (10px, default)
 */
export function Tag({
  children,
  size = "md",
  className,
}: {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-0.5 text-xs",
  }[size];

  return (
    <span
      className={cn(
        "font-mono bg-muted border text-muted-foreground",
        sizeClasses,
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Blinking cursor block character used in terminal footers.
 * The animated "█" that simulates an active terminal.
 */
export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-xs font-mono text-muted-foreground animate-pulse",
        className,
      )}
    >
      █
    </span>
  );
}

/**
 * Pulsing green availability indicator dot.
 *
 * @param ping - true uses double-element ping animation (larger visual),
 *               false uses simple pulse (compact)
 */
export function AvailabilityDot({
  ping = false,
  className,
}: {
  ping?: boolean;
  className?: string;
}) {
  if (ping) {
    return (
      <span className={cn("relative flex h-1.5 w-1.5", className)}>
        <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 bg-green-500" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-block w-1.5 h-1.5 bg-green-500 animate-pulse",
        className,
      )}
    />
  );
}

/**
 * Terminal loading state with animated "$ fetching..." message.
 * Used as Suspense fallback in async data-fetching components.
 */
export function TerminalLoadingFallback({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center font-mono",
        className,
      )}
    >
      <div className="text-xs text-muted-foreground animate-pulse">
        <span className="text-green-500">$</span> {message}
      </div>
    </div>
  );
}
