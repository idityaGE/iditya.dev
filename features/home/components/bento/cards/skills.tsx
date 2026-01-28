import {
  SiCplusplus,
  SiTypescript,
  SiNextdotjs,
  SiPython,
  SiRust,
  SiGo,
  SiGnubash,
  SiBun,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTailwindcss,
  SiGit,
  SiLinux,
  // SiAmazonwebservices, // Not available in @icons-pack/react-simple-icons - use simple-icons instead
  SiVercel,
  SiCloudflare,
  SiSolidity,
  SiSolana,
  SiGraphql,
  SiNginx,
  SiApachekafka,
  SiAstro,
  SiTerraform,
  SiExpo,
  SiTauri,
  SiElectron,
} from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = [
  // Languages
  { icon: SiTypescript, name: "typescript", color: "#3178C6" },
  { icon: SiPython, name: "python", color: "#3776AB" },
  { icon: SiRust, name: "rust", color: "currentColor" },
  { icon: SiGo, name: "go", color: "#00ADD8" },
  { icon: SiCplusplus, name: "c++", color: "#00599C" },
  { icon: SiGnubash, name: "bash", color: "#4EAA25" },

  // Frameworks & Runtimes
  { icon: SiNextdotjs, name: "next.js", color: "currentColor" },
  { icon: SiAstro, name: "astro", color: "currentColor" },
  { icon: SiBun, name: "bun", color: "#FBF0DF" },
  { icon: SiExpo, name: "expo", color: "currentColor" },
  { icon: SiTauri, name: "tauri", color: "#24C8D8" },
  { icon: SiElectron, name: "electron", color: "#47848F" },

  // Databases
  { icon: SiPostgresql, name: "postgres", color: "#4169E1" },
  { icon: SiMongodb, name: "mongodb", color: "#47A248" },
  { icon: SiRedis, name: "redis", color: "#FF4438" },

  // DevOps & Infrastructure
  { icon: SiDocker, name: "docker", color: "#2496ED" },
  { icon: SiKubernetes, name: "k8s", color: "#326CE5" },
  { icon: SiTerraform, name: "terraform", color: "#844FBA" },
  { icon: SiNginx, name: "nginx", color: "#009639" },
  { icon: SiApachekafka, name: "kafka", color: "currentColor" },
  { icon: SiGit, name: "git", color: "#F05032" },
  { icon: SiLinux, name: "linux", color: "#FCC624" },

  // Cloud & Platforms
  { icon: SiVercel, name: "vercel", color: "currentColor" },
  { icon: SiCloudflare, name: "cloudflare", color: "#F38020" },

  // Web3
  { icon: SiSolidity, name: "solidity", color: "#363636" },
  { icon: SiSolana, name: "solana", color: "#9945FF" },

  // Other
  { icon: SiTailwindcss, name: "tailwind", color: "#06B6D4" },
  { icon: SiGraphql, name: "graphql", color: "#E10098" },
];

// Calculate optimal grid columns to minimize empty cells
function getOptimalColumns(count: number, minCols = 4, maxCols = 7): number {
  let bestCols = minCols;
  let minEmptyCells = Infinity;

  for (let cols = minCols; cols <= maxCols; cols++) {
    const rows = Math.ceil(count / cols);
    const emptyCells = rows * cols - count;

    // Prefer no empty cells, then fewer empty cells
    if (emptyCells < minEmptyCells) {
      minEmptyCells = emptyCells;
      bestCols = cols;
    }
  }

  return bestCols;
}

const columns = getOptimalColumns(skills.length);

export function SkillCard() {
  return (
    <TooltipProvider>
      <div className="h-full flex flex-col font-mono">
        <div
          className="flex-1 bg-border gap-px grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
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
