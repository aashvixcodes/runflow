"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <>
            <div className="flex flex-col items-center text-center mt-20 mb-16">
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[clamp(4rem,8vw,8rem)] font-black leading-[0.95] tracking-[-0.05em] text-text-main mb-8"
                >
                    Get in <span className="text-accent-crimson">Touch</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-[1.25rem] font-medium text-text-muted leading-relaxed max-w-[650px]"
                >
                    Let&apos;s craft the next beautiful experience together using high-end interactive components.
                </motion.p>
            </div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center w-full mt-auto"
            >
                <div className="bg-surface-mid border border-border-light rounded-[var(--radius-bento)] w-full max-w-[600px] p-12">
                    <form className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-[0.95rem] text-text-main">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-4 rounded-2xl border border-border-light text-base font-sans bg-white focus:outline-none focus:border-accent-crimson focus:shadow-[0_0_15px_rgba(225,29,72,0.15)] transition-all duration-300"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-[0.95rem] text-text-main">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full p-4 rounded-2xl border border-border-light text-base font-sans bg-white focus:outline-none focus:border-accent-crimson focus:shadow-[0_0_15px_rgba(225,29,72,0.15)] transition-all duration-300"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-[0.95rem] text-text-main">Message</label>
                            <textarea
                                placeholder="Tell us about your project..."
                                rows={4}
                                className="w-full p-4 rounded-2xl border border-border-light text-base font-sans bg-white resize-none focus:outline-none focus:border-accent-crimson focus:shadow-[0_0_15px_rgba(225,29,72,0.15)] transition-all duration-300"
                            />
                        </div>

                        <button
                            type="button"
                            className="bg-text-main text-white border-none px-9 py-[18px] rounded-full text-[1.05rem] font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-200 mt-2.5"
                        >
                            Send Transmission
                        </button>
                    </form>
                </div>
            </motion.div>
        </>
    );
}
