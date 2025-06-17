"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

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
    <html>
      <body>
        <div className="h-screen w-full flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />

            <div className="space-y-2">
              <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                Something went wrong
              </h2>

              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {process.env.NODE_ENV === 'development' ? (
                  <span className="font-mono text-xs overflow-x-auto block p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
                    {error.message || "An unexpected error occurred"}
                  </span>
                ) : (
                  "An unexpected error occurred. Please try again later."
                )}
              </p>

              {error.digest && (
                <p className="text-xs text-neutral-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">Return home</Link>
              </Button>

              <Button variant="default" onClick={() => reset()}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
