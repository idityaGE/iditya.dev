import Link from "next/link";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import { getAllBlogPostsMeta } from "@/lib/mdx";

export const BlogCard = async () => {
  const blogs = await getAllBlogPostsMeta();

  return (
    <div className="relative">
      <div className="relative p-6 h-full min-h-[200px] flex flex-col justify-between">
        <div className="relative z-10 cursor-default">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Latest Blog Posts
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore my thoughts on web development and technology
            </p>
          </div>

          <div className="flex flex-col space-y-3">

            {blogs.slice(0, 2).map(blog => (
              <Link href={`/blogs/${blog.slug}`} key={blog.slug}>
                <div className="border-l-2 border-primary/20 hover:border-l-4 hover:border-primary/60 pl-3 transition-all duration-300 ease-in-out">
                  <h4 className="text-sm font-medium">{blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
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
        
        <Link href="/blogs" className="h-full">
          <div className="relative z-10 flex items-center mt-7">
            <span className="text-base text-primary font-medium group-hover:underline">Read More</span>
            <ArrowUpRight className="h-4 w-4 ml-1 text-primary hidden group-hover:block" />
          </div>
        </Link>
      </div>
    </div>
  )
}
