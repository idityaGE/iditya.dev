"use client";

import { CodeSnippet, themes } from "@/components/ui/code-snippets";
import { CommandBtn } from "@/components/content/command-btn";
import React, { isValidElement } from "react";

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export const Code = ({ children, className }: CodeProps) => {
  let language = "typescript";
  let code = "";

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    //@ts-ignore
    if (isValidElement(node) && node.props.children) {
      //@ts-ignore
      return extractText(node.props.children);
    }
    return "";
  };

  if (isValidElement(children)) {
    const childProps = children.props as {
      className?: string;
      children?: React.ReactNode;
    };

    if (childProps.className) {
      const match = childProps.className.match(/language-(\w+)/);
      if (match) {
        language = match[1];
      }
    }

    code = extractText(childProps.children);
  } else if (typeof children === "string") {
    code = children;
  }

  if (language === "typescript" && className) {
    const match = className.match(/language-(\w+)/);
    if (match) {
      language = match[1];
    }
  }

  let title = "";
  const lines = code.split("\n");
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // Check for "// title: " or "# title: "
    const titleMatch = firstLine.match(/^(?:\/\/|#)\s*title:\s*(.+)$/);
    if (titleMatch) {
      title = titleMatch[1];
      code = lines.slice(1).join("\n");
    }
  }

  if (!title && isValidElement(children)) {
    const childProps = children.props as { title?: string };
    if (childProps.title) {
      title = childProps.title;
    }
  }

  if (language === "bash" || language === "sh" || language === "shell") {
    return (
      <div className="my-6">
        <CommandBtn command={{ sh: code.trim() }} />
      </div>
    );
  }

  return (
    <div className="my-6">
      <CodeSnippet
        title={title}
        code={code.trim()}
        language={language}
        showLineNumbers={true}
        adaptiveTheme={{
          light: themes.lightTheme,
          dark: themes.githubDark,
        }}
      />
    </div>
  );
};
