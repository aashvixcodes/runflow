"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TextReveal({ text, className }: { text: string; className?: string }) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const [words, setWords] = useState<{ char: string; opacity: number }[][]>([]);

    useEffect(() => {
        // Prepare the words array grouped by spaces
        const textArray = text.split(" ");
        const initialWords = textArray.map(word =>
            word.split("").map(char => ({ char, opacity: 0.1 }))
        );
        setWords(initialWords);

        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start revealing when the top of the element is 80% down the viewport
            // Finish revealing when the bottom of the element is 20% down the viewport
            const startReveal = windowHeight * 0.8;
            const endReveal = windowHeight * 0.2;

            if (top > startReveal) {
                // Not in view yet
                updateOpacities(0);
            } else if (top < endReveal - height) {
                // Fully scrolled past
                updateOpacities(1);
            } else {
                // In progress
                const scrollProgress = (startReveal - top) / (startReveal - endReveal + height);
                updateOpacities(Math.max(0, Math.min(1, scrollProgress)));
            }
        };

        const updateOpacities = (progress: number) => {
            setWords(prev => {
                const totalChars = prev.reduce((acc, word) => acc + word.length, 0);
                let charIndex = 0;

                return prev.map(word =>
                    word.map(charObj => {
                        const charProgress = charIndex / totalChars;
                        // Map the overall scroll progress to individual character opacities
                        // Adding a slight fade range (e.g., 0.1) so characters fade in sequentially over a window
                        const windowSize = 0.2;
                        let opacity = 0.1;

                        if (progress > charProgress) {
                            opacity = Math.min(1, 0.1 + ((progress - charProgress) / windowSize) * 0.9);
                        }

                        charIndex++;
                        return { ...charObj, opacity };
                    })
                );
            });
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [text]);

    return (
        <p ref={containerRef} className={cn("text-4xl md:text-5xl font-bold tracking-tight text-text-main flex flex-wrap gap-x-3 gap-y-2", className)}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="flex">
                    {word.map((charObj, charIndex) => (
                        <span
                            key={charIndex}
                            className="transition-opacity duration-100 ease-out"
                            style={{ opacity: charObj.opacity }}
                        >
                            {charObj.char}
                        </span>
                    ))}
                </span>
            ))}
        </p>
    );
}
