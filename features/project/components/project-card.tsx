import type { ProjectCardProps } from "@/types";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ProjectButtons } from "../utils/project-card-utils";
import {
  TrafficLightDots,
  TerminalPath,
  GreenArrow,
  Tag,
} from "@/components/ui/terminal";

const ProjectCard = ({
  title,
  description,
  images,
  liveLink,
  githubLink,
  techStack,
  slug,
}: ProjectCardProps) => {
  const projectUrl = `/projects/${slug}`;
  const projectAriaLabel = `View details of ${title} project`;

  return (
    <div className="relative group/project-card">
      {/* Shadow layer that stays in place */}
      <div className="absolute inset-0 border bg-muted opacity-0 group-hover/project-card:opacity-100 transition-opacity duration-200" />

      {/* Main card that moves on hover */}
      <div className="relative w-full h-full overflow-hidden border bg-background transition-transform duration-200 group-hover/project-card:-translate-x-1 group-hover/project-card:-translate-y-1">
        {/* Terminal Header */}
        <div className="px-2.5 py-2 bg-muted/70">
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

        {/* Image Section */}
        <div className="w-full aspect-[10/5] overflow-hidden border-b">
          <Link href={projectUrl} aria-label={projectAriaLabel}>
            <Image
              src={images[0]}
              width={400}
              height={200}
              alt={`${title} project screenshot`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full aspect-[10/5] object-cover"
              style={{ viewTransitionName: `project-image-${slug}` } as React.CSSProperties}
            />
          </Link>
        </div>

        {/* Content */}
        <div className="p-2.5">
          <div className="flex items-start gap-2 mb-2">
            <GreenArrow className="mt-0.5" />
            <Link href={projectUrl} aria-label={projectAriaLabel}>
              <h2
                className="text-sm font-mono font-bold leading-tight group-hover/project-card:text-green-500 transition-colors line-clamp-2"
                style={{ viewTransitionName: `project-title-${slug}` } as React.CSSProperties}
              >
                {title}
              </h2>
            </Link>
          </div>
          <p
            className="text-xs font-mono text-muted-foreground line-clamp-2 pl-4"
            style={{ viewTransitionName: `project-desc-${slug}` } as React.CSSProperties}
          >
            {description}
          </p>
        </div>

        {/* Tags & Links Grid */}
        <div className="flex flex-col gap-px border-t">
          {/* Tags Block */}
          <div className="bg-background p-2 border-b">
            <div
              className="flex items-center gap-1 flex-wrap"
              style={{ viewTransitionName: `project-tags-${slug}` } as React.CSSProperties}
            >
              {techStack.slice(0, 4).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {techStack.length > 2 && <Tag>+{techStack.length - 2}</Tag>}
            </div>
          </div>

          {/* Links Block */}
          <div className="bg-background p-2">
            <ProjectButtons
              githubLink={githubLink}
              liveLink={liveLink}
              title={title}
              slug={slug}
            />
          </div>
        </div>

        {/* Footer */}
        <Link
          href={projectUrl}
          className="border-t px-2.5 py-1.5 flex items-center justify-between bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <TerminalPath>$ cd {slug}</TerminalPath>
          <span className="text-xs font-mono text-green-500">enter →</span>
        </Link>
      </div>
    </div>
  );
};

export { ProjectCard };
