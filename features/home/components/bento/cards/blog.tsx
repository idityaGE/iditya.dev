import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import { getAllBlogPostsMeta } from "@/lib/mdx";
import { GreenArrow, Tag } from "@/components/ui/terminal";

export const BlogCard = async () => {
  const blogs = await getAllBlogPostsMeta();

  return (
    <div className="h-full flex flex-col">
      {/* Blog Entries */}
      <div className="flex-1 flex flex-col gap-px bg-border">
        {blogs.slice(0, 3).map((blog) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={blog.slug}
            className="group bg-background p-2.5 hover:bg-muted/30 transition-colors flex flex-col"
          >
            <div className="flex items-start gap-2 mb-1">
              <GreenArrow />
              <h4 className="text-xs font-mono font-bold group-hover:text-green-500 transition-colors line-clamp-1">
                {blog.title}
              </h4>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground line-clamp-2 pl-4 flex-1">
              {blog.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-1.5 pl-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-2.5 w-2.5 text-muted-foreground" />
                <span className="text-[9px] font-mono text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>
              {blog.tags?.slice(0, 1).map((tag) => (
                <Tag key={tag} size="xs">{tag}</Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <Link
        href="/blogs"
        className="px-2.5 py-1.5 border-t flex items-center justify-between bg-muted/10 hover:bg-muted/30 transition-colors group"
      >
        <span className="text-[10px] font-mono text-muted-foreground">$ cd /blogs</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono text-muted-foreground group-hover:text-green-500 transition-colors">
            show all ({blogs.length})
          </span>
          <ExternalLink size={10} className="text-muted-foreground group-hover:text-green-500 transition-colors" />
        </div>
      </Link>
    </div>
  );
};
