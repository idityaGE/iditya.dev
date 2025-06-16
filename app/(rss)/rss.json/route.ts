import { 
  generateCombinedFeed, 
  formatFeedResponse 
} from '@/lib/rss';

export async function GET() {
  const feed = await generateCombinedFeed();
  return formatFeedResponse(feed, 'json');
}
