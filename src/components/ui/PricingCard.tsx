import React from "react";
import { cn } from "@/lib/utils";
import { GlowingBorder } from "./GlowingBorder";

export interface PricingCardProps {
    planName: string;
    price: string;
    frequency: string;
    description: string;
    features: string[];
    buttonText: string;
    isPopular?: boolean;
    buttonAction?: () => void;
}

export function PricingCard({
    planName,
    price,
    frequency,
    description,
    features,
    buttonText,
    isPopular = false,
    buttonAction
}: PricingCardProps) {

    const InnerContent = () => (
        <div className={cn(
            "flex flex-col h-full bg-bg-island p-8 transition-transform duration-300 ease-out hover:-translate-y-1 relative",
            !isPopular ? "border rounded-[22px] border-border-light shadow-sm" : "rounded-[22px]" // Handled by GlowingBorder inset
        )}>
            {isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-accent-crimson to-[#9f1239] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-[0_4px_14px_rgba(225,29,72,0.4)]">
                        Most Popular
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-text-main">{planName}</h3>
                <p className="text-sm text-text-muted mt-2 h-10">{description}</p>
            </div>

            <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-black text-text-main tracking-tight">{price}</span>
                <span className="text-sm font-semibold text-text-muted mb-1.5">{frequency}</span>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm font-medium text-text-muted">
                        <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={buttonAction}
                className={cn(
                    "w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98]",
                    isPopular
                        ? "bg-text-main text-bg-page hover:bg-text-main/90 shadow-lg shadow-black/5"
                        : "bg-surface-light text-text-main hover:bg-border-light border border-border-light"
                )}
            >
                {buttonText}
            </button>
        </div>
    );

    if (isPopular) {
        return (
            <GlowingBorder className="h-full rounded-[24px]" glowColor="rgba(225, 29, 72, 0.6)" borderWidth={2} borderRadius={24}>
                <InnerContent />
            </GlowingBorder>
        );
    }

    return <InnerContent />;
}
