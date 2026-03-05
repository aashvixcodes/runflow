"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, description, checked, defaultChecked = false, onChange, error, disabled, id, ...props }, ref) => {
        const inputId = id || React.useId();
        const [internalChecked, setInternalChecked] = useState(defaultChecked);

        const isChecked = checked !== undefined ? checked : internalChecked;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = e.target.checked;
            if (checked === undefined) {
                setInternalChecked(newChecked);
            }
            onChange?.(newChecked);
        };

        return (
            <div className={cn("relative flex items-start gap-3", className)}>
                <div className="flex items-center h-5 relative shrink-0">
                    <input
                        type="checkbox"
                        id={inputId}
                        disabled={disabled}
                        checked={isChecked}
                        onChange={handleChange}
                        className="peer sr-only"
                        ref={ref}
                        {...props}
                    />
                    <div
                        className={cn(
                            "w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center bg-bg-island",
                            isChecked
                                ? "bg-accent-crimson border-accent-crimson text-white"
                                : "border-text-muted/50 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-crimson/30 peer-focus-visible:border-accent-crimson",
                            error && "border-accent-crimson",
                            disabled && "opacity-50 bg-surface-light border-border-light cursor-not-allowed"
                        )}
                        aria-hidden="true"
                    >
                        <svg
                            className={cn(
                                "w-3.5 h-3.5 transition-transform duration-200 ease-out",
                                isChecked ? "scale-100" : "scale-0"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                {(label || description) && (
                    <div className="flex flex-col">
                        {label && (
                            <label
                                htmlFor={inputId}
                                className={cn(
                                    "text-sm font-medium select-none cursor-pointer",
                                    disabled ? "text-text-muted cursor-not-allowed" : "text-text-main"
                                )}
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p className={cn("text-sm mt-1", disabled ? "text-text-muted/60" : "text-text-muted")}>
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";
