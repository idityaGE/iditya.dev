import { CircularProgress } from "./circular-progress";
import { DifficultyBar } from "./difficulty-bar";
import type { DifficultyData } from "./types";

export function StatsSection({
  solved,
  total,
  easy,
  easyTotal,
  medium,
  mediumTotal,
  hard,
  hardTotal,
}: DifficultyData) {
  return (
    <div className="flex flex-col justify-end px-4 sm:w-[73%] pt-8 translate-y-2 md:translate-y-1">
      <div className="flex items-center gap-4 sm:gap-6 md:px-10">
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

        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <DifficultyBar label="Easy" solved={easy} total={easyTotal} />
          <DifficultyBar label="Medium" solved={medium} total={mediumTotal} />
          <DifficultyBar label="Hard" solved={hard} total={hardTotal} />
        </div>
      </div>
    </div>
  );
}
