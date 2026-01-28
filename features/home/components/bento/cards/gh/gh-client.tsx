"use client";

import { format } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Activity } from "@/components/ui/kibo-ui/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
} from "@/components/ui/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/personal.config";
import Link from "next/link";

export function GitHubContributionGraph({ data }: { data: Activity[] }) {
  const totalCount = data.reduce((sum, day) => sum + day.count, 0);
  const currentYear = new Date().getFullYear();

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col font-mono">
        {/* compact stats row */}
        <div className="bg-border gap-px flex">
          <div className="bg-background px-3 py-2 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">contributions:</span>
            <span className="text-sm font-bold text-green-500">{totalCount.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground">in {currentYear}</span>
          </div>
          <div className="bg-background px-3 py-2 flex items-center ml-auto">
            <Link
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              className="text-[10px] text-muted-foreground hover:text-green-500 transition-colors"
            >
              @{GITHUB_USERNAME} →
            </Link>
          </div>
        </div>

        {/* contribution graph */}
        <div className="flex-1 flex items-center">
          <ContributionGraph
            className="mx-auto py-2 w-full"
            data={data}
            blockSize={10}
            blockMargin={2}
            blockRadius={0}
          >
            <ContributionGraphCalendar
              className="no-scrollbar px-2"
              title=""
            >
              {({ activity, dayIndex, weekIndex }) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <g>
                      <ContributionGraphBlock
                        activity={activity}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                      />
                    </g>
                  </TooltipTrigger>

                  <TooltipContent className="font-mono text-[10px] border-border">
                    <p>
                      {activity.count} contribution{activity.count !== 1 ? "s" : ""}{" "}
                      on {format(new Date(activity.date), "MMM d")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </ContributionGraphCalendar>
          </ContributionGraph>
        </div>
      </div>
    </TooltipProvider>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center font-mono">
      <div className="text-[10px] text-muted-foreground animate-pulse">
        <span className="text-green-500">$</span> fetching github contributions...
      </div>
    </div>
  );
}
