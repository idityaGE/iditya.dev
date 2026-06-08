import type { ProjectCardProps } from "@/types";
import Image from "next/image";
import { ProjectButtons, TechStackList } from "../utils/project-card-utils";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
} from "@/components/ui/terminal";

/**
 * Horizontal detail card used on the /projects/[slug] page.
 * Uses the old blog-card-style layout: content (2/3) + image (1/3).
 */
const ProjectDetailCard = ({
  title,
  description,
  images,
  liveLink,
  githubLink,
  techStack,
  slug,
}: ProjectCardProps) => {
  return (
    <div className="relative flex flex-col overflow-hidden bg-background border-y">
      {/* Terminal Header */}
      <div className="px-2 py-1.5 bg-muted/70">
        <div className="flex items-center gap-2">
          <TrafficLightDots />
          <TerminalPath
            className="truncate"
            style={{ viewTransitionName: `project-path-${slug}` } as React.CSSProperties}
          >
            ~/projects/{slug}
          </TerminalPath>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row">
        {/* Content Section */}
        <div className="flex flex-col w-full md:w-2/3 min-h-0 gap-px">
          {/* Title & Description Block */}
          <div className="bg-background p-1.5 h-full">
            <TerminalCommand className="mb-1">$ info</TerminalCommand>
            <div>
              <div className="flex items-start gap-2 mb-1">
                <GreenArrow />
                <h2
                  className="text-sm font-mono font-bold line-clamp-1"
                  style={{ viewTransitionName: `project-title-${slug}` } as React.CSSProperties}
                >
                  {title}
                </h2>
              </div>
              <p
                className="text-xs font-mono text-muted-foreground line-clamp-2 pl-4"
                style={{ viewTransitionName: `project-desc-${slug}` } as React.CSSProperties}
              >
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border-t">
            {/* Tech Stack Block */}
            <div className="bg-background p-1.5 border-r">
              <TerminalCommand className="mb-1">$ stack</TerminalCommand>
              <TechStackList techStack={techStack} maxVisible={3} slug={slug} />
            </div>

            {/* Actions Block */}
            <div className="bg-background p-1.5 border-t md:border-t-0">
              <TerminalCommand className="mb-1">$ links</TerminalCommand>
              <ProjectButtons
                githubLink={githubLink}
                liveLink={liveLink}
                title={title}
                slug={slug}
              />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/3 h-40 md:h-auto flex-shrink-0 border-b md:border-b-0 md:border-l">
          <div className="relative w-full h-full min-h-[120px]">
            <Image
              src={images[0]}
              alt={`${title} project screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority={false}
              style={{ viewTransitionName: `project-image-${slug}` } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectDetailCard };
