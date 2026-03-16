# External Integrations

## APIs & Services

### Notion API

- **Package:** `@notionhq/client` ^4.0.1 + `notion-to-md` 4.0.0-alpha.7
- **Used in:** `server/notion-to-mdx.ts`
- **Purpose:** Fetches a Notion page by ID and converts it to MDX content for the to-do list page
- **Consumer:** `app/(main)/todo/page.tsx` calls `getNotionPage()` server action
- **Caching:** Page uses `revalidate = 300` (5 minutes) with `dynamic = 'force-dynamic'`
- **Rendering:** Fetched MDX is rendered via `next-mdx-remote-client/rsc` (`MDXRemote` component)

```typescript
// server/notion-to-mdx.ts
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionConverter(notion);
const result = await n2m.convert(pageId);
```

### GitHub Contributions API

- **Endpoint:** `https://github-contributions-api.jogruber.de/v4/{username}?y=last`
- **Used in:** `features/home/data/gh-contribution.ts`
- **Purpose:** Fetches the GitHub contribution graph data (last year) for display in the home page bento grid
- **Username:** `idityaGE` (from `config/personal.config.ts`)
- **Caching:** `next: { revalidate: 86400 }` (1 day)

```typescript
// features/home/data/gh-contribution.ts
const res = await fetch(
  `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
  { next: { revalidate: 86400 } }
);
```

### LeetCode API

- **Package:** `leetcode-query` ^2.0.1
- **Used in:** `features/home/data/lc-stats.ts`
- **Purpose:** Fetches LeetCode user statistics (problems solved, rankings) for the home page bento grid
- **Username:** `idityage` (from `config/personal.config.ts`)
- **Caching:** `unstable_cache` with `revalidate: 86400` (1 day), cache key `["leetcode-stats"]`

```typescript
// features/home/data/lc-stats.ts
export const getLeetCodeStats = unstable_cache(
  async (username: string) => {
    const lc = new LeetCode();
    return await lc.user(username);
  },
  ["leetcode-stats"],
  { revalidate: 86400 }
);
```

### OG Metadata Scraper (Internal API)

- **Route:** `app/api/og/route.ts` (GET)
- **Purpose:** Proxy endpoint that fetches a given URL's HTML, parses it with `node-html-parser`, and extracts Open Graph metadata (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`)
- **Consumer:** Used by the `OgLink` MDX content component (`components/content/og-link.tsx`) to render link previews in blog posts
- **Query param:** `?url=<encoded-url>`

```typescript
// app/api/og/route.ts
const root = parse(html);
const ogData = {
  title: getMetaContent(root, 'og:title') || getTitle(root),
  description: getMetaContent(root, 'og:description'),
  image: getMetaContent(root, 'og:image'),
  url: getMetaContent(root, 'og:url') || url,
  siteName: getMetaContent(root, 'og:site_name'),
};
```

### Vercel Analytics

- **Package:** `@vercel/analytics` ^1.5.0
- **Used in:** `app/layout.tsx:134`
- **Purpose:** Client-side page view and web vitals tracking via Vercel's built-in analytics
- **Integration:** `<Analytics />` component rendered in the root layout body

### Cloudinary (Image CDN)

- **Base URL:** `https://res.cloudinary.com/dwdbqwqxk/`
- **Purpose:** Hosts OG images, favicon files, and project screenshots
- **Referenced in:** `config/site.config.ts`, `config/project.config.ts`

### ImageKit (Image CDN)

- **Base URL:** `https://ik.imagekit.io/nnp1iszdfe/`
- **Purpose:** Hosts project media and portfolio images
- **Referenced in:** `config/project.config.ts`

## Environment Variables

| Variable              | Required | Used In                          | Purpose                                    |
|-----------------------|----------|----------------------------------|--------------------------------------------|
| `NOTION_TOKEN`        | Yes      | `server/notion-to-mdx.ts`       | Notion API authentication token            |
| `NOTION_TODO_PAGE_ID` | No       | `.env` (defined but referenced as `NOTION_PAGE_ID` in code) | Notion page ID for the to-do list |
| `NOTION_PAGE_ID`      | No       | `app/(main)/todo/page.tsx`       | Notion page ID; falls back to hardcoded ID `23967c3fabda806f826aef58366068e3` |
| `NODE_ENV`            | Auto     | `app/global-error.tsx`           | Standard Node.js env; controls error detail display |

**Note:** The `.env` file defines `NOTION_TODO_PAGE_ID` but the code in `app/(main)/todo/page.tsx:72` references `process.env.NOTION_PAGE_ID`. There is a hardcoded fallback ID that matches the `.env` value, so it works regardless.

## RSS/Feed Generation

### Feed Library

- **Package:** `feed` ^5.1.0
- **Implementation:** `lib/rss.ts`

### Available Feeds

The site generates RSS feeds in three formats and three scopes:

| Endpoint              | Format   | Scope                    | Route File                                 |
|-----------------------|----------|--------------------------|--------------------------------------------|
| `/rss.xml`            | RSS 2.0  | Combined (blogs + projects) | `app/(rss)/rss.xml/route.ts`            |
| `/atom.xml`           | Atom 1.0 | Combined                 | `app/(rss)/atom.xml/route.ts`              |
| `/rss.json`           | JSON Feed| Combined                 | `app/(rss)/rss.json/route.ts`              |
| `/blogs/rss.xml`      | RSS 2.0  | Blogs only               | `app/(rss)/blogs/rss.xml/route.ts`         |
| `/projects/rss.xml`   | RSS 2.0  | Projects only            | `app/(rss)/projects/rss.xml/route.ts`      |
| `/rss.xml?type=blogs` | RSS 2.0  | Blogs (via query param)  | `app/(rss)/rss.xml/route.ts`               |
| `/rss.xml?type=projects` | RSS 2.0 | Projects (via query param) | `app/(rss)/rss.xml/route.ts`           |

### Feed Content Sources

- **Blog posts:** Sourced from `content/blogs/*.mdx` via `lib/mdx.ts` (`getAllBlogPostsMeta()`) - only published posts
- **Projects:** Sourced from `config/project.config.ts` (`ProjectData` array)

### HTML `<link>` Tags

The root layout (`app/layout.tsx`) declares the following alternate feed links in `<head>`:
- RSS feed at `/rss.xml`
- Atom feed at `/atom.xml`
- JSON feed at `/rss.json`
- Blog-specific RSS at `/blogs/rss.xml`
- Project-specific RSS at `/projects/rss.xml`

## SEO & Discoverability

### Sitemap

- **File:** `app/sitemap.ts`
- **Format:** Auto-generated `sitemap.xml` via Next.js Metadata API
- **Content:** Static routes (`/`, `/about`, `/projects`, `/blogs`) + dynamic routes for each blog and project slug from `content/`

### Robots

- **File:** `app/robots.ts`
- **Rules:** Allow all user agents on all paths; references sitemap at `{BASE_URL}/sitemap.xml`

### OpenGraph & Twitter Cards

Configured in `app/layout.tsx` metadata export using values from `config/site.config.ts`:
- OG image hosted on Cloudinary
- Twitter card: `summary_large_image`

### Site Verification

- **OCS:** `<meta name="ocs-site-verification" content="83b607414cec1c074aa5415fd4c01d5d" />` in `app/layout.tsx:78`

## Analytics & Monitoring

| Service           | Package              | Integration Point    | Purpose                          |
|-------------------|----------------------|----------------------|----------------------------------|
| Vercel Analytics  | `@vercel/analytics`  | `app/layout.tsx:134` | Page views, web vitals tracking  |

No additional error monitoring (Sentry, LogRocket, etc.) or custom analytics services are configured.

## Theme System

- **Package:** `next-themes` ^0.4.6
- **Provider:** `components/theme/theme-provider.tsx` wraps the app in `app/layout.tsx:126`
- **Default:** Dark theme (`defaultTheme="dark"`)
- **Strategy:** CSS class-based (`attribute="class"`)
- **Toggle:** `components/theme/theme-toggle.tsx`
- **Theme-aware images:** `components/theme/theme-image.tsx`
- **CSS Variables:** Light and dark color schemes defined in `styles/globals.css` using oklch color space

## Command Palette

- **Package:** `cmdk` ^1.1.1
- **Components:** `components/cmdk/command-menu-wrapper.tsx`, `components/cmdk/index.tsx`
- **Integration:** Rendered inside the `Navbar` component in `app/layout.tsx:129`
- **Purpose:** Keyboard-driven navigation (`Cmd+K` / `Ctrl+K`) for quick access to pages and actions
