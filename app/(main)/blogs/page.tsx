import { getAllBlogPostsMeta } from "@/lib/mdx";
import { TerminalHeader } from "@/components/shared/TerminalHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rss } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { TerminalCommand } from "@/components/ui/terminal";
import { BlogSearchView } from "@/features/blog/components/blog-search-view";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "My thoughts, solutions, and discoveries from my coding journey - technical articles and tutorials",
};

const Blogs = async () => {
  const posts = await getAllBlogPostsMeta();

  // Extract unique tags across all posts, sorted alphabetically
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags)),
  ).sort();

  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <TerminalHeader
        path="~/blogs"
        title="Blogs"
        subtitle={`(${posts.length} posts)`}
        actions={
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <Link
                href="/blogs/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Subscribe to blog RSS feed"
              >
                <Rss size={14} aria-hidden="true" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-mono">$ subscribe --rss</p>
            </TooltipContent>
          </Tooltip>
        }
      />

      {/* Description Block */}
      <div className="border-b bg-background p-3 mb-4">
        <TerminalCommand className="mb-1.5">$ cat readme.md</TerminalCommand>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          I like to write when I get stuck into some problem or learn something
          new which might help others. Here you'll find my thoughts, solutions,
          and discoveries from my coding journey.
        </p>
      </div>

      {/* Search, Filter & Blog List */}
      <BlogSearchView posts={posts} allTags={allTags} />
    </div>
  );
};

export default Blogs;
