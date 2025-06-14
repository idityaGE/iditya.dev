import type { NextConfig } from "next";
import createMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'


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
  experimental: {
    mdxRs: true
  }
};

const mdx = createMdx({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default mdx(nextConfig);
