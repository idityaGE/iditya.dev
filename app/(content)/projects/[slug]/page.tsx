import { getMDXSlugs } from "@/lib/mdx"
import { ProjectCard2 } from "@/components/project/project-card2"
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { ProjectData } from '@/config/project.config';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: ProjectMDX } = await import(`@/content/projects/${slug}.mdx`)

  const project = ProjectData.find((proj) => proj.slug === slug)

  if (!project) {
    return (
      <main className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </main>
    )
  }

  return (
    <main className="relative w-full lg:h-[90vh] p-3 sm:p-2 mt-20 px-4">
      <div className="w-full h-full rounded-2xl sm:border flex flex-wrap justify-between lg:divide-x">
        <section className="relative w-full lg:w-2/5 p-1.5 md:p-8">
          <div className="flex justify-between mb-4">
            <Link
              href="/projects"
              className="group/back text-xs hover:opacity-70 transition-opacity"
              aria-label="Back to projects"
            >
              <ArrowLeft
                size={24}
                className="group-hover/back:-translate-x-1 transition-transform transform-gpu duration-100 ease-in-out"
              />
            </Link>
          </div>
          {project && <ProjectCard2 {...project} />}
        </section>
        <section
          id="content-section"
          className="relative w-full lg:h-full lg:w-3/5 p-1.5 md:p-8 overflow-y-auto"
          aria-live="polite"
        >
          <div className="min-h-screen">
            <ProjectMDX />
          </div>
        </section>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = await getMDXSlugs("projects")
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export const dynamicParams = false
