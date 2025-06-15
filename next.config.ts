import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { remarkMdxToc } from "remark-mdx-toc";

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "metadata" }],
      [remarkMdxToc, { name: "toc" }]
    ],
    rehypePlugins: [
      rehypeHighlight
    ],
  },
});

export default withMDX(nextConfig);
