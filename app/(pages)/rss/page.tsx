import { Rss } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSS Feeds",
  description: "Subscribe to RSS feeds for blogs, projects, or all content.",
};

const RssPage = () => {
  return (
    <div className="mt-10 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-medium font-grid mb-4">RSS Feeds</h1>
        <p className="text-base text-muted-foreground">
          Subscribe to get updates on my latest content. Choose your preferred
          feed type and format.
        </p>
      </header>

      <main className="flex flex-col gap-6">
        {/* All Content */}
        <div>
          <h2 className="text-lg font-medium font-mono mb-3">All Content</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/rss.xml"
              target="_blank"
              className="group flex items-center justify-between px-4 py-3 border hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Rss size={16} />
                <span className="text-sm font-medium font-mono group-hover:underline underline-offset-2">
                  RSS Feed
                </span>
              </div>
              <span className="text-xs text-muted-foreground">.xml</span>
            </Link>
            <Link
              href="/rss.json"
              target="_blank"
              className="group flex items-center justify-between px-4 py-3 border hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Rss size={16} />
                <span className="text-sm font-medium font-mono group-hover:underline underline-offset-2">
                  JSON Feed
                </span>
              </div>
              <span className="text-xs text-muted-foreground">.json</span>
            </Link>
            <Link
              href="/atom.xml"
              target="_blank"
              className="group flex items-center justify-between px-4 py-3 border hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Rss size={16} />
                <span className="text-sm font-medium font-mono group-hover:underline underline-offset-2">
                  Atom Feed
                </span>
              </div>
              <span className="text-xs text-muted-foreground">.xml</span>
            </Link>
          </div>
        </div>

        {/* Blogs Only */}
        <div>
          <h2 className="text-lg font-medium font-mono mb-3">Blogs Only</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/blogs/rss.xml"
              target="_blank"
              className="group flex items-center justify-between px-4 py-3 border hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Rss size={16} />
                <span className="text-sm font-medium font-mono group-hover:underline underline-offset-2">
                  RSS Feed
                </span>
              </div>
              <span className="text-xs text-muted-foreground">.xml</span>
            </Link>
          </div>
        </div>

        {/* Projects Only */}
        <div>
          <h2 className="text-lg font-medium font-mono mb-3">Projects Only</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/projects/rss.xml"
              target="_blank"
              className="group flex items-center justify-between px-4 py-3 border hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Rss size={16} />
                <span className="text-sm font-medium font-mono group-hover:underline underline-offset-2">
                  RSS Feed
                </span>
              </div>
              <span className="text-xs text-muted-foreground">.xml</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RssPage;
