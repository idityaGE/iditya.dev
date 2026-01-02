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

export const BASE_URL = "https://iditya.dev"
