import { Ripple } from "@/components/magicui/ripple";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Projects() {
  return (
    <Link
      href="/projects"
      className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-slate-800 dark:text-white group"
    >
      <div className="relative flex h-56 w-full flex-col items-center justify-center md:shadow-xl hover:scale-125 hover:text-6xl duration-300 transform-gpu ease-in-out">
        <div className="flex items-center gap-2">
          <span>Projects</span>
          <ArrowRight className="h-0 w-0 opacity-0 group-hover:h-10 group-hover:w-10 group-hover:opacity-100 transition-all duration-300 ease-in-out group-hover:translate-x-2" />
        </div>
        <Ripple />
      </div>
    </Link>
  );
}
