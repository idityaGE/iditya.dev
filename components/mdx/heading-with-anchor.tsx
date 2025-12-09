"use client";

import { cn } from "@/lib/utils";
import { generateSlug } from "@/utils";
import { Check, Link } from "lucide-react";
import React, { useState } from "react";

export const HeadingWithAnchor = ({
  level,
  children,
  className,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}) => {
  const content = typeof children === "string" ? children : "";
  const slug = generateSlug(content);
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToHeading = () => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL without scrolling
      history.pushState(null, "", `#${slug}`);
    }
  };

  return (
    <Component
      id={slug}
      className={cn("flex items-center gap-2 group", className)}
    >
      <span onClick={scrollToHeading} className="cursor-pointer">
        {children}
      </span>
      {level >= 1 && content && (
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 mt-1.5"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link className="h-4 w-4 text-muted-foreground hover:text-primary" />
          )}
        </button>
      )}
    </Component>
  );
};
