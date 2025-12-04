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
  h1: "text-4xl font-bold tracking-tight mt-10 mb-6 scroll-m-20 first:mt-0 group",
  h2: "text-3xl font-semibold tracking-tight mt-10 mb-6 scroll-m-20 border-b pb-2 first:mt-0 group",
  h3: "text-2xl font-semibold tracking-tight mt-8 mb-4 scroll-m-20 group",
  h4: "text-xl font-semibold tracking-tight mt-6 mb-4 scroll-m-20 group",
  h5: "text-lg font-semibold tracking-tight mt-6 mb-4 scroll-m-20 group",
  h6: "text-base font-semibold tracking-tight mt-6 mb-4 scroll-m-20 group",
  p: "leading-7 [&:not(:first-child)]:mt-6 text-base",
  a: "font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors",
  ul: "my-6 ml-6 list-disc [&>li]:mt-2",
  ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
  li: "leading-7",
  blockquote:
    "mt-6 border-l-4 pl-6 py-2 pr-4 italic text-muted-foreground bg-muted/40 rounded-r-lg",
  strong: "font-semibold",
  em: "italic",
  del: "line-through opacity-70",
  code: "relative rounded bg-muted px-[0.25rem] py-[0.15rem] font-mono text-sm border",
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
