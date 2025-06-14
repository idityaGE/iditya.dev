import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import Image from "next/image";
import { Callout } from "./callout";
import { YouTube } from "./youtube";
import { CommandBtn } from "./command-btn";

const headingClasses = {
  base: "scroll-m-20 font-semibold tracking-tight mdx-heading",
  h1: "mt-2 text-4xl font-bold",
  h2: "mt-10 pb-1 text-3xl first:mt-0",
  h3: "mt-8 text-2xl",
  h4: "mt-8 text-xl",
  h5: "mt-8 text-lg",
  h6: "mt-8 text-base",
};

const OptimizedImage = ({
  className,
  alt = "Blog image",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { src, width, height, ...restProps } = props;

  if (!src) return null;

  return (
    <div className="my-6 overflow-hidden rounded-md border">
      <Image
        src={src as string}
        alt={alt}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 600}
        className={cn("h-auto w-full object-cover", className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfASXWnydAEAAAbKpd"
        loading="lazy"
        {...restProps}
      />
    </div>
  );
};

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(headingClasses.h1, headingClasses.base.replace('mdx-heading', ''), className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(headingClasses.h2, headingClasses.base, className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(headingClasses.h3, headingClasses.base, className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(headingClasses.h4, headingClasses.base.replace('mdx-heading', ''), className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(headingClasses.h5, headingClasses.base.replace('mdx-heading', ''), className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(headingClasses.h6, headingClasses.base.replace('mdx-heading', ''), className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: OptimizedImage,
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-4 md:my-8", className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted/50", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
        className
      )}
      {...props}
    />
  ),
  Image: OptimizedImage,
  Callout,
  YouTube,
  CommandBtn
} as const;
