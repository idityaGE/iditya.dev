# Architecture

## Overview

This is a **Next.js 15 App Router** personal portfolio and blog site (iditya.dev) built with React 19, TypeScript (strict mode), and Tailwind CSS 4. The codebase follows a **feature-based module architecture** where domain-specific logic (home, blog, project) lives in `features/`, shared UI primitives live in `components/`, and configuration is centralized in `config/`.

Key architectural decisions:
- **Server-first rendering**: Pages and layouts are server components by default. Client components are explicitly marked with `"use client"`.
- **MDX as content layer**: Blog posts and project descriptions are `.mdx` files in `content/`, processed at build time via `@next/mdx` with remark/rehype plugins.
- **Static generation with dynamic data**: Blog and project slug pages use `generateStaticParams()` with `dynamicParams = false` for fully static output. External data (GitHub contributions, LeetCode stats, Notion todo) is fetched server-side with revalidation.
- **Terminal/hacker aesthetic**: The entire UI uses a consistent terminal-inspired visual language with monospace fonts, green accents, traffic-light dots, and `$ command` style headers.

## Routing & Pages

### Route Groups

The app uses two route groups to separate concerns:

| Route Group | Purpose | Layout |
|-------------|---------|--------|
| `(main)` | User-facing pages | Has `BorderContainer`, `Footer`, max-w-3xl centered layout |
| `(rss)` | RSS/Atom/JSON feed endpoints | No layout (raw API responses) |

### Page Routes

```
/                           → app/(main)/page.tsx          (Home: Hero + Bento grid + Experience)
/blogs                      → app/(main)/blogs/page.tsx    (Blog listing, server component)
/blogs/[slug]               → app/(main)/blogs/[slug]/page.tsx  (Individual blog post, static)
/projects                   → app/(main)/projects/page.tsx (Project listing from config)
/projects/[slug]            → app/(main)/projects/[slug]/page.tsx (Individual project, static)
/pow                        → app/(main)/pow/page.tsx      (Proof of Work categories)
/pow/web-3                  → app/(main)/pow/web-3/page.tsx (Web3 PoW items)
/todo                       → app/(main)/todo/page.tsx     (Notion-synced todo, force-dynamic)
/rss                        → app/(main)/rss/page.tsx      (RSS feed discovery page)
```

### API & Feed Routes

```
/rss.xml                    → app/(rss)/rss.xml/route.ts         (Combined RSS feed)
/atom.xml                   → app/(rss)/atom.xml/route.ts        (Combined Atom feed)
/rss.json                   → app/(rss)/rss.json/route.ts        (Combined JSON feed)
/blogs/rss.xml              → app/(rss)/blogs/rss.xml/route.ts   (Blog-only RSS feed)
/projects/rss.xml           → app/(rss)/projects/rss.xml/route.ts (Project-only RSS feed)
/api/og?url=...             → app/api/og/route.ts                 (OG metadata proxy API)
```

### Dynamic Routes

- `blogs/[slug]` and `projects/[slug]` use `generateStaticParams()` to enumerate all MDX files at build time via `getMDXSlugs()`.
- Both set `dynamicParams = false`, meaning unmatched slugs return 404 without a server round-trip.

### SEO Routes

- `app/robots.ts` - Generates `robots.txt` allowing all crawlers, linking to sitemap.
- `app/sitemap.ts` - Generates XML sitemap with static routes (`/`, `/about`, `/projects`, `/blogs`) and dynamic routes for every blog/project slug.

## Data Flow

### Content Pipeline (MDX)

```
content/blogs/*.mdx          content/projects/*.mdx
        |                              |
        v                              v
  @next/mdx (build time)        @next/mdx (build time)
  remark-frontmatter             remark-frontmatter
  remark-mdx-frontmatter         remark-mdx-frontmatter
  remark-gfm                     remark-gfm
  remark-mdx-toc                 rehype-highlight
  rehype-highlight
        |                              |
        v                              v
  export { metadata, toc,       export { metadata,
           default: Post }              default: ProjectMDX }
        |                              |
        v                              v
  Consumed via dynamic import:   Consumed via dynamic import:
  import(`@/content/blogs/${slug}.mdx`)
```

Each MDX file exports:
- `metadata` - Frontmatter as a JS object (via `remark-mdx-frontmatter`)
- `toc` - Auto-generated table of contents (via `remark-mdx-toc`, blogs only)
- `default` - The rendered React component

### Data Fetching Patterns

| Source | Fetcher | Caching Strategy | Used By |
|--------|---------|------------------|---------|
| MDX files (blogs) | `lib/mdx.ts` → `getAllBlogPostsMeta()` | Build-time static | Blog listing, RSS, Command menu |
| MDX files (projects) | `config/project.config.ts` → `ProjectData` | Static config array | Project listing, RSS, Command menu |
| GitHub contributions | `features/home/data/gh-contribution.ts` | `fetch` with `revalidate: 86400` (1 day) | Home bento grid |
| LeetCode stats | `features/home/data/lc-stats.ts` | `unstable_cache` with `revalidate: 86400` | Home bento grid |
| Notion todo page | `server/notion-to-mdx.ts` | `revalidate = 300` (5 min), `force-dynamic` | Todo page |
| OG metadata (external URLs) | `app/api/og/route.ts` | None (on-demand proxy) | OgLink MDX component |

### Server Actions

- `server/notion-to-mdx.ts` is marked `'use server'` and uses the `@notionhq/client` + `notion-to-md` to convert a Notion page to MDX string, which is then rendered client-side via `next-mdx-remote-client`.

## Layout Hierarchy

```
app/layout.tsx (Root Layout)
├── <html lang="en">
├── <head> - RSS feed links, Google Fonts (Bitcount Grid Double), meta verification
├── <body> - Font variables (Inter + JetBrains Mono), antialiased
│   ├── ThemeProvider (next-themes, default: "dark")
│   │   ├── ThemeColor (meta tag updater)
│   │   ├── Navbar (fixed, centered, max-w-3xl)
│   │   │   ├── Logo ("→ iditya")
│   │   │   ├── CommandMenuWrapper (server component fetching blog/project data)
│   │   │   │   └── CommandMenu (client: cmdk dialog)
│   │   │   ├── DesktopLinks (/projects, /blogs, /pow)
│   │   │   ├── ModeToggle (theme switcher with View Transitions API)
│   │   │   └── MobileDropdown
│   │   └── {children}
│   └── Analytics (@vercel/analytics)
│
├── app/(main)/layout.tsx (Main Group Layout)
│   ├── BorderContainer (max-w-3xl, border-x, min-h-screen)
│   │   ├── {children} (mt-12 to clear fixed navbar)
│   │   └── Footer (social links, sitemap, status)
│
├── app/(rss)/ (No layout - route handlers only)
│
└── app/api/ (No layout - API route handlers)
```

### Special Pages

- `app/not-found.tsx` - Custom 404 page with "Return home" button.
- `app/global-error.tsx` - Client component error boundary with dev/prod error display.
- `app/loading.tsx` - Spinner shown during route transitions.

## Key Abstractions

### 1. MDX Content System

The MDX system has three layers:

- **Build-time processing** (`next.config.ts`): `@next/mdx` with remark plugins extracts frontmatter as `metadata`, generates `toc`, and applies syntax highlighting.
- **Component mapping** (`mdx-components.tsx`): Maps all HTML elements to styled React components with the terminal aesthetic. Provides custom components: `Callout`, `YouTube`, `CommandBtn`, `OgLink`, `Image`, `MorphingImage`.
- **Content utilities** (`lib/mdx.ts`): `getMDXSlugs()` reads the filesystem to list content files. `getAllBlogPostsMeta()` dynamically imports each MDX file's metadata, filters by `published: true`, and sorts by date.

### 2. Theme System

- `components/theme/theme-provider.tsx` - Wraps `next-themes` with a `ThemeColor` helper that dynamically updates the `<meta name="theme-color">` tag.
- `components/theme/theme-toggle.tsx` - Uses the **View Transitions API** for animated theme switches with a circular clip-path expansion. Falls back to instant swap. Supports keyboard shortcut `D`.
- `components/theme/theme-image.tsx` - Renders two `<Image>` elements (dark/light) toggled via CSS `dark:hidden` / `dark:block` classes.

### 3. Command Menu (cmdk)

- `components/cmdk/command-menu-wrapper.tsx` - Server component that fetches blog/project data at render time.
- `components/cmdk/index.tsx` - Client component using `cmdk` library. Provides keyboard-navigable search across: pages, blogs, projects, theme toggle, resume download, social links, share/copy URL. Opens with `Ctrl+K` / `Cmd+K`.

### 4. Feature Modules

Each feature encapsulates its own components and data:

- `features/home/` - Hero section, Bento grid (6 cards: projects, connect, skills, blogs, GitHub contributions, LeetCode stats), Experience section.
- `features/blog/` - BlogCard (listing card), BackButton (navigation).
- `features/project/` - ProjectCard (with image carousel), project-card-utils (helper functions).

### 5. RSS Feed System

`lib/rss.ts` provides a composable feed generation system:
- `createBaseFeed()` - Shared base with site metadata.
- `addBlogPostsToFeed()` / `addProjectsToFeed()` - Add items with optional category prefixes.
- `generateBlogsFeed()`, `generateProjectsFeed()`, `generateCombinedFeed()` - Compose feeds.
- `formatFeedResponse()` - Formats as RSS2, Atom, or JSON with correct content types.

### 6. Configuration System

Three config files centralize all site data:
- `config/site.config.ts` - Site name, URLs, SEO metadata, OG images, favicons.
- `config/personal.config.ts` - Personal info, education, experience, social links, skills, `BASE_URL`, `GITHUB_USERNAME`, `LEETCODE_USERNAME`.
- `config/project.config.ts` - Array of project objects with title, description, images, links, tech stack, slug.

### 7. UI Component Libraries

Three tiers of UI components:
- **shadcn/ui** (`components/ui/`): Base primitives (Button, Card, Dialog, Tooltip, Table, etc.) from the new-york style, stone base color variant.
- **Magic UI** (`components/ui/magicui/`): Enhanced components (BentoGrid, ScrollProgress, ScriptCopyBtn).
- **Kibo UI** (`components/ui/kibo-ui/`): Specialized components (ContributionGraph for GitHub activity).

## Entry Points

### Application Entry
- `app/layout.tsx` - Root layout; the true entry point for all pages. Sets up HTML structure, fonts, theme provider, navbar, and analytics.

### Build Configuration
- `next.config.ts` - Next.js config with MDX support, image remote patterns, and page extensions.
- `tsconfig.json` - TypeScript strict mode with `@/*` path alias.
- `postcss.config.mjs` - Tailwind CSS 4 via `@tailwindcss/postcss`.
- `components.json` - shadcn/ui configuration (new-york style, stone base, with Magic UI and Kibo UI registries).

### Content Entry Points
- `content/blogs/*.mdx` - Blog posts (6 files).
- `content/projects/*.mdx` - Project detail pages (11 files).
- `mdx-components.tsx` - Global MDX component overrides.

### Data Entry Points
- `config/project.config.ts` - Static project data (the source of truth for project listings).
- `config/personal.config.ts` - Personal data, experience, links.
- `server/notion-to-mdx.ts` - Notion API integration for the todo page.

### Deployment
- `vercel.json` - Disables deployment on `dev` branch.
- `.husky/pre-push` - Runs `pnpm build` before pushing to catch errors.
