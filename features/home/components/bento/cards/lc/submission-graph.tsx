"use client";

import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LEETCODE_USERNAME } from "@/config/links.config";

interface SubmissionGraphProps {
  submissionCalendar: string;
  totalSubmissions: number;
  className?: string;
}

type DayData = {
  date: Date;
  count: number;
  level: number;
};

type MonthData = {
  name: string;
  year: number;
  weeks: (DayData | null)[][];
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseSubmissionCalendar(calendar: string): Map<string, number> {
  try {
    const data = JSON.parse(calendar) as Record<string, number>;
    const map = new Map<string, number>();

    for (const [timestamp, count] of Object.entries(data)) {
      const date = new Date(parseInt(timestamp) * 1000);
      const dateKey = date.toISOString().split("T")[0];
      map.set(dateKey, count);
    }

    return map;
  } catch {
    return new Map();
  }
}

function getLevel(count: number, maxCount: number): number {
  if (count === 0) return 0;
  if (maxCount === 0) return 0;

  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function generateYearData(submissionMap: Map<string, number>): MonthData[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Find max count for level calculation
  let maxCount = 0;
  submissionMap.forEach((count) => {
    if (count > maxCount) maxCount = count;
  });

  // Group days by month
  const monthsMap = new Map<
    string,
    { year: number; month: number; days: DayData[] }
  >();
  const currentDate = new Date(oneYearAgo);

  while (currentDate <= now) {
    const dateKey = currentDate.toISOString().split("T")[0];
    const count = submissionMap.get(dateKey) || 0;
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

    if (!monthsMap.has(monthKey)) {
      monthsMap.set(monthKey, {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        days: [],
      });
    }

    monthsMap.get(monthKey)!.days.push({
      date: new Date(currentDate),
      count,
      level: getLevel(count, maxCount),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Sort months chronologically (oldest first)
  const sortedMonths = Array.from(monthsMap.values()).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  return sortedMonths.map((monthData) => {
    const firstDataDay = monthData.days[0].date;
    const startDayOfWeek = firstDataDay.getDay();
    const totalSlots = startDayOfWeek + monthData.days.length;
    const weeksNeeded = Math.ceil(totalSlots / 7);

    const weeks: (DayData | null)[][] = [];
    let dayIndex = 0;

    for (let week = 0; week < weeksNeeded; week++) {
      const weekDays: (DayData | null)[] = [];

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const slotIndex = week * 7 + dayOfWeek;

        if (slotIndex < startDayOfWeek) {
          weekDays.push(null);
        } else if (dayIndex < monthData.days.length) {
          weekDays.push(monthData.days[dayIndex]);
          dayIndex++;
        } else {
          weekDays.push(null);
        }
      }

      weeks.push(weekDays);
    }

    return {
      name: MONTH_NAMES[monthData.month],
      year: monthData.year,
      weeks,
    };
  });
}

export function SubmissionGraph({
  submissionCalendar,
  totalSubmissions,
  className,
}: SubmissionGraphProps) {
  const { monthsData } = useMemo(() => {
    const submissionMap = parseSubmissionCalendar(submissionCalendar);
    return {
      monthsData: generateYearData(submissionMap),
    };
  }, [submissionCalendar]);

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={cn(
          "flex w-full max-w-full flex-col gap-2 mx-auto pt-3 pb-2 px-4",
          className
        )}
      >
        <div className="flex gap-1 overflow-x-auto no-scrollbar sm:justify-center">
          {monthsData.map((month) => (
            <div
              key={`${month.year}-${month.name}`}
              className="flex flex-col gap-1 shrink-0"
            >
              <div className="flex gap-[2px]">
                {month.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[2px]">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "h-[9px] w-[9px] transition-colors",
                              day === null && "invisible",
                              day?.level === 0 && "bg-muted",
                              day?.level === 1 && "bg-muted-foreground/40",
                              day?.level === 2 && "bg-muted-foreground/50",
                              day?.level === 3 && "bg-muted-foreground/60",
                              day?.level === 4 && "bg-muted-foreground/80"
                            )}
                          />
                        </TooltipTrigger>
                        {day && (
                          <TooltipContent
                            side="top"
                            className="text-xs font-sans"
                          >
                            <p>
                              {day.count} submission{day.count !== 1 ? "s" : ""}{" "}
                              on{" "}
                              {day.date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
              <span className="text-center text-[12px] text-muted-foreground">
                {month.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground text-sm pl-0 md:pl-2">
          {totalSubmissions.toLocaleString("en")} submissions on{" "}
          <a
            className="font-medium underline underline-offset-4"
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode
          </a>
          .
        </div>
      </div>
    </TooltipProvider>
  );
}
