import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { YouTube } from "@/components/mdx/youtube";
import { CommandBtn } from "@/components/mdx/command-btn";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeadingWithAnchor } from "@/components/mdx/heading-with-anchor";
import { OgLink } from "@/components/mdx/og-link";
import { Code } from "@/components/mdx/code";

//* ref: https://www.gatsbyjs.com/docs/how-to/routing/customizing-components/
const styles = {
  h1: "text-3xl tracking-tight mb-4 mt-8 scroll-mt-20 group font-semibold",
  h2: "text-2xl tracking-tight mb-4 mt-6 scroll-mt-20 group font-semibold",
  h3: "text-xl tracking-tight mb-2 mt-5 scroll-mt-20 group font-semibold",
  h4: "text-lg tracking-tight mb-2 mt-4 scroll-mt-20 group font-semibold",
  h5: "text-md tracking-tight mb-2 mt-4 scroll-mt-20 group font-semibold",
  h6: "text-base tracking-tight mb-2 mt-4 scroll-mt-20 group font-semibold",
  p: "leading-7.5 mb-6 md:mb-8 text-gray-700 dark:text-gray-300 text-xl",
  a: "text-muted-foreground hover:text-blue-700 underline",
  ul: "list-disc pl-8 mb-6",
  ol: "list-decimal pl-8 mb-8",
  li: "my-3 text-gray-700 dark:text-gray-300",
  blockquote: "pl-4 border-l-4 border-gray-200 italic my-4",
  strong: "font-bold text-gray-900 dark:text-gray-100",
  em: "italic text-muted-foreground",
  del: "line-through text-muted-foreground",
  code: "px-1.5 py-0.5 bg-muted rounded font-mono! text-base text-red-700",
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    YouTube,
    CommandBtn,
    OgLink,
    Image: ({ src, alt, width, height }) => {
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={Number(width) || 800}
          height={Number(height) || 450}
          className="rounded-lg my-4"
          style={{ maxWidth: "100%", height: "auto" }}
          quality={90}
        />
      );
    },
    h1: ({ children }) => (
      <HeadingWithAnchor level={1} className={styles.h1}>
        {children}
      </HeadingWithAnchor>
    ),
    h2: ({ children }) => (
      <HeadingWithAnchor level={2} className={styles.h2}>
        {children}
      </HeadingWithAnchor>
    ),
    h3: ({ children }) => (
      <HeadingWithAnchor level={3} className={styles.h3}>
        {children}
      </HeadingWithAnchor>
    ),
    h4: ({ children }) => (
      <HeadingWithAnchor level={4} className={styles.h4}>
        {children}
      </HeadingWithAnchor>
    ),
    h5: ({ children }) => (
      <HeadingWithAnchor level={5} className={styles.h5}>
        {children}
      </HeadingWithAnchor>
    ),
    h6: ({ children }) => (
      <HeadingWithAnchor level={6} className={styles.h6}>
        {children}
      </HeadingWithAnchor>
    ),
    p: ({ children }) => <p className={styles.p}>{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className={styles.a}>
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
    ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
    li: ({ children }) => <li className={styles.li}>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    table: ({ children }) => <Table>{children}</Table>,
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => (
      <TableHead className="font-bold">{children}</TableHead>
    ),
    td: ({ children }) => <TableCell>{children}</TableCell>,
    strong: ({ children }) => (
      <strong className={styles.strong}>{children}</strong>
    ),
    em: ({ children }) => <em className={styles.em}>{children}</em>,
    del: ({ children }) => <del className={styles.del}>{children}</del>,
    hr: () => <hr className="my-6 border" />,

    pre: Code,

    code: ({ children, className }) => {
      if (className) return <code className={className}>{children}</code>;
      return <code className={styles.code}>{children}</code>;
    },

    img: ({ src, alt, width, height }) => {
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={Number(width) || 800}
          height={Number(height) || 450}
          className="rounded-lg my-4"
          style={{ maxWidth: "100%", height: "auto" }}
          quality={90}
        />
      );
    },

    ...components,
  };
}
