"use client";

import React, { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className={className}
      type="button"
    >
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
