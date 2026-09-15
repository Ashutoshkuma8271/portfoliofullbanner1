import { useEffect } from 'react';

/**
 * Lightweight, high-performance parallax hook for low-opacity atmospheric background imagery.
 * Uses requestAnimationFrame and passive scroll listeners to translate background elements
 * slightly at a different scroll speed than the content for added depth and tactile atmosphere.
 */
export function useParallaxBackgrounds(speedFactor: number = 0.12) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Honor reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    let rafId: number | null = null;
    let ticking = false;

    const updateParallax = () => {
      const elements = document.querySelectorAll<HTMLElement>('.parallax-bg');
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Only compute transforms when element is in or very close to the viewport
        if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          // Invert slightly to produce natural depth where distant backgrounds move slower
          const translateY = Math.round(distanceFromCenter * speedFactor * -1);
          el.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.12)`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial update on mount
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speedFactor]);
}
