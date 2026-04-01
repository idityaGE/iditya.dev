"use client";

import Link from "next/link";
import { useEffect } from "react";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-[oklch(0.145_0_0)] text-[oklch(0.985_0_0)] font-[JetBrains_Mono,monospace] antialiased">
        <div className="h-screen w-full flex flex-col items-center justify-center px-3">
          <div className="w-full max-w-sm border border-[rgb(255_255_255/0.18)]">
            {/* Terminal Header */}
            <div className="px-3 py-2 border-b border-[rgb(255_255_255/0.18)] bg-[oklch(0.21_0_0)]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-red-500/80" />
                  <span className="w-2 h-2 bg-yellow-500/80" />
                  <span className="w-2 h-2 bg-green-500/80" />
                </div>
                <span className="text-xs text-[oklch(0.75_0_0)]">~/error</span>
              </div>
            </div>

            {/* Error Output */}
            <div className="p-3 space-y-3">
              <div className="text-xs text-[oklch(0.75_0_0)] uppercase tracking-wider">
                $ process status
              </div>
              <p className="text-xs text-red-500">
                error: segmentation fault (core dumped)
              </p>
              <div className="flex items-center gap-2 text-xs text-[oklch(0.75_0_0)]">
                <span className="text-green-500">→</span>
                <span>
                  {process.env.NODE_ENV === "development"
                    ? error.message || "an unexpected error occurred"
                    : "something went wrong. please try again."}
                </span>
              </div>
              {error.digest && (
                <p className="text-xs text-[oklch(0.75_0_0)]">
                  digest: {error.digest}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-[rgb(255_255_255/0.18)] px-3 py-2 flex items-center justify-between bg-[oklch(0.21_0_0)]/20">
              <Link
                href="/"
                className="text-xs text-[oklch(0.75_0_0)] hover:text-green-500 transition-colors flex items-center gap-1.5"
              >
                <span className="text-green-500">$</span> cd /home
              </Link>
              <button
                onClick={() => reset()}
                className="text-xs text-[oklch(0.75_0_0)] hover:text-green-500 transition-colors flex items-center gap-1.5"
              >
                <span className="text-green-500">$</span> retry
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
