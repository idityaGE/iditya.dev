import { ModeToggle } from "@/components/theme/theme-toggle";
import { MobileDropdown } from "@/components/layout/navbar/mobile-dropdown";
import { Link } from "next-view-transitions";
import { NAV_LINKS, type NavLink } from "./config";

export const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 w-full max-w-3xl z-50">
      <div className="h-10 bg-background border">
        <div className="h-full w-full mx-auto flex justify-between items-center px-4">
          <Logo />
          <div className="flex items-center gap-4">
            {children}
            <DesktopLinks />
            <div className="flex items-center">
              <ModeToggle />
              <MobileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="font-mono text-sm font-bold">
      <Link href="/" className="flex items-center gap-1.5">
        <span className="text-green-500">→</span>
        <span>iditya</span>
      </Link>
    </div>
  );
};

const DesktopLinks = () => {
  return (
    <div className="gap-3 hidden sm:flex">
      {NAV_LINKS.map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ))}
    </div>
  );
};

const NavItem = ({ to, label }: NavLink) => {
  return (
    <Link
      href={to}
      className="font-mono text-[12.5px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
    >
      <span>/</span>
      {label}
    </Link>
  );
};
