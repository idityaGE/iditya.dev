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
  weeks: (DayData | null)[][];
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
  const currentYear = now.getFullYear();
  const months: MonthData[] = [];

  // Find max count for level calculation
  let maxCount = 0;
  submissionMap.forEach((count) => {
    if (count > maxCount) maxCount = count;
  });

  for (let month = 0; month < 12; month++) {
    const firstDay = new Date(currentYear, month, 1);
    const lastDay = new Date(currentYear, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Get the day of week for the first day (0 = Sunday)
    const startDayOfWeek = firstDay.getDay();

    // Calculate weeks needed for this month
    const totalSlots = startDayOfWeek + daysInMonth;
    const weeksNeeded = Math.ceil(totalSlots / 7);

    const weeks: (DayData | null)[][] = [];

    for (let week = 0; week < weeksNeeded; week++) {
      const weekDays: (DayData | null)[] = [];

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dayIndex = week * 7 + dayOfWeek - startDayOfWeek;

        if (dayIndex < 0 || dayIndex >= daysInMonth) {
          weekDays.push(null);
        } else {
          const date = new Date(currentYear, month, dayIndex + 1);
          const dateKey = date.toISOString().split("T")[0];
          const count = submissionMap.get(dateKey) || 0;

          weekDays.push({
            date,
            count,
            level: getLevel(count, maxCount),
          });
        }
      }

      weeks.push(weekDays);
    }

    months.push({
      name: MONTH_NAMES[month],
      weeks,
    });
  }

  return months;
}

export function SubmissionGraph({ submissionCalendar, totalSubmissions, className }: SubmissionGraphProps) {
  const { monthsData } = useMemo(() => {
    const submissionMap = parseSubmissionCalendar(submissionCalendar);
    return {
      monthsData: generateYearData(submissionMap),
    };
  }, [submissionCalendar]);

  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn("flex w-full max-w-full flex-col gap-2 mx-auto py-3 px-4", className)}>
        <div className="flex gap-1 overflow-x-auto no-scrollbar sm:justify-center">
          {monthsData.map((month) => (
            <div key={month.name} className="flex flex-col gap-1 shrink-0">
              <div className="flex gap-[2px]">
                {month.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[2px]">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "h-[11px] w-[11px] transition-colors",
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
                          <TooltipContent side="top" className="text-xs font-sans">
                            <p>
                              {day.count} submission{day.count !== 1 ? "s" : ""} on{" "}
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
              <span className="text-center text-[9px] text-muted-foreground">
                {month.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground text-sm">
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
