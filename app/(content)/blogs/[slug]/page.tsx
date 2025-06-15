import { getMDXSlugs } from "@/lib/mdx"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, metadata } = await import(`@/content/blogs/${slug}.mdx`)

  return <Post />
}

export async function generateStaticParams() {
  const slugs = await getMDXSlugs("blogs")
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export const dynamicParams = false
