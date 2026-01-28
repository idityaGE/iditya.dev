import { ProjectCard } from "@/features/project/components/project-card";
import { ProjectData } from "@/config/project.config";
import { LinkData } from "@/config/personal.config";
import { Mail, AlertTriangle, Rss } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getTwitterUsername = (url: string): string => {
  return url.split("/").pop() || "";
};

const Projects = () => {
  const twitterUsername = getTwitterUsername(LinkData.x);

  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y  bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">~/projects</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold font-mono uppercase tracking-wider">Projects</h1>
            <span className="text-[10px] font-mono text-muted-foreground">({ProjectData.length} repos)</span>
          </div>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <Link
                href="/projects/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Rss size={14} aria-hidden="true" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-mono">$ subscribe --rss</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Description Block */}
      <div className="border-b  bg-background p-3">
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">$ cat readme.md</div>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed mb-2">
          I love building side projects that solve either my own or someone else's problems.
          Here is an extensive list of all the stuff I have built.
        </p>
        <p className="text-xs font-mono text-muted-foreground">
          <span className="text-green-500">→</span> Want to collaborate?{" "}
          <Link
            href={LinkData.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-green-500 transition-colors"
          >
            @{twitterUsername}
          </Link>
        </p>
      </div>

      {/* Warning Block */}
      <div className="border-b  bg-background p-3">
        <div className="flex items-start gap-2">
          <AlertTriangle size={12} className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-yellow-500 uppercase tracking-wider mb-1">$ warning</div>
            <p className="text-[11px] font-mono text-muted-foreground">
              Projects hosted on free services may enter hibernation mode.{" "}
              <Link
                href={LinkData.mail}
                className="inline-flex items-center gap-1 text-foreground hover:text-green-500 transition-colors"
              >
                contact me <Mail size={10} />
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="mt-8">
        <div className="flex flex-col gap-px">
          {ProjectData.map((project) => (
            <div key={project.slug || project.title} className="bg-background mb-4 px-2">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">$ total: {ProjectData.length} repos</span>
        <span className="text-[10px] font-mono text-muted-foreground animate-pulse">█</span>
      </div>
    </div>
  );
};

export default Projects;
