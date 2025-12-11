# Copilot Instructions for nextport

## Project Overview
This is a Next.js 15 personal portfolio and blog site with MDX-powered content. Built with TypeScript, Tailwind CSS 4, and shadcn/ui components, featuring RSS feeds, OG image generation, and theme switching.

## Architecture

### Content Management (MDX-First)
- **Blog & Project content**: MDX files in `/content/blogs/` and `/content/projects/`
- **Frontmatter structure**: Each MDX file exports `metadata` object with fields defined in `/types/index.ts` (`BlogPostMeta`, `ProjectCardProps`)
- **MDX processing**: Configured in `next.config.ts` with plugins:
  - `remark-mdx-frontmatter` (exports metadata as named export)
  - `remark-mdx-toc` (exports table of contents as `toc`)
  - `remark-gfm` (GitHub Flavored Markdown)
  - `rehype-highlight` (syntax highlighting)
- **Custom MDX components**: Defined in `mdx-components.tsx` including `Callout`, `YouTube`, `CommandBtn`, `OgLink`, and styled native elements
- **Content utilities**: Use `lib/mdx.ts` functions:
  - `getMDXSlugs(folder)` - Get all MDX file slugs
  - `getBlogPostMetaBySlug(slug)` - Get metadata for specific blog
  - `getAllBlogPostsMeta()` - Get all published blogs sorted by date

### Routing Structure
- `(landing)` group: Main site pages with shared layout
  - `/` - Hero + Bento grid
  - `/blogs` - Blog listing
  - `/blogs/[slug]` - Dynamic blog post pages
  - `/projects` - Project listing
  - `/projects/[slug]` - Dynamic project pages
- `(rss)` group: RSS feed routes (`/rss.xml`, `/atom.xml`, `/rss.json`, `/blogs/rss.xml`, `/projects/rss.xml`)
- `/api/og/route.ts` - OG image generation

### Configuration Pattern
Centralized config files in `/config/` (all `.config.ts`):
- `site.config.ts` - Site metadata, SEO, social links
- `personal.config.ts` - Personal information (exported as `PersonalData`)
- `links.config.ts` - Social/contact links (exported as `LinkData`)
- `project.config.ts` - Project data (exported as `ProjectData`)
- `education.config.ts`, `skill.config.ts` - Additional structured data

**When adding new features**: Check if config data exists in these files before hardcoding values.

### Component Organization
- `/components/landing/` - Landing page components (Hero, Bento grid, cards)
- `/components/blog/` - Blog-specific UI (BackButton, BlogCard)
- `/components/mdx/` - MDX custom components (Callout, Code, YouTube, TableOfContents)
- `/components/magicui/` - Magic UI components (Globe, IconCloud, Dock, Ripple, ScrollProgress)
- `/components/ui/` - shadcn/ui components (Button, Card, Dialog, etc.)
- `/components/theme/` - Theme provider and toggle

### Styling Conventions
- **Tailwind CSS 4** with CSS variables for theming
- **Font setup**: Inter (sans) and JetBrains Mono (mono) via `next/font/google`
- **Color system**: Uses CSS variables from `styles/globals.css` (--background, --foreground, --primary, --secondary, etc.)
- **shadcn/ui**: Configured in `components.json` with "new-york" style, imports from `@magicui` registry
- **Utility imports**: Use `@/lib/utils` for `cn()` (class merging with tailwind-merge)

## Development Workflows

### Running the Project
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Adding New Content

**New Blog Post**:
1. Create `/content/blogs/my-slug.mdx`
2. Add frontmatter with all `BlogPostMeta` fields (see `types/index.ts`)
3. Set `published: true` to make it visible
4. Blog will auto-appear on `/blogs` page and RSS feeds

**New Project**:
1. Create `/content/projects/my-slug.mdx`
2. Add frontmatter matching `ProjectCardProps` interface
3. Add to `ProjectData` array in `config/project.config.ts`

### Working with MDX
- Import MDX content: `const { default: Post, metadata, toc } = await import('@/content/blogs/${slug}.mdx')`
- Access exported metadata/toc directly (processed by remark plugins)
- Custom components available: `<Callout>`, `<YouTube videoId="">`, `<CommandBtn cmd="">`, `<OgLink url="">`
- Code blocks: Automatically highlighted with rehype-highlight

### RSS Feed Generation
- RSS utilities in `lib/rss.ts` using the `feed` package
- Use `createBaseFeed()` and `addBlogPostsToFeed()` / `addProjectsToFeed()`
- Generates RSS 2.0, Atom, and JSON Feed formats
- Routes in `app/(rss)/*/route.ts` export `GET()` functions returning RSS strings

## TypeScript & Aliases
- Path alias `@/*` maps to project root
- Strict mode enabled
- All types in `/types/index.ts`
- Use `Metadata` from `next/types` for page metadata

## Key Integration Points
- **Vercel Analytics**: Configured in root layout (`@vercel/analytics/next`)
- **Theme**: `next-themes` with system/light/dark modes, provider in root layout
- **LeetCode Stats**: `utils/lc-stats.ts` fetches LeetCode data (used in landing cards)
- **Notion Integration**: `server/notion-to-mdx.ts` for optional Notion import (not in main flow)

## Conventions to Follow
1. **File naming**: kebab-case for files, PascalCase for React components
2. **Imports**: Use `@/` prefix for absolute imports
3. **Async components**: Server components in `app/` are async by default
4. **Params**: Next.js 15 `params` are promises, always await them
5. **Metadata generation**: Export `generateMetadata()` async function for dynamic pages
6. **Type exports**: Export types from component files when needed by other modules

## Common Patterns

**Dynamic blog/project pages**:
```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/blogs/${slug}.mdx`);
  // return Metadata object
}
```

**Config-driven UI**:
```tsx
import { LinkData } from "@/config/links.config";
<a href={LinkData.twitter}>@{LinkData.twitter.split("/").pop()}</a>
```

**Custom MDX styling**: See `mdx-components.tsx` for style objects applied to native HTML elements.

---

For questions about specific implementations, check the respective files in the structure above.
