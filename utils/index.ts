
export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
}

export const BASE_URL = "https://iditya.tech"
