"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
}

export interface RadioGroupProps {
    options: RadioOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    className?: string;
    orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
    options,
    value,
    defaultValue,
    onChange,
    name,
    className,
    orientation = "vertical"
}: RadioGroupProps) {
    const groupName = name || React.useId();
    const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value);

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <div
            className={cn(
                "flex gap-3",
                orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
                className
            )}
            role="radiogroup"
        >
            {options.map((option) => {
                const isSelected = currentValue === option.value;
                const id = `${groupName}-${option.value}`;

                return (
                    <div
                        key={option.value}
                        className={cn(
                            "relative flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                            isSelected
                                ? "bg-accent-crimson/5 border-accent-crimson/50 shadow-sm"
                                : "bg-bg-island border-border-light hover:border-text-muted/30",
                            option.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                        onClick={() => !option.disabled && handleChange(option.value)}
                    >
                        <div className="flex shrink-0 items-center justify-center h-5 w-5 mt-0.5 relative">
                            <input
                                type="radio"
                                id={id}
                                name={groupName}
                                value={option.value}
                                checked={isSelected}
                                disabled={option.disabled}
                                onChange={() => handleChange(option.value)}
                                className="peer sr-only"
                            />
                            {/* Outer Circle */}
                            <div className={cn(
                                "w-4 h-4 rounded-full border-2 transition-colors duration-200",
                                isSelected ? "border-accent-crimson" : "border-text-muted/50 peer-focus-visible:border-text-main"
                            )} />
                            {/* Inner Dot */}
                            <div className={cn(
                                "absolute w-2 h-2 rounded-full bg-accent-crimson transition-transform duration-200 scale-0",
                                isSelected && "scale-100"
                            )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor={id}
                                className={cn(
                                    "text-sm font-medium cursor-pointer",
                                    isSelected ? "text-accent-crimson" : "text-text-main"
                                )}
                            >
                                {option.label}
                            </label>
                            {option.description && (
                                <p className="text-sm text-text-muted">{option.description}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
