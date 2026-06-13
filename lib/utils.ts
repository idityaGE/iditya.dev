import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageSrc = (img: string) =>
  img && !img.startsWith("http") && !img.startsWith("/")
    ? `/images/blogs/${img}`
    : img;

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Generic blur placeholder for images (1x1 gray pixel, base64 encoded).
 * Used as blurDataURL for Next.js Image placeholder="blur".
 */
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg==";