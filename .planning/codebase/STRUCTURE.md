# Project Structure

## Directory Tree

```
nextport/
├── app/                              # Next.js App Router (pages, layouts, routes)
│   ├── layout.tsx                    # Root layout (fonts, theme, navbar, analytics)
│   ├── loading.tsx                   # Global loading spinner
│   ├── not-found.tsx                 # Custom 404 page
│   ├── global-error.tsx              # Global error boundary (client component)
│   ├── robots.ts                     # robots.txt generation
│   ├── sitemap.ts                    # XML sitemap generation
│   ├── (main)/                       # Route group: user-facing pages
│   │   ├── layout.tsx                # Shared layout with BorderContainer + Footer
│   │   ├── page.tsx                  # Home page (Hero + Bento + Experience)
│   │   ├── blogs/
│   │   │   ├── page.tsx              # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual blog post (SSG)
│   │   ├── projects/
│   │   │   ├── page.tsx              # Project listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual project page (SSG)
│   │   ├── pow/
│   │   │   ├── page.tsx              # Proof of Work categories
│   │   │   └── web-3/
│   │   │       └── page.tsx          # Web3 proof of work items
│   │   ├── todo/
│   │   │   └── page.tsx              # Notion-synced todo list (dynamic)
│   │   └── rss/
│   │       └── page.tsx              # RSS feed discovery page
│   ├── (rss)/                        # Route group: feed endpoints (no layout)
│   │   ├── rss.xml/
│   │   │   └── route.ts             # Combined RSS feed
│   │   ├── atom.xml/
│   │   │   └── route.ts             # Combined Atom feed
│   │   ├── rss.json/
│   │   │   └── route.ts             # Combined JSON feed
│   │   ├── blogs/
│   │   │   └── rss.xml/
│   │   │       └── route.ts         # Blog-only RSS feed
│   │   └── projects/
│   │       └── rss.xml/
│   │           └── route.ts         # Project-only RSS feed
│   └── api/
│       └── og/
│           └── route.ts             # OG metadata proxy (fetches external URLs)
│
├── components/                       # Shared UI components
│   ├── cmdk/                         # Command palette (Ctrl+K)
│   │   ├── command-menu-wrapper.tsx   # Server component: fetches data for menu
│   │   └── index.tsx                 # Client component: cmdk dialog UI
│   ├── content/                      # MDX content rendering components
│   │   ├── callout.tsx               # Callout/admonition blocks
│   │   ├── code.tsx                  # Syntax-highlighted code blocks (Shiki)
│   │   ├── command-btn.tsx           # Copy-to-clipboard command button
│   │   ├── heading-with-anchor.tsx   # Headings with anchor links
│   │   ├── morphing-image.tsx        # Image with morphing dialog preview
│   │   ├── og-link.tsx               # OG metadata link card (fetches /api/og)
│   │   ├── toc.tsx                   # Table of contents sidebar
│   │   └── youtube.tsx               # YouTube embed component
│   ├── layout/                       # Layout components
│   │   ├── border-container.tsx      # Centered max-w-3xl border container
│   │   ├── footer/
│   │   │   └── index.tsx             # Site footer (social links, sitemap, copyright)
│   │   └── navbar/
│   │       ├── index.tsx             # Fixed navbar (logo, links, theme toggle)
│   │       └── mobile-dropdown.tsx   # Mobile navigation menu
│   ├── theme/                        # Theme system
│   │   ├── theme-provider.tsx        # next-themes wrapper + meta theme-color updater
│   │   ├── theme-toggle.tsx          # Animated theme switch (View Transitions API)
│   │   └── theme-image.tsx           # Dark/light image switcher
│   └── ui/                           # Base UI primitives
│       ├── button.tsx                # Button component (shadcn/ui)
│       ├── card.tsx                  # Card component (shadcn/ui)
│       ├── code-snippets.tsx         # Code snippet display
│       ├── command.tsx               # Command component (shadcn/ui + cmdk)
│       ├── dialog.tsx                # Dialog component (shadcn/ui + Radix)
│       ├── dropdown-menu.tsx         # Dropdown menu (shadcn/ui + Radix)
│       ├── kbd.tsx                   # Keyboard shortcut display
│       ├── morphing-dialog.tsx       # Morphing dialog animation
│       ├── skeleton.tsx              # Loading skeleton
│       ├── table.tsx                 # Table components (shadcn/ui)
│       ├── tooltip.tsx               # Tooltip (shadcn/ui + Radix)
│       ├── kibo-ui/                  # Kibo UI extended components
│       │   └── contribution-graph/
│       │       └── index.tsx         # GitHub contribution heatmap graph
│       └── magicui/                  # Magic UI extended components
│           ├── bento-grid.tsx        # Bento grid layout component
│           ├── script-copy-btn.tsx   # Copy-to-clipboard button for code
│           └── scroll-progress.tsx   # Reading progress indicator bar
│
├── config/                           # Centralized configuration
│   ├── site.config.ts                # Site metadata (name, URL, SEO, OG, favicons)
│   ├── personal.config.ts            # Personal data (bio, links, experience, skills)
│   └── project.config.ts             # Project data array (title, tech, images, links)
│
├── content/                          # MDX content files
│   ├── blogs/                        # Blog posts
│   │   ├── daemon.mdx
│   │   ├── docker-beginner.mdx
│   │   ├── intro-to-rust-macros.mdx
│   │   ├── linux-story.mdx
│   │   ├── terraform-localstack.mdx
│   │   └── test.mdx
│   └── projects/                     # Project detail pages
│       ├── assignment-code-to-pdf.mdx
│       ├── blind-chat.mdx
│       ├── bloomknot.mdx
│       ├── exptrack.mdx
│       ├── github-bento-stats.mdx
│       ├── hyperdigital.mdx
│       ├── lst-solana-demo.mdx
│       ├── portfolio.mdx
│       ├── solana-token-launchpad.mdx
│       ├── typecast.mdx
│       └── zapier.mdx
│
├── features/                         # Feature-based modules
│   ├── home/                         # Home page features
│   │   ├── components/
│   │   │   ├── hero.tsx              # Hero section (name, bio, resume link)
│   │   │   ├── experience-card.tsx   # Work experience timeline (client component)
│   │   │   └── bento/               # Bento grid section
│   │   │       ├── index.tsx         # Bento layout definition (6 cards)
│   │   │       └── cards/
│   │   │           ├── blog.tsx      # Latest blogs card
│   │   │           ├── connect.tsx   # Social links card
│   │   │           ├── gh.tsx        # GitHub contributions card (server)
│   │   │           ├── gh-client.tsx # GitHub contributions card (client)
│   │   │           ├── lc/           # LeetCode stats card
│   │   │           ├── project.tsx   # Featured projects card
│   │   │           └── skills.tsx    # Tech stack card
│   │   └── data/
│   │       ├── gh-contribution.ts    # GitHub API fetcher (revalidate: 1 day)
│   │       └── lc-stats.ts           # LeetCode API fetcher (unstable_cache, 1 day)
│   ├── blog/
│   │   └── components/
│   │       ├── blog-card.tsx         # Blog post card for listing pages
│   │       └── back-button.tsx       # Navigation back button
│   └── project/
│       ├── components/
│       │   └── project-card.tsx      # Project card with image carousel
│       └── utils/
│           └── project-card-utils.tsx # Helper utilities for project cards
│
├── hooks/                            # Custom React hooks
│   └── useClickOutside.tsx           # Detect clicks outside a ref element
│
├── lib/                              # Shared utilities
│   ├── mdx.ts                        # MDX helpers (getMDXSlugs, getAllBlogPostsMeta)
│   ├── rss.ts                        # RSS feed generation (blogs, projects, combined)
│   └── utils.ts                      # General utilities (cn, getImageSrc, generateSlug)
│
├── server/                           # Server-only code
│   └── notion-to-mdx.ts             # Notion API → MDX conversion (server action)
│
├── styles/
│   └── globals.css                   # Global CSS: Tailwind imports, CSS variables, themes
│
├── types/
│   └── index.ts                      # Shared TypeScript interfaces
│
├── public/                           # Static assets
│   ├── images/
│   │   └── blogs/                    # Blog post images
│   ├── nn.png                        # Site image
│   └── resume.pdf                    # Downloadable resume
│
├── mdx-components.tsx                # Global MDX component overrides
├── next.config.ts                    # Next.js + MDX configuration
├── tsconfig.json                     # TypeScript configuration (strict, @/* alias)
├── postcss.config.mjs                # PostCSS with Tailwind CSS 4
├── components.json                   # shadcn/ui configuration
├── package.json                      # Dependencies and scripts
├── vercel.json                       # Vercel deployment settings
├── .husky/
│   └── pre-push                      # Git hook: runs build before push
└── .env                              # Environment variables (NOTION_TOKEN)
```

## Key Directories

### `app/`

The Next.js 15 App Router directory. Contains all route definitions.

- **`(main)/`** - The primary route group wrapping all user-facing pages. Applies a shared layout (`layout.tsx`) with `BorderContainer` (centered, bordered content area) and `Footer`. All pages within inherit the max-w-3xl centered design.
- **`(rss)/`** - A separate route group for RSS/Atom/JSON feed endpoints. Contains only `route.ts` files (no layouts or pages). The directory names (`rss.xml`, `atom.xml`, `rss.json`) map directly to feed URLs. Also includes content-specific sub-feeds under `blogs/rss.xml/` and `projects/rss.xml/`.
- **`api/og/`** - A single API route that acts as a server-side proxy to fetch Open Graph metadata from external URLs, used by the `OgLink` MDX component.

### `components/`

Shared, reusable components organized by concern:

- **`cmdk/`** - The command palette system. `command-menu-wrapper.tsx` is a server component that pre-fetches blog and project data, passing it to the client-side `CommandMenu` for instant search.
- **`content/`** - Components specifically for rendering within MDX content. Includes `Callout` (info/warning boxes), `Code` (syntax highlighting with Shiki), `YouTube` (embeds), `OgLink` (link previews), `HeadingWithAnchor` (clickable heading anchors), and `MorphingImage` (image with dialog zoom).
- **`layout/`** - Structural components: `Navbar` (fixed top, centered), `Footer` (three-column grid with social/sitemap/status), and `BorderContainer` (the characteristic bordered content wrapper).
- **`theme/`** - Dark/light theme system using `next-themes`. `ThemeProvider` wraps the app. `ModeToggle` implements an animated theme switch using the View Transitions API. `ThemeImage` renders separate dark/light images.
- **`ui/`** - Base UI primitives from shadcn/ui (new-york style). Extended with Magic UI (`magicui/`) for `BentoGrid`, `ScrollProgress`, and `ScriptCopyBtn`. Extended with Kibo UI (`kibo-ui/`) for `ContributionGraph`.

### `config/`

Three configuration files centralizing all site data:

- **`site.config.ts`** - Site-wide metadata: name ("iditya.dev"), title, description, keywords, creator info, OG image URL, favicon URLs, social links. Imports from `personal.config.ts`.
- **`personal.config.ts`** - Personal information: name, bio, avatar, address/location, education history, work experience (`ExperienceData`), social links (`LinkData`), skills list, and constants (`GITHUB_USERNAME`, `LEETCODE_USERNAME`, `BASE_URL`).
- **`project.config.ts`** - Array of project objects (`ProjectData`). Each has: title, type (personal/freelance), slug, description, images array, github/live links, and techStack array. Some entries are commented out.

### `content/`

MDX content files that serve as the content management system:

- **`blogs/`** - 6 blog post files. Each exports a `metadata` object (title, date, tags, author, excerpt, images, published) and a default React component. Only posts with `published: true` appear on the site.
- **`projects/`** - 11 project MDX files providing detailed write-ups for each project. The slug must match a project in `config/project.config.ts` to display properly.

### `features/`

Feature-based modules encapsulating domain logic:

- **`home/`** - Everything for the home page. `components/hero.tsx` renders the intro section. `components/bento/` contains the Bento grid with 6 card sub-components (`blog.tsx`, `connect.tsx`, `gh.tsx`, `gh-client.tsx`, `lc/`, `project.tsx`, `skills.tsx`). `components/experience-card.tsx` renders the work experience timeline. `data/` contains fetchers for GitHub contributions and LeetCode stats.
- **`blog/`** - Blog-specific components: `blog-card.tsx` (card for listing pages) and `back-button.tsx` (shared navigation component, also used by projects).
- **`project/`** - Project-specific components: `project-card.tsx` (card with image carousel and tech stack badges) and `utils/project-card-utils.tsx` (helper functions).

### `lib/`

Shared utility functions:

- **`mdx.ts`** - Core content utilities. `getMDXSlugs(folder)` reads the filesystem to list `.mdx` files. `getAllBlogPostsMeta()` dynamically imports each blog's metadata, filters published posts, and sorts by date descending.
- **`rss.ts`** - RSS/Atom/JSON feed generation using the `feed` package. Composable functions: `createBaseFeed()`, `addBlogPostsToFeed()`, `addProjectsToFeed()`, `generateBlogsFeed()`, `generateProjectsFeed()`, `generateCombinedFeed()`, `formatFeedResponse()`.
- **`utils.ts`** - General helpers: `cn()` (clsx + tailwind-merge), `getImageSrc()` (resolves relative image paths), `generateSlug()` (text-to-slug conversion).

### `server/`

Server-only code:

- **`notion-to-mdx.ts`** - Marked with `'use server'`. Uses `@notionhq/client` to connect to the Notion API and `notion-to-md` to convert a Notion page to MDX string. Used by the `/todo` page.

### `types/`

Shared TypeScript type definitions:

- **`index.ts`** - Three interfaces: `ProjectCardProps` (project card data shape), `BlogPostMeta` (blog frontmatter shape), `ExperienceItemProps` (work experience shape).

## Key Files

### Root Configuration

| File | Role |
|------|------|
| `next.config.ts` | Next.js config. Enables MDX with remark/rehype plugins (GFM, frontmatter extraction as `metadata`, TOC generation, syntax highlighting). Allows all remote image hostnames. |
| `tsconfig.json` | TypeScript strict mode. Path alias `@/*` maps to project root. Target ES2017, bundler module resolution. |
| `package.json` | Defines `dev`, `build`, `start`, `lint` scripts. Key deps: Next.js 15.3, React 19, MDX toolchain, cmdk, feed, leetcode-query, motion, next-themes, notion-to-md, shiki. |
| `postcss.config.mjs` | Enables Tailwind CSS 4 via `@tailwindcss/postcss`. |
| `components.json` | shadcn/ui config: new-york style, stone base color, 0rem radius. Registries for Magic UI and Kibo UI. |
| `vercel.json` | Disables deployment on `dev` branch. |
| `.env` | Contains `NOTION_TOKEN` for the Notion API. |

### Application Core

| File | Role |
|------|------|
| `app/layout.tsx` | Root layout. Loads Inter + JetBrains Mono fonts via `next/font/google`, Bitcount Grid Double via `<link>`. Sets up ThemeProvider (dark default), fixed Navbar with CommandMenu, Vercel Analytics. Configures comprehensive SEO metadata from `siteConfig`. |
| `app/(main)/layout.tsx` | Main content layout. Wraps children in `BorderContainer` (centered, bordered) with `Footer`. Adds top margin for fixed navbar clearance. |
| `mdx-components.tsx` | The MDX component registry. Maps every HTML element to styled terminal-aesthetic components. Provides custom components: `Callout`, `YouTube`, `CommandBtn`, `OgLink`, `Image`, `MorphingImage`, `Code` (pre blocks). All text uses monospace fonts with green accent colors. |
| `styles/globals.css` | Imports Tailwind CSS 4 and tw-animate-css. Defines CSS custom properties for light/dark themes using oklch color space. Sets `--radius: 0rem` for the sharp-cornered terminal aesthetic. Defines custom `.font-grid` utility for Bitcount Grid Double font. |

### Data & Content

| File | Role |
|------|------|
| `lib/mdx.ts` | MDX content utilities. `getMDXSlugs()` reads `content/{folder}/` directory for `.mdx` files. `getBlogPostMetaBySlug()` dynamically imports a blog's metadata. `getAllBlogPostsMeta()` aggregates, filters (`published: true`), and sorts all blog metadata. |
| `lib/rss.ts` | Feed generation using the `feed` npm package. Three generators (blogs, projects, combined) and a formatter that outputs RSS2, Atom1, or JSON1 with proper content types. |
| `config/project.config.ts` | Static project data array. This is the source of truth for the projects listing (not MDX metadata). Each entry has: title, type, slug, description, images, links, techStack. |
| `server/notion-to-mdx.ts` | Notion integration. Converts a Notion page to MDX string using `@notionhq/client` + `notion-to-md`. Used by the `/todo` page for live content syncing. |

### Page Components

| File | Role |
|------|------|
| `app/(main)/page.tsx` | Home page. Composes `Hero`, `Bento` grid, and `ExperienceSection`. |
| `app/(main)/blogs/[slug]/page.tsx` | Blog post page. Dynamic imports MDX content. Renders terminal-style header, metadata bar, title with tags, theme-aware cover image, article content, and fixed TOC sidebar (on wide screens). Uses `generateStaticParams()` and `generateMetadata()`. |
| `app/(main)/projects/[slug]/page.tsx` | Project detail page. Imports MDX content and matches against `ProjectData` config. Renders project card header + MDX body. |
| `app/(main)/todo/page.tsx` | Notion-synced todo. Force-dynamic with 5-minute revalidation. Renders Notion content via `next-mdx-remote-client`. |

## Naming Conventions

### Files

| Category | Convention | Examples |
|----------|-----------|----------|
| Page components | `page.tsx` | `app/(main)/blogs/page.tsx` |
| Layout components | `layout.tsx` | `app/(main)/layout.tsx` |
| Route handlers | `route.ts` | `app/(rss)/rss.xml/route.ts` |
| React components | kebab-case `.tsx` | `blog-card.tsx`, `theme-toggle.tsx`, `border-container.tsx` |
| Utility files | kebab-case `.ts` | `gh-contribution.ts`, `lc-stats.ts` |
| Config files | kebab-case with `.config.ts` suffix | `site.config.ts`, `personal.config.ts` |
| MDX content files | kebab-case `.mdx` | `docker-beginner.mdx`, `intro-to-rust-macros.mdx` |
| Custom hooks | camelCase with `use` prefix | `useClickOutside.tsx` |
| Index files | `index.tsx` | `components/layout/footer/index.tsx` |

### Components & Exports

| Category | Convention | Examples |
|----------|-----------|----------|
| Components | PascalCase, named exports | `export const Hero`, `export const BlogCard`, `export const Navbar` |
| Page components | PascalCase, default export | `export default Home`, `export default function Page()` |
| Interfaces/Types | PascalCase | `BlogPostMeta`, `ProjectCardProps`, `ExperienceItemProps` |
| Functions | camelCase | `getAllBlogPostsMeta()`, `getMDXSlugs()`, `generateSlug()` |
| Constants | camelCase or UPPER_SNAKE | `siteConfig`, `GITHUB_USERNAME`, `BASE_URL` |
| Data arrays | PascalCase | `ProjectData`, `ExperienceData`, `LinkData`, `NavLinks` |

### Directory Organization

- **Feature directories** use singular nouns: `features/home/`, `features/blog/`, `features/project/`
- **Feature internals** split into `components/`, `data/`, and `utils/` subdirectories
- **Component directories** with sub-components use an `index.tsx` barrel file: `navbar/index.tsx`, `footer/index.tsx`, `bento/index.tsx`
- **UI component extensions** are namespaced by source: `ui/magicui/`, `ui/kibo-ui/`
- **Route groups** use parenthesized names: `(main)`, `(rss)` (Next.js convention, no URL segment)
- **Dynamic routes** use bracketed names: `[slug]`

### CSS & Styling

- CSS variables use `--kebab-case` notation in oklch color space
- Tailwind classes follow utility-first patterns with `cn()` for conditional merging
- Component-specific styles are inline Tailwind classes, not separate CSS files
- The global `--radius: 0rem` enforces the sharp-cornered terminal aesthetic everywhere
- Custom font families defined as CSS variables: `--font-sans`, `--font-mono`, `--font-grid`
