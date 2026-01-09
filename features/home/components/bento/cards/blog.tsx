import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { getAllBlogPostsMeta } from "@/lib/mdx";

export const BlogCard = async () => {
  const blogs = await getAllBlogPostsMeta();

  return (
    <div className="h-full w-full relative flex flex-col">
      {/* Terminal Header */}
      <div className="p-2.5 border-b">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">~/blogs</span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          $ cat latest --limit=3
        </div>
      </div>

      {/* Blog Entries */}
      <div className="flex-1 p-2.5 space-y-2">
        {blogs.slice(0, 3).map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.slug} className="block group">
            <div className="p-2 border border-transparent hover:border-border hover:bg-muted/30 transition-all">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-xs font-mono flex-shrink-0 mt-0.5">→</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-mono truncate group-hover:text-foreground text-muted-foreground">
                    {blog.title.length > 35 ? blog.title.slice(0, 35) + "..." : blog.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mt-0.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-2.5 w-2.5" />
                      <span>{blog.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <Link
        href="/blogs"
        className="border-t p-2 flex items-center justify-between group/readmore hover:bg-muted/30 transition-all"
      >
        <span className="text-[10px] font-mono text-muted-foreground">$ cd /blogs</span>
        <span className="text-[10px] font-mono text-green-500 group-hover/readmore:text-green-400">
          enter →
        </span>
      </Link>
    </div>
  );
};
