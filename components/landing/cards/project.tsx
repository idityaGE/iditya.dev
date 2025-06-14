import { Ripple } from "@/components/magicui/ripple";
import Link from "next/link";

export function Projects() {
  return (
    <Link
      href="/projects"
      className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-slate-800 dark:text-white group"
    >
      <div className="relative flex h-56 w-full flex-col items-center justify-center md:shadow-xl hover:scale-125 hover:text-6xl duration-300 transform-gpu ease-in-out">
        <div className="flex items-center gap-2">
          <span>Projects</span>
        </div>
        <Ripple />
      </div>
    </Link>
  );
}
