import { CircularProgress } from "./circular-progress";
import { DifficultyBar } from "./difficulty-bar";
import { LEETCODE_USERNAME } from "@/config/links.config";
import type { DifficultyData } from "./types";

interface StatsSectionProps extends DifficultyData {
  totalSubmissions: number;
}

export function StatsSection({
  solved,
  total,
  easy,
  easyTotal,
  medium,
  mediumTotal,
  hard,
  hardTotal,
  totalSubmissions,
}: StatsSectionProps) {
  return (
    <div className="flex flex-col justify-between gap-3 px-4 py-2 sm:w-[60%] sm:shrink-0">
      <div className="flex flex-1 items-center gap-4 sm:gap-6">
        {/* Circular Progress */}
        <div className="shrink-0">
          <CircularProgress
            solved={solved}
            total={total}
            easyTotal={easyTotal}
            mediumTotal={mediumTotal}
            hardTotal={hardTotal}
            easySolved={easy}
            mediumSolved={medium}
            hardSolved={hard}
          />
        </div>

        {/* Difficulty breakdown */}
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <DifficultyBar label="Easy" solved={easy} total={easyTotal} />
          <DifficultyBar label="Medium" solved={medium} total={mediumTotal} />
          <DifficultyBar label="Hard" solved={hard} total={hardTotal} />
        </div>
      </div>

      {/* Submissions footer */}
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{totalSubmissions}</span> submissions on{" "}
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
  );
}
