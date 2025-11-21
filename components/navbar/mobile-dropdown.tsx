"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import { NavItem, NavLinks } from "@/components/navbar/navbar";

export const MobileDropdown = () => {
  return (
    <div className="sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-12 h-12 flex items-center justify-center">
          <AlignJustify />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="backdrop-filter backdrop-blur-lg shadow-lg bg-white/30 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-none">
          {NavLinks.map((link, index) => (
            <div key={link.to}>
              <DropdownMenuItem>
                <NavItem to={link.to} label={link.label} />
              </DropdownMenuItem>
              {index < NavLinks.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
