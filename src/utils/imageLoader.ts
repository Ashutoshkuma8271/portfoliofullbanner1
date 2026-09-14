/**
 * Responsive Image Loader & Priority Optimization Utility
 * 
 * Provides responsive srcSet calculation, modern format negotiation,
 * browser preload link injection with fetchPriority hints, and high-performance
 * hero background image configuration.
 */

export interface ResponsiveImageOptions {
  /** If true, enables 'fetchpriority="high"', 'loading="eager"', and preloads the image */
  priority?: boolean;
  /** Breakpoint widths to generate for srcset (default: [640, 960, 1280, 1920, 2560]) */
  widths?: number[];
  /** Responsive sizes media query string (default: '100vw') */
  sizes?: string;
  /** Target image quality 1-100 (default: 85 for high resolution) */
  quality?: number;
  /** Custom aspect-ratio or crop format */
  fit?: 'crop' | 'cover' | 'contain';
}

export interface ResponsiveImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  loading: 'eager' | 'lazy';
  decoding: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Generates an optimized image URL for CDNs supporting query parameters (e.g. Unsplash, Google Photos).
 */
export function getOptimizedImageUrl(rawUrl: string, width?: number, quality = 85): string {
  if (!rawUrl) return '';

  try {
    // Check if it's an Unsplash URL with image transformation support
    if (rawUrl.includes('images.unsplash.com')) {
      const url = new URL(rawUrl);
      if (width) {
        url.searchParams.set('w', width.toString());
      }
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }

    // Check if it's a Google User Content photo with resize support
    if (rawUrl.includes('googleusercontent.com')) {
      // If it already has size parameters like =w1200 or =s2000 at the end
      if (width && /=w\d+/.test(rawUrl)) {
        return rawUrl.replace(/=w\d+[^?#]*/, `=w${width}-q${quality}`);
      }
      return rawUrl;
    }

    return rawUrl;
  } catch {
    return rawUrl;
  }
}

/**
 * Builds a responsive srcSet string for modern browsers across device widths.
 */
export function getResponsiveSrcSet(
  url: string,
  widths: number[] = [640, 960, 1280, 1920, 2560],
  quality = 85
): string {
  if (!url) return '';

  // Only create multi-width srcSets for CDNs that support dynamic resizing (like Unsplash)
  if (!url.includes('images.unsplash.com')) {
    return '';
  }

  return widths
    .map((w) => `${getOptimizedImageUrl(url, w, quality)} ${w}w`)
    .join(', ');
}

// Track already preloaded URLs to avoid duplicate link tags
const preloadedUrlSet = new Set<string>();

/**
 * Injects a high-priority `<link rel="preload" as="image">` tag into `<head>`
 * to inform browser prefetch engines to prioritize critical visual hero assets.
 */
export function preloadPriorityImage(
  url: string,
  options?: {
    widths?: number[];
    sizes?: string;
    quality?: number;
    fetchPriority?: 'high' | 'low' | 'auto';
  }
): void {
  if (typeof document === 'undefined' || !url) return;
  if (preloadedUrlSet.has(url)) return;

  preloadedUrlSet.add(url);

  const widths = options?.widths || [640, 960, 1280, 1920, 2560];
  const quality = options?.quality || 85;
  const sizes = options?.sizes || '100vw';
  const srcSet = getResponsiveSrcSet(url, widths, quality);
  const optimizedSrc = getOptimizedImageUrl(url, 1920, quality);

  // Check if link already exists
  const existingLink = document.querySelector(`link[rel="preload"][href="${optimizedSrc}"]`);
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedSrc;
    if (srcSet) {
      link.setAttribute('imagesrcset', srcSet);
      link.setAttribute('imagesizes', sizes);
    }
    link.setAttribute('fetchpriority', options?.fetchPriority || 'high');
    document.head.appendChild(link);
  }

  // Backup in-memory image preloader with high priority
  try {
    const img = new Image();
    if ('fetchPriority' in img) {
      (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'high';
    }
    img.decoding = 'async';
    if (srcSet) {
      img.srcset = srcSet;
      img.sizes = sizes;
    }
    img.src = optimizedSrc;
  } catch {
    // Non-blocking fallback
  }
}

/**
 * Returns ready-to-spread attributes for a hero background image with optimal priority hints.
 */
export function getHeroImageAttributes(
  url: string,
  options: ResponsiveImageOptions = {}
): ResponsiveImageProps {
  const {
    priority = true,
    widths = [640, 960, 1280, 1920, 2560],
    sizes = '100vw',
    quality = 85,
  } = options;

  const srcSet = getResponsiveSrcSet(url, widths, quality);
  const optimizedSrc = getOptimizedImageUrl(url, 1920, quality);

  if (priority) {
    preloadPriorityImage(url, { widths, sizes, quality, fetchPriority: 'high' });
  }

  return {
    src: optimizedSrc,
    ...(srcSet ? { srcSet, sizes } : {}),
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    fetchPriority: priority ? 'high' : 'auto',
  };
}
