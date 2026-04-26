"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CodeSnippet, themes } from "@/components/ui/code-snippets";
import { RotateCcw, Code2, X } from "lucide-react";
import { useTheme } from "next-themes";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface SandboxProps {
  /** Display title shown in the toolbar */
  title?: string;
  /** Raw HTML string injected into <body> of the sandbox document */
  html?: string;
  /** Raw CSS string injected into the sandbox document */
  css?: string;
  /** Raw JS string injected as a <script> in the sandbox document */
  js?: string;
  /**
   * Initial height of the preview area in pixels.
   * @default 360
   */
  height?: number;
  /**
   * When true, renders a "source" toggle button in the toolbar.
   * @default false
   */
  showSource?: boolean;
  /**
   * When true, hides the entire toolbar (title, reset, source button).
   * @default false
   */
  hideToolbar?: boolean;
  /**
   * When true, the iframe background/foreground mirrors the app's
   * current light/dark theme. CSS vars (--bg, --fg, --accent, --muted,
   * --border) are also injected for use inside the demo.
   * @default false
   */
  followTheme?: boolean;
  className?: string;
}

type SourceTab = "html" | "css" | "js";

/* -------------------------------------------------------------------------- */
/*  srcdoc builder                                                             */
/* -------------------------------------------------------------------------- */

interface SrcdocOptions {
  html: string;
  css: string;
  js: string;
  themeVars?: {
    bg: string;
    fg: string;
    accent: string;
    muted: string;
    border: string;
  };
}

function buildSrcdoc({ html, css, js, themeVars }: SrcdocOptions): string {
  const rootVars = themeVars
    ? `:root {
  --bg: ${themeVars.bg};
  --fg: ${themeVars.fg};
  --accent: ${themeVars.accent};
  --muted: ${themeVars.muted};
  --border: ${themeVars.border};
}`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; }
  body {
    padding: 1rem;
    font-family: system-ui, sans-serif;
    ${themeVars ? `background: ${themeVars.bg}; color: ${themeVars.fg};` : ""}
  }
  ${rootVars}
${css}
</style>
</head>
<body>
${html}
<script>
(function() {
  try {
${js}
  } catch (e) {
    var el = document.createElement('pre');
    el.style.cssText = 'color:#ef4444;font-size:12px;margin:0;padding:0.5rem;white-space:pre-wrap;font-family:monospace;';
    el.textContent = 'Runtime error: ' + e.message;
    document.body.appendChild(el);
  }
})();
<\/script>
</body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/*  Theme tokens                                                               */
/* -------------------------------------------------------------------------- */

const THEME_TOKENS = {
  dark: {
    bg: "oklch(0.145 0 0)",
    fg: "oklch(0.985 0 0)",
    accent: "oklch(0.723 0.191 142.5)",
    muted: "oklch(0.269 0 0)",
    border: "oklch(0.269 0 0)",
  },
  light: {
    bg: "oklch(1 0 0)",
    fg: "oklch(0.145 0 0)",
    accent: "oklch(0.723 0.191 142.5)",
    muted: "oklch(0.961 0 0)",
    border: "oklch(0.922 0 0)",
  },
};

/* -------------------------------------------------------------------------- */
/*  Sandbox component                                                          */
/* -------------------------------------------------------------------------- */

export function Sandbox({
  title,
  html = "",
  css = "",
  js = "",
  height = 360,
  showSource = false,
  hideToolbar = false,
  followTheme = false,
  className,
}: SandboxProps) {
  /* ── state ─────────────────────────────────────────────────────────────── */
  const [resetKey, setResetKey] = useState(0);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SourceTab>("html");
  const [previewHeight, setPreviewHeight] = useState(height);
  /**
   * isDragging drives the transparent drag-overlay that sits on top of the
   * iframe during a resize. Without it, the iframe captures all pointer
   * events the moment the cursor moves over it, breaking the drag.
   */
  const [isDragging, setIsDragging] = useState(false);

  /* ── theme ─────────────────────────────────────────────────────────────── */
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  /* ── refs ──────────────────────────────────────────────────────────────── */
  const previewWrapperRef = useRef<HTMLDivElement>(null);

  /* ── sync external height prop ──────────────────────────────────────────── */
  useEffect(() => {
    setPreviewHeight(height);
  }, [height]);

  /* ── resize drag ───────────────────────────────────────────────────────── */
  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const startY = e.clientY;
    const startH = previewWrapperRef.current?.offsetHeight ?? 360;
    let lastH = startH;

    // Show overlay — blocks iframe from swallowing pointer events
    setIsDragging(true);

    const onMove = (mv: MouseEvent) => {
      const newH = Math.max(80, startH + (mv.clientY - startY));
      lastH = newH;
      // Direct DOM mutation — no React re-render per pixel
      if (previewWrapperRef.current) {
        previewWrapperRef.current.style.height = `${newH}px`;
      }
    };

    const onUp = () => {
      setIsDragging(false);
      setPreviewHeight(lastH);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  /* ── derived values ────────────────────────────────────────────────────── */
  const themeVars = followTheme
    ? isDark
      ? THEME_TOKENS.dark
      : THEME_TOKENS.light
    : undefined;

  const srcdoc = buildSrcdoc({ html, css, js, themeVars });
  const displayTitle = title ?? "sandbox";

  const sourceTabs: Partial<
    Record<SourceTab, { code: string; language: string }>
  > = {};
  if (html.trim()) sourceTabs["html"] = { code: html, language: "html" };
  if (css.trim()) sourceTabs["css"] = { code: css, language: "css" };
  if (js.trim()) sourceTabs["js"] = { code: js, language: "javascript" };

  const availableTabs = Object.keys(sourceTabs) as SourceTab[];
  const resolvedTab: SourceTab = availableTabs.includes(activeTab)
    ? activeTab
    : (availableTabs[0] ?? "html");
  const currentSource = sourceTabs[resolvedTab];

  /* ── render ─────────────────────────────────────────────────────────────── */
  return (
    <div
      className={cn("my-6 border border-border overflow-hidden", className)}
      data-sandbox
    >
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      {!hideToolbar && (
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-1.5">
          {/* Left: traffic-light dots + title */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-muted-foreground select-none">
              <span className="text-green-500">$</span> {displayTitle}
            </span>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setResetKey((k) => k + 1)}
              title="Reset sandbox"
              aria-label="Reset sandbox"
              className="flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
            </button>

            {showSource && (
              <button
                type="button"
                onClick={() => setSourceOpen((o) => !o)}
                title={sourceOpen ? "Close source" : "View source"}
                aria-label={sourceOpen ? "Close source" : "View source"}
                aria-expanded={sourceOpen}
                className={cn(
                  "flex h-6 items-center gap-1 px-1.5 font-mono text-[10px] transition-colors",
                  sourceOpen
                    ? "text-green-500"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {sourceOpen ? (
                  <X className="h-3 w-3" />
                ) : (
                  <Code2 className="h-3 w-3" />
                )}
                <span>{sourceOpen ? "close" : "source"}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Preview iframe ───────────────────────────────────────────────── */}
      {/*
        The wrapper holds the measured height. The transparent overlay is
        rendered on top of the iframe ONLY while dragging — it blocks the
        iframe from swallowing pointer events, which is the root cause of
        broken drag-resize behaviour on iframes.
      */}
      <div
        ref={previewWrapperRef}
        style={{ height: previewHeight }}
        className="relative w-full overflow-hidden"
      >
        <iframe
          key={resetKey}
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          title={`Sandbox: ${displayTitle}`}
          className="h-full w-full border-none"
          style={{ display: "block" }}
        />

        {/* Drag shield — covers iframe during resize to keep pointer events */}
        {isDragging && (
          <div
            aria-hidden
            className="absolute inset-0 z-10"
            style={{ cursor: "ns-resize" }}
          />
        )}
      </div>

      {/* ── Resize handle ────────────────────────────────────────────────── */}
      <div
        onMouseDown={onDragStart}
        className={cn(
          "group relative flex h-3 w-full select-none items-center justify-center border-t border-border bg-muted/10 transition-colors hover:bg-muted/40",
          isDragging ? "cursor-ns-resize bg-muted/40" : "cursor-ns-resize",
        )}
        aria-label="Drag to resize preview"
        role="separator"
        aria-orientation="horizontal"
      >
        <div className="flex items-center gap-[3px] opacity-0 transition-opacity group-hover:opacity-100 data-[dragging=true]:opacity-100">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="block h-[3px] w-[3px] rounded-full bg-muted-foreground/60"
            />
          ))}
        </div>
      </div>

      {/* ── Source panel ─────────────────────────────────────────────────── */}
      {showSource && sourceOpen && (
        <div
          className="border-t border-border"
          style={{ animation: "sandboxSourceIn 150ms ease" }}
        >
          {availableTabs.length > 1 && (
            <div className="flex items-center border-b border-border bg-muted/20 px-3">
              {availableTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "border-b-2 px-3 py-2 font-mono text-[11px] transition-colors",
                    resolvedTab === tab
                      ? "border-green-500 text-green-500"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {currentSource && (
            <CodeSnippet
              code={currentSource.code}
              language={currentSource.language}
              showLineNumbers
              border={false}
              adaptiveTheme={{
                light: themes.lightTheme,
                dark: themes.githubDark,
              }}
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes sandboxSourceIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes sandboxSourceIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
}
