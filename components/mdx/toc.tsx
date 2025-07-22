"use client";
import { useEffect, useState, memo, useCallback, useMemo } from 'react';
import type { TocEntry } from 'remark-mdx-toc';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { generateSlug } from '@/utils';
import { ListMinusIcon } from 'lucide-react';


const DEPTH_STYLES = {
  1: "",
  2: "pl-0",
  3: "pl-4",
  4: "pl-8",
  5: "pl-10",
  6: "pl-12"
} as const;


const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;

  return (...args: any[]) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

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
    "block transition-colors py-0.5 text-[0.85rem] leading-5 text-ellipsis",
    isActive
      ? "text-primary font-semibold"
      : "text-muted-foreground hover:text-primary",
    DEPTH_STYLES[item.depth as keyof typeof DEPTH_STYLES] || ""
  ), [isActive, item.depth]);

  return (
    <li>
      <Link
        href={`#${id}`}
        className={linkClassName}
        scroll={false} 
        onClick={handleClick}
      >
        {item.value}
      </Link>
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

  
  const handleItemClick = useCallback((targetId: string, e: React.MouseEvent) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      
      requestAnimationFrame(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      });

      window.history.pushState(null, '', `#${targetId}`);
      setActiveId(targetId);
    }
  }, []);

  const intersectionCallback = useMemo(() => {
    return throttle((entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleEntries.length > 0) {
        const newActiveId = visibleEntries[0].target.id;
        setActiveId(prev => prev !== newActiveId ? newActiveId : prev);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    
    const headingElements = Array.from(
      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
    ) as Element[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(intersectionCallback, {
      rootMargin: '-100px 0px -70% 0px',
      threshold: [0, 0.1, 0.5] 
    });

    
    headingElements.forEach(element => observer.observe(element));

    
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveId(hash);
      const element = document.getElementById(hash);
      if (element) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        });
      }
    }

    return () => observer.disconnect();
  }, []); 

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
        <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
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
