export interface ProjectCardProps {
  title: string
  type?: string
  description: string
  images: string[]
  liveLink?: string
  githubLink?: string
  techStack: string[]
  slug: string
  disableHover?: boolean
}

export interface BlogPostMeta {
  title: string;
  date: string;
  tags: string[];
  author: string;
  excerpt: string;
  darkImage: string;
  lightImage: string;
  published: boolean;
}

export interface EducationListProps {
  year: string
  title: string
  institution: string
  location: string
  link?: string
}

export interface ExperienceItemProps {
  company: string
  position: string
  type: "Job" | "Internship" | "Education"
  location: string
  startDate: string
  endDate: string // Use "Present" for current positions
  description: string[]
  techStack: string[]
  logo?: string // Placeholder for company logo
  companyUrl?: string
}
