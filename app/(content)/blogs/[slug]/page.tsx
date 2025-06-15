import { getMDXSlugs } from "@/lib/mdx"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, metadata, toc } = await import(`@/content/blogs/${slug}.mdx`)
  // console.log("Post metadata:", metadata)
  // console.log("Post TOC:", toc[0].children)

  return <Post />
}

export async function generateStaticParams() {
  const slugs = await getMDXSlugs("blogs")
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export const dynamicParams = false
