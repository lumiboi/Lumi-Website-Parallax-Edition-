"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ile fare hareketini yumuşat
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
    };

    window.addEventListener('mousemove', moveCursor);

    // Tıklanabilir elementlerin üzerine gelince imleci büyüt
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    const onMouseEnter = () => {
      gsap.to(followerRef.current, {
        scale: 2.2,
        backgroundColor: 'rgba(0, 170, 255, 0.18)',
        borderColor: 'transparent',
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: '#00aaff',
        duration: 0.25,
      });
    };

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Temizlik fonksiyonu
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={followerRef} 
        className="hidden md:block fixed w-8 h-8 border-2 border-primary rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>
    </>
  );
};

export default CustomCursor;