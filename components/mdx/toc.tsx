"use client";
import { useEffect, useState, memo, useCallback, useMemo, useRef } from 'react';
import type { TocEntry } from 'remark-mdx-toc';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { generateSlug } from '@/utils';
import { ListMinusIcon } from 'lucide-react';

const DEPTH_STYLES = {
  1: "",
  2: "pl-2",
  3: "pl-4",
  4: "pl-8",
  5: "pl-10",
  6: "pl-12"
} as const;

const HEADER_OFFSET = 100; // Offset for fixed header

const TableOfContentsItem = memo(function TableOfContentsItem({
  item,
  activeItemId,
  onItemClick
}: {
  item: TocEntry;
  activeItemId?: string;
  onItemClick: (id: string, event: React.MouseEvent) => void;
}) {
  const id = useMemo(() => generateSlug(item.value), [item.value]);
  const isActive = activeItemId === id;

  const handleClick = useCallback((e: React.MouseEvent) => {
    onItemClick(id, e);
  }, [id, onItemClick]);

  const linkClassName = useMemo(() => cn(
    "block transition-colors py-0.5 text-[0.85rem] leading-5",
    "truncate max-w-[220px] hover:text-primary",
    isActive
      ? "text-primary font-semibold"
      : "text-muted-foreground",
    DEPTH_STYLES[item.depth as keyof typeof DEPTH_STYLES] || ""
  ), [isActive, item.depth]);

  return (
    <li>
      <div className="flex">
        <Link
          href={`#${id}`}
          className={linkClassName}
          scroll={false}
          onClick={handleClick}
          title={item.value}
        >
          {item.value}
        </Link>
      </div>
      {item.children?.length > 0 && (
        <ul className="space-y-1 mt-1">
          {item.children.map((child, index) => (
            <TableOfContentsItem
              key={`${child.value}-${index}`}
              item={child}
              activeItemId={activeItemId}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const tocListRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleItemClick = useCallback((targetId: string, e: React.MouseEvent) => {
    e.preventDefault();

    // Disable intersection observer temporarily during click scroll
    isClickScrollingRef.current = true;
    clearTimeout(clickTimeoutRef.current);

    const element = document.getElementById(targetId);
    if (element) {
      // Calculate offset from top accounting for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL and active state
      window.history.pushState(null, '', `#${targetId}`);
      setActiveId(targetId);

      // Re-enable intersection observer after scroll completes
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  const scrollActiveItemIntoView = useCallback(() => {
    if (!tocListRef.current || !activeId) return;

    const activeElement = tocListRef.current.querySelector(`a[href="#${activeId}"]`);
    if (!activeElement) return;

    const container = tocListRef.current;
    const containerRect = container.getBoundingClientRect();
    const activeElementRect = activeElement.getBoundingClientRect();

    // Check if element is outside visible area
    if (
      activeElementRect.top < containerRect.top ||
      activeElementRect.bottom > containerRect.bottom
    ) {
      const relativeTop = activeElementRect.top - containerRect.top;
      const newScrollTop = container.scrollTop + relativeTop -
        (containerRect.height / 2) + (activeElementRect.height / 2);

      container.scrollTo({
        top: newScrollTop,
        behavior: 'smooth'
      });
    }
  }, [activeId]);

  useEffect(() => {
    scrollActiveItemIntoView();
  }, [activeId, scrollActiveItemIntoView]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const headingElements = Array.from(
      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
    ) as HTMLElement[];

    if (headingElements.length === 0) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip if user is clicking/scrolling
        if (isClickScrollingRef.current) return;

        // Find all visible entries
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            // Sort by position on screen (top to bottom)
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

        // Set the first visible heading as active
        if (visibleEntries.length > 0) {
          const newActiveId = visibleEntries[0].target.id;
          setActiveId(prev => {
            if (prev !== newActiveId) {
              return newActiveId;
            }
            return prev;
          });
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all headings
    headingElements.forEach(element => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Handle initial hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveId(hash);
      // Scroll to element after a brief delay to ensure page is loaded
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(clickTimeoutRef.current);
    };
  }, []); // Empty dependency array - only run once

  const shouldRender = useMemo(() =>
    toc && Array.isArray(toc) && toc.length > 0, [toc]
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div className='max-w-[300px]'>
      <h2 className="text-md font-bold mb-3">
        <ListMinusIcon className="inline mr-1" size={16} />
        Table of Contents
      </h2>
      <nav aria-label="Table of contents">
        <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-2" ref={tocListRef}>
          {toc.map((item, index) => (
            <TableOfContentsItem
              key={`${item.value}-${index}`}
              item={item}
              activeItemId={activeId}
              onItemClick={handleItemClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
