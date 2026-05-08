import type { ProjectCardProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  ProjectButtons,
  TechStackList,
} from "../utils/project-card-utils";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  Tag,
} from "@/components/ui/terminal";

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
      className={`relative w-full h-full overflow-hidden bg-background transition-transform duration-200 ${
        !disableHover
          ? "group-hover/project-card:-translate-x-1 group-hover/project-card:-translate-y-1 border"
          : "border-y"
      }`}
    >
      {/* Terminal Header */}
      <div className="px-2.5 py-2 bg-muted/70">
        <div className="flex items-center gap-2">
          <TrafficLightDots />
          <TerminalPath className="truncate">~/projects/{slug}</TerminalPath>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full aspect-[10/5] overflow-hidden border-b">
        {disableHover ? (
          <Image
            src={images[0]}
            width={400}
            height={200}
            alt={`${title} project screenshot`}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full aspect-[10/5] object-cover"
          />
        ) : (
          <Link href={projectUrl} aria-label={projectAriaLabel}>
            <Image
              src={images[0]}
              width={400}
              height={200}
              alt={`${title} project screenshot`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full aspect-[10/5] object-cover"
            />
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5">
        <div className="flex items-start gap-2 mb-2">
          <GreenArrow className="mt-0.5" />
          {disableHover ? (
            <h2 className="text-sm font-mono font-bold leading-tight line-clamp-2">
              {title}
            </h2>
          ) : (
            <Link href={projectUrl} aria-label={projectAriaLabel}>
              <h2 className="text-sm font-mono font-bold leading-tight group-hover/project-card:text-green-500 transition-colors line-clamp-2">
                {title}
              </h2>
            </Link>
          )}
        </div>
        <p className="text-xs font-mono text-muted-foreground mb-2.5 line-clamp-2 pl-4">
          {description}
        </p>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">
            {techStack.slice(0, 2).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {techStack.length > 2 && (
              <Tag>+{techStack.length - 2}</Tag>
            )}
          </div>
          <ProjectButtons
            githubLink={githubLink}
            liveLink={liveLink}
            title={title}
          />
        </div>
      </div>

      {/* Footer */}
      {!disableHover && (
        <Link
          href={projectUrl}
          className="border-t px-2.5 py-1.5 flex items-center justify-between bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <TerminalPath>$ cd {slug}</TerminalPath>
          <span className="text-xs font-mono text-green-500">enter →</span>
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

export { ProjectCard };
