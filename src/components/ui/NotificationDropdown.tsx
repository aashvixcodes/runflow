"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Define the interface for a single notification
export interface Notification {
    id: string;
    message: string;
    time: string; // e.g., "5 minutes ago", "Yesterday at 3:00 PM"
    isRead: boolean;
    link?: string; // Optional link if clicking leads somewhere specific
}

// Define the props for the NotificationDropdown component
export interface NotificationDropdownProps {
    initialNotifications?: Notification[];
    onMarkAllAsRead?: (updatedNotifications: Notification[]) => void;
    onNotificationClick?: (notificationId: string, updatedNotifications: Notification[]) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
    initialNotifications = [
        { id: '1', message: 'New "Aurora Glow" component added to the library.', time: '2 mins ago', isRead: false },
        { id: '2', message: 'Your AI generation "Glass Sidebar" is ready.', time: '1 hour ago', isRead: false },
        { id: '3', message: 'Welcome to RunflowUI! Explore our premium primitives.', time: 'Yesterday', isRead: true },
    ],
    onMarkAllAsRead,
    onNotificationClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle keyboard navigation (Escape key to close)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleMarkAllAsRead = useCallback(() => {
        const updatedNotifications = notifications.map((n) => ({ ...n, isRead: true }));
        setNotifications(updatedNotifications);
        onMarkAllAsRead?.(updatedNotifications);
    }, [notifications, onMarkAllAsRead]);

    const handleNotificationClick = useCallback((id: string) => {
        const updatedNotifications = notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
        );
        setNotifications(updatedNotifications);
        onNotificationClick?.(id, updatedNotifications);
        setIsOpen(false);
    }, [notifications, onNotificationClick]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Toggle Button */}
            <button
                type="button"
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-accent-crimson/10 text-accent-crimson' : 'text-text-muted hover:text-accent-crimson hover:bg-surface-light'
                    }`}
                onClick={handleToggle}
                aria-label={`You have ${unreadCount} unread notifications`}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Bell className={`w-[18px] h-[18px] transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`} />

                {/* Unread Count Badge */}
                <AnimatePresence>
                    {unreadCount > 0 && (
                        <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute top-1.5 right-1.5 flex items-center justify-center h-4 w-4 rounded-full bg-accent-crimson text-white text-[10px] font-bold ring-2 ring-bg-island"
                        >
                            {unreadCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-80 md:w-96 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] bg-bg-island border border-border-light overflow-hidden z-50 origin-top-right"
                        role="menu"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-border-light/50 flex items-center justify-between bg-surface-mid/30">
                            <h3 className="text-[1rem] font-bold text-text-main">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    className="text-[0.75rem] font-bold text-accent-crimson hover:text-accent-crimson-hover transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-accent-crimson/5"
                                    onClick={handleMarkAllAsRead}
                                >
                                    <Check className="w-3 h-3" />
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[360px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification.id)}
                                        className={`group relative flex items-start gap-3 px-5 py-4 cursor-pointer transition-all duration-200 border-b border-border-light/40 last:border-0 ${!notification.isRead ? 'bg-accent-crimson/[0.02]' : 'hover:bg-surface-light'
                                            }`}
                                    >
                                        {/* Unread dot */}
                                        {!notification.isRead && (
                                            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-crimson shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                                        )}

                                        <div className="flex-1">
                                            <p className={`text-[0.85rem] leading-relaxed ${!notification.isRead ? 'font-bold text-text-main' : 'font-medium text-text-muted'}`}>
                                                {notification.message}
                                            </p>
                                            <p className="text-[0.75rem] text-text-muted/60 mt-1 font-medium">{notification.time}</p>
                                        </div>

                                        {notification.link && (
                                            <ExternalLink className="w-3 h-3 text-text-muted/40 group-hover:text-accent-crimson transition-colors mt-1" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-8 py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center mb-4 text-text-muted/30">
                                        <Bell className="w-6 h-6" />
                                    </div>
                                    <p className="text-[0.9rem] font-bold text-text-main">All caught up!</p>
                                    <p className="text-[0.8rem] text-text-muted mt-1">No new notifications to show.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-surface-mid/30 border-t border-border-light/50">
                            <Link
                                href="/notifications"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center py-2.5 rounded-xl text-[0.85rem] font-bold bg-surface-light text-text-muted hover:text-text-main hover:bg-surface-mid transition-all"
                            >
                                View All Notifications
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationDropdown;
