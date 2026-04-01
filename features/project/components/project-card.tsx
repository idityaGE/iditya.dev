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
      className={`relative flex flex-col overflow-hidden transition-all duration-200 bg-background ${
        !disableHover
          ? "group-hover/project-card:-translate-x-1 group-hover/project-card:-translate-y-1 border"
          : "border-y"
      }`}
    >
      {/* Terminal Header */}
      <div className="px-2 py-1.5 bg-muted/70">
        <div className="flex items-center gap-2">
          <TrafficLightDots />
          <TerminalPath className="truncate">~/projects/{slug}</TerminalPath>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row">
        {/* Content Section */}
        <div className="flex flex-col w-full md:w-2/3 min-h-0 gap-px">
          {/* Title & Description Block */}
          <div className="bg-background p-1.5 h-full">
            <TerminalCommand className="mb-1">$ info</TerminalCommand>
            {disableHover ? (
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <GreenArrow />
                  <h2 className="text-sm font-mono font-bold line-clamp-1">
                    {title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-muted-foreground line-clamp-2 pl-4">
                  {description}
                </p>
              </div>
            ) : (
              <Link
                href={projectUrl}
                className="block group/link"
                aria-label={projectAriaLabel}
              >
                <div className="flex items-start gap-2 mb-1">
                  <GreenArrow />
                  <h2 className="text-sm font-mono font-bold line-clamp-1 group-hover/project-card:text-green-500 transition-colors">
                    {title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-muted-foreground line-clamp-2 pl-4">
                  {description}
                </p>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border-t">
            {/* Tech Stack Block */}
            <div className="bg-background p-1.5 border-r">
              <TerminalCommand className="mb-1">$ stack</TerminalCommand>
              <TechStackList techStack={techStack} maxVisible={3} />
            </div>

            {/* Actions Block */}
            <div className="bg-background p-1.5 border-t md:border-t-0">
              <TerminalCommand className="mb-1">$ links</TerminalCommand>
              <ProjectButtons
                githubLink={githubLink}
                liveLink={liveLink}
                title={title}
              />
            </div>
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
            <Link
              href={projectUrl}
              aria-label={projectAriaLabel}
              className="block w-full h-full"
            >
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
