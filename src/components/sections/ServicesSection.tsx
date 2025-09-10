"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { translations } from "@/data/translations";
import { useLayoutEffect, useRef, useState } from "react";

import { useLanguage } from "@/hooks/useLanguage";

const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const [scrollLength, setScrollLength] = useState<number>(0);

  useLayoutEffect(() => {
    const getDistance = () => Math.max(0, (horizontalContainerRef.current!.scrollWidth - window.innerWidth - 1));

    // Trigger alanının yüksekliğini, yatay kaydırma mesafesine göre ayarla
    const updateHeights = () => {
      const distance = getDistance();
      setScrollLength(distance + window.innerHeight);
    };
    updateHeights();
    window.addEventListener('resize', updateHeights);

    const pin = gsap.to(horizontalContainerRef.current, {
      x: () => `-${getDistance()}px`,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${getDistance()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill(); // Bileşen kaldırıldığında animasyonu yok et
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <div ref={triggerRef} className="relative" style={{ height: scrollLength ? `${scrollLength}px` : undefined }}> {/* Kaydırma mesafesi için trigger alanı */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div ref={horizontalContainerRef} className="flex items-center gap-16 px-16 will-change-transform">
            {/* Kart 1 */}
            <div className="transition-transform duration-300 hover:-translate-y-2 hover:rotate-[0.25deg] flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] bg-[#0b0b0b]/60 border border-white/5 shadow-[0_0_40px_rgba(0,170,255,0.08)] backdrop-blur-lg rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="font-heading text-5xl text-primary">{t('serviceWebDevTitle')}</h3>
              <p className="text-xl text-text/80 mt-4">{t('serviceWebDevText')}</p>
            </div>
            {/* Kart 2 */}
            <div className="transition-transform duration-300 hover:-translate-y-2 hover:rotate-[0.25deg] flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] bg-[#0b0b0b]/60 border border-white/5 shadow-[0_0_40px_rgba(0,170,255,0.08)] backdrop-blur-lg rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="font-heading text-5xl text-primary">{t('serviceUIDesignTitle')}</h3>
              <p className="text-xl text-text/80 mt-4">{t('serviceUIDesignText')}</p>
            </div>
            {/* Kart 3 */}
            <div className="transition-transform duration-300 hover:-translate-y-2 hover:rotate-[0.25deg] flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] bg-[#0b0b0b]/60 border border-white/5 shadow-[0_0_40px_rgba(0,170,255,0.08)] backdrop-blur-lg rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="font-heading text-5xl text-primary">{t('serviceBrandingTitle')}</h3>
              <p className="text-xl text-text/80 mt-4">{t('serviceBrandingText')}</p>
            </div>
            {/* Spacer so last card fully settles within viewport */}
            <div className="flex-shrink-0 w-[10vw]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;