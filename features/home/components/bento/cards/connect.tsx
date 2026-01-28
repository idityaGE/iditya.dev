import { LinkData } from "@/config/personal.config";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "github",
    url: LinkData.github,
    icon: Github,
    handle: "idityaGE",
  },
  {
    name: "x",
    url: LinkData.x,
    icon: Twitter,
    handle: "@" + LinkData.x.split("/").pop(),
  },
  {
    name: "linkedin",
    url: LinkData.linkedin,
    icon: Linkedin,
    handle: "idityage",
  },
  {
    name: "email",
    url: LinkData.mail,
    icon: Mail,
    handle: LinkData.gmail,
  },
];

export function ConnectCard() {
  return (
    <div className="h-full flex flex-col">
      {/* Links Grid */}
      <div className="flex-1 grid grid-cols-2 gap-px bg-border">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target={link.name !== "email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group bg-background p-2.5 hover:bg-muted/30 transition-colors flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-1">
              <link.icon size={12} className="text-muted-foreground group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{link.name}</span>
            </div>
            <div className="flex items-center gap-1.5 pl-5">
              <span className="text-green-500 text-[10px] font-mono">→</span>
              <span className="text-[10px] font-mono text-foreground group-hover:text-green-500 transition-colors truncate">
                {link.handle}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
