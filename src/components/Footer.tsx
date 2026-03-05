import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="max-w-[1400px] mx-auto border border-border-light bg-surface-dark mt-20 mb-10 rounded-[2.5rem] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 group w-max">
                            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent-crimson to-purple-600 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                                <div className="absolute inset-[1px] bg-surface-dark rounded-[10px] z-[1]"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-crimson/20 to-purple-600/20 z-[2] group-hover:opacity-100 opacity-0 transition-opacity"></div>
                                <span className="relative z-10 font-bold text-white text-lg leading-none mt-[1px]">R</span>
                            </div>
                            <span className="font-bold text-xl text-text-main tracking-tight">Runflow<span className="text-accent-crimson">UI</span></span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed max-w-[250px]">
                            A modern, interactive component library powered by AI customization. Design less, ship better.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">

                        {/* Product */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-text-main font-semibold">Product</h4>
                            <nav className="flex flex-col gap-3">
                                <Link href="/components" className="text-text-muted hover:text-text-main text-sm transition-colors w-max">Components</Link>
                                <Link href="/docs" className="text-text-muted hover:text-text-main text-sm transition-colors w-max">Documentation</Link>
                                <Link href="/ai" className="text-text-muted hover:text-text-main text-sm transition-colors w-max flex items-center gap-2">
                                    AI Generator
                                    <span className="px-1.5 py-0.5 rounded-full bg-accent-crimson/10 text-accent-crimson text-[0.6rem] font-bold uppercase tracking-wider">New</span>
                                </Link>
                            </nav>
                        </div>

                        {/* Resources */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-text-main font-semibold">Resources</h4>
                            <nav className="flex flex-col gap-3">
                                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-main text-sm transition-colors w-max">GitHub</a>
                                <a href="#" className="text-text-muted hover:text-text-main text-sm transition-colors w-max">Changelog</a>
                                <a href="#" className="text-text-muted hover:text-text-main text-sm transition-colors w-max">License</a>
                            </nav>
                        </div>

                        {/* Community */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-text-main font-semibold">Community</h4>
                            <nav className="flex flex-col gap-3">
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-main text-sm transition-colors w-max flex items-center gap-2">
                                    <Twitter className="w-4 h-4" />
                                    Twitter
                                </a>
                                <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-main text-sm transition-colors w-max flex items-center gap-2">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
                                    Discord
                                </a>
                            </nav>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-border-light/50 text-sm text-text-muted">
                    <p>© {new Date().getFullYear()} RunflowUI. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-text-main transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-text-main transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
