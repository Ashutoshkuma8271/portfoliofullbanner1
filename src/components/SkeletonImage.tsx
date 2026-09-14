import React, { useState, useEffect } from 'react';
import { getHeroImageAttributes, ResponsiveImageOptions } from '../utils/imageLoader';

export interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
  containerClassName?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
  responsiveOptions?: ResponsiveImageOptions;
  showMonogramPlaceholder?: boolean;
}

/**
 * Responsive Image Component with Priority Hints & YouTube/Instagram Skeleton Loading
 * 
 * Features:
 * - Immediate priority hints (`fetchPriority="high"`, `loading="eager"`, `<link rel="preload">`)
 * - Responsive srcset & sizes generation for high-density screens
 * - Social-media style animated shimmer wave placeholder while loading
 * - Zero layout shift (CLS) transition upon image decode
 */
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  priority = false,
  aspectRatio,
  containerClassName = '',
  skeletonClassName = '',
  className = '',
  fallbackSrc,
  responsiveOptions,
  showMonogramPlaceholder = false,
  onLoad,
  onError,
  ...imgProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* YouTube / Instagram / Facebook Style Skeleton Shimmer Placeholder */}
      {!isLoaded && (
        <div
          role="status"
          aria-label="Loading visual asset"
          className={`absolute inset-0 z-0 flex items-center justify-center skeleton-shimmer-wave ${skeletonClassName}`}
        >
          {showMonogramPlaceholder && (
            <div className="w-10 h-10 rounded-full bg-[#1e1a14]/80 border border-[#d4af37]/30 flex items-center justify-center shadow-lg opacity-60">
              <span className="font-['Cinzel'] font-bold text-[#f2ca50] text-xs tracking-wider">
                ZK
              </span>
            </div>
          )}
        </div>
      )}

      {/* The Actual Responsive High-Resolution Image */}
      <img
        {...imageAttrs}
        {...imgProps}
        src={imageAttrs.src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};

export default SkeletonImage;
