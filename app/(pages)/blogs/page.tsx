import { getAllBlogPostsMeta } from "@/lib/mdx";
import { BlogCard } from "@/features/blog/components/blog-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rss } from "lucide-react";
import Link from "next/link";

const Blogs = async () => {
  const posts = await getAllBlogPostsMeta();

  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">~/blogs</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold font-mono uppercase tracking-wider">Blogs</h1>
            <span className="text-[10px] font-mono text-muted-foreground">({posts.length} posts)</span>
          </div>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <Link
                href="/blogs/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">$ cat readme.md</div>
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
            {posts.map((post, idx) => (
              <div key={idx} className="bg-background p-2">
                <BlogCard blog={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">$ total: {posts.length} files</span>
        <span className="text-[10px] font-mono text-muted-foreground animate-pulse">█</span>
      </div>
    </div>
  );
};

export default Blogs;
