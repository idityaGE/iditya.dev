import { getBlogPostSlugs } from "@/lib/mdx"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  console.log('slug', slug)
  const { default: Post, metadata } = await import(`@/content/blogs/${slug}.mdx`)
  console.log('metadata', metadata)

  return <Post />
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export const dynamicParams = false
