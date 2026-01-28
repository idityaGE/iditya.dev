import { PersonalData, LinkData } from "@/config/personal.config";
import { FileText } from "lucide-react";

export const Hero = () => {
  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">~/home</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">$ whoami</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Ajmer, India</span>
          </div>
        </div>
      </div>

      {/* Name Block */}
      <div className="border-b bg-background p-3">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
          <span className="text-green-500">→</span>
          <span>hey, it&apos;s me</span>
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1 className="text-xl font-mono font-bold uppercase tracking-wide">
            {PersonalData.name}
          </h1>
          <a
            href={LinkData.x}
            target="_blank"
            className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-green-500 transition-colors"
          >
            <span className="text-muted-foreground/50">/</span>
            <span>@{LinkData.x.split("/").pop()}</span>
          </a>
        </div>
      </div>

      {/* About Block */}
      <div className="border-b bg-background p-3">
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">$ cat about.txt</div>
        <div className="space-y-2 text-xs font-mono text-muted-foreground">
          <p className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">→</span>
            <span>
              full-stack developer with a knack for{" "}
              <span className="text-foreground">devops</span> and currently diving deep into{" "}
              <span className="text-foreground">web3</span>. i spend most of my time building things,
              breaking them, and figuring out why they broke.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">→</span>
            <span>
              also have a thing for{" "}
              <span className="text-foreground">linux</span>,{" "}
              <span className="text-foreground">networking</span>, and{" "}
              <span className="text-foreground">system design</span> —
              basically anything that lets me understand how stuff actually works under the hood.
            </span>
          </p>
          <p className="flex items-start gap-2 opacity-70">
            <span className="text-green-500 flex-shrink-0">→</span>
            <span>(you know the rabbit holes... they never end)</span>
          </p>
        </div>
      </div>

      {/* Resume Block */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">$ ls ~/docs</span>
        <a
          href="/resume.pdf"
          download="Aditya_Resume.pdf"
          className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-green-500 transition-colors"
        >
          <FileText size={12} />
          <span>resume.pdf</span>
          <span className="text-green-500">↓</span>
        </a>
      </div>
    </div>
  );
};
