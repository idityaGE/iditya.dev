import { TrafficLightDots, TerminalPath } from "@/components/ui/terminal";

interface TerminalHeaderProps {
  path: string;
  title: string;
  subtitle: string;
}

export const TerminalHeader = ({ path, title, subtitle }: TerminalHeaderProps) => {
  return (
    <div className="border-y bg-background p-3">
      <div className="flex items-center gap-2 mb-2">
        <TrafficLightDots />
        <TerminalPath>{path}</TerminalPath>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold font-mono uppercase tracking-wider">{title}</h1>
        <TerminalPath>{subtitle}</TerminalPath>
      </div>
    </div>
  );
};
