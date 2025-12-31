import { Construction } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof of Work",
  description:
    "My proof of work across different domains - Web3, Open Source, and more.",
};

const PoWPage = () => {
  return (
    <div className="mt-10 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-medium font-grid mb-4">Proof of Work</h1>
        <p className="text-base text-muted-foreground">
          A collection of my work, contributions, and experiments across
          different domains.
        </p>
      </header>

      <main className="flex flex-col gap-4">
        {/* Web3 - Available */}
        <Link
          href="/PoW/web-3"
          className="group flex items-center justify-between px-4 py-4 border hover:bg-muted/30 transition-colors duration-200"
        >
          <div>
            <h2 className="text-sm font-medium font-mono group-hover:underline underline-offset-2">
              Web3 / Solana
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Blockchain projects, smart contracts, and experiments
            </p>
          </div>
          <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded">
            Available
          </span>
        </Link>

        {/* Coming Soon Items */}
        <div className="flex items-center justify-between px-4 py-4 border opacity-60">
          <div className="flex items-center gap-3">
            <Construction size={16} className="text-muted-foreground" />
            <div>
              <h2 className="text-sm font-medium font-mono">Open Source</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Contributions to open source projects
              </p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
            Coming Soon
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-4 border opacity-60">
          <div className="flex items-center gap-3">
            <Construction size={16} className="text-muted-foreground" />
            <div>
              <h2 className="text-sm font-medium font-mono">DevOps</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Infrastructure and deployment work
              </p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
            Coming Soon
          </span>
        </div>
      </main>
    </div>
  );
};

export default PoWPage;
