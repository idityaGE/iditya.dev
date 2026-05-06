import { parse } from 'node-html-parser';

export interface OgData {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string;
  siteName: string | null;
}

function getMetaContent(root: ReturnType<typeof parse>, property: string): string | null {
  const meta = root.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
  return meta?.getAttribute('content') ?? null;
}

function getTitle(root: ReturnType<typeof parse>): string | null {
  const titleTag = root.querySelector('title');
  return titleTag ? titleTag.text : null;
}

export function extractOgData(root: ReturnType<typeof parse>, fallbackUrl: string): OgData {
  return {
    title: getMetaContent(root, 'og:title') || getTitle(root),
    description: getMetaContent(root, 'og:description') || getMetaContent(root, 'description'),
    image: getMetaContent(root, 'og:image'),
    url: getMetaContent(root, 'og:url') || fallbackUrl,
    siteName: getMetaContent(root, 'og:site_name'),
  };
}
