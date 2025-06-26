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

        if (!response.ok) throw new Error('Failed to fetch metadata');

        const data = await response.json();
        setOgData(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching OG data:', err);
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
        className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1.5"
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
      className="no-underline block my-6"
    >
      <Card className="overflow-hidden border hover:border-muted-foreground/40 transition-colors duration-150">
        <div className="flex flex-row items-center md:px-5">
          <CardContent className="flex-1 flex flex-col justify-between px-4">
            <div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <Link2 size={14} />
                  {ogData.siteName || domain}
                </span>
                <ExternalLink size={12} className="ml-1.5 opacity-70" />
              </div>
              <h3 className="font-medium text-lg mb-2 line-clamp-2">
                {ogData.title || url}
              </h3>
              {ogData.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {ogData.description}
                </p>
              )}
            </div>
          </CardContent>

          {ogData.image && (
            <div className="relative w-1/3 h-24 sm:h-32 mr-4 flex-shrink-0 overflow-hidden rounded-md">
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
    <Card className="overflow-hidden border my-6 animate-pulse">
      <div className="flex flex-row items-center">
        <CardContent className="flex-1 flex flex-col justify-between p-4">
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <Link2 size={14} />
                {domain || url}
              </span>
              <ExternalLink size={12} className="ml-1.5 opacity-70" />
            </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </CardContent>

        <div className="relative w-1/3 h-24 sm:h-32 mr-4 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
  );
}
