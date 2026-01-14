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
          {/* Terminal Header */}
          <div className="px-2.5 py-2 bg-muted/70">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-red-500/80" />
                <span className="w-2 h-2 bg-yellow-500/80" />
                <span className="w-2 h-2 bg-green-500/80" />
              </div>
              <p className="text-[10px] font-mono text-muted-foreground truncate">~/blogs/{blog.slug}</p>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full aspect-[10/5] overflow-hidden border-b">
            <Image
              src={darkSrc}
              width={200}
              height={111}
              alt={blog.title}
              className="w-full aspect-[10/5] object-cover hidden dark:block"
            />
            <Image
              src={lightSrc}
              width={200}
              height={111}
              alt={blog.title}
              className="w-full aspect-[10/5] object-cover block dark:hidden"
            />
          </div>

          {/* Content */}
          <div className="p-2.5">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-green-500 text-xs font-mono flex-shrink-0 mt-0.5">→</span>
              <h2 className="text-sm font-mono font-bold leading-tight">{blog.title}</h2>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mb-2.5 line-clamp-2 pl-4">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 flex-wrap">
                {blog.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-[10px] font-mono bg-muted border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                <span className="text-xs pr-0.5">[</span>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <span className="text-xs pl-0.5">]</span>
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-2.5 py-1.5 flex items-center justify-between bg-muted/20">
            <span className="text-[10px] font-mono text-muted-foreground">$ cat readme.md</span>
            <span className="text-[10px] font-mono text-green-500">enter →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
