import React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[250px]", className)}>
            {children}
        </div>
    );
}

interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title: React.ReactNode;
    description?: React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

export function BentoCard({
    title,
    description,
    header,
    icon,
    className,
    ...props
}: BentoCardProps) {
    return (
        <div
            className={cn(
                "row-span-1 rounded-[var(--radius-bento)] group/bento transition-all duration-300 hover:shadow-xl bg-bg-island border border-border-light justify-between flex flex-col space-y-4 overflow-hidden relative",
                className
            )}
            {...props}
        >
            {/* Optional background or visual header area */}
            {header && (
                <div className="flex flex-1 w-full h-full min-h-[6rem] bg-surface-mid relative">
                    {header}
                </div>
            )}

            {/* Content Area */}
            <div className="px-6 pb-6 pt-2 transition-transform duration-300 group-hover/bento:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                    {icon && <div className="text-text-muted">{icon}</div>}
                    <div className="font-bold text-lg text-text-main">
                        {title}
                    </div>
                </div>
                {description && (
                    <div className="font-medium text-sm text-text-muted leading-relaxed">
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
}
