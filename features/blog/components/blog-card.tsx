import type { BlogPostMeta } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { getImageSrc } from "@/lib/utils";
import {
  TrafficLightDots,
  TerminalPath,
  GreenArrow,
  Tag,
} from "@/components/ui/terminal";

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
              <TrafficLightDots />
              <TerminalPath className="truncate">~/blogs/{blog.slug}</TerminalPath>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full aspect-[10/5] overflow-hidden border-b">
            <Image
              src={darkSrc}
              width={400}
              height={200}
              alt={blog.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full aspect-[10/5] object-cover hidden dark:block"
            />
            <Image
              src={lightSrc}
              width={400}
              height={200}
              alt={blog.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full aspect-[10/5] object-cover block dark:hidden"
            />
          </div>

          {/* Content */}
          <div className="p-2.5">
            <div className="flex items-start gap-2 mb-2">
              <GreenArrow className="mt-0.5" />
              <h2 className="text-sm font-mono font-bold leading-tight group-hover/blog-card:text-green-500 transition-colors line-clamp-2">{blog.title}</h2>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mb-2.5 line-clamp-2 pl-4">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 flex-wrap">
                {blog.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <TerminalPath>
                <span className="text-xs pr-0.5">[</span>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <span className="text-xs pl-0.5">]</span>
              </TerminalPath>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-2.5 py-1.5 flex items-center justify-between bg-muted/20">
            <TerminalPath>$ cat readme.md</TerminalPath>
            <span className="text-[10px] font-mono text-green-500">enter →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
