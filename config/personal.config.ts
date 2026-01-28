import type { ExperienceItemProps } from "@/types";

export const PersonalData = {
  name: "Aditya",
  nickname: "Adii",
  logo: "",
  description: [
    "Just someone who loves coding, Linux, and breaking stuff to learn.",
    "Exploring tech, devops, web3, and enjoying the chaos.",
    "(you know what I'm talking about!)"
  ],
  title: "Student / Coder",
  avatar: "https://i.pinimg.com/736x/35/2b/03/352b03faa5630e37e1efbb9798b633e1.jpg",
  favicon: "./favicon.ico",
  age: 20,
  about: [
    "Hello! I'm a passionate developer with a keen interest in creating elegant and efficient solutions. With a strong foundation in computer science and years of hands-on experience, I specialize in full-stack development, focusing on modern web technologies.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community meetups. I'm always excited about new challenges and opportunities to grow both personally and professionally."
  ],
  address: {
    "city": "Ajmer",
    "state": "Rajasthan",
    "country": "India",
    "pincode": "305817",
    "longitude": 75.377394,
    "latitude": 26.612028
  }
}

export const EducationData = [
  {
    year: "2023 - 2027",
    title: "Bachelor's Degree in Computer Science & Engineering",
    institution: "Central University of Rajasthan",
    location: "Ajmer, Rajasthan",
    link: "https://www.curaj.ac.in/"
  },
  {
    year: "2018 - 2022",
    title: "High School & Intermediate",
    institution: "Chandra Public School",
    location: "Mau, Uttar Pradesh",
    link: "https://cpsmau.com"
  }
]


export const ExperienceData: ExperienceItemProps[] = [
  {
    company: "Hooman Digital",
    position: "Software Engineer Intern",
    type: "Internship",
    location: "Virtual",
    startDate: "Oct 2025",
    endDate: "Nov 2025",
    description: [
      "Worked on AI-driven products using MCP and AI SDK, building and integrating intelligent chat and automation workflows",
      "Contributed to the Nosana-deployer MCP project and its chat integration",
      "Integrated Stripe payments to chartor.ai, including secure checkout flows and webhook handling",
      "Designed, containerized, and deployed services on AWS ECS with Secrets Manager",
      "Built CI/CD pipelines using GitHub Actions for automated production deployments",
      "Worked across Next.js, Express.js, and Electron.js, improving stability and developer experience",
    ],
    techStack: [
      "Next.js",
      "Express.js",
      "Electron.js",
      "AWS ECS",
      "Stripe",
      "GitHub Actions",
      "Docker",
      "MCP",
      "AI SDK",
    ],
    logo: "https://www.hooman.digital/favicon.svg",
    companyUrl: "https://hooman.digital",
  }
];

export const LinkData = {
  instagram: {
    username: "idity_dx",
    link: "https://www.instagram.com/idity_dx/"
  },
  x: "https://x.com/idityage",
  github: "https://github.com/idityaGE",
  linkedin: "https://www.linkedin.com/in/idityage/",
  gmail: "adiimaurya02@gamil.com",
  mail: "mailto:am44910606@gmail.com?subject=Hello%20!"
}

export const GITHUB_USERNAME = "idityaGE";
export const LEETCODE_USERNAME = "idityage";
export const BASE_URL = "https://iditya.dev"


export const skillList = {
  Librarys: [
    "React", "Next.js", "Expo", "TailwindCSS", "SCSS", "ShadCN UI", "Redux", "Recoil", "TanStack Query", "Turborepo", "Motion", "Three.js", "ESLint", "Vitest", "Jest", "Cypress", "Socket.io", "Hugging Face 🤗", "LangChain 🔗", "Crew AI"
  ],
  "Javascript runtime": [
    "Node.js", "Bun", "Deno", "Edge runtime (Vercel)", "CF Worker",
  ],
  Backend: [
    "Hono js", "Express", "GraphQL", "Go", "Appwrite", "Supabase", "Swagger", "websocket", "WebRTC"
  ],
  Database: [
    "PostgreSQL", "MongoDB", "MySQL", "SQLite", "Redis", "ChromaDB", "Pinecone"
  ],
  "Web 3": [
    "Web3.js", "@solana/web3.js", "Solana", "Ethereum", "Solidity"
  ],
  ORM: [
    "Prisma", "Mongoose", "Drizzle"
  ],
  DevOps: [
    "AWS", "GCP", "Docker", "Kubernetes", "Vercel", "Cloudflare", "Netlify", "GitHub Actions", "GitLab CI/CD", "Nginx", "Apache Kafka"
  ],
  Tools: [
    "Git", "GitHub", "Visual Studio Code", "Linux", "Bash"
  ],
  Languages: [
    "TypeScript", "Go", "C", "C++", "Java", "Rust", "Python"
  ]
};
