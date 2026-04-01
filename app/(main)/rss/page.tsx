import { Rss } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  BlinkingCursor,
} from "@/components/ui/terminal";

export const metadata: Metadata = {
  title: "RSS Feeds",
  description: "Subscribe to RSS feeds for blogs, projects, or all content.",
};

interface FeedLink {
  href: string;
  label: string;
  format: string;
}

const allFeeds: FeedLink[] = [
  { href: "/rss.xml", label: "RSS Feed", format: ".xml" },
  { href: "/rss.json", label: "JSON Feed", format: ".json" },
  { href: "/atom.xml", label: "Atom Feed", format: ".xml" },
];

const blogFeeds: FeedLink[] = [
  { href: "/blogs/rss.xml", label: "RSS Feed", format: ".xml" },
];

const projectFeeds: FeedLink[] = [
  { href: "/projects/rss.xml", label: "RSS Feed", format: ".xml" },
];

function FeedGroup({
  command,
  feeds,
}: {
  command: string;
  feeds: FeedLink[];
}) {
  return (
    <div className="border-b bg-background">
      <div className="px-3 py-2 border-b bg-muted/20">
        <TerminalCommand>{command}</TerminalCommand>
      </div>
      <div className="flex flex-col gap-px bg-border">
        {feeds.map((feed) => (
          <Link
            key={feed.href}
            href={feed.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-3 py-2.5 bg-background hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GreenArrow />
              <Rss size={12} className="text-muted-foreground group-hover:text-green-500 transition-colors" />
              <span className="text-xs font-mono font-bold group-hover:text-green-500 transition-colors">
                {feed.label}
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {feed.format}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const RssPage = () => {
  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrafficLightDots />
          <TerminalPath>~/rss</TerminalPath>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider">RSS Feeds</h1>
          <TerminalPath>({allFeeds.length + blogFeeds.length + projectFeeds.length} feeds)</TerminalPath>
        </div>
      </div>

      {/* Description Block */}
      <div className="border-b bg-background p-3">
        <TerminalCommand className="mb-1.5">$ cat readme.md</TerminalCommand>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          Subscribe to get updates on new content. Choose your preferred feed format.
        </p>
      </div>

      {/* Feed Groups */}
      <div className="mt-8">
        <FeedGroup command="$ feeds --scope all" feeds={allFeeds} />
        <FeedGroup command="$ feeds --scope blogs" feeds={blogFeeds} />
        <FeedGroup command="$ feeds --scope projects" feeds={projectFeeds} />
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <TerminalPath>$ total: {allFeeds.length + blogFeeds.length + projectFeeds.length} feeds</TerminalPath>
        <BlinkingCursor />
      </div>
    </div>
  );
};

export default RssPage;
