import React from "react";
import { LinkData, GITHUB_USERNAME } from "@/config/personal.config";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="mt-8 text-sm w-full flex-shrink-0">
      {/* Terminal Header */}
      <div className="border-y bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">~/footer</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          <div className="bg-background p-3 border-b md:border-r md:border-b-0">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">$ connect</div>
            <div className="flex items-center gap-3">
              <Link
                href={LinkData.github}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </Link>
              <Link
                href={LinkData.x}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X"
              >
                <Twitter size={14} />
              </Link>
              <Link
                href={LinkData.linkedin}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </Link>
              <Link
                href={LinkData.mail}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-background p-3 border-b md:border-r md:border-b-0">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">$ sitemap</div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link href="/" className="text-[11px] font-mono text-muted-foreground hover:text-green-500 transition-colors">
                <span className="text-green-500">→</span> home
              </Link>
              <Link href="/projects" className="text-[11px] font-mono text-muted-foreground hover:text-green-500 transition-colors">
                <span className="text-green-500">→</span> projects
              </Link>
              <Link href="/blogs" className="text-[11px] font-mono text-muted-foreground hover:text-green-500 transition-colors">
                <span className="text-green-500">→</span> blogs
              </Link>
              <Link href="/pow" className="text-[11px] font-mono text-muted-foreground hover:text-green-500 transition-colors">
                <span className="text-green-500">→</span> proof of work
              </Link>
              <Link href="/rss.xml" target="_blank" className="text-[11px] font-mono text-muted-foreground hover:text-green-500 transition-colors">
                <span className="text-green-500">→</span> rss
              </Link>
            </div>
          </div>

          <div className="bg-background p-3">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">$ status</div>
            <div className="space-y-1">
              <p className="text-[11px] font-mono text-muted-foreground">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 mr-1.5 animate-pulse" />
                available for work
              </p>
              <p className="text-[11px] font-mono text-muted-foreground">
                <span className="text-green-500">→</span> {LinkData.gmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-y bg-background px-3 py-2 flex items-center justify-between">
        <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
          <span>© {currentYear}</span>
          <span className="text-muted-foreground/50">|</span>
          <span>built by </span>
          <Link href={LinkData.x} target="_blank" className="hover:text-green-500 transition-colors">
            @{LinkData.x.split("/").pop()}
          </Link>
        </p>
        <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
          <span className="hidden sm:inline">open source on</span>
          <Link
            href={`https://github.com/${GITHUB_USERNAME}/iditya.dev`}
            target="_blank"
            className="hover:text-green-500 transition-colors flex items-center gap-1"
          >
            <Github size={10} />
            <span className="hidden sm:inline">github</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};
