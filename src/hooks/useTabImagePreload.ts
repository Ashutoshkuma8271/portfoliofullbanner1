import { useEffect, useRef, useState, useCallback } from 'react';
import { TabId } from '../types';
import { preloadPriorityImage, preloadImageWithPromise } from '../utils/imageLoader';

export type PriorityTier = 'hero' | 'secondary' | 'non-critical';

export interface TabAssetManifest {
  /** Tier 1: Critical above-the-fold Hero / LCP candidate imagery. Fetched and decoded FIRST. */
  criticalHero: string[];
  /** Tier 2: Secondary above-the-fold assets (subsequent carousel slides, featured headers). */
  secondaryHero: string[];
  /** Tier 3: Non-critical section backgrounds and below-the-fold textures. */
  nonCritical: string[];
}

/**
 * Precise multi-tier asset hierarchy for each tab.
 * Ensures the critical hero image has complete network and GPU priority before any
 * secondary or non-critical assets are fetched.
 */
export const TAB_PRIORITY_MANIFEST: Record<TabId, TabAssetManifest> = {
  home: {
    criticalHero: [
      // Primary Monograph hero slide (Zeenat executive portrait - LCP candidate)
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6IHnCaef41g32aYh105zuRmheL7FwAT-AndGJukXlIE3t4L0szoFQEx8N8S3oPLqPmulPo5Oo776ceRauA2mrWttmN0hpVMmyTa0pTwujXGtjzvMUBiUugC_-F00w5D3skN_AK9FxGE5wHuyFUOuCnS9w6PXK7qD9McLtiTa4qfAhLXGi3BBaDbauoUWTQ5ZowUhwCKD9zWtPptwld2KaXrFj9Uge6Tg0vxx9dGPBUC0JjEbTLaxZ',
    ],
    secondaryHero: [
      // Slide 1: Cinema production banner
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85',
      // Slide 2: Dubai trade corridor
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85',
      // Slide 3: Executive keynote
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=85',
    ],
    nonCritical: [
      // Architectural geometry background for Sovereign Trust
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
      // Gala & Conclave background for Media
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=80',
      // Diplomatic Chancery Hall background
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=80',
      // Chancery Protocol Corridors background
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=80',
    ],
  },
  'about-zeenat': {
    criticalHero: [
      // Primary diplomatic monograph executive portrait
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6IHnCaef41g32aYh105zuRmheL7FwAT-AndGJukXlIE3t4L0szoFQEx8N8S3oPLqPmulPo5Oo776ceRauA2mrWttmN0hpVMmyTa0pTwujXGtjzvMUBiUugC_-F00w5D3skN_AK9FxGE5wHuyFUOuCnS9w6PXK7qD9McLtiTa4qfAhLXGi3BBaDbauoUWTQ5ZowUhwCKD9zWtPptwld2KaXrFj9Uge6Tg0vxx9dGPBUC0JjEbTLaxZ',
    ],
    secondaryHero: [
      // Archival diplomatic portrait
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-A1BW_YoML--rfFvFNcltAOGQyp4-5HIEiw1V0gGpj4lzVQk089KZ075XapcA_FVvk5z4LmlldNc1Und3CujG-TCMCaOKmoUAxaHzvER8oDTS6H03s5Y0uBZBjScNO5MnVZbb2Tsj_kOccrKEeib49AgjqZ7yuJrau0owHotNOZJEfCPEDNxSXkkwGVhgijPE8w-_jg3jvZEKt8-oJ7o5DADOZLeZgWPM888IEv9ZKHAIrbX8zdG',
    ],
    nonCritical: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'trade-investment': {
    criticalHero: [
      // GCC-India bilateral trade corridors flagship
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    ],
    secondaryHero: [
      // Port & infrastructure terminal
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    ],
    nonCritical: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  'media-press': {
    criticalHero: [
      // Transnational cinematic production banner
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    ],
    secondaryHero: [
      // Red carpet & film festival keynote
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    ],
    nonCritical: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  'women-leadership': {
    criticalHero: [
      // National leadership convention plenary
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    ],
    secondaryHero: [
      // Global executive delegation
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    ],
    nonCritical: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  blog: {
    criticalHero: [
      // Strategic dispatch monograph cover
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80',
    ],
    secondaryHero: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    ],
    nonCritical: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  contact: {
    criticalHero: [
      // DIFC Dubai Chancery flagship visual
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    ],
    secondaryHero: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    ],
    nonCritical: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    ],
  },
};

/**
 * Backward-compatible flat mapping of critical tab images.
 */
export const CRITICAL_TAB_IMAGES: Record<TabId, string[]> = {
  home: [...TAB_PRIORITY_MANIFEST.home.criticalHero, ...TAB_PRIORITY_MANIFEST.home.secondaryHero],
  'about-zeenat': [...TAB_PRIORITY_MANIFEST['about-zeenat'].criticalHero, ...TAB_PRIORITY_MANIFEST['about-zeenat'].secondaryHero],
  'trade-investment': [...TAB_PRIORITY_MANIFEST['trade-investment'].criticalHero, ...TAB_PRIORITY_MANIFEST['trade-investment'].secondaryHero],
  'media-press': [...TAB_PRIORITY_MANIFEST['media-press'].criticalHero, ...TAB_PRIORITY_MANIFEST['media-press'].secondaryHero],
  'women-leadership': [...TAB_PRIORITY_MANIFEST['women-leadership'].criticalHero, ...TAB_PRIORITY_MANIFEST['women-leadership'].secondaryHero],
  blog: [...TAB_PRIORITY_MANIFEST.blog.criticalHero, ...TAB_PRIORITY_MANIFEST.blog.secondaryHero],
  contact: [...TAB_PRIORITY_MANIFEST.contact.criticalHero, ...TAB_PRIORITY_MANIFEST.contact.secondaryHero],
};

export interface ImageLoadingProps {
  loading: 'eager' | 'lazy';
  decoding: 'async' | 'sync';
  fetchPriority: 'high' | 'low' | 'auto';
}

/**
 * Custom React hook implementing a precise loading priority queue:
 *
 * 1. TIER 1 - Critical Hero Imagery:
 *    Fetched and decoded FIRST with maximum priority (`fetchPriority: 'high'`).
 *    The queue actively blocks secondary and non-critical assets until hero imagery
 *    is decoded or safety timeout fires, stabilizing First Contentful Paint & LCP.
 *
 * 2. TIER 2 - Secondary Hero Assets:
 *    Dispatched only once the critical hero asset has stabilized.
 *
 * 3. TIER 3 - Non-Critical Section Assets:
 *    Dispatched at lower network priority (`fetchPriority: 'low'`) to prevent thread contention.
 *
 * 4. TIER 4 - Inactive Tab Pre-warming:
 *    Scheduled strictly during browser idle periods (`requestIdleCallback`) and instantly
 *    aborted if the user initiates a tab switch.
 */
export function useTabImagePreload(activeTab: TabId) {
  const [isHeroStabilized, setIsHeroStabilized] = useState<boolean>(false);
  const sessionRef = useRef<number>(0);
  const idleCallbackRef = useRef<number | null>(null);
  const fallbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Increment session ID to cancel/abort any in-flight queue operations from prior tab
    const currentSession = ++sessionRef.current;
    setIsHeroStabilized(false);

    // Cancel existing idle callbacks and scheduled queue timers
    const win = typeof window !== 'undefined' ? (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    }) : {};

    if (idleCallbackRef.current !== null && win.cancelIdleCallback) {
      win.cancelIdleCallback(idleCallbackRef.current);
      idleCallbackRef.current = null;
    }
    if (fallbackTimeoutRef.current !== null) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    if (queueTimeoutRef.current !== null) {
      clearTimeout(queueTimeoutRef.current);
      queueTimeoutRef.current = null;
    }

    const manifest = TAB_PRIORITY_MANIFEST[activeTab];
    if (!manifest) return;

    /**
     * Precision Priority Queue Execution
     */
    const runPriorityQueue = async () => {
      // -------------------------------------------------------------
      // STAGE 1: Critical Hero Section Imagery (Max Priority)
      // -------------------------------------------------------------
      const heroPromises = manifest.criticalHero.map((url) =>
        preloadImageWithPromise(url, {
          fetchPriority: 'high',
          widths: [640, 960, 1280, 1920],
          quality: 90,
          timeoutMs: 350, // Safety cap to avoid starving the queue on degraded networks
        })
      );

      // Wait for all critical hero images to decode into memory
      await Promise.allSettled(heroPromises);

      // If user navigated to a different tab while hero was loading, abort immediately
      if (sessionRef.current !== currentSession) return;

      // Mark hero as stabilized to unlock subsequent render tiers
      setIsHeroStabilized(true);

      // -------------------------------------------------------------
      // STAGE 2: Secondary Above-the-fold Assets
      // -------------------------------------------------------------
      manifest.secondaryHero.forEach((url) => {
        preloadPriorityImage(url, {
          fetchPriority: 'auto',
          widths: [640, 1280],
          quality: 80,
        });
      });

      // -------------------------------------------------------------
      // STAGE 3: Non-Critical Section Assets (Delayed slightly)
      // -------------------------------------------------------------
      queueTimeoutRef.current = setTimeout(() => {
        if (sessionRef.current !== currentSession) return;

        manifest.nonCritical.forEach((url) => {
          preloadPriorityImage(url, {
            fetchPriority: 'low',
            widths: [640, 960],
            quality: 70,
          });
        });

        // -------------------------------------------------------------
        // STAGE 4: Inactive Tabs Pre-warming (Strictly Main-Thread Idle)
        // -------------------------------------------------------------
        const scheduleIdlePrewarm = () => {
          if (sessionRef.current !== currentSession) return;

          const allTabs = Object.keys(TAB_PRIORITY_MANIFEST) as TabId[];
          const inactiveTabs = allTabs.filter((tab) => tab !== activeTab);

          inactiveTabs.forEach((tab) => {
            const inactiveManifest = TAB_PRIORITY_MANIFEST[tab];
            if (!inactiveManifest) return;

            // Only pre-warm the primary hero of inactive tabs, at low priority
            inactiveManifest.criticalHero.forEach((url) => {
              preloadPriorityImage(url, {
                fetchPriority: 'low',
                widths: [640, 960],
                quality: 65,
              });
            });
          });
        };

        if (win.requestIdleCallback) {
          idleCallbackRef.current = win.requestIdleCallback(
            () => scheduleIdlePrewarm(),
            { timeout: 4000 }
          );
        } else {
          fallbackTimeoutRef.current = setTimeout(scheduleIdlePrewarm, 3000);
        }
      }, 80);
    };

    runPriorityQueue();

    return () => {
      if (idleCallbackRef.current !== null && win.cancelIdleCallback) {
        win.cancelIdleCallback(idleCallbackRef.current);
      }
      if (fallbackTimeoutRef.current !== null) {
        clearTimeout(fallbackTimeoutRef.current);
      }
      if (queueTimeoutRef.current !== null) {
        clearTimeout(queueTimeoutRef.current);
      }
    };
  }, [activeTab]);

  /**
   * Helper to check if a tab is currently active.
   */
  const isTabActive = useCallback((tab: TabId) => tab === activeTab, [activeTab]);

  /**
   * Computes precise loading, decoding, and fetchPriority attributes based on
   * asset priority tier and the active state of the priority queue.
   */
  const getImageLoadingProps = useCallback(
    (tab: TabId, tier: PriorityTier | boolean = 'non-critical'): ImageLoadingProps => {
      const isActive = tab === activeTab;
      const normalizedTier: PriorityTier =
        typeof tier === 'boolean' ? (tier ? 'hero' : 'non-critical') : tier;

      if (isActive && normalizedTier === 'hero') {
        return {
          loading: 'eager',
          decoding: 'async',
          fetchPriority: 'high',
        };
      }

      if (isActive && normalizedTier === 'secondary') {
        return {
          loading: 'eager',
          decoding: 'async',
          fetchPriority: isHeroStabilized ? 'high' : 'auto',
        };
      }

      return {
        loading: 'lazy',
        decoding: 'async',
        fetchPriority: 'low',
      };
    },
    [activeTab, isHeroStabilized]
  );

  return {
    activeTab,
    isTabActive,
    isHeroStabilized,
    getImageLoadingProps,
  };
}
