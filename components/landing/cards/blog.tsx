"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export const BlogCard = () => {
  return (
    <div className="relative">
      <Link href="/blogs" className="h-full">
        <div className="relative p-6 h-full min-h-[200px] flex flex-col justify-between">
          <div className="relative z-10">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Latest Blog Posts
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore my thoughts on web development, design, and technology
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-l-2 border-primary/20 pl-3">
                <h4 className="text-sm font-medium">Building Modern Web Applications</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>June 10, 2025</span>
                  <User className="h-3 w-3 ml-2" />
                  <span>5 min read</span>
                </div>
              </div>

              <div className="border-l-2 border-primary/20 pl-3">
                <h4 className="text-sm font-medium">React Best Practices</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>June 8, 2025</span>
                  <User className="h-3 w-3 ml-2" />
                  <span>3 min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-4">
            <span className="text-sm text-primary font-medium">Read More</span>
            <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-2 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </div>
  )
}
