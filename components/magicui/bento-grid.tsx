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
    <div
      className={cn(
        "grid w-full auto-rows-auto grid-cols-3 gap-4",
        className,
      )}
    >
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
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-transparent [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_20px_15px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div className={cn(
      "pointer-events-none z-10 flex gap-2 p-5",
      isIconHidden && "hidden",
    )}>
      <Icon className="h-6 w-6 origin-left" />
      <h3 className="text-base font-medium dark:text-neutral-300">
        {name}
      </h3>
    </div>
    <div>{background}</div>
  </div>
);

export { BentoCard, BentoGrid };
