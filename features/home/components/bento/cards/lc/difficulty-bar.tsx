interface DifficultyBarProps {
  label: string;
  solved: number;
  total: number;
}

export function DifficultyBar({ label, solved, total }: DifficultyBarProps) {
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {solved}
          <span className="text-muted-foreground/60">/{total}</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
