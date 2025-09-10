"use client";
import { translations } from "@/data/translations";
// ÖNEMLİ: useLayoutEffect, DOM manipülasyonları için daha güvenilirdir.
import { useLayoutEffect, useRef } from "react"; 
import { gsap } from "gsap";

import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
    const { t } = useLanguage();
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const sectionRef = useRef(null); // section için ref ekledik
    const titleContainerRef = useRef<HTMLDivElement>(null);

    // useEffect yerine useLayoutEffect kullandık, bu animasyonlar için daha iyidir.
    useLayoutEffect(() => {
        const titleElement = heroTitleRef.current;
        if (!titleElement) return;

        // GSAP Context kullanarak animasyonları güvenli bir alana alıyoruz.
        const ctx = gsap.context(() => {
            const letters = titleElement.querySelectorAll('span');

            // 1. Önce harflerin başlangıç durumunu ayarla (görünmez yap)
            gsap.set(letters, { opacity: 0, y: 50 });

            // 2. Sonra olmaları gereken duruma canlandır (görünür yap)
            gsap.to(letters, {
                duration: 0.8,
                opacity: 1,
                y: 0,
                ease: "power3.out",
                stagger: 0.05,
                delay: 0.5,
            });
        }, sectionRef); // Animasyonları bu bölümle sınırla

        // Temizlik fonksiyonu: Bileşen ekrandan kalktığında animasyonları temizler.
        return () => ctx.revert();
    }, []);

    // Basit mouse tabanlı parallax (hero başlığı için)
    useLayoutEffect(() => {
        const container = titleContainerRef.current;
        const sectionEl = sectionRef.current as HTMLElement | null;
        if (!container || !sectionEl) return;

        const handleMouse = (e: MouseEvent) => {
            const rect = sectionEl.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(container, {
                x: x * 40,
                y: y * 28,
                rotateX: y * -8,
                rotateY: x * 12,
                transformPerspective: 600,
                ease: "power2.out",
                duration: 0.5,
            });
        };

        sectionEl.addEventListener('mousemove', handleMouse);
        return () => sectionEl.removeEventListener('mousemove', handleMouse);
    }, []);

    const splitText = (text: string) => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="inline-block relative text-text drop-shadow-[0_0_18px_rgba(0,170,255,0.12)] will-change-transform"
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        // sectionRef'i buraya ekledik
        <section ref={sectionRef} id="hero" className="relative h-screen w-full flex items-center justify-center">
            <div ref={titleContainerRef} className="z-10 text-center px-4 will-change-transform">
                <h1 ref={heroTitleRef} className="font-heading font-bold uppercase tracking-wider text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_0_20px_rgba(0,170,255,0.15)]">
                    {splitText(t('heroTitle'))}
                </h1>
                <p className="font-sans text-lg md:text-xl text-text/80 mt-4 max-w-3xl mx-auto">
                    {t('heroSubtitle')}
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <a href="https://codedbylumi.com/#contact" target="_blank" rel="noopener noreferrer" className="font-heading text-sm tracking-widest uppercase px-6 py-3 rounded-md bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors">
                        {t('ctaPrimary')}
                    </a>
                    <a href="https://github.com/lumiboi/" target="_blank" rel="noopener noreferrer" className="font-heading text-sm tracking-widest uppercase px-6 py-3 rounded-md border border-white/10 text-text hover:bg-white/5 transition-colors">
                        {t('ctaSecondary')}
                    </a>
                </div>
            </div>
            <button
                onClick={() => {
                    const target = document.getElementById('manifesto');
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="absolute bottom-10 z-10 font-sans text-sm tracking-widest animate-pulse hover:animate-none underline underline-offset-4 decoration-primary/60"
            >
                {t('scrollDown')}
            </button>
            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.6)_100%)]" />
        </section>
    );
};

export default HeroSection;