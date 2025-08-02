import { JSX } from 'react';
import Link from 'next/link';
import { generateSlug } from '@/utils';

export const HeadingWithAnchor = ({
  level,
  children,
  className
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6,
  children: React.ReactNode,
  className: string
}) => {
  // Only process string children for ID creation
  const content = typeof children === 'string' ? children : '';
  const slug = generateSlug(content);
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component id={slug} className={className}>
      {children}
      {level >= 1 && content && (
        <Link href={`#${slug}`} aria-label={`Link to ${content}`}>
          <span className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary">#</span>
        </Link>
      )}
    </Component>
  );
};
