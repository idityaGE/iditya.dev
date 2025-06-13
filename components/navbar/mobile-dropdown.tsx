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
        <DropdownMenuTrigger>
          <AlignJustify />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="backdrop-filter backdrop-blur-lg shadow-lg bg-white/30 rounded-lg dark:bg-black/30">
          {NavLinks.map((link, index) => (
            <div key={link.to}>
              <DropdownMenuItem>
                <NavItem to={link.to} icon={link.icon} label={link.label} />
              </DropdownMenuItem>
              {index < NavLinks.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
