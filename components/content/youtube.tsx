"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

export const YouTube = ({ id }: { id: string }) => {
  const [loaded, setLoaded] = useState(false);

  // YouTube thumbnail URL -- maxresdefault for highest quality, hqdefault as fallback
  const thumbnailUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="my-4">
      <div
        className="relative w-full overflow-hidden border bg-background"
        style={{ aspectRatio: "16 / 9" }}
      >
        {loaded ? (
          <iframe
            title="YouTube video"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
            aria-label="Play video"
          >
            {/* Thumbnail */}
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 border bg-background/80 group-hover:bg-green-500/10 group-hover:border-green-500/50 flex items-center justify-center transition-colors">
                <Play
                  size={24}
                  className="text-foreground group-hover:text-green-500 transition-colors ml-0.5"
                />
              </div>
            </div>
            {/* Terminal label */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-background/80">
              <span className="text-[10px] font-mono text-muted-foreground">
                <span className="text-green-500">$</span> play --id {id}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
