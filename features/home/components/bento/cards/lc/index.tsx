import { Suspense } from "react";
import { getLeetCodeStats } from "@/features/home/data/lc-stats";
import { LEETCODE_USERNAME } from "@/config/personal.config";
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

        <div className="bg-background px-3 py-2">
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

        {/* main stats */}
        <div className="flex overflow-auto no-scrollbar">
          {/* solved count */}
          <div className="bg-background px-4 py-2 flex items-center gap-2 border-r border-border">
            <span className="text-[10px] text-muted-foreground">solved:</span>
            <span className="text-base font-bold text-green-500">{solved}</span>
            <span className="text-[10px] text-muted-foreground">/{total}</span>
          </div>
          {/* easy */}
          <div className="bg-background px-3 py-2 flex items-center gap-1.5 border-r border-border">
            <span className="text-[10px] text-green-500">easy</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">{easy}/{easyTotal}</span>
          </div>
          {/* medium */}
          <div className="bg-background px-3 py-2 flex items-center gap-1.5 border-r border-border">
            <span className="text-[10px] text-yellow-500">med</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">{medium}/{mediumTotal}</span>
          </div>
          {/* hard */}
          <div className="bg-background px-3 py-2 flex items-center gap-1.5 flex-1">
            <span className="text-[10px] text-red-500">hard</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">{hard}/{hardTotal}</span>
          </div>
        </div>
      </div>

      {/* submission graph */}
      {submissionCalendar && (
        <div className="border-t border-border">
          <SubmissionGraph submissionCalendar={submissionCalendar} />
        </div>
      )}

      {/* footer */}
      <div className="border-y gap-px flex">
        <div className="bg-background px-3 py-2 flex items-center gap-2 flex-1">
          <span className="text-[10px] text-muted-foreground">
            <span className="text-green-500">{totalSubmissions.toLocaleString()} </span>
            submissions</span>
        </div>
        <div className="bg-background px-3 py-2 flex items-center">
          <div className="flex items-center gap-[3px]">
            <span className="mr-1 text-muted-foreground text-[10px]">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-2 w-2 ${level === 0 ? "bg-muted" :
                  level === 1 ? "bg-green-500/30" :
                    level === 2 ? "bg-green-500/50" :
                      level === 3 ? "bg-green-500/70" :
                        "bg-green-500"
                  }`}
              />
            ))}
            <span className="ml-1 text-muted-foreground text-[10px]">More</span>
          </div>
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
