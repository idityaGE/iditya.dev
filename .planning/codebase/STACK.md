# Technology Stack

## Languages & Runtime

| Language   | Version | Notes                                           |
|------------|---------|--------------------------------------------------|
| TypeScript | ^5      | Strict mode enabled via `tsconfig.json`          |
| MDX        | —       | Blog/project content authored in MDX             |
| CSS        | —       | Tailwind CSS 4 utility classes + CSS variables   |

**Runtime:** Node.js (Bun preferred as package manager/runner, pnpm also supported).
Bun is used for `dev`, `build`, `start`, and `lint` scripts. The `.husky/pre-push` hook runs `bun run build`.

## Framework

| Framework | Version | Key Features Used                                                         |
|-----------|---------|---------------------------------------------------------------------------|
| Next.js   | 15.3.8  | App Router, Server Components, Route Handlers, MDX integration, Image Optimization, Metadata API, `sitemap.ts`, `robots.ts` |
| React     | ^19.0.0 | Server Components (RSC), Suspense, client `"use client"` directive        |

**App Router structure:**
- Route groups: `(main)` for pages, `(rss)` for feed endpoints
- Dynamic routes for blog/project slugs
- API routes under `app/api/og/`
- Auto-generated `sitemap.xml` and `robots.txt`

## Key Dependencies

| Package                          | Version     | Purpose                                                      |
|----------------------------------|-------------|--------------------------------------------------------------|
| `next`                           | 15.3.8      | Core framework                                               |
| `react` / `react-dom`           | ^19.0.0     | UI library                                                   |
| `@next/mdx`                     | ^15.3.3     | MDX integration for Next.js (compile-time MDX in `content/`) |
| `@mdx-js/loader` / `@mdx-js/react` | ^3.1.0  | MDX loader and React renderer                                |
| `next-mdx-remote-client`        | ^2.1.3      | Remote/dynamic MDX rendering (used for Notion to-do page)    |
| `@notionhq/client`              | ^4.0.1      | Notion API SDK for fetching pages                            |
| `notion-to-md`                  | 4.0.0-alpha.7 | Converts Notion pages to Markdown                          |
| `leetcode-query`                | ^2.0.1      | Fetches LeetCode user stats                                  |
| `feed`                           | ^5.1.0      | Generates RSS 2.0, Atom, and JSON feeds                      |
| `node-html-parser`              | ^7.0.1      | Parses HTML for OG metadata extraction in API route           |
| `@vercel/analytics`             | ^1.5.0      | Vercel web analytics                                         |
| `next-themes`                   | ^0.4.6      | Dark/light theme support with `ThemeProvider`                |
| `motion`                        | ^12.18.1    | Animation library (Framer Motion successor)                  |
| `cmdk`                          | ^1.1.1      | Command palette (`Cmd+K`) component                          |
| `shiki`                         | ^3.6.0      | Syntax highlighting engine                                   |
| `prism-react-renderer`          | ^2.4.1      | Prism-based code highlighting for React                      |
| `date-fns`                      | ^4.1.0      | Date formatting utilities                                    |
| `lucide-react`                  | ^0.515.0    | Icon library                                                 |
| `@icons-pack/react-simple-icons`| ^13.8.0     | Brand/simple icons (GitHub, X, LinkedIn, etc.)               |
| `class-variance-authority`      | ^0.7.1      | Component variant utility (CVA) for shadcn/ui                |
| `clsx`                          | ^2.1.1      | Conditional class string builder                             |
| `tailwind-merge`                | ^3.3.1      | Intelligent Tailwind class merging (used in `cn()`)          |

### Radix UI Primitives (via shadcn/ui)

| Package                          | Version  | Component               |
|----------------------------------|----------|-------------------------|
| `@radix-ui/react-dialog`        | ^1.1.14  | Dialog/Modal            |
| `@radix-ui/react-dropdown-menu` | ^2.1.15  | Dropdown menus          |
| `@radix-ui/react-icons`         | ^1.3.2   | Radix icon set          |
| `@radix-ui/react-scroll-area`   | ^1.2.9   | Custom scroll areas     |
| `@radix-ui/react-separator`     | ^1.1.7   | Visual separators       |
| `@radix-ui/react-slot`          | ^1.2.3   | Slot composition        |
| `@radix-ui/react-tooltip`       | ^1.2.7   | Tooltips                |

### MDX Plugins

| Plugin                   | Version | Purpose                                            |
|--------------------------|---------|----------------------------------------------------|
| `remark-gfm`            | ^4.0.1  | GitHub Flavored Markdown (tables, strikethrough)   |
| `remark-frontmatter`    | ^5.0.0  | Parses YAML frontmatter in MDX                     |
| `remark-mdx-frontmatter`| ^5.2.0  | Exports frontmatter as named `metadata` export     |
| `remark-mdx-toc`        | ^0.3.1  | Generates table of contents from headings          |
| `rehype-highlight`      | ^7.0.2  | Syntax highlighting in rehype pipeline             |

## Dev Dependencies

| Package               | Version   | Purpose                                    |
|-----------------------|-----------|--------------------------------------------|
| `typescript`          | ^5        | TypeScript compiler                        |
| `tailwindcss`         | ^4        | Utility-first CSS framework                |
| `@tailwindcss/postcss`| ^4        | PostCSS plugin for Tailwind CSS 4          |
| `tw-animate-css`      | ^1.3.4    | Animation utilities for Tailwind           |
| `husky`               | ^9.1.7    | Git hooks (pre-push runs `bun run build`)  |
| `@types/node`         | ^20       | Node.js type definitions                   |
| `@types/react`        | ^19       | React type definitions                     |
| `@types/react-dom`    | ^19       | ReactDOM type definitions                  |
| `@types/mdx`          | ^2.0.13   | MDX type definitions                       |

**Note:** No test framework is configured (no Jest, Vitest, etc.).

## Configuration Files

| File                  | Purpose                                                                                   |
|-----------------------|-------------------------------------------------------------------------------------------|
| `next.config.ts`      | Next.js config: MDX plugin chain (remark/rehype), page extensions (`mdx`, `tsx`, `ts`), wildcard remote image patterns |
| `tsconfig.json`       | TypeScript: strict mode, ES2017 target, bundler module resolution, `@/*` path alias       |
| `postcss.config.mjs`  | PostCSS: uses `@tailwindcss/postcss` plugin                                               |
| `components.json`     | shadcn/ui config: new-york style, stone base color, RSC enabled, Lucide icons, registries for Magic UI and Kibo UI |
| `vercel.json`         | Vercel deployment: disables auto-deploy for `dev` branch                                  |
| `.husky/pre-push`     | Git pre-push hook: runs `bun run build` before push                                       |
| `.gitignore`          | Ignores `node_modules/`, `.next/`, `.env*`, `.vercel/`, build artifacts                   |
| `mdx-components.tsx`  | Global MDX component overrides: custom heading anchors, styled prose, code blocks, tables, images |
| `styles/globals.css`  | Global CSS: Tailwind import, `tw-animate-css`, CSS custom properties for light/dark themes (oklch color space) |

### Config Directory (`config/`)

| File                     | Purpose                                                                         |
|--------------------------|---------------------------------------------------------------------------------|
| `config/site.config.ts`     | Site metadata: name, title, description, keywords, OG image, favicon URLs (Cloudinary-hosted) |
| `config/personal.config.ts` | Personal data, education, experience, social links, GitHub/LeetCode usernames, `BASE_URL` |
| `config/project.config.ts`  | Project showcase data: titles, descriptions, images (Cloudinary/ImageKit), tech stacks, links |

## Build & Deploy

### Scripts (`package.json`)

| Command      | Action                                    |
|--------------|-------------------------------------------|
| `bun dev`    | Start Next.js development server          |
| `bun build`  | Production build (also runs as pre-push)  |
| `bun start`  | Start production server                   |
| `bun lint`   | Run Next.js ESLint                        |

### Deployment

- **Target:** Vercel
- **Domain:** `iditya.dev` (configured in `config/personal.config.ts` as `BASE_URL`)
- **Config:** `vercel.json` disables automatic deployments for the `dev` branch
- **Pre-push hook:** `.husky/pre-push` runs `bun run build` to catch build errors before pushing
- **Analytics:** `@vercel/analytics` is included in the root layout (`app/layout.tsx:134`)

### Image Hosting

Images are hosted externally on:
- **Cloudinary** (`res.cloudinary.com/dwdbqwqxk`) - OG images, favicons, project screenshots
- **ImageKit** (`ik.imagekit.io/nnp1iszdfe`) - Project media, portfolio images
- **Pinterest CDN** (`i.pinimg.com`) - Avatar image

The `next.config.ts` allows all remote image hostnames via wildcard pattern (`hostname: "*"`).

### Fonts

| Font               | Method           | Variable          | Usage              |
|--------------------|------------------|-------------------|--------------------|
| Inter              | `next/font/google` | `--font-sans`   | Primary body font  |
| JetBrains Mono     | `next/font/google` | `--font-mono`   | Monospace / code   |
| Bitcount Grid Double | `<link>` tag    | —                | Decorative         |
