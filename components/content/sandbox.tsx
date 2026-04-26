"use client";

import React, { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CodeSnippet, themes } from "@/components/ui/code-snippets";
import { RotateCcw, Code2, X } from "lucide-react";

// {/* Minimal — just HTML */}
// <Sandbox
//   title="Hello World"
//   html={`<h1 style="color: #22c55e; font-family: monospace">Hello</h1>`}
// />

// {/* Full demo with source toggle */}
// <Sandbox
//   title="flexbox-demo.html"
//   height={400}
//   showSource
//   html={`<div class="container"><div class="box">A</div><div class="box">B</div></div>`}
//   css={`.container { display: flex; gap: 1rem; }
// .box { padding: 2rem; background: #22c55e; color: #000; font-family: monospace; }`}
//   js={`document.querySelectorAll('.box').forEach(b =>
//   b.addEventListener('click', () => b.style.opacity = '0.5'))`}
// />

// {/* Import from raw files (recommended for complex demos) */}
// import html from './my-demo.html?raw'
// import css  from './my-demo.css?raw'
// import js   from './my-demo.js?raw'

// <Sandbox title="my-demo" html={html} css={css} js={js} showSource />


/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface SandboxProps {
  /** Display title shown in the toolbar (supports `$ prefix` style) */
  title?: string;
  /** Raw HTML string to inject into the <body> of the sandbox document */
  html?: string;
  /** Raw CSS string to inject into the sandbox document */
  css?: string;
  /** Raw JS string to inject as a <script> in the sandbox document */
  js?: string;
  /**
   * Initial height of the preview area in pixels.
   * @default 360
   */
  height?: number;
  /**
   * Whether to show the "view source" toggle button in the toolbar.
   * @default false
   */
  showSource?: boolean;
  className?: string;
}

type SourceTab = "html" | "css" | "js";

/* -------------------------------------------------------------------------- */
/*  srcdoc builder                                                             */
/* -------------------------------------------------------------------------- */

function buildSrcdoc(html: string, css: string, js: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; }
  body { padding: 1rem; font-family: system-ui, sans-serif; }
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
    const el = document.createElement('pre');
    el.style.cssText = 'color:#ef4444;font-size:12px;margin:0;white-space:pre-wrap;';
    el.textContent = 'Runtime error: ' + e.message;
    document.body.appendChild(el);
  }
})();
<\/script>
</body>
</html>`;
}

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
  className,
}: SandboxProps) {
  /* -------- state -------- */
  const [resetKey, setResetKey] = useState(0);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SourceTab>("html");

  /* -------- resize handle -------- */
  const [previewHeight, setPreviewHeight] = useState(height);
  const dragState = useRef<{ startY: number; startH: number } | null>(null);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragState.current = { startY: e.clientY, startH: previewHeight };

    const onMove = (mv: MouseEvent) => {
      if (!dragState.current) return;
      const delta = mv.clientY - dragState.current.startY;
      setPreviewHeight(Math.max(120, dragState.current.startH + delta));
    };
    const onUp = () => {
      dragState.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [previewHeight]);

  /* -------- derived values -------- */
  const srcdoc = buildSrcdoc(html, css, js);
  const displayTitle = title ?? "sandbox";

  // Build source tabs — only include tabs that have content
  const sourceTabs: Partial<Record<SourceTab, { code: string; language: string }>> = {};
  if (html.trim()) sourceTabs["html"] = { code: html, language: "html" };
  if (css.trim()) sourceTabs["css"] = { code: css, language: "css" };
  if (js.trim()) sourceTabs["js"] = { code: js, language: "javascript" };

  const availableTabs = Object.keys(sourceTabs) as SourceTab[];

  // If current activeTab has no content, fall back to first available
  const resolvedTab: SourceTab =
    availableTabs.includes(activeTab) ? activeTab : availableTabs[0] ?? "html";

  const currentSource = sourceTabs[resolvedTab];

  return (
    <div
      className={cn("my-6 border border-border overflow-hidden", className)}
      data-sandbox
    >
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-1.5">
        {/* Left: traffic-light dots + title */}
        <div className="flex items-center gap-2.5">
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground select-none">
            <span className="text-green-500">$</span>{" "}
            {displayTitle}
          </span>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1">
          {/* Reset */}
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            title="Reset sandbox"
            aria-label="Reset sandbox"
            className="flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
          </button>

          {/* Source toggle — only rendered when showSource is true */}
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
                  : "text-muted-foreground hover:text-foreground"
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

      {/* ── Preview iframe ───────────────────────────────────────────────── */}
      <div style={{ height: previewHeight }} className="w-full overflow-hidden bg-white dark:bg-zinc-950">
        <iframe
          key={resetKey}
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          title={`Sandbox: ${displayTitle}`}
          className="h-full w-full border-none"
          style={{ display: "block" }}
        />
      </div>

      {/* ── Resize handle ────────────────────────────────────────────────── */}
      <div
        onMouseDown={onDragStart}
        className="group flex h-2 w-full cursor-ns-resize items-center justify-center border-t border-border bg-muted/20 hover:bg-muted/50 transition-colors select-none"
        aria-label="Drag to resize"
        role="separator"
        aria-orientation="horizontal"
      >
        {/* Drag indicator dots */}
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-0.5 w-3 bg-muted-foreground/50" />
          ))}
        </div>
      </div>

      {/* ── Source panel ─────────────────────────────────────────────────── */}
      {showSource && sourceOpen && (
        <div
          className="border-t border-border"
          style={{
            // Subtle slide-in: handled purely via CSS animation so it
            // respects prefers-reduced-motion at the browser level.
            animation: "sandboxSourceIn 150ms ease",
          }}
        >
          {availableTabs.length > 1 && (
            <div className="flex items-center gap-0 border-b border-border bg-muted/20 px-3">
              {availableTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "border-b-2 px-3 py-2 font-mono text-[11px] transition-colors",
                    resolvedTab === tab
                      ? "border-green-500 text-green-500"
                      : "border-transparent text-muted-foreground hover:text-foreground"
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

      {/* Inline keyframes (scoped, avoids global CSS file changes) */}
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
