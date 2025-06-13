import { ConnectCard } from "./cards/connect"
import { GlobeCard } from "./cards/globe"
import { Projects } from "./cards/project"
import { SkillCard } from "./cards/skills"

import { Layers, MapPin, Link, Atom } from 'lucide-react';
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { PersonalData } from "@/config/personal.config";

const features = [
  {
    Icon: Atom,
    name: "Project",
    isIconHidden: true,
    background: <Projects />,
    className: "lg:col-start-1 lg:col-end-5 lg:row-start-4 lg:row-end-5",
  },
  {
    Icon: MapPin,
    name: `${PersonalData.address.city}, ${PersonalData.address.country}`,
    background: <GlobeCard />,
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-3 lg:col-end-5",
  },
  {
    Icon: Layers,
    name: "Tech Stack",
    background: <SkillCard />,
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4",
  },
  {
    Icon: Link,
    name: "Connect",
    background: <ConnectCard />,
    className: "lg:col-start-3 lg:col-end-5 lg:row-start-3 lg:row-end-4",
  },
]

export const Bento = () => {
  return (
    <BentoGrid className='lg:grid-cols-4 lg:gap-4'>
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          name={feature.name}
          background={feature.background}
          Icon={feature.Icon}
          className={feature.className}
          isIconHidden={feature.isIconHidden}
        />
      ))}
    </BentoGrid>
  )
}
