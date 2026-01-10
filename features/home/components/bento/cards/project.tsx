import Link from "next/link";
import { ProjectData } from "@/config/project.config";
import { Folder, ExternalLink } from "lucide-react";

export function Projects() {
  const featuredProjects = ProjectData.slice(0, 3);

  return (
    <div className="h-full flex flex-col">
      {/* Projects List */}
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border flex-1">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group bg-background p-2.5 hover:bg-muted/30 transition-colors flex flex-col"
            >
              <div className="flex items-start gap-2 mb-1.5">
                <span className="text-green-500 text-xs font-mono flex-shrink-0">→</span>
                <h3 className="text-xs font-mono font-bold group-hover:text-green-500 transition-colors line-clamp-1">
                  {project.title}
                </h3>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground line-clamp-2 pl-4 flex-1">
                {project.description}
              </p>
              <div className="flex items-center gap-1 mt-1.5 pl-4 flex-wrap">
                {project.techStack.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className="px-1 py-0.5 text-[8px] font-mono bg-muted border text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 2 && (
                  <span className="text-[8px] font-mono text-muted-foreground">+{project.techStack.length - 2}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Link
        href="/projects"
        className="px-2.5 py-1.5 border-t flex items-center justify-between bg-muted/10 hover:bg-muted/30 transition-colors group"
      >
        <span className="text-[10px] font-mono text-muted-foreground">$ cd /projects</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono text-muted-foreground group-hover:text-green-500 transition-colors">
            show all ({ProjectData.length})
          </span>
          <ExternalLink size={10} className="text-muted-foreground group-hover:text-green-500 transition-colors" />
        </div>
      </Link>
    </div>
  );
}
