# Codebase Concerns

> Generated from manual audit of the nextport codebase. Severity ratings: **Critical**, **High**, **Medium**, **Low**.

---

## Critical Issues

### 1. SSRF Vulnerability in OG Metadata API Route
**Severity:** Critical | **File:** `app/api/og/route.ts:4-51`

The `/api/og` route accepts an arbitrary `url` query parameter and fetches it server-side without any validation or allowlisting. An attacker can use this to:
- Probe internal network services (SSRF)
- Access cloud metadata endpoints (e.g., `http://169.254.169.254/`)
- Amplify requests to other services

```typescript
// No URL validation before fetching
const url = searchParams.get('url');
const response = await fetch(url, { ... }); // Attacker-controlled URL
```

**Recommendation:** Add URL validation — reject private/internal IPs, enforce HTTPS, set a timeout, and allowlist domains if possible.

### 2. Wildcard Image Remote Pattern
**Severity:** Critical | **File:** `next.config.ts:12-17`

The Next.js image configuration allows **any hostname** via wildcard:

```typescript
images: {
  remotePatterns: [{ protocol: "https", hostname: "*" }],
}
```

This enables the `next/image` optimization proxy to be used with arbitrary external images, which can be exploited for image proxy abuse and potential SSRF through the `/_next/image` endpoint. Should be locked down to specific hostnames used in the project (Cloudinary, ImageKit, GitHub, etc.).

### 3. Hardcoded Notion Page ID as Fallback
**Severity:** Critical | **File:** `app/(main)/todo/page.tsx:72`

The Notion page ID is hardcoded as a fallback value in code:

```typescript
const pageId = process.env.NOTION_PAGE_ID || '23967c3fabda806f826aef58366068e3';
```

This references `NOTION_PAGE_ID` which is not the actual env var name (`NOTION_TODO_PAGE_ID` is in `.env`). If the env var is missing, it silently falls back to a hardcoded ID that may be wrong or leak internal resource identifiers.

---

## High Priority

### 4. Email Address Typo — Unreachable Contact
**Severity:** High | **File:** `config/personal.config.ts:88`

The `gmail` field has a typo: `"adiimaurya02@gamil.com"` — "gamil" instead of "gmail". This address is displayed in the footer (`components/layout/footer/index.tsx:92`) and used in RSS feed author metadata (`lib/rss.ts:31`). Visitors cannot reach this email.

### 5. Inconsistent Email Addresses
**Severity:** High | **Files:** `config/personal.config.ts:88-89`, `components/cmdk/index.tsx:190`

Three different email addresses are used across the codebase:
- `adiimaurya02@gamil.com` (typo) — displayed in footer/RSS as `LinkData.gmail`
- `am44910606@gmail.com` — used in `LinkData.mail` (mailto link) and hardcoded in command menu
- Hardcoded in `components/cmdk/index.tsx:190`: `const email = "am44910606@gmail.com"`

The command menu hardcodes the email instead of referencing `LinkData`, creating a maintenance burden and inconsistency.

### 6. No Error Handling on External API Fetch (GitHub Contributions)
**Severity:** High | **File:** `features/home/data/gh-contribution.ts:8-14`

The GitHub contributions fetch has no error handling — if the API returns an error or non-JSON response, the entire page will crash:

```typescript
export async function getGitHubContributions(): Promise<Activity[]> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/...`);
  const data = (await res.json()) as GitHubContributionsResponse;
  return data.contributions; // No null check, no response.ok check
}
```

The third-party API (`jogruber.de`) is not under the project owner's control and could go down at any time.

### 7. Alpha Dependency: `notion-to-md`
**Severity:** High | **File:** `package.json:37`

Using `"notion-to-md": "4.0.0-alpha.7"` — an alpha pre-release version that may have breaking changes, bugs, or be abandoned. The API surface could change without notice between alpha versions.

### 8. `unstable_cache` API Usage
**Severity:** High | **File:** `features/home/data/lc-stats.ts:1,4`

`unstable_cache` from `next/cache` is used for LeetCode stats caching. This API is explicitly marked unstable by Next.js and may change or be removed in future versions.

### 9. `dangerouslySetInnerHTML` with Dynamic Content
**Severity:** High | **File:** `components/ui/magicui/script-copy-btn.tsx:99`

The Shiki-highlighted HTML output is injected via `dangerouslySetInnerHTML`. While the content comes from Shiki (a code highlighter, not user input), the input `command` is derived from `commandMap` props. If any upstream component passes unsanitized user input, this becomes an XSS vector. The fallback also directly interpolates: `setHighlightedCode(\`<pre>${command}</pre>\`)` (line 49).

---

## Medium Priority

### 10. `@ts-ignore` Suppressions
**Severity:** Medium | **Files:**
- `components/ui/code-snippets.tsx:10,97` — Prism language extension
- `components/content/code.tsx:20,22` — ReactElement props access
- `next.config.ts:27` — remark plugin typing

These bypass type safety. The Prism language definitions (lines 10, 97) could be typed with module augmentation. The `code.tsx` suppressions indicate fragile child prop extraction logic.

### 11. `any` Type Usage in Typed Files
**Severity:** Medium | **Files:**
- `components/ui/magicui/bento-grid.tsx:46` — `Icon: any`
- `app/api/og/route.ts:54,59` — `root: any` for parsed HTML

These defeat TypeScript's type checking. `node-html-parser` exports proper types that should be used instead of `any`. The `Icon` prop could be typed as `React.ComponentType<any>` or `LucideIcon`.

### 12. Duplicate OG Metadata Fetching Logic
**Severity:** Medium | **Files:** `app/api/og/route.ts` and `components/content/og-link.tsx`

Both files implement the same OG data fetching logic with identical `getMetaContent` and `getTitle` helper functions, same User-Agent string, and same parsing approach. The `OgLink` component doesn't even use the API route — it fetches directly. This is a DRY violation.

### 13. `ErrorState` Component Uses `onClick` in Server Component Context
**Severity:** Medium | **File:** `app/(main)/todo/page.tsx:61-63`

The `ErrorState` component contains `onClick={() => window.location.reload()}`, but is rendered inside a Server Component without a `"use client"` directive. This will fail silently in production. The button needs to be extracted into a client component.

### 14. Sitemap References Non-Existent `/about` Route
**Severity:** Medium | **File:** `app/sitemap.ts:14-18`

The sitemap includes `${BASE_URL}/about` but there is no `/about` page in the app. This generates a 404 entry in the sitemap, which is bad for SEO.

### 15. Missing `rel="noopener noreferrer"` on Some External Links
**Severity:** Medium | **Files:**
- `features/home/components/hero.tsx:49-56` — `<a href={LinkData.x} target="_blank">` has no `rel` attribute
- `components/layout/footer/index.tsx:105` — external link missing `rel`

External links opened with `target="_blank"` should include `rel="noopener noreferrer"` for security (prevents tab-nabbing).

### 16. No Input Validation on `/api/og` URL Parameter
**Severity:** Medium | **File:** `app/api/og/route.ts:6`

Beyond SSRF (covered above), the URL is not validated for format. Malformed URLs will cause `fetch` to throw, which is caught, but no rate limiting or abuse prevention exists.

### 17. Conflicting Export Style — `revalidate` + `force-dynamic`
**Severity:** Medium | **File:** `app/(main)/todo/page.tsx:15-16`

Both `export const revalidate = 300` and `export const dynamic = 'force-dynamic'` are set. `force-dynamic` overrides `revalidate`, making the revalidate value pointless. This is confusing — pick one strategy.

### 18. Hardcoded Static Data That Will Become Stale
**Severity:** Medium | **File:** `config/personal.config.ts:15`

`age: 20` is hardcoded. This will become incorrect over time. Either calculate from a birth date or remove it (it doesn't appear to be used in the rendered UI currently, but exists in the config).

### 19. `navigator.clipboard` Without Fallback in Multiple Components
**Severity:** Medium | **Files:**
- `components/cmdk/index.tsx:191,198`
- `components/content/heading-with-anchor.tsx:23`
- `components/ui/magicui/script-copy-btn.tsx:57`

Only `components/ui/code-snippets.tsx:120-141` implements a proper fallback. The others call `navigator.clipboard.writeText()` directly without try/catch, which will throw in insecure contexts (non-HTTPS, older browsers, or when permission is denied).

---

## Low Priority

### 20. Unused Imports
**Severity:** Low | **Files:**
- `features/home/components/bento/cards/project.tsx:3` — `Folder` imported from lucide-react but never used
- `features/project/utils/project-card-utils.tsx` — `ProjectTypeTag` component is defined but never exported or used

### 21. Typo in Config Key: "Librarys"
**Severity:** Low | **File:** `config/personal.config.ts:98`

`Librarys` should be `Libraries`. This key is used in `skillList` which doesn't appear to be rendered anywhere currently, but the typo would surface if it's ever displayed.

### 22. Inconsistent Component Export Patterns
**Severity:** Low | **Various files**

Mixed export styles across the codebase:
- Some components use `export const Component = () => {}` (e.g., `Hero`, `Footer`, `Navbar`)
- Some use `export function Component() {}` (e.g., `ConnectCard`, `SkillCard`, `CommandMenu`)
- `ProjectCard` uses `const` then `export { ProjectCard }` separately

AGENTS.md specifies arrow functions for components, but this is inconsistently followed.

### 23. Magic Number: Revalidation Durations
**Severity:** Low | **Files:**
- `features/home/data/gh-contribution.ts:11` — `86400`
- `features/home/data/lc-stats.ts:11` — `86400`
- `components/content/og-link.tsx:35` — `86400`
- `app/(main)/todo/page.tsx:15` — `300`

The revalidation duration `86400` (24 hours) is repeated across files. Should be extracted into a constants file.

### 24. Commented-Out Code Blocks
**Severity:** Low | **File:** `config/project.config.ts:108-321`

Over 200 lines of commented-out project entries. This is dead code that should live in git history, not in the source file.

### 25. Circular CSS Variable Reference
**Severity:** Low | **File:** `styles/globals.css:42`

```css
--font-mono: var(--font-mono);
```

This references itself, which is effectively a no-op. The actual `--font-mono` value comes from Next.js font injection via the `fontMono.variable` class. While it works because the CSS variable is set on `body` by the class, this self-reference in `:root` is confusing.

### 26. Missing `key` Prop Consistency
**Severity:** Low | **File:** `features/home/components/experience-card.tsx:89-90`

Uses `item` (the description string) as the `key` for list items. This works but is fragile — if two description items are identical, React will have key collisions. Use index or a more stable key.

### 27. Loading Spinner Uses `border-gray-900` Instead of Theme Colors
**Severity:** Low | **File:** `app/loading.tsx:4`

The loading spinner uses `border-gray-900 dark:border-white` instead of the theme's `border-foreground`. This breaks the design system's theming consistency.

---

## TODO/FIXME Inventory

No `TODO`, `FIXME`, `HACK`, or `XXX` comments were found in the application source code (`*.ts`, `*.tsx` files).

The only `WARN`/`WARNING` references found are in `.opencode/hooks/gsd-context-monitor.js` (lines 14, 18, 24, 80, 104, 135, 138), which is a development tool, not application code.

---

## Dependency Concerns

### Alpha/Pre-release Dependencies
| Package | Version | Concern |
|---------|---------|---------|
| `notion-to-md` | `4.0.0-alpha.7` | Alpha pre-release; unstable API, may have breaking changes |

### Unstable Next.js APIs Used
| API | File | Concern |
|-----|------|---------|
| `unstable_cache` | `features/home/data/lc-stats.ts` | Explicitly unstable; may be removed or renamed |

### Third-Party API Dependencies (No Package, Runtime)
| API | File | Concern |
|-----|------|---------|
| `github-contributions-api.jogruber.de` | `features/home/data/gh-contribution.ts` | Third-party unofficial API; no SLA, could disappear |
| `leetcode-query` (via npm) | `features/home/data/lc-stats.ts` | Scraping-based; LeetCode API changes could break it |

### Notable Version Observations
- All major dependencies (Next.js 15.3.8, React 19, Tailwind CSS 4) are recent/current — no outdated concerns here.
- `@radix-ui/*` packages are all on latest stable versions.
- No known security advisories at time of audit for the listed dependencies.

### Missing Dependencies
- No test framework installed (no `vitest`, `jest`, `playwright`, etc.) — zero test coverage.
- No linting configuration file (`.eslintrc`) — relies entirely on Next.js built-in lint.

---

## Recommendations

### Top 5 Things to Address First

1. **Fix the SSRF vulnerability in `/api/og`** (Critical)
   Add URL validation, reject private IP ranges, enforce HTTPS, and add rate limiting. Alternatively, if the route is unused (since `OgLink` fetches directly), remove it entirely.

2. **Lock down `next/image` remote patterns** (Critical)
   Replace the wildcard `hostname: "*"` with an explicit list of allowed hosts: `res.cloudinary.com`, `ik.imagekit.io`, `i.pinimg.com`, `github.com`, `www.hooman.digital`. This prevents abuse of the image optimization proxy.

3. **Fix the email typo and consolidate email references** (High)
   Change `"adiimaurya02@gamil.com"` to the correct address. Consolidate all email references to use `LinkData` instead of hardcoding in `components/cmdk/index.tsx:190`.

4. **Add error handling to GitHub contributions fetch** (High)
   Wrap with try/catch, check `response.ok`, and return an empty array on failure. The page should gracefully degrade if the third-party API is down.

5. **Fix the `ErrorState` client interactivity in server component** (Medium)
   The `onClick` handler in `app/(main)/todo/page.tsx:62` won't work in a server component context. Extract the retry button into a separate `"use client"` component or add the directive to the error state component.

### Additional Quick Wins
- Remove the non-existent `/about` route from `sitemap.ts`
- Fix `NOTION_PAGE_ID` env var name to match `.env` (`NOTION_TODO_PAGE_ID`)
- Delete 200+ lines of commented-out projects in `project.config.ts`
- Add `rel="noopener noreferrer"` to all `target="_blank"` links
- Extract `86400` revalidation constant into a shared config value
