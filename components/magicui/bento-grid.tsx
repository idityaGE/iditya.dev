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
    <div className={cn("grid w-full auto-rows-auto grid-cols-3", className)}>
      {children}
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  isIconHidden?: boolean;
  makeAbsolute?: boolean
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  isIconHidden = false,
  makeAbsolute = false
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-start overflow-hidden",
      className
    )}
  >
    <div
      className={cn(
        "pointer-events-none z-10 flex gap-2 px-3 pt-4 items-center py-1.5 w-fit border-b border-r",
        isIconHidden && "hidden",
        makeAbsolute && "absolute"
      )}
    >
      <Icon className="h-4 w-4 origin-left" />
      <h3 className="text-sm dark:text-neutral-300 uppercase">{name}</h3>
    </div>
    <div className="flex-1">{background}</div>
  </div>
);

export { BentoCard, BentoGrid };
