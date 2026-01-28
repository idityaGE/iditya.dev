"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Terminal } from "lucide-react";
import { NavLinks } from "@/components/layout/navbar";
import Link from "next/link";

export const MobileDropdown = () => {
  return (
    <div className="sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Terminal size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border rounded-none min-w-[160px] p-0"
        >
          {/* Terminal Header */}
          <div className="px-2 py-1.5 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-red-500/80" />
                <span className="w-1.5 h-1.5 bg-yellow-500/80" />
                <span className="w-1.5 h-1.5 bg-green-500/80" />
              </div>
              <span className="text-[9px] font-mono text-muted-foreground">nav</span>
            </div>
          </div>
          {/* Links */}
          <div className="py-1">
            {NavLinks.map((link) => (
              <DropdownMenuItem key={link.to} className="px-2 py-2 rounded-none focus:bg-muted/50">
                <Link href={link.to} className="flex items-center gap-2 w-full font-mono text-xs">
                  <span className="text-green-500">→</span>
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
            <span className="text-[9px] font-mono text-muted-foreground animate-pulse">█</span>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
