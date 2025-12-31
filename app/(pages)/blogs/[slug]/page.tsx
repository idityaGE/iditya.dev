import { getMDXSlugs } from "@/lib/mdx";
import { TableOfContents } from "@/components/mdx/toc";
import { BackButton } from "@/components/back-button";
import Image from "next/image";
import type { Metadata } from "next/types";
import { siteConfig } from "@/config/site.config";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

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
          url: metadata.coverImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${metadata.title} | ${siteConfig.name}`,
      description: metadata.excerpt || metadata.description,
      site: "@" + siteConfig.links.x.split("/").at(-1) || "@idityage",
      creator: "@" + siteConfig.links.x.split("/").at(-1) || "@idityage",
      images: [
        {
          url: metadata.coverImage || siteConfig.ogImage,
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
  const {
    default: Post,
    metadata,
    toc,
  } = await import(`@/content/blogs/${slug}.mdx`);

  return (
    <div className="flex flex-col">
      <ScrollProgress className="min-[1400px]:hidden" />
      <div className="fixed top-24 border-y border-l px-4 py-2 right-[calc(50%+24rem)] z-50 hidden lg:inline-flex">
        <BackButton href="/blogs" label="SEE ALL BLOGS" />
      </div>
      <aside className="hidden text-sm min-[1400px]:inline-flex">
        <div className="fixed top-24 left-[calc(50%+24rem)] z-50 border-y border-r p-4">
          <ScrollProgress
            orientation="vertical"
            className="left-[calc(49.9%+24rem)]"
          />
          <TableOfContents toc={toc} />
        </div>
      </aside>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-col items-start gap-2 mb-4 px-4">
          <p className="px-3 py-1.5 font-semibold border text-xs bg-secondary inline-block self-start mb-2">
            {new Date(metadata.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1 className="text-4xl mb-2 font-grid">{metadata.title}</h1>
          {metadata.coverImage && (
            <Image
              src={metadata.coverImage}
              alt={metadata.title}
              width={1200}
              height={630}
              className="w-full rounded-lg mb-2"
            />
          )}
        </div>

        <div
          className="h-8 border-y w-full"
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

        <article className="w-full leading-relaxed mt-4 px-4">
          <Post />
        </article>
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
