import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPostMeta } from '@/types/mdx';

const postsDirectory = path.join(process.cwd(), 'content/blogs');

export async function getBlogPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Blog posts directory not found: ${postsDirectory}`);
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export async function getBlogPostMetaBySlug(slug: string): Promise<BlogPostMeta | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = await processMDX(fileContent);
  return {
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    author: data.author || "",
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || "",
  };
}

export async function getAllBlogPostsMeta() {
  const slugs = await getBlogPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getBlogPostMetaBySlug(slug))
  );

  return posts
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function processMDX(source: string) {
  const { data } = matter(source);
  return data
}
