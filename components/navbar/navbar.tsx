import { ModeToggle } from "@/components/theme/theme-toggle";
import { MobileDropdown } from "@/components/navbar/mobile-dropdown";
import Link from "next/link";

interface NavLinks {
  to: string;
  label: string;
}

export const NavLinks: NavLinks[] = [
  {
    to: "/projects",
    label: "PROJECTS",
  },
  {
    to: "/blogs",
    label: "BLOGS",
  },
  {
    to: "/PoW",
    label: "PoW",
  },
];

export const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 w-full max-w-3xl z-50">
      <div className="h-12 bg-background border">
        <div className="h-full w-full mx-auto flex justify-between items-center px-4">
          <Logo />
          <div className="flex items-center space-x-5">
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
    <div className="font-bold text-2xl">
      <Link href="/">&#119990;&#119993;&#119998;&#119998;&#46;</Link>
    </div>
  );
};

const DesktopLinks = () => {
  return (
    <div className="space-x-5 hidden sm:flex">
      {NavLinks.map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ))}
    </div>
  );
};

export const NavItem = ({ to, label }: NavLinks) => {
  return (
    <Link
      href={to}
      className="font-light text-xs flex gap-1 items-center hover:underline"
    >
      {label}
    </Link>
  );
};
