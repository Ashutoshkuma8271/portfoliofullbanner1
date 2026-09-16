import { useEffect } from 'react';

/**
 * Linear interpolation (lerp) utility function for smooth numerical transitions.
 * Calculates an interpolated value between start and target values using a damping factor.
 * 
 * Prevents jitter, discrete stepping, and micro-stuttering on high-refresh-rate
 * displays (such as 120Hz ProMotion, 144Hz, and 240Hz monitors).
 *
 * @param start Current position/value
 * @param end Target destination position/value
 * @param factor Interpolation alpha factor (default: 0.10 for smooth damping)
 */
export function lerp(start: number, end: number, factor: number = 0.10): number {
  return start + (end - start) * factor;
}

/**
 * Detects whether reduced-motion is requested, respecting:
 * 1. Manual user override persisted in localStorage ('zk_force_reduced_motion')
 * 2. Root HTML element class ('force-reduced-motion')
 * 3. System-level OS media query ('prefers-reduced-motion: reduce')
 */
export function isReducedMotionActive(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const manual = localStorage.getItem('zk_force_reduced_motion');
    if (manual === 'true') return true;
    if (manual === 'false') return false;
  } catch {
    // Storage access fallback
  }

  if (document.documentElement.classList.contains('force-reduced-motion')) {
    return true;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface ParallaxItemState {
  currentY: number;
  targetY: number;
  isBackground: boolean;
}

/**
 * useScrollParallax Hook
 * 
 * Provides hardware-accelerated, lerp-interpolated parallax scroll translation
 * for atmospheric background imagery (.parallax-bg) and ambient decorative elements (.parallax-element).
 * 
 * - Viewport-adaptive: Full subtle depth on desktop, relaxed on tablet, disabled on small mobile
 * - Lerp smoothing: Eliminates stepping and jitter on high-refresh-rate displays
 * - Accessible: Fully honors system and manual reduced-motion overrides
 */
export function useScrollParallax(baseSpeedFactor: number = 0.10) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stateMap = new WeakMap<HTMLElement, ParallaxItemState>();

    let rafId: number | null = null;
    let isRunning = false;

    const computeEffectiveSpeed = () => {
      if (isReducedMotionActive()) return 0;
      const width = window.innerWidth;
      if (width < 640) return 0; // Disabled on mobile to preserve battery & native touch momentum
      if (width < 1024) return baseSpeedFactor * 0.45; // Gentle on tablets
      return baseSpeedFactor; // Refined subtle ratio on desktop
    };

    const resetElements = () => {
      const elements = document.querySelectorAll<HTMLElement>('.parallax-bg, .parallax-element');
      elements.forEach((el) => {
        el.style.transform = '';
        stateMap.delete(el);
      });
    };

    const tick = () => {
      const effectiveSpeed = computeEffectiveSpeed();
      if (effectiveSpeed === 0) {
        resetElements();
        isRunning = false;
        return;
      }

      const windowHeight = window.innerHeight;
      const elements = document.querySelectorAll<HTMLElement>('.parallax-bg, .parallax-element');
      let stillAnimating = false;

      elements.forEach((el) => {
        const isBg = el.classList.contains('parallax-bg');
        let state = stateMap.get(el);
        if (!state) {
          state = { currentY: 0, targetY: 0, isBackground: isBg };
          stateMap.set(el, state);
        }

        const rect = el.getBoundingClientRect();
        if (rect.bottom >= -200 && rect.top <= windowHeight + 200) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          const speedMultiplier = isBg ? effectiveSpeed : effectiveSpeed * 0.7;
          state.targetY = distanceFromCenter * speedMultiplier * -1;
        }

        // Apply linear interpolation (lerp) between current and target values
        state.currentY = lerp(state.currentY, state.targetY, 0.10);

        // Snap when within sub-pixel threshold
        if (Math.abs(state.currentY - state.targetY) < 0.05) {
          state.currentY = state.targetY;
        } else {
          stillAnimating = true;
        }

        const roundedY = state.currentY.toFixed(2);
        el.style.transform = isBg
          ? `translate3d(0, ${roundedY}px, 0) scale(1.12)`
          : `translate3d(0, ${roundedY}px, 0)`;
      });

      if (stillAnimating) {
        rafId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    const startAnimationLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onScrollOrResize = () => {
      startAnimationLoop();
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    const handleMotionChange = () => {
      if (isReducedMotionActive()) {
        resetElements();
        if (rafId !== null) cancelAnimationFrame(rafId);
        isRunning = false;
      } else {
        startAnimationLoop();
      }
    };

    window.addEventListener('zk-reduced-motion-change', handleMotionChange);
    window.addEventListener('storage', handleMotionChange);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    // Initial paint calculation
    startAnimationLoop();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('zk-reduced-motion-change', handleMotionChange);
      window.removeEventListener('storage', handleMotionChange);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      resetElements();
    };
  }, [baseSpeedFactor]);
}

// Named alias for backward compatibility with existing codebase
export const useParallaxBackgrounds = useScrollParallax;
