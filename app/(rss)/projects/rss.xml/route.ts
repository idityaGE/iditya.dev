import { 
  generateProjectsFeed, 
  formatFeedResponse 
} from '@/lib/rss';

export async function GET() {
  const feed = generateProjectsFeed();
  return formatFeedResponse(feed, 'rss');
}
