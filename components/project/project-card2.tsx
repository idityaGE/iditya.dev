import type { ProjectCardProps } from "@/types";
import Image from 'next/image';
import { ProjectTypeTag, ProjectButtons, TechStackList } from './project-card-utils';

export function ProjectCard2({
  title,
  type,
  description,
  images,
  liveLink,
  githubLink,
  techStack
}: ProjectCardProps) {
  return (
    <div className="flex flex-col">
      <div className="rounded-xl overflow-hidden border mb-6">
        <Image
          src={images[0]}
          width={600}
          height={400}
          alt={`${title} project screenshot`}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-3xl font-bold py-1">{title}</h1>
        {type && <ProjectTypeTag type={type} />}
      </div>

      <p className="text-sm text-secondary-foreground/80 font-light max-w-2xl mb-4">
        {description}
      </p>

      <div className="mb-6">
        <TechStackList techStack={techStack} showAll />
      </div>

      <ProjectButtons
        githubLink={githubLink}
        liveLink={liveLink}
        title={title}
      />
    </div>
  );
}
