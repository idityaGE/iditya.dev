import {
  Github,
  ExternalLink,
  Sparkles,
  BookOpen,
  Code2,
  Rocket,
  FlaskConical,
  Database,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 Proof of Work",
  description:
    "My Web3 learning journey, projects, and experiments on Solana blockchain.",
};

interface PoWItem {
  title: string;
  description: string;
  github: string;
  icon: React.ReactNode;
  tag: string;
}

const powItems: PoWItem[] = [
  {
    title: "Solana Token Launchpad",
    description:
      "A full-fledged token launchpad built on Solana for creating and deploying SPL tokens.",
    github: "https://github.com/idityaGE/Solana-Token-Lauchpad",
    icon: <Rocket size={18} />,
    tag: "Project",
  },
  {
    title: "WEB-3 Learning Journey",
    description:
      "Documentation and code from my Web3 learning path, covering concepts from basics to advanced.",
    github: "https://github.com/idityaGE/WEB-3",
    icon: <BookOpen size={18} />,
    tag: "Learning",
  },
  {
    title: "Solana Programs",
    description:
      "Escrow program implementation demonstrating secure token swaps on Solana.",
    github: "https://github.com/idityaGE/solana-programs",
    icon: <Code2 size={18} />,
    tag: "Program",
  },
  {
    title: "Solana Bootcamp",
    description:
      "Projects and assignments completed during YouTube bootcamp sessions.",
    github: "https://github.com/idityaGE/solana_bootcamp",
    icon: <Sparkles size={18} />,
    tag: "Bootcamp",
  },
  {
    title: "Geyser Plugin Scaffold",
    description:
      "Experimental scaffold for building Solana Geyser plugins for real-time data streaming.",
    github: "https://github.com/idityaGE/solana-geyser-plugin-scaffold",
    icon: <FlaskConical size={18} />,
    tag: "Experiment",
  },
  {
    title: "Cheap Data Store on Solana",
    description:
      "Experiment exploring cost-effective data storage solutions on the Solana blockchain.",
    github: "https://github.com/idityaGE/cheap-data-store-on-solana",
    icon: <Database size={18} />,
    tag: "Experiment",
  },
];

const PoWPage = () => {
  return (
    <div>
      <header className="mb-10 mt-10 font-light">
        <div className="px-4">
          <h1 className="text-3xl font-medium font-grid mb-4">
            Web3 Proof of Work
          </h1>
          <p className="text-base text-muted-foreground mb-2">
            My journey into the Solana ecosystem — from learning the
            fundamentals to building real-world applications and experimenting
            with cutting-edge blockchain technology.
          </p>
        </div>
      </header>

      <main>
        <div className="flex flex-col">
          {powItems.map((item, index) => (
            <PoWCard
              key={item.github}
              item={item}
              isLast={index === powItems.length - 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const PoWCard = ({ item, isLast }: { item: PoWItem; isLast: boolean }) => {
  return (
    <Link
      href={item.github}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-start gap-4 px-4 py-4 border-t ${
        !isLast ? "" : "border-b"
      } hover:bg-muted/30 transition-colors duration-200`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 p-2 rounded-md bg-muted text-muted-foreground group-hover:text-foreground transition-colors">
        {item.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-sm font-medium font-mono group-hover:underline underline-offset-2 truncate">
            {item.title}
          </h2>
          <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded">
            {item.tag}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* GitHub Icon */}
      <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
        <Github size={16} />
        <ExternalLink
          size={12}
          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        />
      </div>
    </Link>
  );
};

export default PoWPage;
