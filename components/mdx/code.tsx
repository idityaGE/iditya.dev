"use client";

import { CodeSnippet } from "@/components/ui/code-snippets";
import { CommandBtn } from "@/components/mdx/command-btn";
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
    if (isValidElement(node) && node.props.children) {
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
        code={code.trim()}
        language={language}
        showLineNumbers={true}
      />
    </div>
  );
};
