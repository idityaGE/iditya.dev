import { ExternalLink, Github } from 'lucide-react'
import type { ProjectCardProps } from "@/types"
import { getTypeColor } from './project-card'

const BUTTON_CLASSES = "inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md transition-colors";

export function ProjectCard2({ title, type, description, images, liveLink, githubLink, techStack }: ProjectCardProps) {
  return (
    <div>
      <img
        src={images[0]}
        width={600}
        height={400}
        className='border rounded-xl mx-auto'
      />
      <div className="flex items-center gap-2 mt-6 mb-4">
        <h1 className="text-3xl font-bold py-1">{title}</h1>
        {type && (
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-light rounded-full text-white ${getTypeColor(type)} bg-opacity-80`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )}
      </div>
      <p className="text-sm text-secondary-foreground/80 font-light max-w-2xl mb-4">
        {description}
      </p>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {techStack.map((tag) => (
            <p
              key={tag}
              className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs cursor-default"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
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
    </div>
  )
}
