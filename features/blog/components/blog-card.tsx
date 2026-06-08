import type { BlogPostMeta } from "@/types";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { getImageSrc } from "@/lib/utils";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
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
  const blogUrl = `/blogs/${blog.slug}`;
  const blogAriaLabel = `Read blog post: ${blog.title}`;

  return (
    <div className="relative group/blog-card">
      {/* Shadow layer that stays in place */}
      <div className="absolute inset-0 border bg-muted opacity-0 group-hover/blog-card:opacity-100 transition-opacity duration-200" />

      {/* Main card that moves on hover */}
      <div className="relative flex flex-col overflow-hidden transition-transform duration-200 bg-background border group-hover/blog-card:-translate-x-1 group-hover/blog-card:-translate-y-1">
        {/* Terminal Header */}
        <div className="px-2 py-1.5 bg-muted/70">
          <div className="flex items-center gap-2">
            <TrafficLightDots />
            <TerminalPath
              className="truncate"
              style={{ viewTransitionName: `blog-path-${blog.slug}` } as React.CSSProperties}
            >
              ~/blogs/{blog.slug}
            </TerminalPath>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row">
          {/* Content Section */}
          <div className="flex flex-col w-full md:w-2/3 min-h-0 gap-px">
            {/* Title & Description Block */}
            <div className="bg-background p-1.5 h-full">
              <TerminalCommand className="mb-1">$ info</TerminalCommand>
              <Link
                href={blogUrl}
                className="block group/link"
                aria-label={blogAriaLabel}
              >
                <div className="flex items-start gap-2 mb-1">
                  <GreenArrow />
                  <h2
                    className="text-md font-mono font-bold line-clamp-1 group-hover/blog-card:text-green-500 transition-colors"
                    style={{ viewTransitionName: `blog-title-${blog.slug}` } as React.CSSProperties}
                  >
                    {blog.title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-muted-foreground line-clamp-2 pl-4">
                  {blog.excerpt}
                </p>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border-t">
              {/* Tags Block */}
              <div className="bg-background p-1.5 border-r">
                <TerminalCommand className="mb-1">$ tags</TerminalCommand>
                <div className="relative max-h-[52px] overflow-hidden">
                  <div
                    className="flex items-start gap-1 flex-wrap"
                    style={{ viewTransitionName: `blog-tags-${blog.slug}` } as React.CSSProperties}
                  >
                    {blog.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} className="cursor-default">
                        {tag}
                      </Tag>
                    ))}
                    {blog.tags.length > 3 && (
                      <Tag className="cursor-default">
                        +{blog.tags.length - 3}
                      </Tag>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta Block */}
              <div className="bg-background p-1.5 border-t md:border-t-0">
                <TerminalCommand className="mb-1">$ meta</TerminalCommand>
                <div
                  className="flex flex-col gap-1 mt-auto flex-shrink-0 py-1 md:py-0"
                  style={{ viewTransitionName: `blog-meta-${blog.slug}` } as React.CSSProperties}
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    <span className="text-green-500">→</span>{" "}
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    <span className="text-green-500">→</span> {blog.author}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/3 h-40 md:h-auto flex-shrink-0 border-b md:border-b-0 md:border-l">
            <Link
              href={blogUrl}
              aria-label={blogAriaLabel}
              className="block w-full h-full"
            >
              <div
                className="relative w-full h-full min-h-[120px]"
                style={{ viewTransitionName: `blog-image-${blog.slug}` } as React.CSSProperties}
              >
                <Image
                  src={darkSrc}
                  alt={blog.title}
                  fill
                  className="object-cover hidden dark:block"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
                <Image
                  src={lightSrc}
                  alt={blog.title}
                  fill
                  className="object-cover block dark:hidden"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Link
          href={blogUrl}
          className="border-t px-2.5 py-1.5 flex items-center justify-between bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <TerminalPath>$ cat {blog.slug}.mdx</TerminalPath>
          <span className="text-xs font-mono text-green-500">enter →</span>
        </Link>
      </div>
    </div>
  );
}
