import type { ProjectCardProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  getTypeColor,
  ProjectButtons,
  TechStackList,
} from "../utils/project-card-utils";

const ProjectCard = ({
  title,
  type,
  description,
  images,
  liveLink,
  githubLink,
  techStack,
  slug,
  disableHover = false,
}: ProjectCardProps) => {
  const projectUrl = `/projects/${slug}`;
  const projectAriaLabel = `View details of ${title} project`;

  const cardContent = (
    <div
      className={`relative flex flex-col border-y hover:border-x overflow-hidden transition-all duration-200 bg-background ${!disableHover
          ? "group-hover/project-card:-translate-x-1 group-hover/project-card:-translate-y-1"
          : ""
        }`}
    >
      {/* Terminal Header */}
      <div className="px-2.5 py-2 border-b bg-background">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <p className="text-[10px] font-mono text-muted-foreground truncate">~/projects/{slug}</p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row">
        {/* Content Section */}
        <div className="flex flex-col w-full md:w-2/3 min-h-0 gap-px">
          {/* Title & Description Block */}
          <div className="bg-background p-2">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">$ info</div>
            {disableHover ? (
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-green-500 text-xs font-mono flex-shrink-0">→</span>
                  <h2 className="text-sm font-mono font-bold line-clamp-1">{title}</h2>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground line-clamp-2 pl-4">
                  {description}
                </p>
              </div>
            ) : (
              <Link href={projectUrl} className="block group/link" aria-label={projectAriaLabel}>
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-green-500 text-xs font-mono flex-shrink-0">→</span>
                  <h2 className="text-sm font-mono font-bold line-clamp-1 group-hover/link:text-green-500 transition-colors">{title}</h2>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground line-clamp-2 pl-4">
                  {description}
                </p>
              </Link>
            )}
          </div>

          {/* Tech Stack Block */}
          <div className="bg-background p-2 border-y">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">$ stack</div>
            <TechStackList techStack={techStack} maxVisible={4} />
          </div>

          {/* Actions Block */}
          <div className="bg-background p-2">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">$ links</div>
            <ProjectButtons
              githubLink={githubLink}
              liveLink={liveLink}
              title={title}
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/3 h-40 md:h-auto flex-shrink-0 border-b md:border-b-0 md:border-l">
          {disableHover ? (
            <div className="relative w-full h-full min-h-[120px]">
              <Image
                src={images[0]}
                alt={`${title} project screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
              />
            </div>
          ) : (
            <Link href={projectUrl} aria-label={projectAriaLabel} className="block w-full h-full">
              <div className="relative w-full h-full min-h-[120px]">
                <Image
                  src={images[0]}
                  alt={`${title} project screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      {!disableHover && (
        <Link href={projectUrl} className="border-t px-2.5 py-1.5 flex items-center justify-between bg-muted/20 hover:bg-muted/40 transition-colors">
          <span className="text-[10px] font-mono text-muted-foreground">$ cd {slug}</span>
          <span className="text-[10px] font-mono text-green-500">enter →</span>
        </Link>
      )}
    </div>
  );

  if (disableHover) {
    return cardContent;
  }

  return (
    <div className="relative group/project-card">
      {/* Shadow layer that stays in place */}
      <div className="absolute inset-0 border bg-muted opacity-0 group-hover/project-card:opacity-100 transition-opacity duration-200" />

      {/* Main card that moves on hover */}
      {cardContent}
    </div>
  );
};

export { ProjectCard, getTypeColor };
