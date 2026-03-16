import { getNotionPage } from "@/server/notion-to-mdx";
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import type { MDXComponents } from "mdx/types";
import remarkGfm from 'remark-gfm'
import { Suspense } from "react";
import { RefreshCw } from "lucide-react";
import type { Metadata } from "next";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  AvailabilityDot,
  Tag,
} from "@/components/ui/terminal";

export const metadata: Metadata = {
  title: "To-Do List",
  description: "My personal to-do list synced from Notion",
};

export const revalidate = 300; // revalidate every 5 minutes
export const dynamic = 'force-dynamic';

// Define MDX components directly to avoid calling hook-named function at module level
const todoComponents: MDXComponents = {
  ul: ({ children }) => <ul className="list-none pl-4 space-y-1">{children}</ul>,
  li: ({ children }) => <li className="text-xs font-mono flex items-start gap-2"><span className="text-green-500 flex-shrink-0">-&gt;</span><span>{children}</span></li>,
  p: ({ children }) => <p className="mb-3 text-xs font-mono text-muted-foreground">{children}</p>
};

const mdxOptions: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
    ],
  }
};

const SKELETON_ITEMS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4", "skeleton-5"] as const;

const TodoSkeleton = () => (
  <div className="space-y-2 p-3">
    <div className="h-4 w-32 bg-muted" />
    <div className="h-4 w-48 bg-muted" />
    <div className="space-y-1.5 mt-3">
      {SKELETON_ITEMS.map((id) => (
        <div key={id} className="flex items-center gap-2">
          <div className="h-3 w-3 bg-muted" />
          <div className="h-4 w-full bg-muted" />
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = () => (
  <div className="border bg-background">
    <div className="px-3 py-2 border-b bg-muted/20">
      <span className="text-[10px] font-mono text-red-500">$ error</span>
    </div>
    <div className="flex flex-col items-center justify-center py-8 text-center p-3">
      <div className="w-10 h-10 border bg-red-500/10 flex items-center justify-center mb-3">
        <RefreshCw className="h-5 w-5 text-red-500" />
      </div>
      <p className="text-xs font-mono text-muted-foreground mb-1">→ error: failed to fetch notion data</p>
      <p className="text-[10px] font-mono text-muted-foreground mb-3">unable to sync with remote source</p>
      <a
        href="/todo"
        className="px-3 py-1.5 text-[10px] font-mono border bg-muted hover:bg-muted/80 transition-colors inline-block"
      >
        $ retry
      </a>
    </div>
  </div>
);

const ToDoPage = async () => {
  const pageId = process.env.NOTION_PAGE_ID || '23967c3fabda806f826aef58366068e3';

  try {
    const content = await getNotionPage(pageId);
    const today = new Date();

    return (
      <div className="mt-10">
        {/* Terminal Header */}
        <div className="border-y bg-background p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrafficLightDots />
            <TerminalPath>~/todo</TerminalPath>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold font-mono uppercase tracking-wider">To-Do List</h1>
            <Tag>
              {today.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Tag>
          </div>
        </div>

        {/* Content Block */}
        <div className="bg-background">
          <div className="px-3 py-2 border-b bg-muted/20">
            <TerminalPath>$ cat tasks.md | render</TerminalPath>
          </div>
          <div className="p-3">
            <Suspense fallback={<TodoSkeleton />}>
              <MDXRemote
                components={todoComponents}
                source={content}
                options={mdxOptions}
              />
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <div className="border-y bg-background px-3 py-2 flex items-center justify-between">
          <TerminalPath className="flex items-center gap-1">
            <AvailabilityDot />
            synced from notion
          </TerminalPath>
          <TerminalPath>ttl: 5min</TerminalPath>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading Notion content:", error);
    return (
      <div className="mt-10">
        {/* Terminal Header */}
        <div className="border border-b-0 bg-background p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrafficLightDots />
            <TerminalPath>~/todo</TerminalPath>
          </div>
        </div>
        <ErrorState />
      </div>
    );
  }
}

export default ToDoPage
