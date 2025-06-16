import { getMDXSlugs } from "@/lib/mdx"
import { TableOfContents } from '@/components/mdx/toc';
import { SeeAllBlogs } from "@/components/blog/see-all-blogs";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, metadata, toc } = await import(`@/content/blogs/${slug}.mdx`)
  // console.log("Post metadata:", metadata)
  console.log("Post TOC:", JSON.stringify(toc, null, 2))

  return (
    <div className="relative flex flex-col md:flex-row gap-4">
      <div className="absolute left-[-200px] top-2 hidden lg:inline-flex">
        <SeeAllBlogs />
      </div>
      <aside className="hidden text-sm min-[1400px]:inline-flex">
        <div className="fixed top-28 right-[95px] h-full z-50">
          <TableOfContents toc={toc} />
        </div>
      </aside>

      <article>
        <Post />
      </article>
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
