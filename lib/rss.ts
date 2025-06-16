import { Feed } from 'feed';
import { siteConfig } from "@/config/site.config";
import { getAllBlogPostsMeta } from '@/lib/mdx';
import { ProjectData } from '@/config/project.config';

/**
 * Creates a base feed with common settings
 */
export function createBaseFeed(options: {
  title: string;
  description: string;
  path: string;
}) {
  return new Feed({
    title: options.title,
    description: options.description,
    id: `${siteConfig.siteUrl}/${options.path}`,
    link: `${siteConfig.siteUrl}/${options.path}`,
    image: siteConfig.favicon.apple,
    favicon: `${siteConfig.siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.creator.name}`,
    feedLinks: {
      rss2: `${siteConfig.siteUrl}/${options.path}/rss.xml`,
      json: `${siteConfig.siteUrl}/${options.path}/rss.json`,
      atom: `${siteConfig.siteUrl}/${options.path}/atom.xml`
    },
    author: {
      name: siteConfig.creator.name,
      email: siteConfig.creator.email,
      link: siteConfig.creator.url
    }
  });
}

/**
 * Adds blog posts to a feed
 */
export async function addBlogPostsToFeed(feed: Feed, options: { addCategoryPrefix?: boolean } = {}) {
  const blogs = await getAllBlogPostsMeta();
  
  blogs.forEach(blog => {
    if (!blog) return;
    
    feed.addItem({
      title: options.addCategoryPrefix ? `[Blog] ${blog.title}` : blog.title,
      id: `${siteConfig.siteUrl}/blogs/${blog.slug}`,
      link: `${siteConfig.siteUrl}/blogs/${blog.slug}`,
      description: blog.excerpt,
      content: blog.excerpt,
      author: [
        {
          name: blog.author || siteConfig.creator.name,
          email: siteConfig.creator.email,
          link: siteConfig.creator.url
        }
      ],
      date: new Date(blog.date),
      image: blog.coverImage,
      category: options.addCategoryPrefix ? [{ name: "Blog" }] : undefined,
    });
  });
}

/**
 * Adds projects to a feed
 */
export function addProjectsToFeed(feed: Feed, options: { addCategoryPrefix?: boolean } = {}) {
  ProjectData.forEach(project => {
    feed.addItem({
      title: options.addCategoryPrefix ? `[Project] ${project.title}` : project.title,
      id: `${siteConfig.siteUrl}/projects/${project.slug}`,
      link: `${siteConfig.siteUrl}/projects/${project.slug}`,
      description: project.description,
      content: project.description,
      author: [
        {
          name: siteConfig.creator.name,
          email: siteConfig.creator.email,
          link: siteConfig.creator.url
        }
      ],
      date: new Date(), // Since projects don't have dates, use current date
      image: project.images?.[0],
      category: options.addCategoryPrefix 
        ? [{ name: "Project" }, ...project.techStack.map(tech => ({ name: tech }))]
        : project.techStack.map(tech => ({ name: tech })),
    });
  });
}

/**
 * Generates a blogs-only feed
 */
export async function generateBlogsFeed() {
  const feed = createBaseFeed({
    title: `${siteConfig.name} Blogs`,
    description: "Hey! I am Adi (Aditya), and this is my personal blog where I share my learnings, experiences, and thoughts on different topics.",
    path: "blogs"
  });
  
  await addBlogPostsToFeed(feed);
  
  return feed;
}

/**
 * Generates a projects-only feed
 */
export function generateProjectsFeed() {
  const feed = createBaseFeed({
    title: `${siteConfig.name} Projects`,
    description: "Check out my latest projects. This feed includes personal projects, freelance work, and other development work I've done.",
    path: "projects"
  });
  
  addProjectsToFeed(feed);
  
  return feed;
}

/**
 * Generates a combined feed with both blogs and projects
 */
export async function generateCombinedFeed() {
  const feed = createBaseFeed({
    title: siteConfig.name,
    description: siteConfig.description,
    path: ""
  });
  
  // Add blogs and projects with category prefixes
  await addBlogPostsToFeed(feed, { addCategoryPrefix: true });
  addProjectsToFeed(feed, { addCategoryPrefix: true });
  
  return feed;
}

/**
 * Returns a properly formatted response for the requested feed format
 */
export function formatFeedResponse(feed: Feed, format: 'rss' | 'atom' | 'json') {
  let content: string;
  let contentType: string;
  
  switch (format) {
    case 'atom':
      content = feed.atom1();
      contentType = 'application/atom+xml; charset=utf-8';
      break;
    case 'json':
      content = feed.json1();
      contentType = 'application/json; charset=utf-8';
      break;
    case 'rss':
    default:
      content = feed.rss2();
      contentType = 'application/rss+xml; charset=utf-8';
      break;
  }
  
  return new Response(content, {
    headers: {
      'Content-Type': contentType,
    }
  });
}
