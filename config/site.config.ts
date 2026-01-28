import { BASE_URL, LinkData, PersonalData } from "@/config/personal.config"

export const siteConfig = {
  name: "iditya.dev",
  title: "Adi 🍀",
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
  ogImage: "https://res.cloudinary.com/dwdbqwqxk/image/upload/v1732530896/Hi_vf73cf.png",
  links: {
    x: LinkData.x,
    github: LinkData.github,
  },
  favicon: {
    icon: "https://res.cloudinary.com/dwdbqwqxk/image/upload/v1730215181/favicon-32x32_cgdyy8.png",
    shortcut: "https://res.cloudinary.com/dwdbqwqxk/image/upload/v1730215179/favicon-16x16_xajjgn.png",
    apple: "https://res.cloudinary.com/dwdbqwqxk/image/upload/v1730215177/apple-touch-icon_fdqynk.png",
  }
}
