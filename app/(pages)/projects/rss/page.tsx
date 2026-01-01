import { Rss } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects RSS Feed",
  description: "Subscribe to get updates on my latest projects.",
};

const ProjectsRssPage = () => {
  return (
    <div className="mt-10 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-medium font-grid mb-4">
          Projects RSS Feed
        </h1>
        <p className="text-base text-muted-foreground">
          Subscribe to get updates on my latest projects.
        </p>
      </header>

      <main className="flex flex-col gap-2">
        <Link
          href="/projects/rss.xml"
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
      </main>
    </div>
  );
};

export default ProjectsRssPage;
