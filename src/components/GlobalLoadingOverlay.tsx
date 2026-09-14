import React, { useEffect, useState } from 'react';

interface GlobalLoadingOverlayProps {
  onLoaded?: () => void;
  minDurationMs?: number;
}

export const GlobalLoadingOverlay: React.FC<GlobalLoadingOverlayProps> = ({
  onLoaded,
  minDurationMs = 850,
}) => {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'hidden'>('loading');
  const [statusMessage, setStatusMessage] = useState('VERIFYING ENCRYPTED ASSETS');
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step progression for a tailored executive diplomatic chancery feel
    const t1 = setTimeout(() => {
      setStatusMessage('ESTABLISHING SECURE PROTOCOLS');
      setProgress(48);
    }, 250);

    const t2 = setTimeout(() => {
      setStatusMessage('LOADING SOVEREIGN ARCHIVES');
      setProgress(82);
    }, 550);

    const t3 = setTimeout(() => {
      setStatusMessage('PORTAL READY');
      setProgress(100);
    }, minDurationMs - 150);

    // Font readiness check + minDuration wait
    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const timerPromise = new Promise((resolve) => setTimeout(resolve, minDurationMs));

    Promise.all([fontPromise, timerPromise]).then(() => {
      setPhase('exiting');
      if (onLoaded) onLoaded();

      const exitTimer = setTimeout(() => {
        setPhase('hidden');
      }, 650); // Matches exit fade duration

      return () => clearTimeout(exitTimer);
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [minDurationMs, onLoaded]);

  if (phase === 'hidden') return null;

  return (
    <div
      id="global-sovereign-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading sovereign executive folio"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070707] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === 'exiting'
          ? 'opacity-0 scale-[1.02] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Radial Golden Glow */}
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(242,202,80,0.04)_45%,transparent_70%)] pointer-events-none blur-2xl animate-pulse" />

      {/* Luxury Subtle Grain Texture */}
      <div className="absolute inset-0 hero-grain pointer-events-none" />

      {/* Main Crest & Orbital Spinner Container */}
      <div className="relative flex flex-col items-center z-10 px-6">
        {/* Concentric Golden Orbital Rings */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-7">
          {/* Outer Track */}
          <div className="absolute inset-0 rounded-full border border-[#d4af37]/20" />

          {/* Outer Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r border-[#f2ca50] border-b-transparent border-l-transparent animate-spin [animation-duration:2.4s]" />

          {/* Inner Counter-Spinning Ring */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-full border-b-2 border-l border-[#d4af37] border-t-transparent border-r-transparent animate-spin [animation-direction:reverse] [animation-duration:3.2s]" />

          {/* Center Monogram Shield */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#11100e] border border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.25)] flex flex-col items-center justify-center">
            <span className="font-['Cinzel'] font-bold text-[#f2ca50] text-sm sm:text-base tracking-[0.18em] pl-0.5">
              ZK
            </span>
          </div>
        </div>

        {/* Executive Nameplate */}
        <h1 className="font-['Bodoni_Moda'] text-lg sm:text-2xl font-medium tracking-[0.24em] uppercase text-[#f5f2eb] mb-1.5 text-center">
          Zeenat Kureshi
        </h1>

        <p className="font-['Montserrat'] text-[9.5px] sm:text-[10.5px] tracking-[0.32em] uppercase text-[#d4af37] font-semibold mb-6 text-center">
          Sovereign Executive Folio
        </p>

        {/* Smooth Micro Progress Bar */}
        <div className="w-48 sm:w-56 h-[2px] bg-[#1a1712] rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-gradient-to-r from-[#aa8010] via-[#f2ca50] to-[#ffe088] transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(242,202,80,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Status Tracker */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-ping" />
          <span className="font-['Montserrat'] text-[9px] tracking-[0.22em] text-[#8e8574] uppercase font-medium">
            {statusMessage}
          </span>
        </div>
      </div>
    </div>
  );
};
