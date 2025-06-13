"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  const toggleTheme = () => {
    // @ts-ignore
    const switchTheme = () => {
      setTheme((current) => (current === "dark" ? "light" : "dark"));
    };
    
    document.startViewTransition
      ? document.startViewTransition(switchTheme)
      : switchTheme();
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="rounded-full"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
