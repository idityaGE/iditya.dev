import type { EducationListProps } from "@/types"

export const EducationList = ({
  year,
  title,
  institution,
  location,
  link
}: EducationListProps) => {
  return (
    <li>
      <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-background"></div>
      <time className="mb-1 text-sm font-normal leading-none text-primary/80">{year}</time>
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-base text-muted-foreground">
        {link ? (
          <a target="_blank" href={link} className="hover:text-primary transition-colors" about={title} rel="noopener noreferrer">
            {institution}
          </a>
        ) : (
          institution
        )}
        , {location}
      </p>
    </li>
  )
}
