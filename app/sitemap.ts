import type { MetadataRoute } from 'next'
import { getMDXSlugs } from '@/lib/mdx'
import { BASE_URL } from '@/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ]

  const [blogs, projects] = await Promise.all([getMDXSlugs("blogs"), getMDXSlugs("projects")])

  const dynamicRoutes = [
    ...blogs.map(slug => ({
      url: `${BASE_URL}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...projects.map(slug => ({
      url: `${BASE_URL}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
