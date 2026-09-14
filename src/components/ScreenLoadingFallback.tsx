import React from 'react';

export const ScreenLoadingFallback: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading sovereign section"
      className="w-full min-h-[65vh] flex flex-col items-center justify-center relative px-6 py-24"
    >
      {/* Ambient subtle golden glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-xl" />

      {/* Orbiting concentric rings */}
      <div className="relative w-16 h-16 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border border-[#d4af37]/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-r border-[#f2ca50] border-b-transparent border-l-transparent animate-spin [animation-duration:1.6s]" />
        <div className="absolute inset-2 rounded-full border-b-2 border-l border-[#d4af37] border-t-transparent border-r-transparent animate-spin [animation-direction:reverse] [animation-duration:2.4s]" />
        
        {/* Monogram core */}
        <div className="w-8 h-8 rounded-full bg-[#11100e] border border-[#d4af37]/50 flex items-center justify-center">
          <span className="font-['Cinzel'] font-bold text-[#f2ca50] text-[11px] tracking-wider pl-0.5">
            ZK
          </span>
        </div>
      </div>

      {/* Loading Status Text */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-ping" />
        <span className="font-['Montserrat'] text-[10px] tracking-[0.28em] text-[#c4b596] uppercase font-semibold">
          LOADING PROTOCOL VIEW
        </span>
      </div>
    </div>
  );
};

export default ScreenLoadingFallback;
