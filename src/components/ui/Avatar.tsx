import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    initials?: string;
    size?: "sm" | "md" | "lg" | "xl";
    showRing?: boolean;
    status?: "online" | "offline" | "busy" | "away";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, initials, size = "md", showRing = false, status, ...props }, ref) => {
        const [imageError, setImageError] = React.useState(false);

        const sizes = {
            sm: "h-8 w-8 text-xs",
            md: "h-10 w-10 text-sm",
            lg: "h-14 w-14 text-base",
            xl: "h-20 w-20 text-xl",
        };

        const statusColors = {
            online: "bg-emerald-500",
            offline: "bg-text-muted",
            busy: "bg-accent-crimson",
            away: "bg-amber-500",
        };

        const ringStyles = showRing ? "ring-2 ring-accent-crimson ring-offset-2 ring-offset-bg-page" : "";

        return (
            <div className="relative inline-block" ref={ref} {...props}>
                <div
                    className={cn(
                        "relative flex shrink-0 overflow-hidden rounded-full font-semibold items-center justify-center bg-surface-light text-text-main border border-border-light",
                        sizes[size],
                        ringStyles,
                        className
                    )}
                >
                    {src && !imageError ? (
                        <img
                            src={src}
                            alt={alt || "Avatar"}
                            className="aspect-square h-full w-full object-cover"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <span>{initials || "?"}</span>
                    )}
                </div>
                {status && (
                    <span
                        className={cn(
                            "absolute bottom-0 right-0 block rounded-full ring-2 ring-bg-page",
                            statusColors[status],
                            size === "sm" ? "h-2 w-2" : size === "xl" ? "h-4 w-4" : "h-3 w-3"
                        )}
                    />
                )}
            </div>
        );
    }
);
Avatar.displayName = "Avatar";
