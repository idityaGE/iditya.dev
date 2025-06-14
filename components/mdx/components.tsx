import { cn } from "@/lib/utils";
import Image from "next/image";
import { Callout } from "./callout";
import { YouTube } from "./youtube";
import { CommandBtn } from "./command-btn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type MarkdownComponentProps = {
  node?: any;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

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

  table: ({ children }: MarkdownComponentProps) => (
    <div className="w-full overflow-auto mb-4">
      <Table>{children}</Table>
    </div>
  ),
  thead: ({ children }: MarkdownComponentProps) =>
    <TableHeader>{children}</TableHeader>,
  tbody: ({ children }: MarkdownComponentProps) =>
    <TableBody>{children}</TableBody>,
  tr: ({ children }: MarkdownComponentProps) =>
    <TableRow>{children}</TableRow>,
  th: ({ children }: MarkdownComponentProps) =>
    <TableHead className="font-bold">{children}</TableHead>,
  td: ({ children }: MarkdownComponentProps) =>
    <TableCell>{children}</TableCell>,

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
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-4 md:my-8", className)} {...props} />
  ),

  // Code blocks with theme support
  code: ({ node, inline, className, children, ...props }: MarkdownComponentProps) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <pre className={cn(
        "mb-4 mt-4 overflow-x-auto rounded-lg p-4",
        "bg-muted font-mono text-sm"
      )}>
        <code className={cn(className, 'hljs', "rounded-lg")} {...props}>
          {children}
        </code>
      </pre>
    ) : (
      <code className={cn(
        "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
        "bg-muted text-muted-foreground",
        className
      )} {...props}>
        {children}
      </code>
    );
  },

  Image: OptimizedImage,
  Callout,
  YouTube,
  CommandBtn
} as const;
