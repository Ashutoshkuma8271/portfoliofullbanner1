import React, { useEffect, useState } from 'react';
import { TabId } from '../types';

interface PageTransitionIndicatorProps {
  activeTab: TabId;
}

export const PageTransitionIndicator: React.FC<PageTransitionIndicatorProps> = ({ activeTab }) => {
  const [animatingKey, setAnimatingKey] = useState<string>(activeTab);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setIsAnimating(true);
    setAnimatingKey(`${activeTab}-${Date.now()}`);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [activeTab]);

  if (!isAnimating) return null;

  return (
    <div
      key={animatingKey}
      className="fixed top-0 left-0 right-0 z-[99998] pointer-events-none h-[2px] overflow-hidden"
      aria-hidden="true"
    >
      {/* Golden scanning laser line */}
      <div className="w-full h-full bg-gradient-to-r from-transparent via-[#f2ca50] to-[#aa8010] shadow-[0_0_12px_rgba(242,202,80,0.8)] animate-page-switch-bar" />
    </div>
  );
};
