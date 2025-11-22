import { getAllBlogPostsMeta } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";
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
    <div>
      <div className="mb-8 mt-10 font-light">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Blogs</h1>
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                <Link
                  href="/blogs/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Rss size={24} aria-hidden="true" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Subscribe to RSS Feed</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-md text-muted-foreground">
            I like to write when I get stuck into some problem or learn
            something new which might help others. Here you'll find my thoughts,
            solutions, and discoveries from my coding journey.
          </p>
        </div>
      </div>

      <div className="border-b w-full" />

      <div
        className="relative border-b"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            color-mix(in srgb, currentColor 10%, transparent) 20px,
            color-mix(in srgb, currentColor 10%, transparent) 21px
          )`,
        }}
      >
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No blog posts available at the moment.</p>
            <p className="mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {posts.map((post, idx) => (
              <div key={idx} className="blog-grid-item">
                <BlogCard blog={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
