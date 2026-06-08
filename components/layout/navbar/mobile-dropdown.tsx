"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Terminal } from "lucide-react";
import { NAV_LINKS } from "./config";
import { Link } from "next-view-transitions";
import {
  TrafficLightDots,
  TerminalPath,
  GreenArrow,
  BlinkingCursor,
} from "@/components/ui/terminal";

export const MobileDropdown = () => {
  return (
    <div className="sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Open navigation menu">
          <Terminal size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border rounded-none min-w-[160px] p-0"
        >
          {/* Terminal Header */}
          <div className="px-2 py-1.5 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <TrafficLightDots size="sm" />
              <TerminalPath className="text-xs">nav</TerminalPath>
            </div>
          </div>
          {/* Links */}
          <div className="py-1">
            {NAV_LINKS.map((link) => (
              <DropdownMenuItem key={link.to} className="px-2 py-2 rounded-none focus:bg-muted/50">
                <Link href={link.to} className="flex items-center gap-2 w-full font-mono text-xs">
                  <GreenArrow />
                  <div className="flex gap-0.5">
                    <span className="text-muted-foreground">/</span>
                    <span>{link.label}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
          {/* Footer */}
          <div className="px-2 py-1 border-t bg-muted/20">
            <BlinkingCursor className="text-xs" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
