import { ExternalLink, Github } from 'lucide-react';
import React from 'react';

export const getTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    personal: 'bg-sky-600',
    freelance: 'bg-emerald-600',
  };
  return colorMap[type] || 'bg-neutral-600';
};

const BUTTON_CLASSES = "inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md transition-colors";

interface ProjectTypeTagProps {
  type: string;
}

export const ProjectTypeTag: React.FC<ProjectTypeTagProps> = ({ type }) => (
  <span
    className={`inline-flex items-center px-2 py-1 text-xs font-light rounded-full text-white ${getTypeColor(type)} bg-opacity-80 flex-shrink-0`}
  >
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </span>
);

interface ProjectButtonsProps {
  githubLink?: string;
  liveLink?: string;
  title: string;
}

export const ProjectButtons: React.FC<ProjectButtonsProps> = ({ githubLink, liveLink, title }) => (
  <div className="flex flex-wrap items-center gap-2 mt-auto flex-shrink-0">
    {githubLink && (
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`GitHub repository for ${title}`}
        className={BUTTON_CLASSES}
      >
        <Github className="mr-2 h-5 w-4" />
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
        <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/demo:rotate-45" />
        Live Demo
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
  showAll = false
}) => {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-start gap-1.5 flex-wrap overflow-hidden">
        {techStack.map((tag, index) => (
          (showAll || index < maxVisible) ? (
            <span
              key={tag}
              className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs cursor-default mb-0.5"
            >
              {tag}
            </span>
          ) : null
        ))}
        {!showAll && techStack.length > maxVisible && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded mb-1">
            +{techStack.length - maxVisible} more
          </span>
        )}
      </div>
    </div>
  );
};
