import { Check } from "lucide-react";

interface CircularProgressProps {
  solved: number;
  total: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

/**
 * Circular progress that:
 * 1. Shows 70% of circle as the total arc
 * 2. Divides that arc into 3 segments based on total questions per difficulty
 * 3. Fills each segment based on solved ratio for that difficulty
 */
export function CircularProgress({
  solved,
  total,
  easyTotal,
  mediumTotal,
  hardTotal,
  easySolved,
  mediumSolved,
  hardSolved,
}: CircularProgressProps) {
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Gap between difficulty segments
  const segmentGap = 10;

  // 70% of the circle for the total arc
  const totalArcRatio = 0.7;
  const totalArc = circumference * totalArcRatio;

  // Calculate each difficulty's portion of the total arc based on total questions
  // Subtract gaps from total arc to distribute among segments
  const totalQuestions = easyTotal + mediumTotal + hardTotal;
  const availableArc = totalArc - segmentGap * 3; // 3 gaps between segments
  const easyArcLength = totalQuestions > 0 ? (easyTotal / totalQuestions) * availableArc : 0;
  const mediumArcLength = totalQuestions > 0 ? (mediumTotal / totalQuestions) * availableArc : 0;
  const hardArcLength = totalQuestions > 0 ? (hardTotal / totalQuestions) * availableArc : 0;

  // Calculate filled portion for each difficulty based on solved ratio
  const easyFilled = easyTotal > 0 ? (easySolved / easyTotal) * easyArcLength : 0;
  const mediumFilled = mediumTotal > 0 ? (mediumSolved / mediumTotal) * mediumArcLength : 0;
  const hardFilled = hardTotal > 0 ? (hardSolved / hardTotal) * hardArcLength : 0;

  // Starting rotation (from top, -90deg, offset to center the gap at bottom)
  const startRotation = -90 - (totalArcRatio * 360) / 2;

  // Calculate rotations for each segment (including gaps)
  const easyRotation = startRotation;
  const mediumRotation = startRotation + ((easyArcLength + segmentGap) / circumference) * 360;
  const hardRotation = mediumRotation + ((mediumArcLength + segmentGap) / circumference) * 360;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background arc (70% of circle) - Easy section background */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={`${easyArcLength} ${circumference - easyArcLength}`}
          className="text-muted-foreground/20"
          style={{
            transform: `rotate(${easyRotation}deg)`,
            transformOrigin: `${center}px ${center}px`,
          }}
        />
        {/* Background arc - Medium section */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={`${mediumArcLength} ${circumference - mediumArcLength}`}
          className="text-muted-foreground/20"
          style={{
            transform: `rotate(${mediumRotation}deg)`,
            transformOrigin: `${center}px ${center}px`,
          }}
        />
        {/* Background arc - Hard section */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={`${hardArcLength} ${circumference - hardArcLength}`}
          className="text-muted-foreground/20"
          style={{
            transform: `rotate(${hardRotation}deg)`,
            transformOrigin: `${center}px ${center}px`,
          }}
        />

        {/* Filled Easy arc */}
        {easyFilled > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${easyFilled} ${circumference - easyFilled}`}
            strokeLinecap="round"
            className="text-foreground transition-all duration-500"
            style={{
              transform: `rotate(${easyRotation}deg)`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        )}

        {/* Filled Medium arc */}
        {mediumFilled > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${mediumFilled} ${circumference - mediumFilled}`}
            strokeLinecap="round"
            className="text-foreground transition-all duration-500"
            style={{
              transform: `rotate(${mediumRotation}deg)`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        )}

        {/* Filled Hard arc */}
        {hardFilled > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${hardFilled} ${circumference - hardFilled}`}
            strokeLinecap="round"
            className="text-foreground transition-all duration-500"
            style={{
              transform: `rotate(${hardRotation}deg)`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        )}
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold leading-none">{solved}</span>
        <span className="text-md text-muted-foreground">/ {total}</span>
      </div>
    </div>
  );
}
