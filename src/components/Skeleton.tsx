import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

/**
 * YouTube / Instagram / Facebook Style Shimmering Skeleton Component
 * 
 * Renders a high-performance animated skeleton placeholder that sweeps
 * an ambient golden-tinted shimmer wave across the geometry.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animate = true,
  style,
  ...props
}) => {
  const variantStyles = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded-md h-3.5 my-1 w-full',
  }[variant];

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div
      role="status"
      aria-label="Content loading"
      aria-live="polite"
      className={`relative select-none border border-[#2d2719]/40 ${variantStyles} ${
        animate ? 'skeleton-shimmer-wave' : 'bg-[#151310]'
      } ${className}`}
      style={inlineStyles}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * YouTube / Instagram / Facebook style card skeleton fixture
 * Shows a full feed-style post placeholder: avatar + title line + media thumbnail + footer bars.
 */
export const SocialCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`p-5 rounded-xl bg-[#12100d] border border-[#2d2719]/60 flex flex-col gap-4 shadow-xl ${className}`}
      role="status"
      aria-label="Loading card content"
    >
      {/* Top Header: Avatar + Creator / Channel Info */}
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} className="shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton variant="text" className="w-2/5 h-3" />
          <Skeleton variant="text" className="w-1/4 h-2.5 opacity-60" />
        </div>
      </div>

      {/* Media Thumbnail (16:9 like YouTube or 4:5 like Instagram) */}
      <Skeleton variant="rectangular" className="w-full aspect-[16/9]" />

      {/* Description / Kicker lines */}
      <div className="flex flex-col gap-2 pt-1">
        <Skeleton variant="text" className="w-4/5 h-3.5" />
        <Skeleton variant="text" className="w-3/5 h-3 opacity-70" />
      </div>

      {/* Action pill placeholder */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2d2719]/40">
        <Skeleton variant="rectangular" className="w-20 h-6 rounded-full" />
        <Skeleton variant="text" className="w-16 h-3 opacity-50" />
      </div>
    </div>
  );
};

export default Skeleton;
