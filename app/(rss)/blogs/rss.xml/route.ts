import { 
  generateBlogsFeed, 
  formatFeedResponse 
} from '@/lib/rss';

export async function GET() {
  const feed = await generateBlogsFeed();
  return formatFeedResponse(feed, 'rss');
}
