import fs from 'fs';
import path from 'path';
import type { BlogPostMeta } from '@/types';


type BlogPostMetaWithSlug = BlogPostMeta & {
  slug: string
}

export async function getMDXSlugs(folder: string) {
  const postsDirectory = path.join(process.cwd(), `content/${folder}`);
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Blog posts directory not found: ${postsDirectory}`);
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export async function getBlogPostMetaBySlug(slug: string): Promise<BlogPostMetaWithSlug | null> {
  try {
    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);
    if (!metadata) {
      console.warn(`No metadata found for ${slug}`);
      return null;
    }

    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      tags: metadata.tags || [],
      author: metadata.author || "",
      excerpt: metadata.excerpt || '',
      coverImage: metadata.coverImage || "",
      published: metadata.published || false
    };
  } catch (error) {
    console.error(`Failed to load metadata for ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogPostsMeta() {
  const slugs = await getMDXSlugs("blogs");
  const posts = await Promise.all(
    slugs.map(async (slug) => await getBlogPostMetaBySlug(slug))
  );

  return posts
    .filter((post): post is BlogPostMetaWithSlug => post !== null && post.published == true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
