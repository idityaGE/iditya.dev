"use client";

import { useEffect, useState, memo } from 'react';
import type { TocEntry } from 'remark-mdx-toc';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { generateSlug } from '@/utils';
import { ListMinusIcon } from 'lucide-react'

const TableOfContentsItem = memo(function TableOfContentsItem({
  item,
  activeItemId
}: {
  item: TocEntry;
  activeItemId?: string
}) {
  const id = generateSlug(item.value);
  const isActive = activeItemId === id;

  return (
    <li>
      <Link
        href={`#${id}`}
        className={cn(
          "block transition-colors py-0.5 text-[0.85rem] leading-5 text-ellipsis",
          isActive
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-primary",
          item.depth === 1 && "",
          item.depth === 2 && "pl-0",
          item.depth === 3 && "pl-4",
          item.depth === 4 && "pl-8",
          item.depth === 5 && "pl-10",
          item.depth === 6 && "pl-12"
        )}
        scroll={true}
        onClick={(e) => {
          e.preventDefault();
          const targetId = id;
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update URL without causing a page reload
            window.history.pushState(null, '', `#${targetId}`);
          }
        }}
      >
        {/* {item.value.length > 40
          ? `${item.value.slice(0, 40)}...`
          : item.value} */}
        {item.value}
      </Link>

      {item.children && item.children.length > 0 && (
        <ul className="space-y-1 mt-1">
          {item.children.map((child, index) => (
            <TableOfContentsItem
              key={`${child.value}-${index}`}
              item={child}
              activeItemId={activeItemId}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const headingElements = Array.from(
      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
    );

    const callback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          return aRect.top - bRect.top;
        });

      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    headingElements.forEach(element => {
      if (element) observer.observe(element);
    });

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveId(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }

    return () => observer.disconnect();
  }, []);

  if (!toc || !Array.isArray(toc) || toc.length === 0) {
    return null;
  }

  return (
    <div className='max-w-[300px]'>
      <h2 className="text-md font-bold mb-3">
        <ListMinusIcon className="inline mr-1" size={16} />
        Table of Contents
      </h2>
      <nav aria-label="Table of contents">
        <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
          {toc.map((item, index) => (
            <TableOfContentsItem
              key={`${item.value}-${index}`}
              item={item}
              activeItemId={activeId}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
