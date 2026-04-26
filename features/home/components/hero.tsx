import { PersonalData, LinkData } from "@/config/personal.config";
import { FileText } from "lucide-react";
import Link from "next/link";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  AvailabilityDot,
  GreenArrow,
} from "@/components/ui/terminal";

export const Hero = () => {
  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrafficLightDots />
          <TerminalPath>~/home</TerminalPath>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalCommand>$ whoami</TerminalCommand>
          </div>
          <div className="flex items-center gap-1.5">
            <AvailabilityDot ping />
            <TerminalPath>Ajmer, India</TerminalPath>
          </div>
        </div>
      </div>

      {/* Name Block */}
      <div className="border-b bg-background p-3">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
          <GreenArrow />
          <span>hey, it&apos;s me</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h1 className="text-xl font-mono font-bold uppercase tracking-wide">
              {PersonalData.name}
            </h1>
            <span className="animate-pulse bg-foreground w-2 h-4 inline-block ml-1"></span>
            <a
              href={LinkData.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`X profile @${LinkData.x.split("/").pop()}`}
              className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-green-500 transition-colors"
            >
              <span className="text-muted-foreground">/</span>
              <span>@{LinkData.x.split("/").pop()}</span>
            </a>
          </div>
          <Link
            href="/resume.pdf"
            download="Aditya_Resume.pdf"
            className="flex items-center gap-1 pl-2 pr-1 py-0.5 border-l-2 border-green-500 bg-green-500/5 hover:bg-green-500/10 text-muted-foreground hover:text-green-500 font-mono text-xs transition-colors group"
          >
            <FileText
              size={14}
              className="group-hover:scale-110 transition-transform"
            />
            <span>resume.pdf</span>
          </Link>
        </div>
      </div>

      {/* About Block */}
      <div className="border-b bg-background p-3">
        <TerminalCommand className="mb-2">$ cat about.txt</TerminalCommand>
        <div className="space-y-2 text-xs font-mono text-muted-foreground">
          <p className="flex items-start gap-2">
            <GreenArrow />
            <span>
              full-stack developer with a knack for{" "}
              <span className="text-foreground">devops</span> and currently
              diving deep into <span className="text-foreground">web3</span>. i
              spend most of my time building things, breaking them, and figuring
              out why they broke.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <GreenArrow />
            <span>
              also have a thing for{" "}
              <span className="text-foreground">linux</span>,{" "}
              <span className="text-foreground">networking</span>, and{" "}
              <span className="text-foreground">system design</span> — basically
              anything that lets me understand how stuff actually works under
              the hood.
            </span>
          </p>
          <p className="flex items-start gap-2 opacity-70">
            <GreenArrow />
            <span>(you know the rabbit holes... they never end)</span>
          </p>
        </div>
      </div>
    </div>
  );
};
