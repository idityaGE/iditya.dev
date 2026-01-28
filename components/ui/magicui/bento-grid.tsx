import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="border-t mt-8">
      {/* Terminal Header */}
      <div className="bg-background px-3 py-2 border-b">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500/80" />
            <span className="w-2 h-2 bg-yellow-500/80" />
            <span className="w-2 h-2 bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">~/dashboard</span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          $ neofetch --components
        </div>
      </div>
      {/* Grid Content */}
      <div className={cn("grid w-full auto-rows-auto grid-cols-3 bg-border gap-px", className)}>
        {children}
      </div>
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  isIconHidden?: boolean;
  makeAbsolute?: boolean;
  terminalCmd?: string;
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  isIconHidden = false,
  makeAbsolute = false,
  terminalCmd,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-start overflow-hidden bg-background",
      className
    )}
  >
    {/* Card Header */}
    <div
      className={cn(
        "pointer-events-none z-10 flex gap-2 px-2.5 py-1.5 items-center w-full border-b bg-muted/70",
        isIconHidden && "hidden",
        makeAbsolute && "absolute"
      )}
    >
      <Icon className="h-3 w-3 text-muted-foreground" />
      <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{name}</h3>
      {terminalCmd && (
        <span className="ml-auto text-[9px] font-mono text-muted-foreground/60">{terminalCmd}</span>
      )}
    </div>
    <div className="flex-1">{background}</div>
  </div>
);

export { BentoCard, BentoGrid };
