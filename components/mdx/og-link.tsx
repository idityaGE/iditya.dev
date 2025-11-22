"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Link2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface OgData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
}

export function OgLink({ url }: { url: string }) {
  const [ogData, setOgData] = useState<OgData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOgData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);

        if (!response.ok) throw new Error("Failed to fetch metadata");

        const data = await response.json();
        setOgData(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching OG data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchOgData();
    }
  }, [url]);

  // Extract domain from URL for display
  const domain = url ? new URL(url).hostname.replace("www.", "") : "";

  if (loading) {
    return <OgLinkSkeleton url={url} domain={domain} />;
  }

  if (error || !ogData) {
    // Fallback to a simple link
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 underline flex items-center gap-2 my-6"
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
            <div className="relative w-24 sm:w-28 md:w-32 lg:w-36 flex-shrink-0 m-2 ml-1 overflow-hidden rounded-md">
              <Image
                src={ogData.image}
                alt={ogData.title || url}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Card>
    </a>
  );
}

function OgLinkSkeleton({ url, domain }: { url: string; domain: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline block"
    >
      <Card className="overflow-hidden border my-6 animate-pulse">
        <div className="flex items-stretch min-h-[80px] px-3 md:px-6">
          <CardContent className="flex-1 min-w-0 py-2 px-1 flex flex-col justify-center">
            <div className="space-y-1.5">
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1 truncate">
                  <Link2 size={12} />
                  <span className="truncate">{domain || url}</span>
                </span>
                <ExternalLink
                  size={10}
                  className="ml-1 opacity-70 flex-shrink-0"
                />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </CardContent>

          <div className="relative w-24 sm:w-28 md:w-32 lg:w-36 flex-shrink-0 m-2 ml-0 overflow-hidden rounded-md bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}
