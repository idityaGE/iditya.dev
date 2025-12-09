import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  XCircle,
} from "lucide-react";
import React, { ReactNode } from "react";
import { isValidElement } from "react";

const admonitionConfig = {
  note: {
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  tip: {
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-700 dark:text-green-300",
    iconColor: "text-green-600 dark:text-green-400",
    icon: Lightbulb,
  },
  info: {
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    textColor: "text-cyan-700 dark:text-cyan-300",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    icon: Info,
  },
  warning: {
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-700",
    textColor: "text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  danger: {
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-700 dark:text-red-300",
    iconColor: "text-red-600 dark:text-red-400",
    icon: XCircle,
  },
  success: {
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    textColor: "text-emerald-700 dark:text-emerald-300",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle,
  },
  caution: {
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-700 dark:text-orange-300",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: AlertCircle,
  },
};

type AdmonitionType = keyof typeof admonitionConfig;

interface CalloutProps {
  icon?: ReactNode;
  children?: ReactNode;
  type?: AdmonitionType | "default";
  title?: string;
  className?: string;
}

export function Callout({
  children,
  icon,
  type = "note",
  title,
  className,
  ...props
}: CalloutProps) {
  // Map "default" to "note"
  const resolvedType: AdmonitionType = type === "default" ? "note" : type;
  const config = admonitionConfig[resolvedType] || admonitionConfig.note;

  // Handle custom icon: if it's a React element (old prop), use it directly.
  // If it's a component type (new Admonition props usually pass type), handle that.
  // The provided implementation expected `icon: ComponentType`.
  // The old `Callout` usage passed `icon?: ReactNode`.
  // I will check if `icon` is provided. If it is a valid element, render it.
  // If not, render the config icon.

  const ConfigIcon = config.icon;

  const displayTitle =
    title || resolvedType.charAt(0).toUpperCase() + resolvedType.slice(1);

  return (
    <div
      className={cn(
        config.bgColor,
        config.borderColor,
        "border rounded-lg p-4 my-6",
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        <div className={cn(config.iconColor, "flex-shrink-0 mt-0.5")}>
          {isValidElement(icon) ? icon : <ConfigIcon className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className={cn(config.textColor, "font-semibold text-sm mb-1")}>
            {displayTitle}
          </div>
          <div
            className={cn(
              config.textColor,
              "text-sm leading-relaxed [&>p]:m-0"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
