import { ExternalLink, Github, StepForward } from 'lucide-react';
import type { ProjectCardProps } from "@/types";
import Link from 'next/link';
import Image from 'next/image';

const getTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    personal: 'bg-sky-600',
    freelance: 'bg-emerald-600',
  };
  return colorMap[type] || 'bg-neutral-600';
};

const BUTTON_CLASSES = "inline-flex items-center px-3 py-1.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md transition-colors";

export const ProjectCard = ({
  title,
  type,
  description,
  images,
  liveLink,
  githubLink,
  techStack,
  slug
}: ProjectCardProps) => {
  const projectUrl = `/projects/${slug}`;
  const projectAriaLabel = `View details of ${title} project`;

  return (
    <div className="flex p-3 md:p-6 flex-col-reverse justify-between gap-4 rounded-xl border overflow-hidden md:flex-row group shadow-sm hover:shadow-lg dark:shadow-[0px_0px_10px_rgba(255,255,255,0.05)] dark:hover:shadow-[0px_0px_20px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out h-auto md:h-[280px]">

      {/* Content Section - Fixed width ratio */}
      <div className="flex flex-col w-full md:w-3/5 min-h-0">
        <Link
          href={projectUrl}
          className="block mb-3 group/link flex-shrink-0"
          aria-label={projectAriaLabel}
        >
          <div className="inline-flex items-center gap-1 mt-2 md:mt-0 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-heading line-clamp-1">{title}</h2>
              {type && (
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-light rounded-full text-white ${getTypeColor(type)} bg-opacity-80 flex-shrink-0`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              )}
            </div>
            <span className="-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-100 ease-in-out flex-shrink-0">
              <StepForward size={12} />
            </span>
          </div>
          <p className="text-sm text-secondary-foreground/80 font-light line-clamp-3">
            {description}
          </p>
        </Link>

        {/* Tech Stack - Flexible height */}
        <div className="flex-1 min-h-0 mb-3">
          {techStack && techStack.length > 0 && (
            <div className="flex items-start gap-2 flex-wrap">
              {techStack.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons - Always at bottom */}
        <div className="flex flex-wrap items-center gap-2 mt-auto flex-shrink-0">
          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${title}`}
              className={BUTTON_CLASSES}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          )}
          {liveLink && (
            <Link
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${title}`}
              className={`${BUTTON_CLASSES} group/demo`}
            >
              <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/demo:rotate-45" />
              Live Demo
            </Link>
          )}
        </div>
      </div>

      {/* Image Section - Fixed dimensions */}
      <div className="w-full md:w-2/5 h-48 md:h-full flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-xl transition-all duration-300 ease-in-out transform-gpu group-hover:scale-[1.02]">
          <Link href={projectUrl} aria-label={projectAriaLabel} className="block w-full h-full">
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
        </div>
      </div>
    </div>
  );
};
