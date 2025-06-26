export interface ProjectCardProps {
  title: string
  type?: string
  description: string
  images: string[]
  liveLink?: string
  githubLink?: string
  techStack: string[]
  slug: string
}

export interface BlogPostMeta {
  title: string;
  date: string;
  tags: string[];
  author: string;
  excerpt: string;
  coverImage: string;
  published: boolean
};

export interface EducationListProps {
  year: string
  title: string
  institution: string
  location: string
  link?: string
}
