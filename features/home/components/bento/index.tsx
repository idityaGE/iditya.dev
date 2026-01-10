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
      name: "projects",
      background: <Projects />,
      className: "md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-2",
    },
    {
      Icon: Link,
      name: "connect",
      terminalCmd: "$ socials",
      background: <ConnectCard />,
      className: "md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3",
    },
    {
      Icon: BookIcon,
      name: "blogs",
      terminalCmd: "$ cat latest",
      background: <BlogCard />,
      className: "md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-4",
    },
    {
      Icon: MapPin,
      name: `${PersonalData.address.city}, ${PersonalData.address.country}`,
      terminalCmd: "$ location",
      background: <GlobeCard />,
      className: "md:row-start-4 md:row-end-5 md:col-start-3 md:col-end-5",
    },
    {
      Icon: Layers,
      name: "tech stack",
      terminalCmd: "$ skills",
      background: <SkillCard />,
      className: "md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5",
    },
    {
      Icon: Github,
      name: "github",
      terminalCmd: "$ gh contrib",
      background: <GitHubContributionsWithSuspense />,
      className: "md:col-start-1 md:col-end-5 md:row-start-5 md:row-end-6",
    },
    {
      Icon: LucideSheet,
      makeAbsolute: true,
      name: "leetcode",
      terminalCmd: "$ lc stats",
      background: <LeetCodeStatsCard />,
      className: "md:col-start-1 md:col-end-5 md:row-start-6 md:row-end-7",
    },
  ];

  return (
    <BentoGrid className="md:grid-cols-4">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          name={feature.name}
          background={feature.background}
          Icon={feature.Icon}
          className={feature.className}
          isIconHidden={feature.isIconHidden}
          makeAbsolute={feature.makeAbsolute}
          terminalCmd={feature.terminalCmd}
        />
      ))}
    </BentoGrid>
  );
};
