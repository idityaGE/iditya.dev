import { ModeToggle } from "@/components/theme/theme-toggle";
import { CodeXml, Contact, BookOpen } from "lucide-react";
import { MobileDropdown } from "@/components/navbar/mobile-dropdown";
import { JSX } from "react";
import Link from "next/link";

interface NavLinks {
  to: string;
  icon: JSX.Element;
  label: string;
}

export const NavLinks: NavLinks[] = [
  {
    to: "/projects",
    icon: <CodeXml />,
    label: "projects",
  },
  {
    to: "/about",
    icon: <Contact />,
    label: "about",
  },
  {
    to: "/blogs",
    icon: <BookOpen />,
    label: "blogs",
  }
]

export const Navbar = () => {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-4xl px-3 z-50">
      <div className="h-12 bg-white/30 rounded-lg dark:bg-black/30 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="h-full w-full mx-auto flex justify-between items-center px-4">
          <Logo />
          <div className="flex items-center space-x-5">
            <DesktopLinks />
            <div className="flex space-x-3 items-center">
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
        <NavItem key={link.to} to={link.to} icon={link.icon} label={link.label} />
      ))}
    </div>
  );
};

export const NavItem = ({ to, icon, label }: NavLinks) => {
  return (
    <Link href={to} className="font-bold flex gap-1 items-center">
      {icon}
      {label}
    </Link>
  );
};
