import { ConnectCard } from "./cards/connect";
import { Projects } from "./cards/project";
import { SkillCard } from "./cards/skills";
import { BlogCard } from "./cards/blog";
import { LeetCodeStatsCard } from "./cards/lc";
import { GitHubContributionsWithSuspense } from "./cards/gh";
import { MobileExpandable } from "./mobile-expandable";

import {
  Layers,
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
} from "@/components/ui/magicui/bento-grid";

export const Bento = () => {
  const primaryFeatures: BentoCardProps[] = [
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
      Icon: Layers,
      name: "tech stack",
      terminalCmd: "$ skills",
      background: <SkillCard />,
      className: "md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-5",
    },
    {
      Icon: BookIcon,
      name: "blogs",
      terminalCmd: "$ cat latest",
      background: <BlogCard />,
      className: "md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5",
    },
  ];

  const expandableFeatures: BentoCardProps[] = [
    {
      Icon: Github,
      name: "github",
      terminalCmd: "$ gh contrib",
      background: <GitHubContributionsWithSuspense />,
      className: "md:col-start-1 md:col-end-5 md:row-start-5 md:row-end-6",
    },
    {
      Icon: LucideSheet,
      name: "leetcode",
      terminalCmd: "$ lc stats",
      background: <LeetCodeStatsCard />,
      className: "md:col-start-1 md:col-end-5 md:row-start-6 md:row-end-7",
    },
  ];

  const renderBentoCard = (feature: BentoCardProps) => (
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
  );

  return (
    <BentoGrid className="md:grid-cols-4">
      {primaryFeatures.map(renderBentoCard)}

      {/* GitHub + LeetCode: always visible on desktop, toggled on mobile */}
      <MobileExpandable>
        {expandableFeatures.map(renderBentoCard)}
      </MobileExpandable>
    </BentoGrid>
  );
};
