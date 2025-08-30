'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import "@/styles/code.css"

interface CodeProps {
  children: React.ReactNode
  className?: string
}

const extractTextContent = (element: React.ReactNode): string => {
  if (typeof element === 'string') {
    return element
  }

  if (typeof element === 'number') {
    return element.toString()
  }

  if (React.isValidElement(element)) {
    //@ts-ignore
    if (element.props.children) {
      //@ts-ignore
      return extractTextContent(element.props.children)
    }
    return ''
  }

  if (Array.isArray(element)) {
    return element.map(extractTextContent).join('')
  }

  return ''
}

export const Code = ({ children, className }: CodeProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    const text = extractTextContent(children)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group">
      <pre className={`p-4 rounded-lg hljs overflow-auto my-6 ${className || ''}`}>
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-1.5 rounded hover:bg-gray-100/10 transition-colors"
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <Copy className="h-4 w-4 text-white" />
        )}
      </button>
    </div>
  )
}