import { Suspense } from "react";
import { getLeetCodeStats } from "@/server/lc-stats";
import { LEETCODE_USERNAME } from "@/config/links.config";
import Link from "next/link";

import { SubmissionGraph } from "./submission-graph";
import type { SubmissionStats, QuestionCount } from "./types";

function LeetCodeStatsDisplay({
  stats,
}: {
  stats: Awaited<ReturnType<typeof getLeetCodeStats>>;
}) {
  const submitStats = stats.matchedUser?.submitStats
    ?.totalSubmissionNum as SubmissionStats[] | undefined;
  const allQuestions = stats.allQuestionsCount as QuestionCount[] | undefined;

  if (!submitStats || !allQuestions) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-[10px] text-muted-foreground">
        <span className="text-red-500">error:</span> unable to fetch stats
      </div>
    );
  }

  const solved = submitStats.find((s) => s.difficulty === "All")?.count ?? 0;
  const total = allQuestions.find((q) => q.difficulty === "All")?.count ?? 0;
  const easy = submitStats.find((s) => s.difficulty === "Easy")?.count ?? 0;
  const easyTotal = allQuestions.find((q) => q.difficulty === "Easy")?.count ?? 0;
  const medium = submitStats.find((s) => s.difficulty === "Medium")?.count ?? 0;
  const mediumTotal = allQuestions.find((q) => q.difficulty === "Medium")?.count ?? 0;
  const hard = submitStats.find((s) => s.difficulty === "Hard")?.count ?? 0;
  const hardTotal = allQuestions.find((q) => q.difficulty === "Hard")?.count ?? 0;

  const totalSubmissions = stats.matchedUser?.submitStats.totalSubmissionNum[0].submissions ?? 0;
  const submissionCalendar = stats.matchedUser?.submissionCalendar;

  const easyPercent = easyTotal > 0 ? Math.round((easy / easyTotal) * 100) : 0;
  const mediumPercent = mediumTotal > 0 ? Math.round((medium / mediumTotal) * 100) : 0;
  const hardPercent = hardTotal > 0 ? Math.round((hard / hardTotal) * 100) : 0;

  return (
    <div className="flex h-full flex-col font-mono">
      {/* stats output */}
      <div className="flex-1 bg-border gap-px flex flex-col">

        {/* main stats */}
        <div className="bg-background px-3 py-3 flex-1">
          <div className="grid grid-cols-2 gap-4">
            {/* solved count */}
            <div className="space-y-1">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">solved</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-green-500">{solved}</span>
                <span className="text-xs text-muted-foreground">/ {total}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">{totalSubmissions.toLocaleString()} submissions</div>
            </div>

            {/* difficulty breakdown */}
            <div className="space-y-2">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">breakdown</div>
              
              {/* easy */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-green-500">easy</span>
                  <span className="text-muted-foreground tabular-nums">{easy}/{easyTotal}</span>
                </div>
                <div className="h-1 bg-muted overflow-hidden">
                  <div className="h-full bg-green-500 transition-all" style={{ width: `${easyPercent}%` }} />
                </div>
              </div>

              {/* medium */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-yellow-500">medium</span>
                  <span className="text-muted-foreground tabular-nums">{medium}/{mediumTotal}</span>
                </div>
                <div className="h-1 bg-muted overflow-hidden">
                  <div className="h-full bg-yellow-500 transition-all" style={{ width: `${mediumPercent}%` }} />
                </div>
              </div>

              {/* hard */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-red-500">hard</span>
                  <span className="text-muted-foreground tabular-nums">{hard}/{hardTotal}</span>
                </div>
                <div className="h-1 bg-muted overflow-hidden">
                  <div className="h-full bg-red-500 transition-all" style={{ width: `${hardPercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submission graph */}
      {submissionCalendar && (
        <div className="border-t border-border">
          <SubmissionGraph submissionCalendar={submissionCalendar} />
        </div>
      )}

      <div className="bg-background border-y px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">$ lc stats --user {LEETCODE_USERNAME}</span>
          <Link
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
            target="_blank"
            className="text-[10px] text-muted-foreground hover:text-green-500 transition-colors"
          >
            view profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Fallback loading component
export function LeetCodeStatsFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center font-mono">
      <div className="text-[10px] text-muted-foreground animate-pulse">
        <span className="text-green-500">$</span> fetching leetcode stats...
      </div>
    </div>
  );
}

// Server component that fetches data
async function LeetCodeStats() {
  const stats = await getLeetCodeStats(LEETCODE_USERNAME);
  return <LeetCodeStatsDisplay stats={stats} />;
}

// Exported component with Suspense
export function LeetCodeStatsCard() {
  return (
    <Suspense fallback={<LeetCodeStatsFallback />}>
      <LeetCodeStats />
    </Suspense>
  );
}
