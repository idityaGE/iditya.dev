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

  const submissionCalendar = stats.matchedUser?.submissionCalendar;

  return (
    <div className="flex h-full flex-col font-mono">
      {/* compact stats row */}
      <div className="bg-border gap-px flex">
        {/* solved */}
        <div className="bg-background px-3 py-2 flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">solved:</span>
          <span className="text-sm font-bold text-green-500">{solved}</span>
          <span className="text-[10px] text-muted-foreground">/{total}</span>
        </div>
        {/* easy */}
        <div className="bg-background px-3 py-2 flex items-center gap-1.5">
          <span className="text-[10px] text-green-500">easy</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">{easy}/{easyTotal}</span>
        </div>
        {/* medium */}
        <div className="bg-background px-3 py-2 flex items-center gap-1.5">
          <span className="text-[10px] text-yellow-500">med</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">{medium}/{mediumTotal}</span>
        </div>
        {/* hard */}
        <div className="bg-background px-3 py-2 flex items-center gap-1.5">
          <span className="text-[10px] text-red-500">hard</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">{hard}/{hardTotal}</span>
        </div>
        {/* profile link */}
        <div className="bg-background px-3 py-2 flex items-center ml-auto">
          <Link
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
            target="_blank"
            className="text-[10px] text-muted-foreground hover:text-green-500 transition-colors"
          >
            @{LEETCODE_USERNAME} →
          </Link>
        </div>
      </div>

      {/* submission graph */}
      {submissionCalendar && (
        <div className="flex-1">
          <SubmissionGraph submissionCalendar={submissionCalendar} />
        </div>
      )}
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
