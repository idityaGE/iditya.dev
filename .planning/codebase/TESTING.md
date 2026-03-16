# Testing

## Test Framework

**No test framework is configured.** The project has zero testing infrastructure.

- No test runner installed (no Jest, Vitest, Playwright, Cypress, or Testing Library in `package.json`)
- No test configuration files exist (no `jest.config.*`, `vitest.config.*`, `playwright.config.*`, or `.jest/`)
- `AGENTS.md:28-29` explicitly documents this:
  ```
  # No test framework configured
  # To run a single test: N/A (no tests exist)
  ```
- No `test` script in `package.json` -- only `dev`, `build`, `start`, and `lint`

## Test Coverage

**Zero test coverage.** No test files exist anywhere in the repository:

- No `*.test.ts` or `*.test.tsx` files
- No `*.spec.ts` or `*.spec.tsx` files
- No `__tests__/` directories
- No `tests/` or `test/` directory at the root

## Test Patterns

Not applicable -- no tests exist to establish patterns.

### Current quality assurance

The only automated quality checks are:

1. **TypeScript strict mode** (`tsconfig.json:7` -- `"strict": true`) catches type errors at build time
2. **Next.js ESLint** via `bun lint` (using the default `next lint` configuration -- no `.eslintrc` or `eslint.config.*` file exists, so it relies on Next.js built-in ESLint)
3. **Pre-push hook** (`.husky/pre-push`) runs `bun run build` before every push, which ensures the project compiles without errors

```bash
# .husky/pre-push
bun run build
```

This means type errors and build failures are caught before code reaches the remote, but there is no behavioral, integration, or unit testing.

## Gaps

### Missing entirely

- **Unit tests** for utility functions (`lib/utils.ts`, `lib/mdx.ts`, `lib/rss.ts`) -- these are pure functions with clear inputs/outputs that would be straightforward to test
- **Component tests** for feature components (`BlogCard`, `ProjectCard`, `Hero`, etc.)
- **Integration tests** for data fetching (`features/home/data/gh-contribution.ts`, `features/home/data/lc-stats.ts`)
- **MDX rendering tests** to verify that blog posts and project pages render correctly with their custom components
- **Accessibility tests** (the codebase includes `aria-label` attributes and `sr-only` spans, but nothing validates them)
- **Visual regression testing** for the terminal-themed design system
- **End-to-end tests** for user flows (navigation, theme toggle, command menu, RSS feeds)
- **API route tests** for the OG image endpoint and RSS feed generation

### High-value targets for first tests

If adding tests, the following areas would provide the most value:

1. **`lib/mdx.ts`** -- `getMDXSlugs()` and `getAllBlogPostsMeta()` are critical data paths with error handling that should be verified
2. **`lib/rss.ts`** -- RSS feed generation with multiple format outputs (`rss2`, `atom1`, `json1`)
3. **`lib/utils.ts`** -- `generateSlug()` and `getImageSrc()` are pure functions with edge cases
4. **`components/content/code.tsx`** -- complex parsing logic (language detection, title extraction) from children props
5. **RSS route handlers** in `app/(rss)/` -- verifying correct content-type headers and valid feed output

### Recommended framework

Given the tech stack (Next.js 15, React 19, Bun), **Vitest** would be the natural choice:
- Fast, native TypeScript support
- Compatible with React Testing Library for component tests
- Works well with Bun as a runtime
- Simpler configuration than Jest for modern ESM projects
