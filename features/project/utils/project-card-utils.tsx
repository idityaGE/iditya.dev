import { ExternalLink, Github } from "lucide-react";
import React from "react";
import { Tag } from "@/components/ui/terminal";

const BUTTON_CLASSES =
  "inline-flex items-center px-3 py-1.5 border hover:text-green-500 text-sm font-medium font-mono transition-colors";

interface ProjectButtonsProps {
  githubLink?: string;
  liveLink?: string;
  title: string;
  slug?: string;
}

export const ProjectButtons: React.FC<ProjectButtonsProps> = ({
  githubLink,
  liveLink,
  title,
  slug,
}) => (
  <div
    className="flex flex-wrap items-center gap-2 mt-auto flex-shrink-0 py-1 md:py-0"
    style={slug ? ({ viewTransitionName: `project-buttons-${slug}` } as React.CSSProperties) : undefined}
  >
    {githubLink && (
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`GitHub repository for ${title}`}
        className={BUTTON_CLASSES}
      >
        <Github className="mr-1.5 h-3.5 w-3.5" />
        GitHub
      </a>
    )}
    {liveLink && (
      <a
        href={liveLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Live demo of ${title}`}
        className={`${BUTTON_CLASSES} group/demo`}
      >
        <ExternalLink className="mr-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover/demo:rotate-45" />
        Live
      </a>
    )}
  </div>
);

interface TechStackListProps {
  techStack: string[];
  maxVisible?: number;
  showAll?: boolean;
  slug?: string;
}

export const TechStackList: React.FC<TechStackListProps> = ({
  techStack,
  maxVisible = 7,
  showAll = false,
  slug,
}) => {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div className="relative max-h-[40px] overflow-hidden">
      <div
        className="flex items-start gap-1 flex-wrap"
        style={slug ? ({ viewTransitionName: `project-tags-${slug}` } as React.CSSProperties) : undefined}
      >
        {techStack.map((tag, index) =>
          showAll || index < maxVisible ? (
            <Tag key={tag} className="cursor-default">
              {tag}
            </Tag>
          ) : null,
        )}
        {!showAll && techStack.length > maxVisible && (
          <Tag className="cursor-default">+{techStack.length - maxVisible}</Tag>
        )}
      </div>
    </div>
  );
};
