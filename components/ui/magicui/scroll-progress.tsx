"use client";

import { motion, MotionProps, useScroll } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
  orientation?: "horizontal" | "vertical";
}

export function ScrollProgress({
  className,
  ref,
  orientation = "horizontal",
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return null;
  }

  if (orientation === "vertical") {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[2px] origin-top",
          isDark ? "bg-white" : "bg-black",
          className
        )}
        style={{
          scaleY: scrollYProgress,
        }}
        {...props}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[2px] origin-left",
        isDark ? "bg-white" : "bg-black",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
}
