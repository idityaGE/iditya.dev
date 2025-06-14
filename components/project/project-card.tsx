import { StepForward } from 'lucide-react';
import type { ProjectCardProps } from "@/types";
import Link from 'next/link';
import Image from 'next/image';
import { getTypeColor, ProjectTypeTag, ProjectButtons, TechStackList } from './project-card-utils';

const ProjectCard = ({
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
    <div className="flex p-3 md:p-5 flex-col-reverse justify-between gap-4 rounded-xl border overflow-hidden md:flex-row group shadow-sm hover:shadow-lg dark:shadow-[0px_0px_10px_rgba(255,255,255,0.05)] dark:hover:shadow-[0px_0px_20px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out h-auto md:h-[260px]">
      {/* Content Section */}
      <div className="flex flex-col w-full md:w-3/5 min-h-0">
        <Link
          href={projectUrl}
          className="block mb-3 group/link flex-shrink-0"
          aria-label={projectAriaLabel}
        >
          <div className="inline-flex items-center gap-1 mt-2 md:mt-0 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-heading line-clamp-1">{title}</h2>
              {type && <ProjectTypeTag type={type} />}
            </div>
            <span className="-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-100 ease-in-out flex-shrink-0">
              <StepForward size={12} />
            </span>
          </div>
          <p className="text-sm text-secondary-foreground/80 font-light line-clamp-3">
            {description}
          </p>
        </Link>

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

export { ProjectCard, getTypeColor };
