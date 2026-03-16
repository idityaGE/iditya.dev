# Coding Conventions

## Code Style

**Indentation:** 2 spaces throughout the codebase. All TypeScript, TSX, and CSS files use consistent 2-space indentation.

**Quotes:** Double quotes for strings. This is consistent across all source files.

```typescript
// From app/layout.tsx:1
import type { Metadata } from "next/types";
```

**Semicolons:** Inconsistent. Most files use semicolons at the end of statements, but some files (primarily shadcn/ui generated components and some utility files) omit them.

- **With semicolons:** `app/layout.tsx`, `lib/mdx.ts`, `components/theme/theme-toggle.tsx`, `components/content/callout.tsx`, `features/home/components/hero.tsx`
- **Without semicolons:** `lib/utils.ts`, `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/kbd.tsx`

The pattern is that **author-written code uses semicolons**, while **shadcn/ui scaffolded code does not**. New code should use semicolons.

**Trailing commas:** Used in multiline arrays and objects:

```typescript
// From config/site.config.ts:7-20
keywords: [
    "Aditya Portfolio",
    "iditya",
    "idityage",
    "Aditya",
],
```

**Line length:** Soft limit of ~100 characters. Long Tailwind class strings routinely exceed this, which is accepted.

---

## Import Ordering

Imports follow a three-tier grouping:

1. **External libraries** (react, next, third-party packages)
2. **Internal imports** using the `@/*` path alias
3. **Relative imports** (used sparingly, mainly within feature modules)

There are **no blank lines between groups** in practice, but the ordering is consistent.

### Typical patterns from real files:

**Server component** (`app/(main)/blogs/[slug]/page.tsx:1-9`):
```typescript
import { getMDXSlugs } from "@/lib/mdx";
import { TableOfContents } from "@/components/content/toc";
import { BackButton } from "@/features/blog/components/back-button";
import type { Metadata } from "next/types";
import { siteConfig } from "@/config/site.config";
import { ScrollProgress } from "@/components/ui/magicui/scroll-progress";
import { ThemeImage } from "@/components/theme/theme-image";
import { Calendar, User } from "lucide-react";
```

Note: In practice, the ordering is **not always strictly external-first**. Internal `@/` imports sometimes precede external ones (as shown above). The convention is aspirational rather than enforced by a linter.

**Client component** (`components/theme/theme-toggle.tsx:1-15`):
```typescript
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
```

This file is the cleanest example: externals first, blank line, then `@/` internals.

**Relative imports** are used within feature modules to reference sibling utilities:
```typescript
// From features/project/components/project-card.tsx:4-7
import {
  ProjectButtons,
  TechStackList,
} from "../utils/project-card-utils";
```

**`import type` for type-only imports** is used consistently:
```typescript
// From lib/mdx.ts:3
import type { BlogPostMeta } from '@/types';

// From app/(main)/page.tsx:4
import type { Metadata } from "next";

// From config/personal.config.ts:1
import type { ExperienceItemProps } from "@/types";
```

---

## TypeScript Usage

**Strict mode is enabled** in `tsconfig.json:7`:
```json
"strict": true
```

**Path alias:** The `@/*` alias maps to the project root, configured in `tsconfig.json:21-23`:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Shared type definitions

All shared interfaces are defined in `types/index.ts`. The file currently contains three interfaces:

```typescript
// types/index.ts
export interface ProjectCardProps {
  title: string
  type?: string
  description: string
  images: string[]
  liveLink?: string
  githubLink?: string
  techStack: string[]
  slug: string
  disableHover?: boolean
}

export interface BlogPostMeta {
  title: string;
  date: string;
  tags: string[];
  author: string;
  excerpt: string;
  darkImage: string;
  lightImage: string;
  published: boolean;
}

export interface ExperienceItemProps {
  company: string
  position: string
  type: "Job" | "Internship" | "Education"
  location: string
  startDate: string
  endDate: string
  description: string[]
  techStack: string[]
  logo?: string
  companyUrl?: string
}
```

### Interface vs type

- **`interface`** is used for object shapes (all shared types above use `interface`)
- **`type`** is used for unions, intersections, and local aliases:

```typescript
// From lib/mdx.ts:6-8
type BlogPostMetaWithSlug = BlogPostMeta & {
  slug: string
}

// From components/content/callout.tsx:65
type AdmonitionType = keyof typeof admonitionConfig;

// From components/cmdk/index.tsx:51
type ActionType = "navigate" | "action" | "external" | "copy";
```

### Inline types for component props

Component-specific props use inline types rather than separate interfaces:

```typescript
// From features/blog/components/back-button.tsx:3-8
export const BackButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
```

```typescript
// From components/layout/border-container.tsx:4-7
interface BorderContainerProps {
  children: ReactNode;
  className?: string;
}
```

Both patterns (inline destructured types and named interfaces) are used, depending on complexity.

### `any` usage

`any` is avoided. The only instance is a `@ts-ignore` comment in `components/content/code.tsx:20-23` and `next.config.ts:27` for plugin compatibility:

```typescript
// next.config.ts:27-28
//@ts-ignore
[remarkMdxToc, { name: "toc" }]
```

---

## Component Patterns

### Arrow functions vs function declarations

The codebase uses **both patterns**, with a clear split:

**Arrow functions with `const` (most common for custom components):**
```typescript
// features/home/components/hero.tsx:5
export const Hero = () => {

// components/layout/navbar/index.tsx:25
export const Navbar = ({ children }: { children?: React.ReactNode }) => {

// components/layout/navbar/mobile-dropdown.tsx:13
export const MobileDropdown = () => {

// components/layout/footer/index.tsx:8
export const Footer = () => {
```

**Function declarations (used for pages, shadcn/ui components, and utilities):**
```typescript
// app/(main)/blogs/[slug]/page.tsx:63
export default async function Page({

// components/theme/theme-provider.tsx:35
export function ThemeProvider({

// components/ui/button.tsx:38
function Button({

// hooks/useClickOutside.tsx:3
export function useClickOutside<T extends HTMLElement = HTMLElement>(
```

**Pattern summary:**
- **Pages:** `export default async function Page` or `const Page = () => {}; export default Page;`
- **Feature components:** `export const ComponentName = () => {}`
- **shadcn/ui primitives:** `function ComponentName({}) { } export { ComponentName }`
- **Hooks:** `export function useHookName()`
- **Utility functions:** `export function functionName()` or `export const functionName = ()`

### Export patterns

- **Pages:** Use `export default` (both `export default function Page` and `const Page; export default Page` are used)
- **Components:** Use **named exports** (`export const Hero`, `export { Button }`, `export { ProjectCard }`)
- **Index files:** Re-export from the module (`components/cmdk/index.tsx`, `components/layout/navbar/index.tsx`)

### Client vs server components

**Client components** have `"use client"` at line 1:
- `components/theme/theme-provider.tsx`
- `components/theme/theme-toggle.tsx`
- `components/theme/theme-image.tsx`
- `components/layout/navbar/mobile-dropdown.tsx`
- `components/content/code.tsx`
- `components/cmdk/index.tsx`
- `features/home/components/experience-card.tsx`
- `app/global-error.tsx`

**Server components** (the default -- no directive):
- All page files (`app/(main)/page.tsx`, `app/(main)/blogs/page.tsx`, etc.)
- `components/layout/navbar/index.tsx`
- `components/layout/footer/index.tsx`
- `components/content/callout.tsx`
- `components/content/og-link.tsx`
- `components/cmdk/command-menu-wrapper.tsx` (async server component that wraps a client component)
- `features/home/components/hero.tsx`
- `features/blog/components/blog-card.tsx`
- `features/project/components/project-card.tsx`

The **server-client boundary pattern** is demonstrated by the command menu:
- `command-menu-wrapper.tsx` is a server component that fetches data
- It passes data as props to the client-side `CommandMenu` component

### Page component conventions

Dynamic route pages use Next.js 15's async params pattern:
```typescript
// app/(main)/blogs/[slug]/page.tsx:63-68
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
```

Pages use `generateStaticParams` for SSG and `export const dynamicParams = false` to restrict to known slugs:
```typescript
// app/(main)/blogs/[slug]/page.tsx:191-198
export async function generateStaticParams() {
  const slugs = await getMDXSlugs("blogs");
  return slugs.map((slug: string) => ({ slug }));
}

export const dynamicParams = false;
```

---

## Naming Conventions

### Files

All component, page, and utility files use **kebab-case**:
- `theme-toggle.tsx`, `blog-card.tsx`, `border-container.tsx`, `command-menu-wrapper.tsx`
- `site.config.ts`, `personal.config.ts`, `project.config.ts`
- `gh-contribution.ts`, `lc-stats.ts`

Exceptions:
- `useClickOutside.tsx` -- the one hook file uses **camelCase** matching the hook name

### Components

PascalCase for all component names:
- `Hero`, `Navbar`, `Footer`, `BlogCard`, `ProjectCard`, `ThemeProvider`, `ModeToggle`
- `BorderContainer`, `CommandMenu`, `CommandMenuWrapper`, `ExperienceSection`

### Functions

camelCase for all functions:
- `getBlogPostMetaBySlug`, `getAllBlogPostsMeta`, `getMDXSlugs`, `generateSlug`
- `getImageSrc`, `fetchOgData`, `getMetaContent`, `getTypeColor`
- `createBaseFeed`, `addBlogPostsToFeed`, `formatFeedResponse`

### Variables and constants

- **camelCase** for most variables: `fontSans`, `fontMono`, `siteConfig`, `currentYear`
- **UPPER_SNAKE_CASE** for true constants: `GITHUB_USERNAME`, `LEETCODE_USERNAME`, `BASE_URL`
- **camelCase** for config objects: `siteConfig`, `PersonalData`, `ExperienceData`, `ProjectData`, `LinkData`, `NavLinks`

Note: Some config objects use PascalCase (`PersonalData`, `ExperienceData`, `ProjectData`, `LinkData`), which is inconsistent with the typical camelCase convention but serves to visually distinguish config data.

### Types and interfaces

PascalCase: `BlogPostMeta`, `ProjectCardProps`, `ExperienceItemProps`, `AnimatedThemeTogglerProps`, `OgData`, `CalloutProps`, `AdmonitionType`

---

## Error Handling

### Data fetching with try-catch

The primary pattern returns `null` on failure and logs with `console.error`:

```typescript
// lib/mdx.ts:21-44
async function getBlogPostMetaBySlug(slug: string): Promise<BlogPostMetaWithSlug | null> {
  try {
    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);
    if (!metadata) {
      console.warn(`No metadata found for ${slug}`);
      return null;
    }
    return { slug, title: metadata.title, /* ... */ };
  } catch (error) {
    console.error(`Failed to load metadata for ${slug}:`, error);
    return null;
  }
}
```

### OG data fetching with graceful fallback

```typescript
// components/content/og-link.tsx:25-56
async function fetchOgData(url: string): Promise<OgData | null> {
  try {
    const response = await fetch(url, { /* ... */ });
    if (!response.ok) {
      return null;
    }
    // ... parse and return
  } catch (error) {
    console.error("Error fetching OG data:", error);
    return null;
  }
}
```

### Empty directory handling

```typescript
// lib/mdx.ts:12-14
if (!fs.existsSync(postsDirectory)) {
  console.warn(`Blog posts directory not found: ${postsDirectory}`);
  return [];
}
```

### Global error boundary

`app/global-error.tsx` is a client component that:
- Logs the error via `console.error` in a `useEffect`
- Shows a user-friendly message in production, technical details in development
- Provides "Return home" and "Try again" actions

```typescript
// app/global-error.tsx:32-38
<p className="text-sm text-neutral-500 dark:text-neutral-400">
  {process.env.NODE_ENV === 'development' ? (
    <span className="font-mono text-xs overflow-x-auto block p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
      {error.message || "An unexpected error occurred"}
    </span>
  ) : (
    "An unexpected error occurred. Please try again later."
  )}
</p>
```

### Not Found page

`app/not-found.tsx` provides a minimal 404 with a "Return home" button.

### Project slug not found

`app/(main)/projects/[slug]/page.tsx:66-74` checks if a project exists and renders an inline terminal-styled error:
```typescript
if (!project) {
  return (
    <main className="flex flex-col items-center justify-center h-screen border bg-background">
      <div className="text-center">
        <p className="text-xs font-mono text-muted-foreground mb-2">$ find . -name "{slug}"</p>
        <p className="text-sm font-mono text-red-500">→ error: project not found</p>
      </div>
    </main>
  );
}
```

### Null coalescing and default values

Metadata fields use `||` for defaults:
```typescript
// lib/mdx.ts:33-38
tags: metadata.tags || [],
author: metadata.author || "",
excerpt: metadata.excerpt || '',
published: metadata.published || false
```

---

## Styling Approach

### Tailwind CSS 4

The project uses **Tailwind CSS 4** with PostCSS. Configuration is in `postcss.config.mjs`:
```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

There is no `tailwind.config.ts` file. All theming is done through CSS variables in `styles/globals.css`.

### CSS variables for theming

Colors are defined using **oklch** color space in `styles/globals.css`:
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0 0 0);
  --primary: oklch(0.3211 0 0);
  --muted-foreground: oklch(0.5103 0 0);
  /* ... */
}

html.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

These are mapped to Tailwind colors via `@theme inline` block in the same file (`styles/globals.css:137-210`).

### The `cn()` utility

Defined in `lib/utils.ts:1-6` using `clsx` + `tailwind-merge`:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Used throughout for conditional and composable class strings:

```typescript
// components/content/callout.tsx:101-105
<div
  className={cn(
    config.bgColor,
    config.borderColor,
    "border rounded-lg p-4 my-6",
    className
  )}
>
```

```typescript
// components/theme/theme-image.tsx:37
className={cn(className, "hidden dark:block")}
```

### shadcn/ui integration

Configured in `components.json`:
- **Style:** `new-york`
- **Base color:** `stone`
- **Icon library:** `lucide`
- **Registries:** `@magicui` (magicui.design) and `@kibo-ui` (kibo-ui.com)
- **CSS variables:** enabled
- **Border radius:** `0rem` (sharp corners, no rounding)

shadcn/ui components use the `data-slot` pattern for identification:
```typescript
// components/ui/button.tsx:51
<Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
```

### class-variance-authority (cva)

Used for variant-based components, primarily in `components/ui/button.tsx`:
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        // ...
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        // ...
      },
    },
  }
)
```

### Theme-aware rendering

Dark/light mode is handled in two ways:

1. **CSS `dark:` prefix** (most common):
```typescript
// components/layout/footer/index.tsx
className="text-neutral-900 dark:text-neutral-100"
```

2. **Dual image rendering** with hidden/shown classes:
```typescript
// components/theme/theme-image.tsx:32-48
<Image className={cn(className, "hidden dark:block")} />  {/* Dark image */}
<Image className={cn(className, "block dark:hidden")} />   {/* Light image */}
```

### Design language

The site follows a **terminal/CLI aesthetic** consistently across all components:
- Terminal window chrome (red/yellow/green dots) appears on nearly every card and section
- Monospace font (`font-mono`) is used extensively
- Terminal-style prompts: `$ whoami`, `$ cat readme.md`, `$ ls companies/`
- Green arrow (`→`) as a consistent accent/bullet character
- Color accent: `text-green-500` is the primary accent throughout
- Semantic color tokens: `text-muted-foreground`, `bg-background`, `bg-muted`, `border-border`
