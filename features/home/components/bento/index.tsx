import { ConnectCard } from "./cards/connect";
import { GlobeCard } from "./cards/globe";
import { Projects } from "./cards/project";
import { SkillCard } from "./cards/skills";
import { BlogCard } from "./cards/blog";
import { LeetCodeStatsCard } from "./cards/lc";
import { GitHubContributionsWithSuspense } from "./cards/gh";

import {
  Layers,
  MapPin,
  Link,
  Atom,
  BookIcon,
  LucideSheet,
  Github,
} from "lucide-react";
import {
  BentoCard,
  BentoGrid,
  BentoCardProps,
} from "@/components/magicui/bento-grid";
import { PersonalData } from "@/config/personal.config";

export const Bento = () => {
  const features: BentoCardProps[] = [
    {
      Icon: Atom,
      name: "Project",
      isIconHidden: true,
      background: <Projects />,
      className:
        "md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-2 border-b",
    },
    {
      Icon: Link,
      name: "Connect",
      background: <ConnectCard />,
      className:
        "md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3 border-r-0 md:border-r border-b",
    },
    {
      Icon: BookIcon,
      name: "Blogs",
      background: <BlogCard />,
      className:
        "md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-4 border-b",
    },
    {
      Icon: MapPin,
      name: `${PersonalData.address.city}, ${PersonalData.address.country}`,
      background: <GlobeCard />,
      className:
        "md:row-start-4 md:row-end-5 md:col-start-3 md:col-end-5 border-b",
    },
    {
      Icon: Layers,
      name: "Tech Stack",
      background: <SkillCard />,
      className:
        "md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 border-r-0 md:border-r md:border-r-[rgb(0_0_0/0.15)] md:dark:border-r-[rgb(255_255_255/0.18)] border-b",
    },
    {
      Icon: Github,
      name: "GitHub Contributions",
      background: <GitHubContributionsWithSuspense />,
      className:
        "md:col-start-1 md:col-end-5 md:row-start-5 md:row-end-6 border-b pb-2",
    },
    {
      Icon: LucideSheet,
      makeAbsolute: true,
      name: "Leetcode Stats",
      background: <LeetCodeStatsCard />,
      className: "md:col-start-1 md:col-end-5 md:row-start-6 md:row-end-7",
    },
  ];

  return (
    <BentoGrid className="md:grid-cols-4 border-y">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          name={feature.name}
          background={feature.background}
          Icon={feature.Icon}
          className={feature.className}
          isIconHidden={feature.isIconHidden}
          makeAbsolute={feature.makeAbsolute}
        />
      ))}
    </BentoGrid>
  );
};
