import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiRust,
  SiGo,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiTailwindcss,
  SiGit,
  SiLinux,
  // SiAmazonwebservices, // Not available in @icons-pack/react-simple-icons - use simple-icons instead
  SiVercel,
  SiCloudflare,
  SiSolidity,
  SiGraphql,
  SiNginx,
  SiApachekafka,
  SiAstro
} from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = [
  { icon: SiTypescript, name: "typescript", color: "#3178C6" },
  { icon: SiJavascript, name: "javascript", color: "#F7DF1E" },
  { icon: SiReact, name: "react", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "next.js", color: "currentColor" },
  { icon: SiNodedotjs, name: "node.js", color: "#339933" },
  { icon: SiPython, name: "python", color: "#3776AB" },
  { icon: SiRust, name: "rust", color: "currentColor" },
  { icon: SiGo, name: "go", color: "#00ADD8" },
  { icon: SiDocker, name: "docker", color: "#2496ED" },
  { icon: SiKubernetes, name: "k8s", color: "#326CE5" },
  { icon: SiPostgresql, name: "postgres", color: "#4169E1" },
  { icon: SiMongodb, name: "mongodb", color: "#47A248" },
  { icon: SiRedis, name: "redis", color: "#FF4438" },
  { icon: SiPrisma, name: "prisma", color: "currentColor" },
  { icon: SiTailwindcss, name: "tailwind", color: "#06B6D4" },
  { icon: SiGit, name: "git", color: "#F05032" },
  { icon: SiLinux, name: "linux", color: "#FCC624" },
  // { icon: SiAmazonwebservices, name: "aws", color: "#FF9900" }, // Not available
  { icon: SiVercel, name: "vercel", color: "currentColor" },
  { icon: SiCloudflare, name: "cloudflare", color: "#F38020" },
  { icon: SiSolidity, name: "solidity", color: "#363636" },
  { icon: SiGraphql, name: "graphql", color: "#E10098" },
  { icon: SiNginx, name: "nginx", color: "#009639" },
  { icon: SiApachekafka, name: "kafka", color: "currentColor" },
  { icon: SiAstro, name: "Astro", color: "currentColor" },
];

export function SkillCard() {
  return (
    <TooltipProvider>
      <div className="h-full flex flex-col font-mono">
        <div className="flex-1 bg-border gap-px grid grid-cols-6">
          {skills.map((skill) => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "bg-background flex items-center justify-center p-2",
                    "group transition-colors hover:bg-muted cursor-default"
                  )}
                >
                  <skill.icon
                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-[10px]">
                {skill.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
