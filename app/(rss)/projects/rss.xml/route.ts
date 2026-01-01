import { 
  generateProjectsFeed, 
  formatFeedResponse 
} from '@/lib/rss';

export async function GET() {
  const feed = await generateProjectsFeed();
  return formatFeedResponse(feed, 'rss');
}
