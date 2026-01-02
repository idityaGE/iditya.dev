"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageSrc } from "@/utils";

interface ThemeImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function ThemeImage({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
  priority = false,
}: ThemeImageProps) {

  const resolvedDarkSrc = getImageSrc(darkSrc);
  const resolvedLightSrc = getImageSrc(lightSrc);

  return (
    <>
      {/* Dark mode image - hidden in light mode */}
      <Image
        src={resolvedDarkSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, "hidden dark:block")}
        priority={priority}
      />
      {/* Light mode image - hidden in dark mode */}
      <Image
        src={resolvedLightSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, "block dark:hidden")}
        priority={priority}
      />
    </>
  );
}
