import { Construction } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  BlinkingCursor,
  Tag,
} from "@/components/ui/terminal";

export const metadata: Metadata = {
  title: "Proof of Work",
  description:
    "My proof of work across different domains - Web3, Open Source, and more.",
};

interface PoWCategory {
  title: string;
  description: string;
  href?: string;
  status: "available" | "coming-soon";
}

const categories: PoWCategory[] = [
  {
    title: "web-3/solana",
    description: "Blockchain projects, smart contracts, and experiments",
    href: "/pow/web-3",
    status: "available",
  },
  {
    title: "open-source",
    description: "Contributions to open source projects",
    status: "coming-soon",
  },
  {
    title: "devops",
    description: "Infrastructure and deployment work",
    status: "coming-soon",
  },
];

const PoWPage = () => {
  return (
    <div className="mt-10">
      {/* Terminal Header */}
      <div className="border-y bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrafficLightDots />
          <TerminalPath>~/pow</TerminalPath>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider">Proof of Work</h1>
          <TerminalPath>({categories.length} categories)</TerminalPath>
        </div>
      </div>

      {/* Description Block */}
      <div className="border-b bg-background p-3">
        <TerminalCommand className="mb-1.5">$ cat readme.md</TerminalCommand>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          A collection of my work, contributions, and experiments across different domains.
        </p>
      </div>

      {/* Categories List */}
      <div className="mt-8 p-2">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <TerminalPath>$ ls -la | wc -l</TerminalPath>
        <BlinkingCursor />
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: PoWCategory }) => {
  const isAvailable = category.status === "available";

  const content = (
    <div className={`bg-background p-3 ${isAvailable ? "hover:bg-muted/30" : "opacity-60"} transition-colors border`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          {isAvailable ? (
            <GreenArrow className="mt-0.5" />
          ) : (
            <Construction size={12} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          )}
          <div className="min-w-0">
            <h2 className={`text-xs font-mono font-bold ${isAvailable ? "group-hover:text-green-500" : ""} transition-colors`}>
              {category.title}
            </h2>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              {category.description}
            </p>
          </div>
        </div>
        <Tag
          size="sm"
          className={isAvailable
            ? "bg-green-500/10 text-green-500 border-green-500/20 flex-shrink-0"
            : "flex-shrink-0"
          }
        >
          {isAvailable ? "ready" : "pending"}
        </Tag>
      </div>
    </div>
  );

  if (isAvailable && category.href) {
    return (
      <Link href={category.href} className="group">
        {content}
      </Link>
    );
  }

  return content;
};

export default PoWPage;
