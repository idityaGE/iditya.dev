'use server'

import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { DefaultExporter } from 'notion-to-md/plugins/exporter';
import * as path from 'path';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function convertPage(pageId: string) {
  try {
    const outputPath = path.join(process.cwd(), 'content', 'todo.mdx');

    const exporter = new DefaultExporter({
      outputType: 'file',
      outputPath
    });

    const n2m = new NotionConverter(notion).withExporter(exporter);
    await n2m.convert(pageId);

    return async () => {
      const module = await import('@/content/todo.mdx');
      return module.default;
    };

  } catch (error) {
    console.error('Notion-to-md Conversion failed:', error);
    throw error;
  }
}
