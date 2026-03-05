import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
    label?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, error, label, helperText, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-text-main">
                        {label}
                    </label>
                )}
                <div className="relative flex items-center">
                    {icon && (
                        <div className="absolute left-3 text-text-muted pointer-events-none flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                    <input
                        id={inputId}
                        ref={ref}
                        className={cn(
                            "flex h-11 w-full rounded-xl border bg-bg-island px-4 py-2 text-sm text-text-main transition-all duration-200",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "placeholder:text-text-muted/60",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-crimson/30 focus-visible:border-accent-crimson",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-10" : "",
                            error ? "border-accent-crimson focus-visible:ring-accent-crimson/30" : "border-border-light hover:border-text-muted/40",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="text-sm font-medium text-accent-crimson mt-0.5">{error}</p>}
                {helperText && !error && <p className="text-sm text-text-muted mt-0.5">{helperText}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";
