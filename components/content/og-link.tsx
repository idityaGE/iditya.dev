import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Link2 } from "lucide-react";
import { parse } from "node-html-parser";
import { getMetaContent, getTitle } from "@/lib/og";

interface OgData {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string;
  siteName: string | null;
}

async function fetchOgData(url: string): Promise<OgData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const root = parse(html);

    return {
      title: getMetaContent(root, "og:title") || getTitle(root),
      description: getMetaContent(root, "og:description") || getMetaContent(root, "description"),
      image: getMetaContent(root, "og:image"),
      url: getMetaContent(root, "og:url") || url,
      siteName: getMetaContent(root, "og:site_name"),
    };
  } catch (error) {
    console.error("Error fetching OG data:", error);
    return null;
  }
}

export async function OgLink({ url }: { url: string }) {
  const ogData = await fetchOgData(url);
  
  // Extract domain from URL for display
  const domain = url ? new URL(url).hostname.replace("www.", "") : "";

  // Fallback to a simple link if no OG data
  if (!ogData) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-400 underline underline-offset-4 decoration-green-500/30 flex items-center gap-2 my-6 font-mono text-sm"
      >
        <Link2 size={16} />
        <span>{url}</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/og-link relative block my-6 no-underline"
    >
      {/* Shadow layer that stays in place */}
      <div className="absolute inset-0 border bg-muted opacity-0 transition-opacity duration-200 group-hover/og-link:opacity-100" />

      <Card className="relative overflow-hidden border transition-all duration-300 ease-in-out group-hover/og-link:-translate-x-1 group-hover/og-link:-translate-y-1">
        <div className="flex items-stretch min-h-[80px] px-2 md:px-6">
          <CardContent className="flex-1 min-w-0 px-1 flex flex-col justify-center">
            <div className="space-y-1.5">
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1 truncate">
                  <Link2 size={12} />
                  <span className="truncate">{ogData.siteName || domain}</span>
                </span>
                <ExternalLink
                  size={10}
                  className="ml-1 opacity-70 flex-shrink-0"
                />
              </div>
              <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-1 text-foreground">
                {ogData.title || url}
              </h3>
              {ogData.description && (
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {ogData.description}
                </p>
              )}
            </div>
          </CardContent>

          {ogData.image && (
            <div className="relative w-24 sm:w-28 md:w-32 lg:w-36 flex-shrink-0 m-2 ml-1 overflow-hidden">
              <Image
                src={ogData.image}
                alt={ogData.title || url}
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Card>
    </a>
  );
}
