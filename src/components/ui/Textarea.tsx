import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const textareaId = id || React.useId();

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label htmlFor={textareaId} className="text-sm font-medium text-text-main">
                        {label}
                    </label>
                )}
                <textarea
                    id={textareaId}
                    ref={ref}
                    className={cn(
                        "flex min-h-[100px] w-full rounded-xl border bg-bg-island px-4 py-3 text-sm text-text-main transition-all duration-200 resize-y",
                        "placeholder:text-text-muted/60",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-crimson/30 focus-visible:border-accent-crimson",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error ? "border-accent-crimson focus-visible:ring-accent-crimson/30" : "border-border-light hover:border-text-muted/40",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-sm font-medium text-accent-crimson mt-0.5">{error}</p>}
                {helperText && !error && <p className="text-sm text-text-muted mt-0.5">{helperText}</p>}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";
