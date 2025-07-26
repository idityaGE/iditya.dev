import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });


    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const root = parse(html);

    // Extract Open Graph metadata
    const ogData = {
      title: getMetaContent(root, 'og:title') || getTitle(root),
      description: getMetaContent(root, 'og:description') || getMetaContent(root, 'description'),
      image: getMetaContent(root, 'og:image'),
      url: getMetaContent(root, 'og:url') || url,
      siteName: getMetaContent(root, 'og:site_name'),
    };

    return NextResponse.json(ogData);
  } catch (error) {
    console.error('Error fetching OG data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}

// Helper functions to extract metadata
function getMetaContent(root: any, property: string): string | null {
  const meta = root.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
  return meta ? meta.getAttribute('content') : null;
}

function getTitle(root: any): string | null {
  const titleTag = root.querySelector('title');
  return titleTag ? titleTag.text : null;
}
