import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/content/callout";
import { YouTube } from "@/components/content/youtube";
import { CommandBtn } from "@/components/content/command-btn";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeadingWithAnchor } from "@/components/content/heading-with-anchor";
import { OgLink } from "@/components/content/og-link";
import { Code } from "@/components/content/code";
import { MorphingImage } from "@/components/content/morphing-image";

const styles = {
  h1: "text-2xl font-bold font-mono tracking-tight mt-12 mb-6 scroll-m-20 first:mt-0 group flex items-center gap-3 before:content-['#'] before:text-green-500 before:text-lg before:font-normal",
  h2: "text-xl font-semibold font-mono tracking-tight mt-10 mb-5 scroll-m-20 border-b border-border pb-2 first:mt-0 group flex items-center gap-2 before:content-['##'] before:text-green-500/70 before:text-sm before:font-normal",
  h3: "text-lg font-semibold font-mono tracking-tight mt-8 mb-4 scroll-m-20 group flex items-center gap-2 before:content-['→'] before:text-green-500 before:text-sm",
  h4: "text-base font-semibold font-mono tracking-tight mt-6 mb-3 scroll-m-20 group text-foreground/90",
  h5: "text-sm font-semibold font-mono tracking-tight mt-5 mb-3 scroll-m-20 group text-muted-foreground",
  h6: "text-sm font-medium font-mono tracking-tight mt-4 mb-2 scroll-m-20 group text-muted-foreground uppercase tracking-wider",
  p: "leading-7 [&:not(:first-child)]:mt-5 text-sm font-mono text-foreground/90",
  a: "font-mono text-green-500 hover:text-green-400 underline underline-offset-4 decoration-green-500/30 hover:decoration-green-400 transition-colors",
  ul: "my-5 ml-2 space-y-2 font-mono text-sm list-none",
  ol: "my-5 ml-2 font-mono text-sm list-none",
  li: "leading-7 flex items-start gap-2",
  blockquote:
    "mt-6 mb-6 border-l-2 border-green-500 pl-4 py-2 font-mono text-sm text-muted-foreground bg-muted/30",
  strong: "font-semibold text-foreground",
  em: "italic text-muted-foreground",
  del: "line-through opacity-60",
  code: "relative bg-muted px-1.5 py-0.5 font-mono text-[13px] text-green-500",
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
          className="my-4 border"
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
      <a href={href} className={styles.a} target="_blank">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className={`${styles.ul} mdx-ul`}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className={`${styles.ol} mdx-ol`}>{children}</ol>
    ),
    li: ({ children }) => (
      <li className={styles.li}>
        <div className="min-w-0 w-full overflow-hidden">{children}</div>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto border">
        <Table className="font-mono text-sm">{children}</Table>
      </div>
    ),
    thead: ({ children }) => <TableHeader className="bg-muted/50">{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow className="border-border">{children}</TableRow>,
    th: ({ children }) => (
      <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{children}</TableHead>
    ),
    td: ({ children }) => <TableCell className="text-sm">{children}</TableCell>,
    strong: ({ children }) => (
      <strong className={styles.strong}>{children}</strong>
    ),
    em: ({ children }) => <em className={styles.em}>{children}</em>,
    del: ({ children }) => <del className={styles.del}>{children}</del>,
    hr: () => <hr className="my-8 border-border" />,

    pre: Code,

    code: ({ children, className }) => {
      if (className) return <code className={className}>{children}</code>;
      return <code className={styles.code}>{children}</code>;
    },

    img: ({ src, alt, width, height }) => {
      if (!src) return null;
      return (
        <MorphingImage
          src={src}
          alt={alt || ""}
          width={Number(width) || 800}
          height={Number(height) || 450}
        />
      );
    },

    ...components,
  };
}
