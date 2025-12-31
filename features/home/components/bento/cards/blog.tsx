import Link from "next/link";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import { getAllBlogPostsMeta } from "@/lib/mdx";

export const BlogCard = async () => {
  const blogs = await getAllBlogPostsMeta();

  return (
    <div className="h-full w-full relative">
      <div className="p-4 pb-12 h-full flex flex-col justify-between">
        <div className="relative z-10 cursor-default">
          <div className="mb-6">
            <h3 className="text-xl mb-1 font-grid">Latest Blog Posts</h3>
            <p className="text-sm text-muted-foreground">
              Explore my thoughts on web development and technology
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {blogs.slice(0, 3).map((blog) => (
              <Link href={`/blogs/${blog.slug}`} key={blog.slug}>
                <div className="border-l-2 border-primary/20 hover:border-l-4 hover:border-primary/60 pl-3 transition-all duration-300 ease-in-out">
                  <h4 className="text-sm font-medium font-mono">
                    {blog.title.length > 40
                      ? blog.title.slice(0, 40) + "..."
                      : blog.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                    <User className="h-3 w-3 ml-2" />
                    <span>{blog.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/blogs"
        className="absolute bottom-0 right-0 p-4 group/readmore z-20"
      >
        <div className="flex font-light items-baseline gap-1">
          <span className="text-xs text-primary group-hover/readmore:underline">
            READ MORE
          </span>
          <span>&gt;</span>
        </div>
      </Link>
    </div>
  );
};
