"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const ModeToggle = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted) return

    const newTheme = isDark ? "light" : "dark"

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transitions
      setTheme(newTheme)
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, setTheme, mounted])

  // Global keyboard shortcut for theme toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      if (e.key === "m" || e.key === "M") {
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleTheme])

  // Prevent rendering during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={cn(className)}
              disabled
              {...props}
            >
              <Sun className="opacity-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded">M</kbd></p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn(className)}
            {...props}
          >
            {isDark ? <Sun /> : <Moon />}
            <span className="sr-only">Toggle theme (M)</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-accent text-foreground rounded">M</kbd></p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
