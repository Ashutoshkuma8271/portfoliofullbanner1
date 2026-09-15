import React, { useState, useEffect } from 'react';
import {
  getHeroImageAttributes,
  getBlurPlaceholderUrl,
  DEFAULT_BLUR_DATA_URL,
  ResponsiveImageOptions,
} from '../utils/imageLoader';

export interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  blurPlaceholderSrc?: string;
  aspectRatio?: string;
  containerClassName?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
  responsiveOptions?: ResponsiveImageOptions;
  showMonogramPlaceholder?: boolean;
  objectPosition?: string;
}

/**
 * Responsive Image Component with Progressive Blur-Up Placeholder Effect & 'loading=lazy' Strategy
 * 
 * Performance & Mobile Network Highlights:
 * - 'loading=lazy' by default so off-screen and secondary visual assets don't congest slow 3G/4G connections
 * - Instant blur-up placeholder using ultra-low-resolution thumbnail (<1KB) with hardware-accelerated CSS blur
 * - Zero layout shift (CLS = 0) with strict aspect-ratio/fill geometry
 * - Smooth fade-in crossfade from blur to crystal-sharp high-res upon decoding
 * - Priority hints support (fetchPriority="high", loading="eager") for above-the-fold critical assets
 */
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  priority = false,
  loading,
  blurPlaceholderSrc,
  aspectRatio,
  containerClassName = '',
  skeletonClassName = '',
  className = '',
  fallbackSrc,
  responsiveOptions,
  showMonogramPlaceholder = false,
  objectPosition,
  onLoad,
  onError,
  ...imgProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Derive ultra-lightweight Low Quality Image Placeholder (LQIP)
  const blurUrl = blurPlaceholderSrc || getBlurPlaceholderUrl(src) || DEFAULT_BLUR_DATA_URL;

  // Determine optimal loading strategy: defaults to 'lazy' unless priority or explicitly eager
  const effectiveLoading: 'lazy' | 'eager' = loading || (priority ? 'eager' : 'lazy');

  // Compute responsive image attributes with priority hints
  const imageAttrs = getHeroImageAttributes(src, {
    priority,
    ...responsiveOptions,
  });

  // Reset loading status if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && !hasError) {
      setHasError(true);
      (e.currentTarget as HTMLImageElement).src = fallbackSrc;
    } else {
      setHasError(true);
      if (onError) {
        onError(e);
      }
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#12100e] ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* 1. Underlying Shimmer Wave Skeleton Base */}
      {!isLoaded && (
        <div
          role="status"
          aria-label="Loading visual asset"
          className={`absolute inset-0 z-0 flex items-center justify-center skeleton-shimmer-wave ${skeletonClassName}`}
        >
          {showMonogramPlaceholder && (
            <div className="w-10 h-10 rounded-full bg-[#1e1a14]/80 border border-[#d4af37]/30 flex items-center justify-center shadow-lg opacity-60 z-10">
              <span className="font-['Cinzel'] font-bold text-[#f2ca50] text-xs tracking-wider">
                ZK
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. Instant Progressive Blur-Up Placeholder (Micro LQIP) */}
      {blurUrl && (
        <img
          src={blurUrl}
          alt=""
          aria-hidden="true"
          loading={effectiveLoading}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover blur-up-placeholder transition-opacity duration-700 ease-out pointer-events-none z-1 ${
            isLoaded ? 'opacity-0' : 'opacity-85'
          }`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}

      {/* 3. The Responsive High-Resolution Image with 'loading=lazy' Strategy */}
      <img
        {...imageAttrs}
        {...imgProps}
        src={imageAttrs.src}
        alt={alt}
        loading={effectiveLoading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover blur-up-image transition-all duration-700 ease-out relative z-2 ${
          isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-[1.02] filter blur-sm'
        } ${className}`}
        style={{
          ...(objectPosition ? { objectPosition } : {}),
          ...imgProps.style,
        }}
      />
    </div>
  );
};

export default SkeletonImage;
