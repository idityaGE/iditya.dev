'use server'

import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function convertPage(pageId: string) {
  try {
    const n2m = new NotionConverter(notion);
    const result = await n2m.convert(pageId);
    return result.content;
    
  } catch (error) {
    console.error('Notion-to-md Conversion failed:', error);
    throw error;
  }
}
