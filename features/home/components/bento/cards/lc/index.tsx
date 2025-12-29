import { Suspense } from "react";
import { getLeetCodeStats } from "@/server/lc-stats";
import { LEETCODE_USERNAME } from "@/config/links.config";
import { LoaderIcon } from "lucide-react";

import { StatsSection } from "./stats-section";
import { BadgesSection } from "./badges-section";
import type { SubmissionStats, QuestionCount, Badge } from "./types";

function LeetCodeStatsDisplay({
  stats,
}: {
  stats: Awaited<ReturnType<typeof getLeetCodeStats>>;
}) {
  const submitStats = stats.matchedUser?.submitStats
    ?.totalSubmissionNum as SubmissionStats[] | undefined;
  const allQuestions = stats.allQuestionsCount as QuestionCount[] | undefined;
  const badges = stats.matchedUser?.badges as Badge[] | undefined;

  if (!submitStats || !allQuestions) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Unable to load stats
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

  return (
    <div className="flex h-full flex-col">
      {/* Main content: Stats + Badges */}
      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Stats Section */}
        <StatsSection
          solved={solved}
          total={total}
          easy={easy}
          easyTotal={easyTotal}
          medium={medium}
          mediumTotal={mediumTotal}
          hard={hard}
          hardTotal={hardTotal}
        />

        {/* Badges Section */}
        {badges && badges.length > 0 && <BadgesSection badges={badges} />}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{stats.matchedUser?.submitStats.totalSubmissionNum[0].submissions}</span> submission on{" "}
          <a
            className="font-medium underline underline-offset-4"
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode
          </a>
        </p>
      </div>
    </div>
  );
}

// Fallback loading component
export function LeetCodeStatsFallback() {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
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
