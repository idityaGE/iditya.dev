import { getAllBlogPostsMeta } from "@/lib/mdx";
import { BlogCard } from "@/features/blog/components/blog-card";
import { TerminalHeader } from "@/components/shared/TerminalHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rss } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  BlinkingCursor,
} from "@/components/ui/terminal";

export const metadata: Metadata = {
  title: "Blogs",
  description: "My thoughts, solutions, and discoveries from my coding journey - technical articles and tutorials",
};

const Blogs = async () => {
  const posts = await getAllBlogPostsMeta();

  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <TerminalHeader 
        path="~/blogs"
        title="Blogs"
        subtitle={`(${posts.length} posts)`}
      />
      <div className="border-b bg-background p-3 flex justify-end -mt-[45px] relative z-10 pointer-events-none">
         <div className="pointer-events-auto">
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
        </div>
      </div>

      {/* Description Block */}
      <div className="border-b bg-background p-3 mb-8">
        <TerminalCommand className="mb-1.5">$ cat readme.md</TerminalCommand>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          I like to write when I get stuck into some problem or learn something new which might help others. 
          Here you'll find my thoughts, solutions, and discoveries from my coding journey.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="">
        {posts.length === 0 ? (
          <div className="bg-background p-6 text-center">
            <p className="text-xs font-mono text-muted-foreground">$ ls -la</p>
            <p className="text-sm font-mono text-muted-foreground mt-2">→ No blog posts found</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px p-px">
            {posts.map((post) => (
              <div key={post.slug} className="bg-background p-2">
                <BlogCard blog={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <TerminalPath>$ total: {posts.length} files</TerminalPath>
        <BlinkingCursor />
      </div>
    </div>
  );
};

export default Blogs;
