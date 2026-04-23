import { getMDXSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/content/toc";
import { BackButton } from "@/features/blog/components/back-button";
import type { Metadata } from "next/types";
import { siteConfig } from "@/config/site.config";
import { ScrollProgress } from "@/components/ui/magicui/scroll-progress";
import { ThemeImage } from "@/components/theme/theme-image";
import { Calendar, User } from "lucide-react";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  Tag,
} from "@/components/ui/terminal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/blogs/${slug}.mdx`);

  if (!metadata) return {};

  return {
    title: `${metadata.title} | ${siteConfig.name} | ${siteConfig.creator.name}`,
    description: metadata.excerpt || metadata.description,
    keywords: [...(metadata.tags || []), ...siteConfig.keywords],
    authors: [
      {
        name: metadata.author || siteConfig.creator.name,
        url: siteConfig.creator.url,
      },
    ],
    openGraph: {
      title: `${metadata.title} | ${siteConfig.name} | ${siteConfig.creator.name}`,
      description: metadata.excerpt || metadata.description,
      type: "article",
      publishedTime: metadata.date,
      authors: [metadata.author || siteConfig.creator.name],
      tags: metadata.tags,
      images: [
        {
          url: metadata.darkImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title} | ${siteConfig.name}`,
      description: metadata.excerpt || metadata.description,
      site: `@${siteConfig.links.x.split("/").at(-1) ?? "idityage"}`,
      creator: `@${siteConfig.links.x.split("/").at(-1) ?? "idityage"}`,
      images: [
        {
          url: metadata.darkImage || siteConfig.ogImage,
          alt: metadata.title,
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

  let Post: React.ComponentType;
  let metadata: Record<string, any>;
  let toc: any;
  try {
    const mod = await import(`@/content/blogs/${slug}.mdx`);
    Post = mod.default;
    metadata = mod.metadata;
    toc = mod.toc;
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-col mt-10">
      <ScrollProgress className="min-[1400px]:hidden" />

      {/* Fixed Back Button */}
      <div className="fixed top-24 border-y border-l px-3 py-1.5 right-[calc(50%+24rem)] z-50 hidden lg:inline-flex bg-background">
        <BackButton href="/blogs" label="← cd .." />
      </div>

      {/* Fixed TOC */}
      <aside className="hidden text-sm min-[1400px]:inline-flex">
        <div className="fixed top-24 left-[calc(50%+24rem)] z-50 border-y border-r bg-background">
          <div className="px-3 py-2 border-b">
            <div className="flex items-center gap-2">
              <TrafficLightDots size="sm" />
              <TerminalPath className="text-xs">toc</TerminalPath>
            </div>
          </div>
          <ScrollProgress
            orientation="vertical"
            className="left-[calc(49.9%+24rem)]"
          />
          <div className="p-3">
            <TableOfContents toc={toc} />
          </div>
        </div>
      </aside>

      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2">
          <TrafficLightDots />
          <TerminalPath>~/blogs/{slug}</TerminalPath>
        </div>
      </div>

      {/* Meta Info Block */}
      <div className="border-b bg-background p-3">
        <TerminalCommand className="mb-2">$ git log --oneline</TerminalCommand>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              {new Date(metadata.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">{metadata.author}</span>
          </div>
        </div>
      </div>

      {/* Title Block */}
      <div className="border-b bg-background p-3">
        <div className="flex items-start gap-2">
          <GreenArrow className="text-sm" />
          <h1 className="text-xl font-mono font-bold leading-tight break-words min-w-0">{metadata.title}</h1>
        </div>
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 pl-5">
            {metadata.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>

      {/* Image Block */}
      {(metadata.darkImage || metadata.lightImage) && (
        <div className="border-b bg-background p-3">
          <TerminalCommand className="mb-2">$ cat cover.png</TerminalCommand>
          <ThemeImage
            darkSrc={metadata.darkImage}
            lightSrc={metadata.lightImage}
            alt={metadata.title}
            width={1200}
            height={630}
            className="w-full"
            priority
          />
        </div>
      )}

      {/* Content Block */}
      <div className="bg-background">
        <div className="px-3 py-2 border-b bg-muted/20">
          <TerminalPath>$ cat content.md | render</TerminalPath>
        </div>
        <article className="w-full leading-relaxed p-4">
          <Post />
        </article>
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-center">
        <BackButton href="/blogs" label="← cd /blogs" />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getMDXSlugs("blogs");
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export const dynamicParams = false;
