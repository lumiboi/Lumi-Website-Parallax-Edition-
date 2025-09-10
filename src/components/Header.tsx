"use client";

import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
            <a href="/" className="group inline-flex items-center gap-2">
                <span className="relative inline-block w-6 h-6 rounded-sm bg-primary/30 border border-primary/40 shadow-[0_0_18px_rgba(0,170,255,0.4)] group-hover:scale-110 transition-transform" />
                <span className="font-heading text-4xl font-bold text-text tracking-wide">
                    Lumi<span className="text-primary">.</span>
                </span>
            </a>
            <nav className="flex items-center gap-2 text-text font-semibold">
                <button
                    onClick={() => setLanguage('tr')}
                    className={`transition-opacity ${language === 'tr' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                >
                    TR
                </button>
                <span className="opacity-50">/</span>
                <button
                    onClick={() => setLanguage('en')}
                    className={`transition-opacity ${language === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                >
                    EN
                </button>
            </nav>
        </header>
    );
};

export default Header;