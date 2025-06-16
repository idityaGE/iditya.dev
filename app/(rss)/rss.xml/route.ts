import { NextRequest } from 'next/server';
import { 
  generateBlogsFeed, 
  generateProjectsFeed, 
  generateCombinedFeed,
  formatFeedResponse
} from '@/lib/rss';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type')?.toLowerCase();
  
  // Determine which feed to generate based on the type parameter
  if (type === 'blogs') {
    const feed = await generateBlogsFeed();
    return formatFeedResponse(feed, 'rss');
  } else if (type === 'projects') {
    const feed = generateProjectsFeed();
    return formatFeedResponse(feed, 'rss');
  } else {
    const feed = await generateCombinedFeed();
    return formatFeedResponse(feed, 'rss');
  }
}
