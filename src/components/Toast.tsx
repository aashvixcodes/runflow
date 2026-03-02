"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastContextType {
    showToast: (message?: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => { } });

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

    const showToast = useCallback((message = "Code copied to clipboard!") => {
        setToast({ message, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key={toast.id}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 300 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-text-main text-white px-6 py-4 rounded-full font-semibold text-[0.95rem] flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.3)] z-[100]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </ToastContext.Provider>
    );
}
