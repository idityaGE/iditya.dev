import { IconCloud } from "@/components/magicui/icon-cloud";

const slugs = ["typescript",
  "javascript",
  "c",
  "cplusplus",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "solidity",
  "postgresql",
  "nginx",
  "vercel",
  "expo",
  "testinglibrary",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "figma",
  "kubernetes",
  "appwrite",
  "rust",
  "python",
  "mysql",
  "mongodb",
  "redux",
  "redis",
  "sass",
  "tailwindcss",
  "turborepo",
  "apachekafka",
  "gnubash",
  "cloudflare",
  "socketdotio",
  "replit",
  "recoil",
  "supabase",
  "linux",
  "swagger",
  "greensock",
  "threedotjs",
  "eslint",
  "webrtc",
  "webpack",
  "shadcnui",
  "go",
  "graphql",
  "solana",
  "ethereum"
];

export function SkillCard() {
  return (
    <div className="pb-6 w-96 mx-auto">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
