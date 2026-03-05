import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "magnetic";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page";

        const variants = {
            primary: "bg-text-main text-bg-page hover:bg-text-main/90 shadow-md",
            secondary: "bg-surface-light text-text-main hover:bg-surface-light/80 border border-border-light",
            outline: "border-2 border-border-light text-text-main hover:bg-surface-light hover:border-text-muted",
            ghost: "text-text-muted hover:text-text-main hover:bg-surface-light",
            danger: "bg-accent-crimson text-white hover:bg-accent-crimson/90 shadow-md shadow-accent-crimson/20",
            magnetic: "bg-gradient-to-br from-accent-crimson to-[#9f1239] text-white shadow-[0_8px_30px_rgba(225,29,72,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(225,29,72,0.4)]",
        };

        const sizes = {
            sm: "text-xs px-3 py-1.5 h-8",
            md: "text-sm px-5 py-2.5 h-10",
            lg: "text-base px-6 py-3 h-12",
            icon: "h-10 w-10 p-2",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";
