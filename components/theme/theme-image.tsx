"use client";

import Image from "next/image";
import { cn, getImageSrc, BLUR_DATA_URL } from "@/lib/utils";

interface ThemeImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ThemeImage({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 768px",
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
        sizes={sizes}
        className={cn(className, "hidden dark:block")}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      {/* Light mode image - hidden in dark mode */}
      <Image
        src={resolvedLightSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={cn(className, "block dark:hidden")}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </>
  );
}
