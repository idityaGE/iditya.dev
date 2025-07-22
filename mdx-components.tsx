import type { MDXComponents } from 'mdx/types'
import { Callout } from "@/components/mdx/callout";
import { YouTube } from "@/components/mdx/youtube";
import { CommandBtn } from "@/components/mdx/command-btn";
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HeadingWithAnchor } from "@/components/mdx/heading-with-anchor";
import { OgLink } from "@/components/mdx/og-link";

import "@/styles/code.css"

//* ref: https://www.gatsbyjs.com/docs/how-to/routing/customizing-components/

const styles = {
  h1: 'text-3xl font-bold tracking-tight mb-4 mt-8 scroll-mt-20',
  h2: 'text-2xl font-bold tracking-tight mb-3 mt-6 scroll-mt-20 group',
  h3: 'text-xl font-bold tracking-tight mb-2 mt-5 scroll-mt-20 group',
  h4: 'text-lg font-bold tracking-tight mb-2 mt-4 scroll-mt-20 group',
  h5: 'text-base font-bold tracking-tight mb-2 mt-4 scroll-mt-20 group',
  h6: 'text-sm font-bold tracking-tight mb-2 mt-4 scroll-mt-20 group',
  p: 'leading-7 mb-4',
  a: 'text-blue-500 hover:text-blue-700 underline',
  ul: 'list-disc pl-6 mb-4',
  ol: 'list-decimal pl-6 mb-4',
  li: 'mb-1',
  blockquote: 'pl-4 border-l-4 border-gray-200 italic my-4',
  pre: 'p-4 rounded-lg overflow-auto my-4 hljs',
  strong: 'font-bold text-primary',
  em: 'italic text-muted-foreground',
  del: 'line-through text-muted-foreground',
  code: "px-1 py-0.5 bg-muted rounded font-mono text-sm",
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    YouTube,
    CommandBtn,
    OgLink,
    h1: ({ children }) => <HeadingWithAnchor level={1} className={styles.h1}>{children}</HeadingWithAnchor>,
    h2: ({ children }) => <HeadingWithAnchor level={2} className={styles.h2}>{children}</HeadingWithAnchor>,
    h3: ({ children }) => <HeadingWithAnchor level={3} className={styles.h3}>{children}</HeadingWithAnchor>,
    h4: ({ children }) => <HeadingWithAnchor level={4} className={styles.h4}>{children}</HeadingWithAnchor>,
    h5: ({ children }) => <HeadingWithAnchor level={5} className={styles.h5}>{children}</HeadingWithAnchor>,
    h6: ({ children }) => <HeadingWithAnchor level={6} className={styles.h6}>{children}</HeadingWithAnchor>,
    p: ({ children }) => <div className={styles.p}>{children}</div>,
    a: ({ href, children }) => <a href={href} className={styles.a}>{children}</a>,
    ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
    ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
    li: ({ children }) => <li className={styles.li}>{children}</li>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
    table: ({ children }) => <Table>{children}</Table>,
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => <TableHead className="font-bold">{children}</TableHead>,
    td: ({ children }) => <TableCell>{children}</TableCell>,
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em className={styles.em}>{children}</em>,
    del: ({ children }) => <del className={styles.del}>{children}</del>,
    pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
    hr: () => <hr className="my-4" />,

    code: ({ children, className }) => {
      const isInlineCode = typeof children === 'string';
      if (isInlineCode) return <code className={styles.code}>{children}</code>;
      return <code className={className}>{children}</code>;
    },

    img: ({ src, alt, width, height }) => {
      if (!src) return null
      return (
        <div className="my-4">
          <Image
            src={src}
            alt={alt || ""}
            width={Number(width) || 800}
            height={Number(height) || 450}
            className="rounded-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
            quality={90}
          />
        </div>
      )
    },

    ...components
  }
}
