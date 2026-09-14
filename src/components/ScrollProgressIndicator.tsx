import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgressIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(Math.max((currentScrollY / scrollHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }

      // Show back-to-top button when user has scrolled down > 160px
      setIsVisible(currentScrollY > 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress math (radius = 16, circumference = 2 * π * 16 ≈ 100.53)
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* FLOATING CIRCULAR RADIAL BACK-TO-TOP & SCROLL POSITION PILL */}
      <div
        className={`fixed bottom-[74px] sm:bottom-[82px] right-4 sm:right-6 z-40 transition-all duration-300 ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#100f0c]/95 hover:bg-[#1a1712] border border-[#d4af37]/60 hover:border-[#f2ca50] shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_12px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_24px_rgba(242,202,80,0.4)] transition-all duration-300 cursor-pointer focus:outline-none"
          title={`Scrolled ${Math.round(scrollProgress)}% - Click to return to top`}
          aria-label={`Scroll to top of page. Current scroll: ${Math.round(scrollProgress)}%`}
        >
          {/* Circular SVG Progress Ring */}
          <svg className="w-10 h-10 sm:w-11 sm:h-11 -rotate-90 pointer-events-none" viewBox="0 0 40 40">
            {/* Background Ring */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="text-[#2b2518]/60"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Golden Progress Ring */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="text-[#f2ca50] transition-[stroke-dashoffset] duration-150 ease-out"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Centered Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ArrowUp className="w-4 h-4 text-[#f2ca50] group-hover:text-[#ffe088] group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>

          {/* Floating percentage badge on hover on larger screens */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#14120f] border border-[#d4af37]/40 text-[#f2ca50] text-[9.5px] font-mono font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
            {Math.round(scrollProgress)}%
          </div>
        </button>
      </div>
    </>
  );
};
