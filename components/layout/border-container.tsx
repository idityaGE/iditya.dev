import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BorderContainerProps {
    children: ReactNode;
    className?: string;
}

export const BorderContainer = ({ children, className }: BorderContainerProps) => {
    return (
        <div className={cn("mx-auto max-w-4xl border-x border-black/5 dark:border-white/10 min-h-screen", className)}>
            {children}
        </div>
    );
};
