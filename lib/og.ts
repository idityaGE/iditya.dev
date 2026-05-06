import { parse } from 'node-html-parser';

export function getMetaContent(root: ReturnType<typeof parse>, property: string): string | null {
  const meta = root.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
  return meta?.getAttribute('content') ?? null;
}

export function getTitle(root: ReturnType<typeof parse>): string | null {
  const titleTag = root.querySelector('title');
  return titleTag ? titleTag.text : null;
}