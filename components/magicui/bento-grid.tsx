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

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  isIconHidden = false,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  isIconHidden?: boolean;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-start overflow-hidden border-b border-r",
      className
    )}
  >
    <div
      className={cn(
        "pointer-events-none z-10 flex gap-2 px-5 pt-4 pb-2",
        isIconHidden && "hidden"
      )}
    >
      <Icon className="h-6 w-6 origin-left" />
      <h3 className="text-base font-medium dark:text-neutral-300">{name}</h3>
    </div>
    <div>{background}</div>
  </div>
);

export { BentoCard, BentoGrid };
