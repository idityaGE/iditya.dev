import { StepForward } from "lucide-react";
import type { ProjectCardProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  getTypeColor,
  ProjectButtons,
  TechStackList,
} from "./project-card-utils";

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
      className={`relative flex p-3 md:p-5 flex-col-reverse justify-between gap-4 border-y overflow-hidden md:flex-row transition-all duration-300 ease-in-out h-auto md:h-[260px] bg-background ${
        !disableHover
          ? "group-hover/project-card:-translate-x-1 group-hover/project-card:-translate-y-1 group-hover/project-card:border-x"
          : ""
      }`}
    >
      {/* Content Section */}
      <div className="flex flex-col w-full md:w-3/5 min-h-0">
        {disableHover ? (
          <div className="block mb-3 flex-shrink-0">
            <div className="inline-flex items-center gap-1 mt-2 md:mt-0 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-heading line-clamp-1">{title}</h2>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 font-light line-clamp-3">
              {description}
            </p>
          </div>
        ) : (
          <Link
            href={projectUrl}
            className="block mb-3 group/link flex-shrink-0"
            aria-label={projectAriaLabel}
          >
            <div className="inline-flex items-center gap-1 mt-2 md:mt-0 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-heading line-clamp-1">{title}</h2>
              </div>
              <span className="-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all flex-shrink-0">
                <StepForward size={12} />
              </span>
            </div>
            <p className="text-sm text-secondary-foreground/80 font-light line-clamp-3">
              {description}
            </p>
          </Link>
        )}

        {/* Tech Stack */}
        <div className="flex-1 min-h-0 mb-3">
          <TechStackList techStack={techStack} maxVisible={7} />
        </div>

        {/* Buttons */}
        <ProjectButtons
          githubLink={githubLink}
          liveLink={liveLink}
          title={title}
        />
      </div>

      {/* Image Section */}
      <div className="w-full md:w-2/5 h-48 md:h-full flex-shrink-0">
        <div className="w-full h-full overflow-hidden">
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
