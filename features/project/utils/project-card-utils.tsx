import { ExternalLink, Github } from "lucide-react";
import React from "react";

export const getTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    personal: "bg-sky-600",
    freelance: "bg-emerald-600",
  };
  return colorMap[type] || "bg-neutral-600";
};

const BUTTON_CLASSES =
  "inline-flex items-center px-2 py-1 border hover:text-green-500 text-xs font-medium transition-colors";

interface ProjectTypeTagProps {
  type: string;
}

export const ProjectTypeTag: React.FC<ProjectTypeTagProps> = ({ type }) => (
  <span
    className={`inline-flex items-center px-2 py-1 text-xs font-light rounded-sm text-white ${getTypeColor(
      type
    )} bg-opacity-80 flex-shrink-0`}
  >
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </span>
);

interface ProjectButtonsProps {
  githubLink?: string;
  liveLink?: string;
  title: string;
}

export const ProjectButtons: React.FC<ProjectButtonsProps> = ({
  githubLink,
  liveLink,
  title,
}) => (
  <div className="flex flex-wrap items-center gap-1.5 mt-auto flex-shrink-0 py-2 md:py-0">
    {githubLink && (
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`GitHub repository for ${title}`}
        className={BUTTON_CLASSES}
      >
        <Github className="mr-1.5 h-3 w-3" />
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
        <ExternalLink className="mr-1.5 h-3 w-3 transition-transform duration-300 group-hover/demo:rotate-45" />
        Live
      </a>
    )}
  </div>
);

interface TechStackListProps {
  techStack: string[];
  maxVisible?: number;
  showAll?: boolean;
}

export const TechStackList: React.FC<TechStackListProps> = ({
  techStack,
  maxVisible = 7,
  showAll = false,
}) => {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div className="relative max-h-[40px] overflow-hidden">
      <div className="flex items-start gap-1 flex-wrap">
        {techStack.map((tag, index) =>
          showAll || index < maxVisible ? (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground text-[10px] cursor-default"
            >
              {tag}
            </span>
          ) : null
        )}
        {!showAll && techStack.length > maxVisible && (
          <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-sm">
            +{techStack.length - maxVisible}
          </span>
        )}
      </div>
    </div>
  );
};
