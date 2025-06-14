export interface BlogPostMeta {
  title: string;
  date: string;
  tags: string[];
  author: string;
  excerpt: string;
  coverImage: string;
};

declare module '*.mdx' {
  interface MDXContent {
    (props: any): JSX.Element;
    metadata?: BlogPostMeta;
  }
  const MDXContent: MDXContent;
  export default MDXContent;
  export const metadata: BlogPostMeta;
}
