import { getMDXSlugs } from "@/lib/mdx"
import { TableOfContents } from '@/components/mdx/toc';
import { SeeAllBlogs } from "@/components/blog/see-all-blogs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

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

        <article className="w-full">
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
