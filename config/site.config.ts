import { BASE_URL, LinkData, PersonalData } from "@/config/personal.config"

export const siteConfig = {
  name: "iditya.dev",
  title: "Adi",
  description: "Hi, I'm Adii, I'm a software engineer based in India. I loves coding, Linux, and breaking stuff to learn.",
  keywords: [
    "Aditya Portfolio",
    "iditya",
    "idityage",
    "Aditya",
    "adi",
    "adii",
    "iditya.dev",
    "github.com/idityaGE",
    "programmer",
    "developer",
    "engineer",
    "x.com/idityage",
  ],
  siteUrl: BASE_URL,
  creator: {
    name: PersonalData.name,
    url: BASE_URL,
    email: LinkData.gmail
  },
  ogImage: "https://ik.imagekit.io/nnp1iszdfe/og-portfolio.png",
  links: {
    x: LinkData.x,
    github: LinkData.github,
  },
  favicon: {
    icon: "https://ik.imagekit.io/nnp1iszdfe/favicon_io%20(1)/favicon-32x32.png",
    shortcut: "https://ik.imagekit.io/nnp1iszdfe/favicon_io%20(1)/favicon-16x16.png",
    apple: "https://ik.imagekit.io/nnp1iszdfe/favicon_io%20(1)/apple-touch-icon.png",
  }
}
