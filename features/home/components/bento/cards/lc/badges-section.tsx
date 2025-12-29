import Image from "next/image";
import { Trophy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Badge } from "./types";

interface BadgesSectionProps {
  badges: Badge[];
}

export function BadgesSection({ badges }: BadgesSectionProps) {
  const sortedBadges = [...badges].sort((a, b) => {
    const aIsDays = a.displayName.includes("Days Badge");
    const bIsDays = b.displayName.includes("Days Badge");
    if (aIsDays && !bIsDays) return -1;
    if (!aIsDays && bIsDays) return 1;
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });

  const displayBadges = sortedBadges.slice(0, 4);

  return (
    <div className="flex flex-1 flex-col gap-3 border-t px-4 py-2 sm:border-l sm:border-t-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4" />
          <span className="text-sm font-medium">Badges</span>
        </div>
        <span className="bg-muted px-2 py-0.5 text-xs font-semibold">
          {badges.length}
        </span>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-2">
          {displayBadges.map((badge) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <div className="relative flex flex-col items-center">
                  <div className="relative h-16 w-16 sm:h-16 sm:w-16">
                    <Image
                      src={
                        badge.icon.startsWith("http")
                          ? badge.icon
                          : `https://leetcode.com${badge.icon}`
                      }
                      alt={badge.displayName}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{badge.displayName}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {sortedBadges[0] && (
        <p className="mt-auto text-right text-[10px] text-muted-foreground sm:text-xs">
          Latest:{" "}
          <span className="font-medium text-foreground">
            {sortedBadges[0].displayName}
          </span>
        </p>
      )}
    </div>
  );
}
