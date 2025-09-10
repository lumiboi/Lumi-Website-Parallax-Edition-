"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { translations } from "@/data/translations";
import { useEffect, useRef } from "react";

import { useLanguage } from "@/hooks/useLanguage";

const ManifestoSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // DÜZELTME: Bu elemanlarda artık opacity-0 class'ı olmadığı için,
      // GSAP onları varsayılan opacity:1 durumuna doğru canlandıracak.
      gsap.from("#manifesto-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0, // Başlangıç durumunu SADECE GSAP belirlesin.
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("#manifesto-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".keyword", {
        scrollTrigger: {
          trigger: "#keywords-container",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={sectionRef} className="min-h-screen w-full flex items-center justify-center bg-[#0f0f0f] py-24 px-6">
      <div className="max-w-4xl text-center space-y-8">
        {/* DÜZELTME: opacity-0 class'ı SİLİNDİ */}
        <h2 id="manifesto-title" className="font-heading text-5xl md:text-7xl font-bold uppercase">
          {t('manifestoTitle')}
        </h2>
        {/* DÜZELTME: opacity-0 class'ı SİLİNDİ */}
        <p id="manifesto-text" className="text-lg md:text-xl text-text/80 leading-relaxed">
          {t('manifestoText')}
        </p>
        <div id="keywords-container" className="flex flex-wrap justify-center items-center gap-4 pt-8">
          {/* DÜZELTME: opacity-0 class'ları SİLİNDİ */}
          <div className="keyword font-heading text-2xl border-2 border-primary py-2 px-6 rounded-lg">
            {t('keywordCode')}
          </div>
          <div className="keyword font-heading text-2xl border-2 border-primary py-2 px-6 rounded-lg">
            {t('keywordDesign')}
          </div>
          <div className="keyword font-heading text-2xl border-2 border-primary py-2 px-6 rounded-lg">
            {t('keywordExperience')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;