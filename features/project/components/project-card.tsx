import { StepForward } from "lucide-react";
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
      className={`relative flex flex-col-reverse md:flex-row border-y overflow-hidden transition-all duration-300 ease-in-out h-auto md:h-[160px] bg-background ${
        !disableHover
          ? "group-hover/project-card:-translate-x-1 group-hover/project-card:-translate-y-1 group-hover/project-card:border-x group-hover/project-card:transition-transform group-hover/project-card:duration-300 group-hover/project-card:ease-in-out"
          : ""
      }`}
    >
      {/* Content Section */}
      <div className="flex flex-col w-full md:w-2/3 min-h-0 px-3 md:px-4 py-2 md:py-3">
        {disableHover ? (
          <div className="block mb-1.5 flex-shrink-0">
            <div className="inline-flex items-center gap-1 mb-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-heading line-clamp-1 font-mono">
                  {title}
                </h2>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 font-light line-clamp-2">
              {description}
            </p>
          </div>
        ) : (
          <Link
            href={projectUrl}
            className="block mb-1.5 group/link flex-shrink-0"
            aria-label={projectAriaLabel}
          >
            <div className="inline-flex items-center gap-1 mb-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-heading line-clamp-1 font-mono">
                  {title}
                </h2>
              </div>
              <span className="-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all flex-shrink-0">
                <StepForward size={12} />
              </span>
            </div>
            <p className="text-sm text-secondary-foreground/80 font-light line-clamp-2 pr-2">
              {description}
            </p>
          </Link>
        )}

        {/* Tech Stack */}
        <div className="flex-1 min-h-0 mb-1.5">
          <TechStackList techStack={techStack} maxVisible={4} />
        </div>

        {/* Buttons */}
        <ProjectButtons
          githubLink={githubLink}
          liveLink={liveLink}
          title={title}
        />
      </div>

      {/* Image Section - Full height, no padding */}
      <div className="w-full md:w-1/3 h-56 md:h-full flex-shrink-0">
        <div className="w-full h-full">
          {disableHover ? (
            <div className="block w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={images[0]}
                  alt={`${title} project screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
              </div>
            </div>
          ) : (
            <Link
              href={projectUrl}
              aria-label={projectAriaLabel}
              className="block w-full h-full"
            >
              <div className="relative w-full h-full">
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
    </div>
  );

  if (disableHover) {
    return cardContent;
  }

  return (
    <div className="relative group/project-card">
      {/* Shadow layer that stays in place */}
      <div className="absolute inset-0 border-t border-b bg-muted opacity-0 group-hover/project-card:opacity-100 transition-opacity duration-200" />

      {/* Main card that moves on hover */}
      {cardContent}
    </div>
  );
};

export { ProjectCard, getTypeColor };
