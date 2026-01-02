import type { BlogPostMeta } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { getImageSrc } from "@/utils";

export function BlogCard({
  blog,
}: {
  blog: BlogPostMeta & {
    slug: string;
  };
}) {
  const darkSrc = getImageSrc(blog.darkImage);
  const lightSrc = getImageSrc(blog.lightImage);

  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="relative group/blog-card">
        {/* Shadow layer that stays in place */}
        <div className="absolute inset-0 border bg-muted opacity-0 group-hover/blog-card:opacity-100 transition-opacity duration-200" />

        {/* Main card that moves on hover */}
        <div className="relative w-full h-full overflow-hidden border bg-background transition-transform duration-200 group-hover/blog-card:-translate-x-1 group-hover/blog-card:-translate-y-1">
          <div className="w-full aspect-[10/5] overflow-hidden border-b">
            {/* Dark mode image */}
            <Image
              src={darkSrc}
              width={200}
              height={111}
              alt={blog.title}
              className="w-full aspect-[10/5] object-cover hidden dark:block"
            />
            {/* Light mode image */}
            <Image
              src={lightSrc}
              width={200}
              height={111}
              alt={blog.title}
              className="w-full aspect-[10/5] object-cover block dark:hidden"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg mb-2 font-mono">{blog.title}</h2>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {blog.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-muted border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground uppercase">
                [&nbsp;
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                &nbsp;]
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
