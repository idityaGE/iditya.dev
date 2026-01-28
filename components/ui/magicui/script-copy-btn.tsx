"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { HTMLAttributes, useEffect, useState } from "react";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  lightTheme: string;
  darkTheme: string;
  commandMap: Record<string, string>;
  className?: string;
}

export function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  lightTheme,
  darkTheme,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const { theme } = useTheme();
  const command = commandMap[packageManager];
  const showPackageManagers = packageManagers.length > 1;

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const highlighted = await codeToHtml(command, {
          lang: codeLanguage,
          themes: {
            light: lightTheme,
            dark: darkTheme,
          },
          defaultColor: theme === "dark" ? "dark" : "light",
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre>${command}</pre>`);
      }
    }

    loadHighlightedCode();
  }, [command, theme, codeLanguage, lightTheme, darkTheme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        className
      )}
    >
      <div className="w-full">

        {/* Package Manager Tabs */}
        {showPackageManagers && showMultiplePackageOptions && (
          <div className="flex items-center gap-1">
            {packageManagers.map((pm) => (
              <button
                key={pm}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-mono transition-colors",
                  packageManager === pm
                    ? "text-green-500 bg-background/50"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setPackageManager(pm)}
              >
                {pm}
              </button>
            ))}
          </div>
        )}

        {/* Code Container */}
        <div className="relative group">
          <div className="font-mono overflow-hidden border border-border bg-zinc-100 dark:bg-[#0d1117]">
            <div className="flex items-start py-3 px-4 pr-10">
              <span className="text-green-500 font-mono text-sm mr-2 select-none flex-shrink-0">$</span>
              {highlightedCode ? (
                <div
                  className={`[&>pre]:overflow-x-auto [&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:m-0! [&>pre]:font-mono text-sm [&>pre::-webkit-scrollbar]:hidden [&>pre]:[scrollbar-width:none] [&>pre]:[-ms-overflow-style:none] flex-1 min-w-0`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              ) : (
                <pre className="overflow-x-auto font-mono text-sm text-zinc-700 dark:text-zinc-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {command}
                </pre>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/10"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`h-3.5 w-3.5 transition-all duration-300 ${copied ? "scale-0" : "scale-100"
                }`}
            />
            <Check
              className={`absolute inset-0 m-auto h-3.5 w-3.5 text-green-500 transition-all duration-300 ${copied ? "scale-100" : "scale-0"
                }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
