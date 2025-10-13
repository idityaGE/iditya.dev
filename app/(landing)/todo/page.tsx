import { getNotionPage } from "@/server/notion-to-mdx";
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { useMDXComponents } from "@/mdx-components";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from 'remark-gfm'
import { Suspense } from "react";
import { LayoutListIcon, RefreshCw } from "lucide-react";

export const revalidate = 60 * 5; // revalidate every 5 minutes
export const dynamic = 'force-dynamic';

const TodoSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-8 w-40 bg-muted rounded"></div>
    <div className="h-12 w-3/4 bg-muted rounded"></div>
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded"></div>
          <div className="h-6 w-full bg-muted rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
      <RefreshCw className="h-8 w-8 text-red-500" />
    </div>
    <h2 className="text-xl font-bold mb-2">Unable to load to-do list</h2>
    <p className="text-muted-foreground mb-4">
      There was an issue retrieving your Notion data.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const ToDoPage = async () => {
  const pageId = process.env.NOTION_PAGE_ID || '23967c3fabda806f826aef58366068e3';

  const components = useMDXComponents({
    ul: ({ children }) => <ul className="list-none pl-4">{children}</ul>,
    li: ({ children }) => <li className="text-sm">{children}</li>,
    p: ({ children }) => <p className="mb-4 text-base font-mono">{children}</p>
  });

  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
      ],
    }
  }

  try {
    const content = await getNotionPage(pageId);
    const today = new Date();

    return (
      <div className="w-full max-w-3xl mx-auto px-3 py-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div className="flex items-center gap-2 mb-4">
            <LayoutListIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-extrabold tracking-tight">To-Do</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 font-medium rounded-sm text-xs bg-secondary inline-block">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

        </div>

        <div className="prose dark:prose-invert max-w-none">
          <Suspense fallback={<TodoSkeleton />}>
            <MDXRemote
              components={components}
              source={content}
              options={options}
            />
          </Suspense>
        </div>

        <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
          <p>Synced from Notion • Auto-updates every minute</p>
        </div>
      </div>

    );
  } catch (error) {
    console.error("Error loading Notion content:", error);
    return <ErrorState />;
  }
}

export default ToDoPage
