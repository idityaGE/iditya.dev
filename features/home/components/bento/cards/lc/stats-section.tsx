import { CircularProgress } from "./circular-progress";
import { DifficultyBar } from "./difficulty-bar";
import type { DifficultyData } from "./types";

interface StatsSectionProps extends DifficultyData {}

export function StatsSection({
  solved,
  total,
  easy,
  easyTotal,
  medium,
  mediumTotal,
  hard,
  hardTotal,
}: StatsSectionProps) {
  return (
    <div className="flex flex-1 items-center gap-4 p-4 sm:gap-6">
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
  );
}
