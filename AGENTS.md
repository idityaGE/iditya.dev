# AGENTS.md - Coding Agent Guidelines

## Project Overview

This is a **Next.js 15 personal portfolio/blog** built with:
- **Framework**: Next.js 15.3 (App Router) with React 19
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 4 + shadcn/ui (new-york style, stone base color)
- **Content**: MDX with remark/rehype plugins
- **Package Manager**: Bun (preferred) or pnpm
- **Deployment**: Vercel

---

## Build/Lint/Test Commands

```bash
# Development
bun dev              # Start dev server (or: pnpm dev)

# Production
bun build            # Build for production
bun start            # Start production server

# Linting
bun lint             # Run Next.js ESLint

# No test framework configured
# To run a single test: N/A (no tests exist)
```

### Pre-push Hook
The `.husky/pre-push` hook runs `pnpm build` before pushing. Ensure builds pass locally.

### Environment Variables
Required in `.env`:
- `NOTION_TOKEN` - Notion API integration token

---

## Project Structure

```
app/                    # Next.js App Router pages
  (main)/               # Main route group (blogs, projects, pow, todo)
  (rss)/                # RSS feed endpoints (atom.xml, rss.xml, rss.json)
  api/og/               # Open Graph metadata API
  layout.tsx            # Root layout with theme, fonts, metadata
components/
  ui/                   # Base UI components (shadcn/ui primitives)
    kibo-ui/            # Kibo UI components
    magicui/            # Magic UI components
  content/              # MDX content components (Callout, Code, YouTube)
  layout/               # Layout components (navbar, footer)
  theme/                # Theme provider and toggle
config/                 # Site, personal, and project configuration
content/
  blogs/                # MDX blog posts
  projects/             # MDX project descriptions
features/               # Feature-based modules
  blog/components/      # Blog-specific components
  home/components/      # Home page components
  home/data/            # Data fetching (GitHub, LeetCode)
  project/              # Project-specific components
hooks/                  # Custom React hooks
lib/                    # Utilities (cn, mdx helpers, rss generation)
types/                  # TypeScript type definitions
styles/globals.css      # Global styles and CSS variables
```

---

## Code Style Guidelines

### Imports

Order imports as follows:
1. External libraries (react, next, third-party)
2. Internal imports using `@/*` path alias
3. Relative imports (if necessary)

```typescript
// External
import { useEffect, RefObject } from "react";
import type { Metadata } from "next/types";
import { FileText } from "lucide-react";

// Internal (use @/* alias)
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { BlogPostMeta } from "@/types";
```

Use `import type` for type-only imports:
```typescript
import type { NextConfig } from "next";
import type { BlogPostMeta } from "@/types";
```

### Formatting

- **Indentation**: 2 spaces
- **Quotes**: Double quotes for strings
- **Semicolons**: Required
- **Trailing commas**: Use in multiline arrays/objects
- **Line length**: ~100 characters (soft limit)

### TypeScript

- Strict mode is enabled - do not use `any` unless absolutely necessary
- Define interfaces in `types/index.ts` for shared types
- Use inline types for component-specific props
- Prefer `interface` for object shapes, `type` for unions/intersections

```typescript
// In types/index.ts
export interface BlogPostMeta {
  title: string;
  date: string;
  tags: string[];
  published: boolean;
}

// Inline for component props
const Button = ({ variant, size }: { variant: string; size: string }) => { ... }
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `Hero`, `BlogCard`, `ThemeProvider` |
| Files (components) | kebab-case | `blog-card.tsx`, `theme-provider.tsx` |
| Files (pages) | kebab-case or `page.tsx` | `page.tsx`, `layout.tsx` |
| Functions | camelCase | `getBlogPostMetaBySlug`, `generateSlug` |
| Variables | camelCase | `fontSans`, `siteConfig` |
| Constants | camelCase or UPPER_SNAKE | `siteConfig`, `GITHUB_USERNAME` |
| Interfaces/Types | PascalCase | `BlogPostMeta`, `ProjectCardProps` |
| Hooks | camelCase with `use` prefix | `useClickOutside` |

### Components

- Use **arrow functions** for components
- Use **default export** for pages, **named exports** for components
- Add `"use client"` directive at the top for client components
- Destructure props with TypeScript types

```typescript
// Server Component (default)
export const Hero = () => {
  return <div>...</div>;
};

// Client Component
"use client";

import { useState } from "react";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState("dark");
  return <button className={className}>...</button>;
};

// Page Component
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>...</div>;
}
```

### Error Handling

- Use try-catch blocks with `console.error` for logging
- Return `null` or empty arrays for missing/invalid data
- Provide user-friendly error messages in production

```typescript
export async function getBlogPostMetaBySlug(slug: string) {
  try {
    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);
    if (!metadata) {
      console.warn(`No metadata found for ${slug}`);
      return null;
    }
    return { slug, ...metadata };
  } catch (error) {
    console.error(`Failed to load metadata for ${slug}:`, error);
    return null;
  }
}
```

### Styling

- Use **Tailwind CSS** classes with the `cn()` utility for conditional classes
- Use **CSS variables** defined in `styles/globals.css` for theming
- Follow shadcn/ui patterns for new UI components

```typescript
import { cn } from "@/lib/utils";

const Card = ({ className, variant }: { className?: string; variant?: string }) => (
  <div className={cn(
    "bg-background border p-4",
    variant === "highlight" && "border-green-500",
    className
  )}>
    ...
  </div>
);
```

---

## Key Patterns

### Data Fetching

Use server components with async/await. For caching:

```typescript
// With fetch + revalidate
const res = await fetch(url, { next: { revalidate: 86400 } });

// With unstable_cache
import { unstable_cache } from "next/cache";

export const getCachedData = unstable_cache(
  async (id: string) => { /* fetch logic */ },
  ["cache-key"],
  { revalidate: 86400 }
);
```

### Adding shadcn/ui Components

```bash
bunx shadcn@latest add button    # Add from shadcn registry
bunx shadcn@latest add @magicui/bento-grid  # Add from Magic UI registry
```

### MDX Content

Blog posts go in `content/blogs/` with frontmatter:

```mdx
export const metadata = {
  title: "Post Title",
  date: "2024-01-15",
  tags: ["react", "nextjs"],
  author: "Author Name",
  excerpt: "Short description",
  darkImage: "/images/blogs/post-dark.png",
  lightImage: "/images/blogs/post-light.png",
  published: true,
};

# Content starts here...
```

### Theme Support

Use `next-themes` with the `ThemeProvider`. Access theme with `useTheme()` hook in client components.

---

## Common Tasks

### Add a New Blog Post
1. Create `content/blogs/your-post-slug.mdx`
2. Add frontmatter with `published: true`
3. Write MDX content using available components (Callout, YouTube, OgLink)

### Add a New UI Component
1. Check if shadcn/ui has it: `bunx shadcn@latest add [component]`
2. Or create in `components/ui/` following existing patterns
3. Use `cn()` for class merging, Radix primitives for accessibility

### Add a New Feature
1. Create feature folder in `features/[feature-name]/`
2. Add `components/` and optionally `data/` subdirectories
3. Export components and use in `app/` pages
