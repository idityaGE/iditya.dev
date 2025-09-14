import { Ripple } from "@/components/magicui/ripple";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react'

export function Projects() {
  return (
    <Link
      href="/projects"
      className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-slate-800 dark:text-white group"
    >
      <div className="relative flex h-56 w-full flex-col items-center justify-center md:shadow-xl hover:scale-125 hover:text-6xl duration-300 transform-gpu ease-in-out">
        <div className="flex items-center gap-2">
          <span>Projects</span>
          <div className="group-hover:opacity-100 group-hover:translate-x-0 opacity-0 -translate-x-2 transition-all duration-300">
            <ArrowUpRight className="h-8 w-8 md:h-10 md:w-10" />
          </div>
        </div>
        <Ripple />
      </div>
    </Link>
  );
}
