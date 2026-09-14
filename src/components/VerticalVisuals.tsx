import React from 'react';

/**
 * Visual effects and geometric vector art for the Strategic Portfolios / Key Verticals.
 * Designed with pure SVG and CSS effects — no external stock photography required.
 * Fully responsive and scalable across mobile, tablet, laptop, and desktop.
 */

export const TradeVisualEffect: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 420 320"
      className="w-full h-full text-[#d4af37]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="tradeGlow" cx="65%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#d4af37" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tradeCorridor" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#f2ca50" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffe088" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Ambient Radial Golden Glow */}
      <circle cx="280" cy="130" r="150" fill="url(#tradeGlow)" />

      {/* Navigational Concentric Meridian Rings */}
      <circle cx="280" cy="130" r="125" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
      <circle cx="280" cy="130" r="88" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <circle cx="280" cy="130" r="52" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.55" />
      <circle cx="280" cy="130" r="20" stroke="#f2ca50" strokeWidth="1.2" opacity="0.75" />

      {/* Latitude & Longitude Geopolitical Grid */}
      <line x1="80" y1="130" x2="410" y2="130" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
      <line x1="280" y1="0" x2="280" y2="300" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
      <ellipse cx="280" cy="130" rx="125" ry="50" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      <ellipse cx="280" cy="130" rx="50" ry="125" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />

      {/* CEPA Bilateral Corridors (GCC to India & Transnational Routes) */}
      <path d="M 50 250 Q 180 80 280 130 T 390 100" stroke="url(#tradeCorridor)" strokeWidth="2" fill="none" />
      <path d="M 90 280 Q 210 180 280 130 T 370 200" stroke="url(#tradeCorridor)" strokeWidth="1.2" strokeDasharray="5 3" fill="none" />

      {/* Waypoint Wayfinding Nodes */}
      <circle cx="50" cy="250" r="4.5" fill="#f2ca50" />
      <circle cx="50" cy="250" r="9" stroke="#f2ca50" strokeWidth="0.8" opacity="0.6" />
      <circle cx="280" cy="130" r="5" fill="#f2ca50" />
      <circle cx="280" cy="130" r="11" stroke="#f2ca50" strokeWidth="1" opacity="0.7" />
      <circle cx="390" cy="100" r="4" fill="#ffe088" />

      {/* Sovereign 8-Point Compass Rose Vector */}
      <path d="M 280 110 L 284 126 L 300 130 L 284 134 L 280 150 L 276 134 L 260 130 L 276 126 Z" fill="#f2ca50" />

      {/* Coordinate Telemetry Marks */}
      <text x="294" y="50" fill="#e9c176" fontSize="7.5" fontFamily="monospace" letterSpacing="2" opacity="0.75">GCC • 24°N 54°E</text>
      <text x="294" y="255" fill="#e9c176" fontSize="7.5" fontFamily="monospace" letterSpacing="2" opacity="0.75">IND • 28°N 77°E</text>
    </svg>
  </div>
);

export const MediaVisualEffect: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 420 320"
      className="w-full h-full text-[#d4af37]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="mediaGlow" cx="68%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mediaWave" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffe088" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <circle cx="285" cy="135" r="140" fill="url(#mediaGlow)" />

      {/* Anamorphic 2.39:1 Cinema Frame Guidelines */}
      <rect x="130" y="65" width="260" height="110" rx="3" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.35" />
      <rect x="160" y="80" width="200" height="80" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

      {/* Precision Focus Reticle Crosshairs */}
      <path d="M 245 115 L 245 125 M 245 145 L 245 155 M 235 135 L 225 135 M 265 135 L 255 135" stroke="#f2ca50" strokeWidth="1.2" opacity="0.75" />

      {/* Cinematic Aperture Blades & Iris Geometry */}
      <circle cx="285" cy="135" r="85" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="285" cy="135" r="58" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="285" cy="135" r="28" stroke="#f2ca50" strokeWidth="1.3" opacity="0.8" />

      {/* Hexagonal Diaphragm Aperture */}
      <path d="M 285 78 L 334 107 L 334 163 L 285 192 L 236 163 L 236 107 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <path d="M 285 88 L 324 111 L 324 159 L 285 182 L 246 159 L 246 111 Z" stroke="#e9c176" strokeWidth="0.6" opacity="0.35" />

      {/* Harmonic Soundwave Spectrum Curves */}
      <path d="M 40 135 Q 80 85 120 135 T 200 135 T 285 135" stroke="url(#mediaWave)" strokeWidth="1.6" fill="none" />
      <path d="M 60 135 Q 100 165 140 135 T 220 135" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.35" fill="none" />

      {/* Optical Film Track & Metadata Stamps */}
      <line x1="130" y1="45" x2="390" y2="45" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <line x1="130" y1="195" x2="390" y2="195" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <text x="140" y="57" fill="#e9c176" fontSize="7" fontFamily="monospace" letterSpacing="2" opacity="0.7">24 FPS • 2.39:1 • CANNES / VENICE</text>
      <text x="140" y="210" fill="#f2ca50" fontSize="7" fontFamily="monospace" letterSpacing="1.5" opacity="0.7">ACCOLADES TRAJECTORY • 96kHz DOLBY</text>
    </svg>
  </div>
);

export const LeadershipVisualEffect: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 420 320"
      className="w-full h-full text-[#ffdea5]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="leadGlow" cx="68%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ffdea5" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="leadConstellation" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
          <stop offset="55%" stopColor="#ffdea5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <circle cx="280" cy="130" r="145" fill="url(#leadGlow)" />

      {/* Sovereign Civic Crown / Crest Geometry */}
      <path d="M 205 160 L 220 95 L 255 130 L 280 75 L 305 130 L 340 95 L 355 160 Z" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <line x1="205" y1="160" x2="355" y2="160" stroke="#f2ca50" strokeWidth="1.2" opacity="0.65" />

      {/* Radiating Civic Concentric Rings */}
      <circle cx="280" cy="130" r="115" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.3" />
      <circle cx="280" cy="130" r="80" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="280" cy="130" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.55" />

      {/* Interconnected Constellation Network (120,000+ Leaders) */}
      <path d="M 120 210 L 175 180 L 235 200 L 280 130 L 335 170 L 375 115" stroke="url(#leadConstellation)" strokeWidth="1.2" fill="none" />
      <path d="M 175 180 L 220 95 L 280 130 L 340 95" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.35" fill="none" />

      {/* Illuminating Nexus Nodes */}
      <circle cx="120" cy="210" r="3.5" fill="#ffdea5" />
      <circle cx="175" cy="180" r="4" fill="#f2ca50" />
      <circle cx="235" cy="200" r="3.5" fill="#d4af37" />
      <circle cx="280" cy="130" r="5.5" fill="#ffffff" />
      <circle cx="280" cy="130" r="11" stroke="#f2ca50" strokeWidth="1" opacity="0.65" />
      <circle cx="335" cy="170" r="4" fill="#ffdea5" />
      <circle cx="375" cy="115" r="3.5" fill="#f2ca50" />
      <circle cx="220" cy="95" r="3" fill="#e9c176" />
      <circle cx="340" cy="95" r="3" fill="#e9c176" />

      {/* Crest Starburst Radiance */}
      <path d="M 280 58 L 285 70 L 297 73 L 285 76 L 280 88 L 275 76 L 263 73 L 275 70 Z" fill="#ffdea5" />
      <text x="220" y="255" fill="#ffdea5" fontSize="7.5" fontFamily="monospace" letterSpacing="1.8" opacity="0.7">CIVIC PARITY • 120K+ MOBILIZED</text>
    </svg>
  </div>
);

export const InvestmentVisualEffect: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 420 320"
      className="w-full h-full text-[#ffe088]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="wealthGlow" cx="68%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wealthAscent" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#f2ca50" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <circle cx="280" cy="135" r="145" fill="url(#wealthGlow)" />

      {/* Golden Ratio (Phi Φ / Fibonacci) Logarithmic Growth Spiral */}
      <path
        d="M 280 135 A 10 10 0 0 1 290 145 A 20 20 0 0 1 270 165 A 40 40 0 0 1 230 125 A 80 80 0 0 1 310 45 A 140 140 0 0 1 395 215"
        stroke="url(#wealthAscent)"
        strokeWidth="1.6"
        fill="none"
      />

      {/* Isometric Sovereign Vault Grid & Asset Matrices */}
      <path d="M 130 190 L 205 150 L 280 190 L 205 230 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M 205 150 L 280 110 L 355 150 L 280 190 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <path d="M 280 110 L 355 70 L 415 105 L 340 145 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.3" strokeDasharray="3 3" />

      {/* Upward Sovereign Capital Growth Trajectories */}
      <line x1="130" y1="190" x2="130" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="205" y1="150" x2="205" y2="110" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="280" y1="110" x2="280" y2="60" stroke="#f2ca50" strokeWidth="1.2" opacity="0.75" />
      <line x1="355" y1="70" x2="355" y2="25" stroke="#ffe088" strokeWidth="1.5" opacity="0.85" />
      <circle cx="355" cy="25" r="4" fill="#ffffff" />

      {/* Faceted Geometry Rings */}
      <circle cx="280" cy="135" r="115" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.3" />
      <circle cx="280" cy="135" r="65" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <text x="225" y="258" fill="#ffe088" fontSize="7.5" fontFamily="monospace" letterSpacing="1.8" opacity="0.7">FDI ALLOCATION • Φ = 1.618</text>
    </svg>
  </div>
);
