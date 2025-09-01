import { getMDXSlugs } from "@/lib/mdx"
import { TableOfContents } from '@/components/mdx/toc';
import { SeeAllBlogs } from "@/components/blog/see-all-blogs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
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
      type: 'article',
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
      card: 'summary',
      title: `${metadata.title} | ${siteConfig.name}`,
      description: metadata.excerpt || metadata.description,
      site: "@" + siteConfig.links.x.split('/').at(-1) || '@idityage',
      creator: "@" + siteConfig.links.x.split('/').at(-1) || '@idityage',
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
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, metadata, toc } = await import(`@/content/blogs/${slug}.mdx`)

  return (
    <div className="relative flex flex-col md:flex-row gap-4">
      <div className="absolute left-[-200px] top-2 hidden lg:inline-flex">
        <SeeAllBlogs />
      </div>
      <aside className="hidden text-sm min-[1400px]:inline-flex">
        <div className="fixed top-28 right-[75px] h-full z-50">
          <TableOfContents toc={toc} />
        </div>
      </aside>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-col items-start gap-2 mb-6">
          <p className="px-3 py-1.5 font-semibold rounded text-xs bg-secondary inline-block self-start mb-2">
            {new Date(metadata.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-extrabold mb-4">{metadata.title}</h1>
          {metadata.coverImage && (
            <Image
              src={metadata.coverImage}
              alt={metadata.title}
              width={1200}
              height={630}
              className="w-full rounded-lg mb-6"
            />
          )}
        </div>

        <Separator />

        <article className="w-full md:text-lg leading-relaxed mt-4">
          <Post />
        </article>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await getMDXSlugs("blogs")
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export const dynamicParams = false
