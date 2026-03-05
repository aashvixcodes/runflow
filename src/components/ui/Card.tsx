import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "gradient" | "outline";
    interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", interactive = false, children, ...props }, ref) => {
        const variants = {
            default: "bg-bg-island border border-border-light shadow-sm",
            glass: "bg-bg-island/40 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-xl shadow-black/5",
            gradient: "bg-gradient-to-br from-bg-island to-surface-mid border border-border-light shadow-md",
            outline: "bg-transparent border-2 border-border-light border-dashed",
        };

        const interactiveStyles = interactive
            ? "hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-text-muted/30"
            : "";

        return (
            <div
                ref={ref}
                className={cn("rounded-2xl overflow-hidden", variants[variant], interactiveStyles, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("px-6 py-5 border-b border-border-light/50 flex flex-col space-y-1.5", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn("font-bold text-lg leading-none tracking-tight text-text-main", className)} {...props}>
            {children}
        </h3>
    );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-sm text-text-muted leading-relaxed", className)} {...props}>
            {children}
        </p>
    );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pt-0 mt-5", className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex items-center px-6 py-4 bg-surface-light border-t border-border-light/50", className)} {...props}>
            {children}
        </div>
    );
}
