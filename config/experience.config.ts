import type { ExperienceItemProps } from "@/types";

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
