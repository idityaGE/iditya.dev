import { getMDXSlugs } from "@/lib/mdx";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectData } from "@/config/project.config";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { BackButton } from "@/components/blog/back-button";
import { ScrollProgress } from "@/components/magicui/scroll-progress"

const getProjectFromSlug = (slug: string) => {
  return ProjectData.find((project) => project.slug === slug);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectFromSlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} | ${siteConfig.name} | ${siteConfig.creator.name}`,
    description: project.description,
    keywords: [...project.techStack, ...siteConfig.keywords, project.title],
    openGraph: {
      title: `${project.title} | ${siteConfig.name} | ${siteConfig.creator.name}`,
      description: project.description,
      images: [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      site: "@" + siteConfig.links.x.split("/").at(-1) || "@idityage",
      creator: "@" + siteConfig.links.x.split("/").at(-1) || "@idityage",
      images: [
        {
          url: project.images[0],
          alt: project.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: ProjectMDX } = await import(
    `@/content/projects/${slug}.mdx`
  );
  const project = getProjectFromSlug(slug);

  if (!project) {
    return (
      <main className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </main>
    );
  }

  return (
    <main className="relative">
      <ScrollProgress className="min-[1400px]:hidden" />
      <div
        className="h-8"
        style={{
          backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 12px,
              color-mix(in srgb, currentColor 10%, transparent) 12px,
              color-mix(in srgb, currentColor 10%, transparent) 13px
            )`,
        }}
      />
      <div className="fixed top-24 border-t border-b border-l px-4 py-2 right-[calc(50%+28rem)] z-50 hidden lg:inline-flex">
        <BackButton href="/projects" label="SEE ALL PROJECTS" />
      </div>
      <ScrollProgress orientation="vertical" className="left-[calc(50%+28rem)]" />
      <div className="w-full flex flex-col max-w-4xl mx-auto">
        {project && <ProjectCard {...project} disableHover />}
        <div
          className="h-8 border-b"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 12px,
              color-mix(in srgb, currentColor 10%, transparent) 12px,
              color-mix(in srgb, currentColor 10%, transparent) 13px
            )`,
          }}
        />
        <section
          id="content-section"
          className="relative w-full p-4"
          aria-live="polite"
        >
          <ProjectMDX />
          <div className="border-t pt-6 mt-8 flex justify-center">
            <BackButton href="/projects" label="SEE ALL PROJECTS" />
          </div>
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getMDXSlugs("projects");
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export const dynamicParams = false;
