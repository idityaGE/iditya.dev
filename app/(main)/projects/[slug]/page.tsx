import { getMDXSlugs } from "@/lib/mdx";
import { ProjectDetailCard } from "@/features/project/components/project-detail-card";
import { ProjectData } from "@/config/project.config";
import type { Metadata } from "next/types";
import { siteConfig } from "@/config/site.config";
import { BackButton } from "@/features/blog/components/back-button";
import { ScrollProgress } from "@/components/ui/magicui/scroll-progress";
import { TerminalPath } from "@/components/ui/terminal";
import { notFound } from "next/navigation";

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
      images: project.images?.[0]
        ? [{ url: project.images[0], width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      site: `@${siteConfig.links.x.split("/").at(-1) ?? "idityage"}`,
      creator: `@${siteConfig.links.x.split("/").at(-1) ?? "idityage"}`,
      images: project.images?.[0]
        ? [{ url: project.images[0], alt: project.title }]
        : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectFromSlug(slug);

  if (!project) {
    notFound();
  }

  let ProjectMDX: React.ComponentType;
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`);
    ProjectMDX = mod.default;
  } catch {
    notFound();
  }

  return (
    <main className="relative mt-10">
      <ScrollProgress className="min-[1400px]:hidden" />

      {/* Fixed Back Button */}
      <div className="fixed top-24 border-y border-l px-3 py-1.5 right-[calc(50%+24rem)] z-50 hidden lg:inline-flex bg-background">
        <BackButton href="/projects" label="← cd .." />
      </div>

      <ScrollProgress
        orientation="vertical"
        className="left-[calc(49.9%+24rem)]"
      />

      <div className="w-full flex flex-col max-w-4xl mx-auto">

        {/* Project Card Block */}
        <div className="border-b bg-background">
          {project && <ProjectDetailCard {...project} />}
        </div>

        {/* Content Block */}
        <div className="bg-background">
          <div className="px-3 py-2 border-b bg-muted/20">
            <TerminalPath>$ cat README.md | render</TerminalPath>
          </div>
          <section
            id="content-section"
            className="relative w-full p-4"
            aria-live="polite"
          >
            <ProjectMDX />
          </section>
        </div>

        {/* Footer */}
        <div className="border-b bg-background px-3 py-2 flex items-center justify-center">
          <BackButton href="/projects" label="← cd /projects" />
        </div>
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
