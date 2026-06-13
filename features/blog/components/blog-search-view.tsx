"use client";

import * as React from "react";
import Fuse from "fuse.js";
import { BlogCard } from "@/features/blog/components/blog-card";
import { Kbd } from "@/components/ui/kbd";
import {
  TerminalCommand,
  TerminalPath,
  BlinkingCursor,
  Tag,
} from "@/components/ui/terminal";
import type { BlogPostMeta } from "@/types";

type BlogPostMetaWithSlug = BlogPostMeta & { slug: string };

interface BlogSearchViewProps {
  posts: BlogPostMetaWithSlug[];
  allTags: string[];
}

export function BlogSearchView({ posts, allTags }: BlogSearchViewProps) {
  const [query, setQuery] = React.useState("");
  const [activeTags, setActiveTags] = React.useState<Set<string>>(new Set());
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Fuse.js instance — searches title, excerpt, and tags
  const fuse = React.useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "excerpt", weight: 0.3 },
          { name: "tags", weight: 0.2 },
        ],
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
      }),
    [posts],
  );

  // "/" shortcut to focus search, Escape to blur
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea/contenteditable
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        // Allow Escape to blur from the search input
        if (e.key === "Escape" && e.target === inputRef.current) {
          e.preventDefault();
          inputRef.current?.blur();
        }
        return;
      }

      // "/" focuses the search input
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Toggle a tag filter
  const toggleTag = React.useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }, []);

  // Clear all filters
  const clearFilters = React.useCallback(() => {
    setActiveTags(new Set());
    setQuery("");
    inputRef.current?.blur();
  }, []);

  // Compute filtered posts
  const filteredPosts = React.useMemo(() => {
    let results = posts;

    // Apply text search via Fuse.js
    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item);
    }

    // Apply tag filter (OR logic — match ANY selected tag)
    if (activeTags.size > 0) {
      results = results.filter((post) =>
        post.tags.some((tag) => activeTags.has(tag)),
      );
    }

    return results;
  }, [posts, query, activeTags, fuse]);

  const hasActiveFilters = query.trim().length > 0 || activeTags.size > 0;

  return (
    <div>
      {/* Search & Filters */}
      <div className="border-b bg-background p-3 mb-4">
        <TerminalCommand className="mb-2">$ grep -i</TerminalCommand>
        <div className="relative">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-green-500 text-xs font-mono">$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search posts..."
            aria-label="Search blog posts"
            role="searchbox"
            className="w-full bg-muted/50 border text-xs font-mono text-foreground placeholder:text-muted-foreground pl-7 pr-12 py-2 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-colors"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Kbd className="text-[10px]">/</Kbd>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 mt-2 overflow-x-auto scrollbar-none"
          role="group"
          aria-label="Filter by tags"
        >
          <button
            onClick={clearFilters}
            aria-pressed={!hasActiveFilters}
            className="transition-colors shrink-0"
          >
            <Tag
              size="sm"
              className={
                !hasActiveFilters
                  ? "bg-green-500/10 border-green-500/30 text-green-500 cursor-pointer"
                  : "cursor-pointer hover:text-foreground hover:border-foreground/30"
              }
            >
              all
            </Tag>
          </button>
          {allTags.map((tag) => {
            const isActive = activeTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={isActive}
                className="transition-colors shrink-0"
              >
                <Tag
                  size="sm"
                  className={
                    isActive
                      ? "bg-green-500/10 border-green-500/30 text-green-500 cursor-pointer"
                      : "cursor-pointer hover:text-foreground hover:border-foreground/30"
                  }
                >
                  {tag}
                </Tag>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div aria-live="polite" aria-atomic="false">
        {filteredPosts.length === 0 ? (
          <div className="bg-background p-6 text-center border-b">
            <p className="text-xs font-mono text-muted-foreground">
              <span className="text-green-500">$</span> grep: no matches found
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-mono text-green-500 mt-2 hover:underline underline-offset-4"
              >
                → clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-px">
            {filteredPosts.map((post) => (
              <div key={post.slug} className="bg-background mb-4 px-2">
                <BlogCard blog={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <TerminalPath>
          $ results: {filteredPosts.length}/{posts.length} files
        </TerminalPath>
        <BlinkingCursor />
      </div>
    </div>
  );
}
