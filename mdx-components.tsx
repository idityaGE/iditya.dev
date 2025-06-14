import type { MDXComponents } from 'mdx/types'
import { Callout } from "@/components/mdx/callout";
import { YouTube } from "@/components/mdx/youtube";
import { CommandBtn } from "@/components/mdx/command-btn";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    YouTube,
    CommandBtn,
    ...components
  }
}
