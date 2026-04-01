import Link from "next/link";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  BlinkingCursor,
} from "@/components/ui/terminal";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3">
      <div className="w-full max-w-sm border bg-background">
        {/* Terminal Header */}
        <div className="px-3 py-2 border-b bg-muted/70">
          <div className="flex items-center gap-2">
            <TrafficLightDots />
            <TerminalPath>~/404</TerminalPath>
          </div>
        </div>

        {/* Error Output */}
        <div className="p-3 space-y-3">
          <TerminalCommand>$ cd /page</TerminalCommand>
          <p className="text-xs font-mono text-red-500">
            bash: cd: /page: No such file or directory
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <GreenArrow />
            <span>
              the page you requested does not exist.
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="border-t px-3 py-2 flex items-center justify-between bg-muted/20">
          <Link
            href="/"
            className="text-xs font-mono text-muted-foreground hover:text-green-500 transition-colors flex items-center gap-1.5"
          >
            <span className="text-green-500">$</span> cd /home
          </Link>
          <BlinkingCursor />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
