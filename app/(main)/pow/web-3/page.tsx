import Link from "next/link";
import type { Metadata } from "next";
import { Github } from "lucide-react";
import { BackButton } from "@/features/blog/components/back-button";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  Tag,
} from "@/components/ui/terminal";

export const metadata: Metadata = {
  title: "Web3 Proof of Work",
  description:
    "My Web3 learning journey, projects, and experiments on Solana blockchain.",
};

interface PoWItem {
  title: string;
  description: string;
  github: string;
  tag: string;
}

const powItems: PoWItem[] = [
  {
    title: "Solana Token Launchpad",
    description:
      "A full-fledged token launchpad built on Solana for creating and deploying SPL tokens.",
    github: "https://github.com/idityaGE/Solana-Token-Lauchpad",
    tag: "project",
  },
  {
    title: "WEB-3 Learning Journey",
    description:
      "Documentation and code from my Web3 learning path, covering concepts from basics to advanced.",
    github: "https://github.com/idityaGE/WEB-3",
    tag: "learning",
  },
  {
    title: "Escrow Program",
    description:
      "Escrow program implementation demonstrating secure token swaps on Solana.",
    github: "https://github.com/idityaGE/solana-programs",
    tag: "program",
  },
  {
    title: "Solana Bootcamp",
    description:
      "Projects and assignments completed during YouTube bootcamp sessions.",
    github: "https://github.com/idityaGE/solana_bootcamp",
    tag: "bootcamp",
  },
  {
    title: "Geyser Plugin Scaffold",
    description:
      "Experimental scaffold for building Solana Geyser plugins for real-time data streaming.",
    github: "https://github.com/idityaGE/solana-geyser-plugin-scaffold",
    tag: "experiment",
  },
  {
    title: "Cheap Data Store on Solana",
    description:
      "Experiment exploring cost-effective data storage solutions on the Solana blockchain.",
    github: "https://github.com/idityaGE/cheap-data-store-on-solana",
    tag: "experiment",
  },
];

const PoWPage = () => {
  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrafficLightDots />
          <TerminalPath>~/pow/web-3</TerminalPath>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider">Web3 / Solana</h1>
          <TerminalPath>({powItems.length} repos)</TerminalPath>
        </div>
      </div>

      {/* Description Block */}
      <div className="border-b bg-background p-3">
        <TerminalCommand className="mb-1.5">$ cat readme.md</TerminalCommand>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          My journey into the Solana ecosystem — from learning the fundamentals to building 
          real-world applications and experimenting with cutting-edge blockchain technology.
        </p>
      </div>

      {/* Items List */}
      <div className="mt-8 p-2">
        <div className="flex flex-col gap-2">
          {powItems.map((item) => (
            <PoWCard key={item.github} item={item} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <BackButton href="/pow" label="← cd .." />
        <TerminalPath>total: {powItems.length}</TerminalPath>
      </div>
    </div>
  );
};

const PoWCard = ({ item }: { item: PoWItem }) => {
  return (
    <Link
      href={item.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-background p-3 hover:bg-muted/30 transition-colors border"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <GreenArrow className="mt-0.5" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xs font-mono font-bold group-hover:text-green-500 transition-colors">
                {item.title}
              </h2>
              <Tag size="sm">{item.tag}</Tag>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
        <Github size={14} className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
      </div>
    </Link>
  );
};

export default PoWPage;
