import { cn } from "@/lib/utils";
import { InfoIcon, AlertTriangle, Skull } from "lucide-react";
import { ReactNode } from "react";

interface CalloutProps {
  icon?: ReactNode;
  children?: ReactNode;
  type?: "default" | "warning" | "danger";
  className?: string;
}

const icons = {
  default: InfoIcon,
  warning: AlertTriangle,
  danger: Skull,
};

export function Callout({
  children,
  icon,
  type = "default",
  className,
  ...props
}: CalloutProps) {
  const IconComponent = icons[type];

  return (
    <div
      className={cn(
        "my-6 flex items-start rounded-md border border-l-4 p-4",
        {
          "border-blue-500 border-l-blue-500 bg-blue-50 text-blue-900 dark:border-blue-500 dark:border-l-blue-500 dark:bg-blue-950/30 dark:text-blue-100":
            type === "default",
          "border-yellow-500 border-l-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-500 dark:border-l-yellow-500 dark:bg-yellow-950/30 dark:text-yellow-100":
            type === "warning",
          "border-red-500 border-l-red-500 bg-red-50 text-red-900 dark:border-red-500 dark:border-l-red-500 dark:bg-red-950/30 dark:text-red-100":
            type === "danger",
        },
        className
      )}
      {...props}
    >
      {icon ? (
        <span className="mr-4 text-2xl flex-shrink-0">{icon}</span>
      ) : IconComponent ? (
        <IconComponent className={cn(
          "mr-4 h-5 w-5 flex-shrink-0 mt-1",
          type === "default" && "text-blue-600 dark:text-blue-400",
          type === "warning" && "text-yellow-600 dark:text-yellow-400",
          type === "danger" && "text-red-600 dark:text-red-400"
        )} />
      ) : null}
      <div className="[&>p]:m-0">{children}</div>
    </div>
  );
}
